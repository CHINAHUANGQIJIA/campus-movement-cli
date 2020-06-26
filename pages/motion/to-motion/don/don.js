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
      donuser:'',
      infos:""

    }],

    polyLine: []

  },
  onLoad: function () {
    var testPoints = app.globalData.donmapurl
  this.setData({
    donuser:app.globalData.donuser,
    infos:app.globalData.user,
    longitude:testPoints[0].longitude,
    latitude:testPoints[0].latitude
  })
    
    
    console.log(testPoints[0].longitude)

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
