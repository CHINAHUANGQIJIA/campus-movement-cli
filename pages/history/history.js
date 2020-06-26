// pages/history/history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 本地缓存中获取数据
    getSearch: [],
    exercise: [],
    infos:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    var getSearch = wx.getStorageSync('searchData');
    that.setData({
      getSearch: getSearch,
    })
    wx.setStorageSync('searchData', wx.getStorageSync('searchData'))
    console.log(that.data.getSearch)
  },
  //视频详情跳转
  onvideoz: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/motion/course/video/video?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
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

  }
})