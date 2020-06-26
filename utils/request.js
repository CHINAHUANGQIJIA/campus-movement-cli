//统一接口封装
const API_BASE_URL = 'http://47.98.243.51:8080/';
const get = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
        
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}

    })
  });
}
 const post = (url, data) => {
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : "json",
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      success(request) {
        resolve(request.data)
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}
    })
  });
}


const put = (url, data) => {

  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "PUT",
      dataType : "json",
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      success(request) {
        resolve(request.data)
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}
    })
  });
}

const del = (url, data) => {

  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      //data     : data,
      method   : "DELETE",
      // dataType : "x-www-form-urlencoded",
      // header: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // },
      success(request) {
        resolve(request)
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}
    })
  });
}

module.exports ={
  login:(data) =>{
    return post('sysUser/login',data)//账号密码登录
  },
  updatePassowrd:(data) =>{
    return put('user/password',data)//修改密码
  },
  refrushUser:(data) =>{
    return get('user/flush',data)//刷新用户
  },
  updateInfo:(data) =>{
    return post('sysUser/update',data)//修改个人信息
  },
  submitFeedback:(data) =>{
    return post('user/feedback',data)//意见反馈
  },
  refreshInformation:(data) =>{
    return get('sysUser/select',data)//刷新信息接口
  },
  motionData:(data) =>{
    return post('sysSport/insertSport',data)//运动数据插入
  },
  motionRecord:(data) =>{
    return get('sysSport/selectSport',data)//查询运动记录
  },
  register:(data) =>{
    return post('sysUser/register',data)//用户注册
  },
  insertFeedback:(data) =>{
    return post('sysAdvice/adcive',data)//插入意见反馈
  },
  foundFeedback:(data) =>{
    return get('sysAdvice/adviceList',data)//查意见反馈
  },
  getDailyArray:(data) =>{
    return get('sysDailyAttendance/getDailyArray',data)//打卡查询
  },
  updateOrInsert:(data) =>{
    return post('sysDailyAttendance/updateOrInsert',data)//打卡插入
  },
  findone:(data) =>{
    return get('sysSport/sumSport',data)//查当天运动步数
  },
}
