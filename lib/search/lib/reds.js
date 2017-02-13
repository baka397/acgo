'use strict';
/*!
 * reds
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * cn-search
 * Copyright(c) 2013 Sxyizhiren <786647787@qq.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

const natural = require('natural');
const metaphone = natural.Metaphone.process;
const stem = natural.PorterStemmer.stem;
const stopwords = natural.stopwords;
const cnstopwords = require('./cnstop_words');
const redisClient = require('../../../common/redis');
const config = require('../../../config/');

// default chinese segment
const Segment = require('segment').Segment;
const segment = new Segment();
segment.useDefault();

/**
 * Chinese Segment
 * @type {*}
 * baka:直接不返回词性,撤销无意义循环
 */
let segmentSync = function(str) {
    let result = segment.doSegment(str, {
        simple: true
    });
    return result;
};

let englishregex = /^[a-zA-Z]/;
let redsOption = {};

function noop() {}

/**
 * Library version.
 */

exports.version = '1.0.0';

/**
 * Expose `Search`.
 */

exports.Search = Search;

/**
 * Expose `Query`.
 */

exports.Query = Query;

/**
 * Search types.
 */

let types = {
    intersect: 'zinterstore',
    union: 'zunionstore',
    and: 'zinterstore',
    or: 'zunionstore'
};

/**
 * Create a redis client, override to
 * provide your own behaviour.
 * Call it after createSearch(), so that you can get option from createSearch()
 * @return {RedisClient}
 * @api public
 * baka:直接返回redis客户端
 */

exports.createClient = function() {
    return redisClient;
};

function createChineseSegment() {
    if (redsOption && redsOption.segmentSync) {
        segmentSync = redsOption.segmentSync;
    }
}

/**
 * Return a new reds `Search` with the given `key`.
 *
 * @param {String} key
 * @return {Search}
 * @api public
 * baka:添加额外的命名空间
 */

exports.createSearch = function(key, option) {
    if (!key || (typeof key !== 'string')) throw new Error('createSearch() requires a string redis <key> for namespacing');
    if (typeof option === 'object') {
        redsOption.isRandomizeSameScore = option.isRandomizeSameScore;
        redsOption.port = option.port;
        redsOption.host = option.host;
        redsOption.redis = option.redis;
        redsOption.segmentSync = option.segmentSync;
    }
    createChineseSegment();
    return new Search(config.redisNamespace+':search:'+key);
};

/**
 * copy from mmseg, so that i can also use it for other segment
 * @param ar
 * @returns {*}
 */
let clean = function(ar) {
    if (ar && ar.length) {
        let a = [];
        for (let i = 0, l = ar.length; i < l; i++) {
            if (/^[\u4e00-\u9fa5\da-zA-Z]+$/.test(ar[i])) a.push(ar[i]);
        }
        ar = a;
    }
    return ar;
};

/**
 * Return the words in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

exports.words = function(str) {
    return clean(segmentSync(String(str)));
};

/**
 * Stem the given `words`.
 *
 * @param {Array} words
 * @return {Array}
 * @api private
 */

exports.stem = function(words) {
    let ret = [];
    if (!words) return ret;
    for (let i = 0, len = words.length; i < len; ++i) {
        if (englishregex.test(words[i])) {
            //word is in english
            ret.push(stem(words[i]));
        } else {
            //not english ,is chinese
            ret.push(words[i]);
        }

    }

    return ret;
};

/**
 * Strip stop words in `words`.
 *
 * @param {Array} words
 * @return {Array}
 * @api private
 */

exports.stripStopWords = function(words) {
    let ret = [];
    if (!words) return ret;
    for (let i = 0, len = words.length; i < len; ++i) {
        if (englishregex.test(words[i])) {
            //word is in english
            if (~stopwords.indexOf(words[i])) continue;
        } else {
            //not english ,is chinese
            if (~cnstopwords.indexOf(words[i])) continue;
        }

        ret.push(words[i]);
    }

    return ret;
};

/**
 * Returns an object mapping each word in a Array
 * to the number of times it occurs in the Array.
 *
 * @param {Array} words
 * @return {Object}
 * @api private
 */

exports.countWords = function(words) {
    let obj = {};
    if (!words) return obj;
    for (let i = 0, len = words.length; i < len; ++i) {
        // when many date have same score, they will always in the same sequence.
        // here add random subscore, to support randomize the sequence of same score
        if (redsOption && redsOption.isRandomizeSameScore) {
            obj[words[i]] = (obj[words[i]] || 0) + 1 + Math.random();
        } else {
            obj[words[i]] = (obj[words[i]] || 0) + 1;
        }
    }
    return obj;
};

/**
 * Return the given `words` mapped to the metaphone constant.
 *
 * Examples:
 *
 *    metaphone(['tobi', 'wants', '4', 'dollars'])
 *    // => { '4': '4', tobi: 'TB', wants: 'WNTS', dollars: 'TLRS' }
 *
 * @param {Array} words
 * @return {Object}
 * @api private
 */

