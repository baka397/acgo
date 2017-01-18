'use strict';
const mailgun = require('mailgun-js');
const tool = require('./tool');
const config = require('../config/');
const mailClient = mailgun({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain});
const sendInfo = {
    from: '宅圈小信使 <messenger@mail.acgo.club>'
}
function getPwMailContent(url){
    let userResetTime=tool.getTimeInfo(config.userResetExpire);
    return `
        <p>Hi,</p>
        <p>我们收到一个新的找回密码请求,请点击以下地址重设密码:</p>
        <p><a href="${url}" target="_blank">${url}</a></p>
        <p>如果不是你发送的请求,请忽略该邮件信息.</p>
        <p>该链接${userResetTime}内有效.</p>
        <p>ACGO.club</p>
    `
}

function sendMail(to,subject,html){
    let data=Object.assign({},sendInfo,{
        to:to,
        subject:subject,
        html:html
    })
    return new Promise(function(resolve,reject){
        mailClient.messages().send(data, function (err, body) {
            if(err){
                LOG.info('发送信件失败');
                LOG.err(err);
                return reject(new Error('信件发送失败'));
            }
            LOG.info('发送信件成功');
            LOG.info(body);
            resolve();
        });
    })
}

exports.sendPwMail = function(to,url){
    let subject='ACGO.club-找回密码';
    let html=getPwMailContent(url);
    return sendMail(to,subject,html);
}