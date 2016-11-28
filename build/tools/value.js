/**
 * Tool - value
 * 数值处理方法
 */
//加密密码
export function encryptPassword(password){
    if(!password) return '';
    let encrypt_password=password;
    if(encrypt_password.length>1){
        let last_word=password[encrypt_password.length-1];
        encrypt_password=encrypt_password.replace(/[\S\s]/g,'*');
        encrypt_password=encrypt_password.replace(/[\S\s]{1}$/,'')+last_word;
    }
    return encrypt_password;
}

//解密密码
export function decryptPassword(old_password,input_password){
    if(!old_password&&!input_password) return '';
    old_password=old_password||'';
    input_password=input_password||'';
    let new_password;
    if(input_password.length<=old_password.length){ //删除密码内容
        new_password=old_password.substring(0,input_password.length);
    }else{ //新增密码
        new_password=old_password+input_password.substring(old_password.length,input_password.length);
    }
    return new_password;
}