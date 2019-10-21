
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,               //月
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

let checkCard = function checkIdCard (code) {
  return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code);
}

let checkPhone = function checkIdCard (phone) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
}

export { checkCard, checkPhone }