/**
 * IPC
 * IPC信息传输
 */
import {ipcRenderer} from 'electron';

//开启用户控制台
export function openDashboard(){
    if(ipcRenderer) ipcRenderer.send('main-window', 'dashboard');
}

//开启子窗口数据
export function openSubWin(url){
    if(ipcRenderer) ipcRenderer.send('sub-window', url);
    else window.location.href=url;
}

//关闭子窗口数据
export function closeSubWin(){
    if(ipcRenderer) ipcRenderer.send('sub-window', 'close');
    else window.history.back();
}