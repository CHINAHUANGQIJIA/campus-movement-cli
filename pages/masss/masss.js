// pages/index/index.js
const api = require("../../utils/request")
const app = getApp()
Page({

  data: {
    weight: 70,
    height: 180,
    data:{},
    record:"",
    infos:"",
    styles: {
      line: '#dbdbdb',
      bginner: '#43cee7',
      bgoutside: '#ffffff',
      font: '#404040',
      fontColor: '#404040',
      fontSize: 16
    }
  },
 
  ti:function() {
  
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
  api.updateInfo({
    height:this.data.height,
    weight:this.data.weight,
    userAccount:app.globalData.user.userAccount,
  }).then(res => {
     var code = res.code;
      if (code === 1) {
        wx.hideLoading()
    api.refreshInformation({
      id:app.globalData.user.id
    }) .then(res => {
      if (code === 1) {
        console.log("升高体重修改成功")
      app.globalData.user = res.data
      console.log(app.globalData.user)
      this.setData({
        infos:app.globalData.user
        
        })
        wx.showToast({
          title: '修改成功',
          icon: 'loading',
          duration: 1500
        })
       wx.switchTab({
         url: '/pages/personal/personal',
       })
       
    }
    })
  console.log("123")
    // 这里一般都是与后台交互过程
    // 关闭loading
    
  }})
  },
  onShow:function(){
    this.setData({
      infos:app.globalData.user
    })
    console.log(this.data.infos)
      if (this.data.infos==undefined) {
        wx.showModal({
          title: '提示',
          content: '您还未登录，请先登录！',
          success (res) {
            if (res.confirm) {
             wx.navigateTo({
               url: '/pages/login/login',
             })
            } else if (res.cancel) {
              console.log("您点击了取消按钮")
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
        wx.hideLoading();
      }

  },
  bindvalue(e) { //滑动回调
    const value = e.detail.value;
  
    const key = e.currentTarget.id;
    const data = {};
    data[key] = value;
    this.setData(data)
   console.log(this.data.weight)
   console.log(this.data.height)
  }
})