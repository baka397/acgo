//转换时间差
function convTimeDifference(time){
    //小于1分钟
    if(time<=60*1000){
        return '1分钟以内';
    }else if(time<=60*60*1000){ //1小时以内
        return parseInt(time/(60*1000))+'分钟前';
    }else if(time<=24*60*60*1000){ //24小时以内
        return (time/(60*60*1000)).toFixed(1)+'小时前';
    }else if(time<=30*24*60*60*1000){
        return (time/(24*60*60*1000)).toFixed(1)+'天前';
    }else{
        return '更早以前';
    }
}
/**
 * 时间格式转换工具
 * @param  {number} timestamp 时间戳
 * @param  {string} format    转换格式,YYYY,MM,DD,hh,mm,ss
 * @return {object}           正确格式及相差时间
 */
export function timeTrans(timestamp,format='YYYY-MM-DD') {
    if(!timestamp||(timestamp.toString().length!==10&&timestamp.toString().length!==13)) return {
        time:'',
        difference:''
    }
    //转换时间戳为毫秒
    if(timestamp.toString().length===10){
        timestamp=timestamp*1000;
    }
    let time_difference=new Date().getTime()-timestamp;
    let date=new Date(timestamp);
    //转换时间格式
    //年份
    var exp_year=new RegExp(/YYYY/g);
    if(exp_year.test(format)){
        format=format.replace(exp_year,date.getFullYear());
    }
    //月份
    var exp_month=new RegExp(/MM/g);
    if(exp_month.test(format)){
        let month=date.getMonth()+1;
        if(month<10){
            month='0'+month.toString();
        }
        format=format.replace(exp_month,month);
    }
    //天数
    var exp_day=new RegExp(/DD/g);
    if(exp_day.test(format)){
        let day=date.getDate();
        if(day<10){
            day='0'+day.toString();
        }
        format=format.replace(exp_day,day);
    }
    //小时
    var exp_hour=new RegExp(/hh/g);
    if(exp_hour.test(format)){
        let hour=date.getHours();
        if(hour<10){
            hour='0'+hour.toString();
        }
        format=format.replace(exp_hour,hour);
    }
    //分
    var exp_min=new RegExp(/mm/g);
    if(exp_min.test(format)){
        let min=date.getMinutes();
        if(min<10){
            min='0'+min.toString();
        }
        format=format.replace(exp_min,min);
    }
    //秒
    var exp_sec=new RegExp(/ss/g);
    if(exp_sec.test(format)){
        let sec=date.getSeconds();
        if(sec<10){
            sec='0'+sec.toString();
        }
        format=format.replace(exp_sec,sec);
    }
    return {
        time:format,
        difference:time_difference>30*24*60*60*1000?format:convTimeDifference(time_difference)
    }
}