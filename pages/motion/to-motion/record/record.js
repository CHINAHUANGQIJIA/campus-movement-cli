// pages/motion/to-motion/record/record.js
const app = getApp();
const api = require("../../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  pion:[],
  record:"",
  infos:""
  },
don:function(e){
 var id= e.currentTarget.dataset.id
  var url=this.data.record[id].sportUrl
  app.globalData.donuser=this.data.record[id]
  console.log(url)
  var newurl=JSON.parse(url)
  app.globalData.donmapurl=newurl
  console.log(app.globalData.donmapurl)
  console.log(newurl)
wx.navigateTo({
  url: '../../to-motion/don/don',
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  api.motionRecord({
  userId:app.globalData.user.id
  }) .then(res => {
  if(res.code==1){
    console.log(res.data)
    this.setData({
      record:res.data,

    })
  }
  })
  this.data.pion=app.globalData.poin
  console.log(this.data.pion+123)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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
  yundon:function(){
    wx.switchTab({
      url: '../../../motion/to-motion/to-motion',
    })
  }
})