/**
 * Action - common
 * 公共操作
 */

/*
 * action 类型
 */
export const INIT_APPINFO='INIT_APPINFO'; //设置APP info
export const INIT_APPINFO_CLEAR='INIT_APPINFO_CLEAR'; //撤销APP info

//锁定收银台
export const CASHIER_LOCK = 'CASHIER_LOCK'; //锁定收银台
export const CASHIER_UNLOCK = 'CASHIER_UNLOCK'; //解锁收银台

/*
 * action 创建函数
 */

//更新app info
export function appInfoSet(data){
    return {
        type:INIT_APPINFO,
        info:data
    }
}
//清空app info
export function appInfoClear(key){
    return {
        type:INIT_APPINFO_CLEAR,
        key:key
    }
}