/**
 * Reducer - index
 * 汇总
 */
//加载reducers
import {routeReducer} from 'react-router-redux';
import common from './common';
import modal from './modal';
import login from './login';
import menu from './menu';
import action from './action';
import role from './role';
import code from './code';
import playlist from './playlist';
import resource from './resource';

import {
    combineReducers
} from 'redux';

export const reducer = combineReducers({
    common,
    modal,
    login,
    menu,
    action,
    role,
    code,
    playlist,
    resource,
    route: routeReducer
});