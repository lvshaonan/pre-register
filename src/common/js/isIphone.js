export const isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

export function is_weixn(){ 
  var ua = navigator.userAgent.toLowerCase(); 
  if(ua.match(/MicroMessenger/i)=='micromessenger') {
    return true;
  } else { 
     return false;
  } 
}

export function is_QQ(){ 
  var ua = navigator.userAgent.toLowerCase(); 
  if(ua.match(/qq/i)=='qq') {
    return true;
  } else { 
     return false;
  } 
}