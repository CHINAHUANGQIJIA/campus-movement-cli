// pages/personal/personal.js
const app = getApp()
const api = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    for:false,
    deblu:false,
    hasUserInfo: false,
    infos:'',
    lenlen:0,
    record:"",
    onepost:0,
    length:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user:'',
    showModal: false,   
    head: "", 
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
    "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
    "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
    "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
    "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
  },
  jilu:function(){
    wx.navigateTo({
      url: '/pages/motion/to-motion/record/record',
    })
  },
  dondon:function(){
wx.switchTab({
      url: '../../pages/motion/to-motion/to-motion',
    })
  },
  yundong:function(){
    wx.navigateTo({
      url: '/pages/motion/to-motion/record/record',
    })
  },
  shenti:function(){
    wx.navigateTo({
      url: '/pages/masss/masss',
    })
  },
  jixin:function(){
    wx.navigateTo({
      url: '/pages/mile/mile',
    })
  },
  daka:function(){
    wx.navigateTo({
      url: '/pages/personal/Calendar/Calendar',
    })
  },
  jilu:function(){
    wx.navigateTo({
      url: '/pages/motion/to-motion/record/record',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    console.log(app.globalData.user.id)
    api.motionRecord({
      userId:app.globalData.user.id
      }) .then(res => {
        console.log(res)
      if(res.code==1){
        console.log(res.data[0])
        var lenlen=res.data
        console.log(lenlen.length)
        this.setData({
          record:res.data[0],
          lenlen:lenlen.length
        })
      }
      })
    api.findone({
      userId:app.globalData.user.id
      }).then(res => {
        console.log(res)
      this.setData({
        onepost:res.data.totalSportNumber
      })
      })
      const that = this;
      
      wx.request({
        url: 'http://47.98.243.51:8080/sysDailyAttendance/getDailyArray',
        data: {
          userId:app.globalData.user.id,
          type: cur_year.toString() + cur_month.toString()
        },
        success: function (res) {
          
          console.log(res);
          var SigninDays = [];
          console.log(SigninDays)
          if(res.data.data !=null){
            var news =res.data.data.dailyArray
            console.log(news);
            var newArry=news.split(",");
            console.log(typeof news)
            console.log(newArry);
            var newNew = [];
            for(var i=0;i<newArry.length;i++){
            console.log(newArry[i])
            newNew.push(Number(newArry[i]));
            }
            console.log(newNew)
            var length=newNew.length
            console.log(length)
            that.setData({
              length:length
            })
          }
        }
      });
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
    api.motionRecord({
      userId:app.globalData.user.id
      }) .then(res => {
        console.log(res)
      if(res.code==1){
        console.log(res.data[0])
        var lenlen=res.data
        console.log(lenlen.length)
        this.setData({
          record:res.data[0],
          lenlen:lenlen.length
        })
      }
      })
    console.log("个人拿全局数据")
    console.log(app.globalData.user)
    this.setData({
    infos:app.globalData.user
    
    })
    app.globalData.user=this.data.infos
    console.logglogg
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(this.data.infos.userName)
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
  getlogin:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  end:function(){
    
      app.globalData.user=''
      
  wx.redirectTo({
    url: '/pages/login/login',
  })
  },

   // 点击换手机相册或者电脑本地图片    
   headimage: function() {   
    var _this = this;  
     wx.chooseImage({    
         count: 1, // 默认9      
          sizeType: ['original', 'compressed'],       
            // 指定是原图还是压缩图，默认两个都有      
             sourceType: ['album', 'camera'],      
            // 指定来源是相册还是相机，默认两个都有    
             success: function(res) {       
             // 返回选定照片的本地文件路径tempFilePath可以作为img标签的src属性显示图片 
             //然后请求接口把图片传给后端存到服务器即可       
               _this.setData({    
                 head: res.tempFilePaths      
                                    }) 
                          }    
             }) 
            }

})