// page/run/run.js
const app = getApp();
const api = require("../../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 117.0587146300,
    latitude: 39.2387682200, 
    loadingMap:false,
    pause:"",  //跑步暂停
    number:3,
    poin:[],
    showDialog: false,
    fen:false,
    bushu:'',
    polyline: [{
      points: [
        
      ],
      color: "#18bc93",
      width: 8,
    }],
    mileage:0.00, //已跑里程
    showMileage:"0.00",
    twomileage:0,//两点距离
    speed:"0",  //速度
    showGrade:"0",  //分数
    showUseTime:"00:00:00", //所用时间
    nowType:true,  // 状态是否显示i，修复结束按钮挡住弹出框问题
  },

  /**
   * 生命周期函数--监听页面加载
   */  goback(){
    wx.switchTab({
      url: '../to-motion',
    })
  },
  
   
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    });
    console.log("进入跑步地图" , options)
    if(options.groupId){
      this.groupId = options.groupId;
      this.type = options.type;
    }
    this.time = {
      hours:0,
      minutes:0,
      second:0,
    }
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 计秒
    let numberFlag = setInterval(res => {
      this.data.number -= 1;

      if (this.data.number == 0) {
        this.setData({
          loadingMap: true
        })
        clearInterval(numberFlag);
        this.startRun();
      } else {
        this.setData({
          number: this.data.number
        })
      }
    }, 1000);

  },
  // 开始运动
  startRun:function(){
    // 位置距离计数器
    this.data.pruse = setInterval(res=>{
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          this.data.polyline[0].points.push({
            longitude: res.longitude,
            latitude: res.latitude
          })
          this.data.poin.push({
            longitude: res.longitude,
            latitude: res.latitude
          })
         
          let array = this.data.polyline[0].points;
          let mileage = 0;
          if(array.length>=2){
            mileage = getDistance(array[array.length - 2].latitude, array[array.length - 2].longitude, res.latitude, res.longitude)
          }
          this.setData({
            twomileage:mileage,
          })
          this.data.mileage = parseFloat(this.data.mileage) + parseFloat(mileage);
          console.log("总里程：", this.data.mileage, "两点距离：", mileage);
          if(mileage==0 && this.data.showUseTime !='00:00:05'){
            console.log("运动暂停")
            this.stopRun()
            }
          this.setData({
            polyline: this.data.polyline,
            showMileage: (this.data.mileage/1000).toFixed(2)
          })
          
        }
      })
    },5000);
    
    // 时间计数器
    this.timeOut = setInterval(res =>{
      this.time.second++;
      if (this.time.second >= 60) {
        this.time.second -= 60
        this.time.minutes += 1;
        if (this.time.minutes >= 60) {
          this.time.minutes -= 60
          this.time.hours += 1;
        }
      }
      // 显示时间
      
      if (this.time.hours<10){
        this.data.showUseTime = "0" + this.time.hours+":";
      }else{
        this.data.showUseTime = this.time.hours+":";
      }
      if (this.time.minutes < 10) {
        this.data.showUseTime += "0" + this.time.minutes + ":";
      } else {
        this.data.showUseTime += this.time.minutes + ":";
      }
      if (this.time.second < 10) {
        this.data.showUseTime += "0" + this.time.second ;
      } else {
        this.data.showUseTime += this.time.second;
      }
      let allSecond = this.time.hours * 3600 + this.time.minutes * 60 + this.time.second;
      let speed = this.data.mileage / allSecond
      // 放置数据
      this.setData({
        showUseTime: this.data.showUseTime,
        speed:speed.toFixed(2),
        showGrade: parseInt(this.data.showMileage/2)
      })
     console.log(this.data.showUseTime)
     console.log(this.data.speed)
     console.log(this.data.showGrade)
    },1000);
  },
  suspendRun:function(){

   
    // 暂停计数器
    clearInterval(this.data.pruse);
    clearInterval(this.timeOut);
    // 弹出结束提醒  
    wx.showModal({
      title: '运动暂停',
      content:"运动暂停中",
      confirmText: "结束运动",
      cancelText: "返回运动",
      success: res=> {
        if (res.confirm) {
          this.setData({
            istrue: false
          })
          if(this.data.mileage < 0.05){  
            wx.showModal({
              title: '无法保存运动数据',
              content:"运动距离较短无法保存。",
              confirmText: "结束运动",
              cancelText: "继续运动",
              success: res=> {
                if (res.confirm) {
                  this.setData({
                    istrue: false
                  })
                  wx.switchTab({
                    url:"../to-motion"
                  })
              }else {
                this.startRun();
              }
              }
            })
          }else{
      //先存数据在到回放页面
      var bushu=(this.data.showMileage)*500
      let poin=this.data.poin
      console.log(poin)
      var joins = JSON.stringify(poin)
          console.log(joins)  
      console.log(bushu+'步数')
      console.log(this.data.showUseTime+'时间')
      console.log(this.data.showMileage+"距离")
      console.log(this.data.speed+"速度")
      app.globalData.onetime=this.data.showUseTime
      app.globalData.onemil=this.data.showMileage
      app.globalData.onespeed=this.data.speed
      api.motionData({
        "userId": app.globalData.user.id,
        "stepNumber": bushu,
        "sportTime": this.data.showUseTime,
        "sportDistance":this.data.showMileage,
        "sportAverageSpeed": this.data.speed,
        "sportUrl": joins,
        "sportPattern": "自由模式"
      }) .then( res => {
        console.log(res)
        console.log("宿舍舍存")
        if(res.code == 1){
          console.log("数据已走接口储存")
          app.globalData.poin=this.data.poin
          console.log(app.globalData.poin)
          wx.redirectTo({
           url: '../hui/hui',
          });
        }

      })
    
    }
        } else {
          this.startRun();
        }
      }
    });
  },
  fanhuihui:function(){
    this.setData({
      fen:false
    })
  },
  //自动暂停跑步
  automaticstopRun:function(){
    // 暂停计数器
    clearInterval(this.timeOut);
   
    // 弹出结束提醒
    wx.showModal({
      title: '运动暂停',
      content:"您的距离无变化，请在运动中开启",
      confirmText: "结束运动",
      cancelText: "返回运动",
      
      success: res=> {
        if (res.confirm ) {
          this.setData({
            istrue: false
          })
          if(this.data.mileage < 0.05){  
            wx.showModal({
              title: '无法保存运动数据',
              content:"运动距离较短无法保存。",
              confirmText: "结束运动",
              cancelText: "继续运动",
              success: res=> {
                if (res.confirm) {
                  this.setData({
                    istrue: false
                  })
                  wx.switchTab({
                    url:"../to-motion"
                  })
              }else {
                this.startRun();
              }
              }
            })
          }else{
         //先存数据在到回放页面
         var bushu=(this.data.showMileage)*500
         let poin=this.data.poin
         console.log(poin)
         var joins = JSON.stringify(poin)
             console.log(joins)  
         console.log(bushu+'步数')
         console.log(this.data.showUseTime+'时间')
         console.log(this.data.showMileage+"距离")
         console.log(this.data.speed+"速度")
         app.globalData.onetime=this.data.showUseTime
         app.globalData.onemil=this.data.showMileage
         app.globalData.onespeed=this.data.speed
         api.motionData({
           "userId": app.globalData.user.id,
           "stepNumber": bushu,
           "sportTime": this.data.showUseTime,
           "sportDistance":this.data.showMileage,
           "sportAverageSpeed": this.data.speed,
           "sportUrl": joins,
           "sportPattern": "自由模式"
         }) .then( res => {
           console.log(res)
           console.log("宿舍舍存")
           if(res.code == 1){
             console.log("数据已走接口储存")
             app.globalData.poin=this.data.poin
             console.log(app.globalData.poin)
             wx.redirectTo({
              url: '../hui/hui',
             });
           }

         })
       
       }
        } else if(res.content){
          this.startRun();
        }
      }
    });
    if(this.data.twomileage>0){
      this.setData({
        istrue: false
      })
       this.startRun();
    }
  },
  fen:function(){
    this.setData({
      fen:true
    })
  },
  //暂停跑步
  stopRun:function(){
    // 暂停计数器
    clearInterval(this.data.pruse);
    clearInterval(this.timeOut);
    // 弹出结束提醒
    wx.showModal({
      title: '运动暂停',
      content:"您的距离无变化，请在运动中开启",
      confirmText: "结束运动",
      cancelText: "返回运动",
      success: res=> {
        if (res.confirm) {
          console.log("这里")
          
          this.setData({
            istrue: false
          })
       
          if(this.data.mileage < 0.05){  
            wx.showModal({
              title: '无法保存运动数据',
              content:"运动距离较短无法保存。",
              confirmText: "结束运动",
              cancelText: "继续运动",
              success: res=> {
                if (res.confirm) {
                  this.setData({
                    istrue: false
                  })
                  wx.switchTab({
                    url:"../to-motion"
                  })
              }else {
                this.startRun();
              }
              }
            })
          }else{
           //先存数据在到回放页面
           var bushu=(this.data.showMileage)*500
           let poin=this.data.poin
           console.log(poin)
           var joins = JSON.stringify(poin)
               console.log(joins)  
           console.log(bushu+'步数')
           console.log(this.data.showUseTime+'时间')
           console.log(this.data.showMileage+"距离")
           console.log(this.data.speed+"速度")
           app.globalData.onetime=this.data.showUseTime
           app.globalData.onemil=this.data.showMileage
           app.globalData.onespeed=this.data.speed
           api.motionData({
             "userId": app.globalData.user.id,
             "stepNumber": bushu,
             "sportTime": this.data.showUseTime,
             "sportDistance":this.data.showMileage,
             "sportAverageSpeed": this.data.speed,
             "sportUrl": joins,
             "sportPattern": "自由模式"
           }) .then( res => {
             console.log(res)
             console.log("宿舍舍存")
             if(res.code == 1){
               console.log("数据已走接口储存")
               app.globalData.poin=this.data.poin
               console.log(app.globalData.poin)
               wx.redirectTo({
                url: '../hui/hui',
               });
             }
 
           })
         
         }
        } else {
       
          this.startRun();
        }
      }
    });
  },
  // 是否结束
  pauseRun:function(){

    // 暂停计数器
    clearInterval(this.data.pruse);
    clearInterval(this.timeOut);

    // 弹出结束提醒
    wx.showModal({
      title: '结束运动',
      content:"您是否要结束当前运动",
      confirmText: "结束",
      cancelText: "取消",
      success: res=> {
        if (res.confirm) {
          this.setData({
            istrue: false
          })
          if(this.data.mileage < 0.05){  
          wx.showModal({
            title: '无法保存运动数据',
            content:"运动距离较短无法保存。",
            confirmText: "结束运动",
            cancelText: "继续运动",
            success: res=> {
              if (res.confirm) {
                this.setData({
                  istrue: false
                })
                wx.switchTab({
                  url:"../to-motion"
                })
            }else {
              this.startRun();
            }
            }
          })
        }else{
          //先存数据在到回放页面
          var bushu=(this.data.showMileage)*500
          let poin=this.data.poin
          console.log(poin)
          var joins = JSON.stringify(poin)
              console.log(joins)  
          console.log(bushu+'步数')
          console.log(this.data.showUseTime+'时间')
          console.log(this.data.showMileage+"距离")
          console.log(this.data.speed+"速度")
          app.globalData.onetime=this.data.showUseTime
          app.globalData.onemil=this.data.showMileage
          app.globalData.onespeed=this.data.speed
          api.motionData({
            "userId": app.globalData.user.id,
            "stepNumber": bushu,
            "sportTime": this.data.showUseTime,
            "sportDistance":this.data.showMileage,
            "sportAverageSpeed": this.data.speed,
            "sportUrl": joins,
            "sportPattern": "自由模式"
          }) .then( res => {
            console.log(res)
            console.log("宿舍舍存")
            if(res.code == 1){
              console.log("数据已走接口储存")
              app.globalData.poin=this.data.poin
              console.log(app.globalData.poin)
              wx.redirectTo({
               url: '../hui/hui',
              });
            }

          })
        
        }
        } else {
          this.startRun();
        }
      }
    });
  },


  // 结束
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },

  closeDialog:function(){
    this.setData({
      istrue: false
    })
    if (this.groupId) {
      wx.redirectTo({
        
        url: '../groupRes/groupRes?groupId=' + this.groupId + "&type=" + this.type,
      })
    } else {
      wx.switchTab({
        url: '../my/myCenter',
      })
    }
  }
})

// 计算距离
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s * 1000;
}