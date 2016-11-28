/**
 * app
 */
//加载配置文件
import {BASE_PATH} from './config';//API配置

//加载依赖
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore, applyMiddleware
}
from 'redux';
import {
  Provider, Counter
}
from 'react-redux';
import {
  Router, Route, browserHistory, IndexRoute, Redirect
}
from 'react-router';
import {
  syncHistory
}
from 'react-router-redux';
import thunk from 'redux-thunk';

//加载reducer集合
import {
  reducer
}
from './reducers/index';

//加载页面
import Layout from './pages/layout'; //公共组件
import Login from './pages/login'; //登录
import InvitationCode from './pages/managment/invitation_code'; //邀请码管理
import MenuCate from './pages/managment/menu_cate'; //目录分类管理
import MenuCateEdit from './pages/managment/menu_cate_edit'; //目录分类编辑
import MenuList from './pages/managment/menu_list'; //目录管理
import MenuEdit from './pages/managment/menu_edit'; //目录编辑
import ActionCate from './pages/managment/action_cate'; //权限分类管理
import ActionCateEdit from './pages/managment/action_cate_edit'; //权限分类编辑
import ActionList from './pages/managment/action_list'; //目录管理
import ActionEdit from './pages/managment/action_edit'; //目录管理
import RoleList from './pages/managment/role_list'; //角色管理
import RoleEdit from './pages/managment/role_edit'; //角色列表
import CodeList from './pages/managment/code_list'; //邀请码管理
import AddCircle from './pages/add/circle'; //添加圈子
import Dashboard from './pages/dashboard'; //控制面板
import ResourceDetail from './pages/resource/detail'; //内容详情
import {
  Error403, Error404
}
from './pages/error'; //堂食

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);

//插入中间件
let createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore)
var store;
if (process.env.NODE_ENV === 'production') {
  store = createStoreWithMiddleware(reducer, {});
} else {
  //载入redux debug插件
  function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducer, initialState,
      window.devToolsExtension ? window.devToolsExtension() : undefined
    );
    return store;
  }
  // Store
  store = configureStore({});
}

//创建路由
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="dashboard" component={Dashboard} />
        <Route path="/add/">
          <Route path="circle" component={AddCircle} />
        </Route>
        <Route path="/managment/">
          <Route path="invitationCode" component={InvitationCode} />
          <Route path="menu" component={MenuCate} />
          <Route path="menuCate/:id" component={MenuCateEdit} />
          <Route path="menuCate" component={MenuCateEdit} />
          <Route path="menuList/:id" component={MenuList} />
          <Route path="menuItem/:parent_id-:id" component={MenuEdit} />
          <Route path="menuItem/:parent_id" component={MenuEdit} />
          <Route path="action" component={ActionCate} />
          <Route path="actionCate/:id" component={ActionCateEdit} />
          <Route path="actionCate" component={ActionCateEdit} />
          <Route path="actionList/:id" component={ActionList} />
          <Route path="actionItem/:parent_id-:id" component={ActionEdit} />
          <Route path="actionItem/:parent_id" component={ActionEdit} />
          <Route path="role" component={RoleList} />
          <Route path="roleItem" component={RoleEdit} />
          <Route path="roleItem/:id" component={RoleEdit} />
          <Route path="code" component={CodeList} />
        </Route>
        <Route path="resource/:id" component={ResourceDetail} />
        <Route path="login" component={Login} />
        <Route path="403" component={Error403} />
        <Route path="*" component={Error404}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('page')
)