exports.metaphoneMap = function(words) {
    let obj = {};
    if (!words) return obj;
    for (let i = 0, len = words.length; i < len; ++i) {
        if (englishregex.test(words[i])) {
            obj[words[i]] = metaphone(words[i]);
        } else {
            obj[words[i]] = words[i];
        }
    }
    return obj;
};

/**
 * Return an array of metaphone constants in `words`.
 *
 * Examples:
 *
 *    metaphone(['tobi', 'wants', '4', 'dollars'])
 *    // => ['4', 'TB', 'WNTS', 'TLRS']
 *
 * @param {Array} words
 * @return {Array}
 * @api private
 */

exports.metaphoneArray = function(words) {
    let arr = [];
    let constant;

    if (!words) return arr;

    for (let i = 0, len = words.length; i < len; ++i) {
        if (englishregex.test(words[i])) {
            constant = metaphone(words[i]);
        } else {
            constant = words[i];
        }
        if (!~arr.indexOf(constant)) arr.push(constant);
    }

    return arr;
};

/**
 * Return a map of metaphone constant redis keys for `words`
 * and the given `key`.
 *
 * @param {String} key
 * @param {Array} words
 * @return {Array}
 * @api private
 */

exports.metaphoneKeys = function(key, words) {
    return exports.metaphoneArray(words).map(function(c) {
        return key + ':word:' + c;
    });
};

/**
 * Initialize a new `Query` with the given `str`
 * and `search` instance.
 *
 * @param {String} str
 * @param {Search} search
 * @api public
 */

function Query(str, search) {
    this.str = str;
    this.type('and');
    this.search = search;
}

/**
 * Set `type` to "union" or "intersect", aliased as
 * "or" and "and".
 *
 * @param {String} type
 * @return {Query} for chaining
 * @api public
 */

Query.prototype.type = function(type) {
    this._type = types[type];
    return this;
};

/**
 * Limit search to the specified range of elements.
 *
 * @param {String} start
 * @param {String} stop
 * @return {Query} for chaining
 * @api public
 */
Query.prototype.between = function(start, stop) {
    this._start = start;
    this._stop = stop;
    return this;
};

/**
 * Perform the query and callback `fn(err, ids)`.
 *
 * @param {Function} fn
 * @return {Query} for chaining
 * @api public
 */

Query.prototype.end = function(fn) {
    let key = this.search.key;
    let db = this.search.client;
    let query = this.str;
    let words = exports.stem(exports.stripStopWords(exports.words(query)));
    let keys = exports.metaphoneKeys(key, words);
    let type = this._type;
    let start = this._start || 0;
    let stop = this._stop || -1;

    if (!keys.length) return fn(null, []);

    let tkey = key + 'tmpkey';
    db.multi([
        [type, tkey, keys.length].concat(keys), ['zrevrange', tkey, start, stop],
        ['zremrangebyrank', tkey, start, stop],
    ]).exec(function(err, ids) {
        if(err) return fn(err);
        err = ids[1][0];
        ids = ids[1][1];
        fn(err, ids);
    });

    return this;
};

/**
 * Initialize a new `Search` with the given `key`.
 *
 * @param {String} key
 * @api public
 */

function Search(key) {
    this.key = key;
    this.client = exports.createClient();
}

/**
 * Index the given `str` mapped to `id`.
 *
 * @param {String} str
 * @param {Number|String} id
 * @param {Function} fn
 * @api public
 */

Search.prototype.index = function(str, id, fn) {
    let key = this.key;
    let db = this.client;
    let words = exports.stem(exports.stripStopWords(exports.words(str)));
    let counts = exports.countWords(words);
    let map = exports.metaphoneMap(words);
    let keys = Object.keys(map);

    let cmds = [];
    keys.forEach(function(word) {
        cmds.push(['zadd', key + ':word:' + map[word], counts[word], id]);
        cmds.push(['zadd', key + ':object:' + id, counts[word], map[word]]);
    });
    db.multi(cmds).exec(fn || noop);

    return this;
};

/**
 * Remove occurrences of `id` from the index.
 *
 * @param {Number|String} id
 * @api public
 */

Search.prototype.remove = function(id, fn) {
    fn = fn || noop;
    let key = this.key;
    let db = this.client;

    db.zrevrangebyscore(key + ':object:' + id, '+inf', 0, function(err, constants) {
        if (err) return fn(err);
        let multi = db.multi().del(key + ':object:' + id);
        constants.forEach(function(c) {
            multi.zrem(key + ':word:' + c, id);
        });
        multi.exec(fn);
    });

    return this;
};

/**
 * Perform a search on the given `query` returning
 * a `Query` instance.
 *
 * @param {String} query
 * @param {Query}
 * @api public
 */

Search.prototype.query = function(query) {
    return new Query(query, this);
};
