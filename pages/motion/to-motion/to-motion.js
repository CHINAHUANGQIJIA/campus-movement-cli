const app = getApp();
Page({
  data: {
    longitude: 117.05871463,
    latitude: 39.23876822,
    bg:"../../../image/4.jpg", 
    state:null,
    infos:"",
    tree:false
  },

  onReady: function () {},
  openSetting: function () {
    wx.openSetting();
  },
  onLoad: function () {
    that2 = this;
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        that2.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      },
    });
    const that = this;

    wx.getSetting({
      success(res) {
        console.log(res);
        console.log(res.authSetting["scope.userLocation"]);

        if (res.authSetting["scope.userLocation"] === "") {
          wx.authorize({
            scope: "scope.userLocation",
            success() {
              //调用地图的查询位置功能
              //doSomeThing()
            },
          });
        } else if (res.authSetting["scope.userLocation"] === false) {
          wx.showModal({
            title: "提示",
            content:
              "需要允许使用地理位置权限，请点击“确定”去授权后再使用位置。",
            success(res) {
              if (res.confirm) {
                console.log("用户点击确定");
                wx.getLocation({
                  type: "gcj02",
                  success: (res) => {
                    console.log("获取地址");
                    this.setData({
                      latitude: res.latitude,
                      longitude: res.longitude,
                    });
                    console.log(this.data.latitude);
                  },
                });
                wx.openSetting({
                  success(res) {
                    console.log(res.authSetting);
                  },
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
        } else {
          //调用地图的查询位置功能
          //doSomeThing()
        }
      },
    });
  },
  onShow: function (e) {
    this.setData({
      infos:app.globalData.user
    })
    console.log(this.data.infos)
   if(this.data.infos ==undefined){
     this.setData({
       tree:true
     })
   }
    const that = this;

    wx.getSetting({
      success(res) {
        console.log(res);
        console.log(res.authSetting["scope.userLocation"]);

        if (res.authSetting["scope.userLocation"] === "") {
          wx.authorize({
            scope: "scope.userLocation",
            success() {
              //调用地图的查询位置功能
              //doSomeThing()
            },
          });
        } else if (res.authSetting["scope.userLocation"] === false) {
          wx.showModal({
            title: "提示",
            content:
              "需要允许使用地理位置权限，请点击“确定”去授权后再使用位置。",
            success(res) {
              if (res.confirm) {
                console.log("用户点击确定");
                wx.getLocation({
                  type: "gcj02",
                  success: (res) => {
                    console.log("获取地址");
                    this.setData({
                      latitude: res.latitude,
                      longitude: res.longitude,
                    });
                    console.log(this.data.latitude);
                  },
                });
                wx.openSetting({
                  success(res) {
                    console.log(res.authSetting);
                  },
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
        } else {
          wx.getLocation({
            type: "gcj02",
            success: (res) => {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
              });
            },
          });
          wx.startLocationUpdateBackground({
            success(res) {
              console.log("开启后台定位成功", res);
            },
            fail(res) {
              console.log("开启后台定位失败", res);
            },
          });
        }
      },
    });
  },
  tt:function(){
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
               url: '/pages/motion/to-motion/to-motion',
             })
             return
            } else if (res.cancel) {
              console.log("您点击了取消按钮")
              wx.switchTab({
                url: '/pages/index/index',
              })
              return
            }
            return
          }
          
        })
        wx.hideLoading();
      }

  },
  startRun: function (e) {


    // 获取用户地址授权状态
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userLocation"]) {
          wx.redirectTo({
            url: "./run/run",
          });
        } else {
          wx.showModal({
            title: "位置授权",
            content: "请授权位置服务，否则部分功能可能无法使用",
            confirmText: "前往授权",
            cancelText: "取消",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                console.log("用户点击主操作");
                wx.openSetting();
              } else {
                console.log("用户点击辅助操作");
              }
            },
          });
        }
      },
    });
  },

  creatGroup: function () {
    if (app.data.userInfo == null) {
      wx.showModal({
        title: "您还未登录",
        content: "请登录后在进行该操作",
        confirmText: "确定",
        success: function (res) {
          wx.switchTab({
            url: "./my/myCenter",
          });
        },
      });
      return;
    }
    wx.redirectTo({
      url: "./group/creatGroup?type=grun",
    });
  },
  record:function(){
    wx.navigateTo({
      url: '../to-motion/record/record',
    })
  }
});

