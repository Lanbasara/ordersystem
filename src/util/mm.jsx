class MUtil {
  request(param){
    return new Promise((resolve ,reject)=>{
      $.ajax({
        type : param.type ||'get',
        url : param.url || '',
        dataType : param.dataType || 'json',
        data : param.data || null,
        success: res=>{
          if(0=== res.status){
            typeof resolve==='function' && resolve(res.data,res.msg);

          }else if(10===res.status){
            //请登录
            this.doLogin();
          }
          else{
            typeof reject ==='function' && reject(res.msg || res.data);
          }
  
        },
        error: err=>{
          typeof reject ==='function' && reject(err.statusTest);

  
        }
      });
    });
    
  }
  //跳转登陆
  doLogin(){
    window.location.href = '/login?redirect='+ encodeURIComponent(window.location.pathname);
  }
  //获取Url参数
  getUrlParam(name){
    let queryString = window.location.search.split('?')[1] || '';
    let reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    let result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;


  }
  errorTips(errMsg){
    alert(errMsg || "发生了错误")
  }
  setStorage(name,data){
    let datatype = typeof data;
    if(datatype === 'object'){
      window.localStorage.setItem(name,JSON.stringify(data));
    }
    //基础类型
    else if (['number','string','boolean'].indexOf(datatype)>=0){
      window.localStorage.setItem(name,data);
    }
    else {
      alert('该类型不能本地存储')
    }
  }
  getStorage(name){
    let data =  window.localStorage.getItem(name);
    if(data){
      return JSON.parse(data);
    }
    else {
      return '';
    }
  }
  //删除存储
  removeStorage(name){
    window.localStorage.removeItem(name);
  }

}

export default MUtil;