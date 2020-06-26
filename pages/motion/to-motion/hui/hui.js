const mock = require('../../../../utils/mock.js')
const app = getApp()
var btnEnable = true
Page({
  data: {
    markers: [{

      iconPath: 'https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-10/159177927294325.png',
      id: 20,
      latitude: 32.1194877,
      longitude: 118.9433364,
      width: 30,
      height: 38,
      infos:"",
      onetime:"",
      onemli:"",
      onespeed:"",
      onedaytime:""
    }],

    polyLine: []

  },
  hui:function(){
  wx.switchTab({
    url: '../../to-motion/to-motion',
  })
  },
  origin:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,//纬度 
          longitude: longitude,//经度 
          
        })
      }
    })

  },
  onLoad: function () {
     //获取当前时间戳      
     var timestamp = Date.parse(new Date());    
     timestamp = timestamp / 1000;    
     console.log("当前时间戳为：" + timestamp);     
     //获取当前时间      
     var n = timestamp * 1000;    
     var date = new Date(n);    
     //年      
     var Y = date.getFullYear();   
      //月      
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);    
      //日      
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();    
      //时      
      var h = date.getHours();    
      //分      
      var m = date.getMinutes();    
      //秒     
       //转换为时间格式字符串          
          this.setData({
            onedaytime: Y +"/"+ M +"/"+ D +"/"+ h + ":" + m
          })
    this.setData({
      onetime:app.globalData.onetime,
      onemli:app.globalData.onemil,
      onespeed:app.globalData.onespeed,
      infos:app.globalData.user
    })

    var testPoints = app.globalData.poin
    
    console.log(testPoints)

    let newPolyline = ({
      points: testPoints,
      color: '#5085E7',
      width: 8,
      dottedLine: false
    })
    this.setData({
      polyline: [newPolyline]
    })
    var that = this
    setTimeout(function() { 
      that.mapCtx.includePoints({
        padding: [50, 50, 50, 50],
        points: testPoints
      })

    },200)

  },

  onReady: function() {
    this.mapCtx = wx.createMapContext('map', this)
  },

  /**测试点坐标运动 */
  moveMarker: function () {
    console.log("进来了")
    if(! btnEnable ) {
      return
    }

    var points = this.data.polyline[0].points

    this.loopAnamation(points, 0, 20)

    btnEnable = false
  },

  /**
   *  创建循环动画
   */
  loopAnamation: function (subArray, index, markerId) {

    var that = this
    if (index >= subArray.length) {
      btnEnable = true
      return
    }
    console.log('开始移动第', index, '个点', 'markerId：', markerId, subArray)
    that.mapCtx.translateMarker({
      markerId: 20,
      autoRotate: false,
      duration:1000 / (subArray.length - 1),
      destination: {
        latitude: subArray[index].latitude,
        longitude: subArray[index].longitude,
      },
      animationEnd() {
        console.log('animation end')
        that.loopAnamation(subArray, index + 1, markerId)
      },
      fail: function (e) {
        console.log("来了老弟");
        console.log(e);
      }
    })
  },
})
