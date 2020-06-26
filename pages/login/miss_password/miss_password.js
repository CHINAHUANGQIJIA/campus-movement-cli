// pages/login/miss_password/miss_password.js
const api = require("../../../utils/request")
let flashEvent = require('../../../utils/FlashEvent');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneTab: false,
    telTab:false,
    tel:"",
    code:"",
    image:false,
    showModal: false, //false关闭模态框  true开启模态框
    selectArray: [{
      "id": "1",
      "text": "中国 +86",
      "number":"+86"
  }, 
  {
      "id": "2",
      "text": "台湾地区 +886",
      "number":"+886"
  },
  {
    "id": "3",
    "text": "香港地区 +852",
    "number":"+852"
  },
  {
    "id": "4",
    "text": "澳门地区 +853",
    "number":"+853"
  },
  {
    "id": "5",
    "text": "马来西亚 +60",
    "number":"+60"
  },
  {
    "id": "6",
    "text": "新加坡 +65",
    "number":"+65"
  },
  {
    "id": "7",
    "text": "日本 +81",
    "number":"+81"
  },
  {
    "id": "8",
    "text": "韩国 +82",
    "number":"+82"
  },
  {
    "id": "9",
    "text": "美国 +1",
    "number":"+1"
  },
  {
    "id": "10",
    "text": "加拿大 +1",
    "number":"+1"
  },
  {
    "id": "11",
    "text": "澳大利亚 +61",
    "number":"+61"
  },
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindMiss:function(e) {
    this.setData({
      tel:e.detail.val
    })
  },
  bindCode:function(e) {
    this.setData({
      code:e.detail.code
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal() {
    var that = this;
    that.setData({
      showModal: false,
    })
  },
  openBorder:function() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  missGetDate:function(e) {
    console.log(e.detail)
  },
  bindUpdate:function() {
    var tel = this.data.tel
    var code = this.data.code
    console.log(tel,code)
    if (code.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else if (tel.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else {
      //开始验证手机验证码

      api.verifyCode({
        phoneNumber: tel,
        verifyCode: code
      }).then(res => {
        console.log(res)
         if (res.code == 1) {
           //开始跳转到修改密码
           //向修改密码页面发送输入的手机号
           flashEvent.post(flashEvent.EVENT_KEYS.FIRST_EVENT, tel);
           app.globalData.tel = tel
           wx.navigateTo({
             url: '/pages/login/miss_password/update_password',
           })
        }else {
          wx.showToast({title:"验证码错误", icon:"none"})
       }


      })

      // api.verifyCode({
      //   phoneNumber: tel,
      //   verifyCode: code
      // }).then(res => {
      //   console.log(res)
      //    if (res.code == 1) {
           //开始跳转到修改密码
           //向修改密码页面发送输入的手机号
           flashEvent.post(flashEvent.EVENT_KEYS.FIRST_EVENT, tel);
           app.globalData.tel = tel
           wx.navigateTo({
             url: '/pages/login/miss_password/update_password',
           })
      //   }else {
      //     wx.showToast({title:"验证码错误", icon:"none"})
      //  }
     // })

    }
  }
})