// pages/login/miss_password/update_password.js
let flashEvent = require('../../../utils/FlashEvent');
const api = require("../../../utils/request")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view:"password",
    isView:"true",
    firstPass:"",
    reviewPass:"",
    tel:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收上一页面传来的手机号
  //   flashEvent.register(flashEvent.EVENT_KEYS.FIRST_EVENT, this, function (data) {
  //     this.setData({ tel: data })
  //  })
  //  console.log(this.data.tel)
  //  console.log(app.globalData.tel)
  this.setData({
    tel:app.globalData.tel
  })
  console.log(this.data.tel)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // flashEvent.unregister(flashEvent.EVENT_KEYS.FIRST_EVENT, this);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  changeview:function() {
    this.setData({
      isView:false,
      view:"text"
    })
  },
  changeisview:function() {
    this.setData({
      isView:true,
      view:"password"
    })
  },
  passwordInput:function(e) {
    this.setData({
      firstPass:e.detail.value
    })
  },
  reviewInput:function(e) {
    this.setData({
      reviewPass:e.detail.value
    })
  },
  bindSubmit:function() {
    let firstPass = this.data.firstPass
    let reviewPass = this.data.reviewPass
    let tel = this.data.tel
    console.log(tel)
    if(firstPass.length === 0){
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 1000
      })
    }else if(firstPass === reviewPass){
      api.refrushUser({
          phoneNumber:tel
      }).then(res => {
        if(res.code == 1) {
          var userAccount = res.data.UserAccount.userAccount
          console.log(userAccount)
          api.updatePassowrd({
            password: reviewPass,
            userAccount: userAccount
          }).then(res => {
            console.log(res)
             if (res.data == 1) {
               //修改成功则返回到登录页面
               wx.navigateTo({
                 url: '/pages/login/login',
               })
            }else {
              wx.showToast({title:"密码修改失败，请稍后重试", icon:"none"})
           }
          })
        }
      })
      
    }else{
      wx.showToast({
        title: '两次密码输入不一致，请检查',
        icon: 'none',
        duration: 1000
      })
    }
  }

})