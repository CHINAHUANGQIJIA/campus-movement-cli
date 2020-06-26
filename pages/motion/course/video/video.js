// pages/motion/course/video/video.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    videoSrc:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',   // 视频
    videoCoverImg:'http://img5.imgtn.bdimg.com/it/u=1672477765,2527992874&fm=26&gp=0.jpg',   // 视频封面图
    videoPlayIcon:'http://39.105.134.221:8080/test/source1.png',  // 视频播放icon
    videoLockIcon:'http://39.105.134.221:8080/test/source2.png',   // 视频播放锁

  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 点击封面自定义播放按钮时触发
  bindplay() {
    this.setData({
      isShow:false
    })
    this.videoContext.play();
    console.log('play')
  },
  // 监听播放到末尾时触发
  bindended(){
    console.log('bindended')
    this.setData({
      isShow: true
    })
    this.videoContext.ended();
  },
  // 监听暂停播放时触发
  bindpause(){
    console.log('pause')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("传过来的值")
   console.log(options.item)
    let query = JSON.parse(options.item)
    console.log(query+"33")
    this.setData({
      item: query,
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

  }
})