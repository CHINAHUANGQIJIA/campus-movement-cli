// pages/personal/basic/basic.js
const app = getApp()
const api = require("../../../utils/request")

var uploadImage = require('../../../utils/im/uploadFile');//地址换成你自己存放文件的位置
var util = require('../../../utils/im/utils');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    infos:'',
    assets: [],
    assetIndex: 0,
    isCostText: '支出',
    date: '',
    amount: null,
    descripition: '',
    avatar: "",
    gender: "",
    nickname: "",
    sexname:"",
    inputinfosex:null,
    pkUserAccountId: null,
    address:"",
    inputinfo:"",
    inputinfoqian:"",
    newadd:"",
    // 用来放弹窗内容的，里面的格式应该为[{label: 'sadsa', value: 'dsadsad'}]
    dialogContent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  clearcon:function(){
    console.log("庆祝")
    this.setData({
      inputinfo:""
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     // 获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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



   // 点击了提交记录按钮
   submitDataname(e) {
    // 不定时也行的
    setTimeout(() => {
      // 打开弹窗
      this.dialog.showname()
    }, 100)
  },
  // 点击了弹出框的取消
  handleCancelDialog() {
    this.dialog.hidename()
  },
  handleConfirmDialogname(e) {
    console.log("拿姓名")
    console.log(e.detail.val)

    this.setData({
      inputinfoname: e.detail.val
    })
    this.dialog.hidename()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500
    })
  api.updateInfo({
    userName: this.data.inputinfoname,
    userAccount:app.globalData.user.userAccount,
  }).then(res => {
     var code = res.code;
     console.log("用户id"+app.globalData.user.id)
      if (code === 1) {
    api.refreshInformation({
      id:app.globalData.user.id
    }) .then(res => {
      if (code === 1) {
        console.log("昵称修改成功")
      app.globalData.user = res.data
      console.log(app.globalData.user)
      this.setData({
        infos:app.globalData.user
        
        })
    }
    })
  
    // 这里一般都是与后台交互过程
    // 关闭loading
    wx.hideLoading()
  }})
},

 // 点击了提交记录按钮
 submitDataqian(e) {
  // 不定时也行的
  setTimeout(() => {
    // 打开弹窗
    this.dialog.show()
  }, 100)
},
handleConfirmDialog(e) {
  console.log("拿签名")
  this.setData({
    inputinfoqian: e.detail.val
  })
  this.dialog.hide()
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 1500
  })
api.updateInfo({
  signature: this.data.inputinfoqian,
  userAccount:app.globalData.user.userAccount,
}).then(res => {
   var code = res.code;
    if (code === 1) {
  api.refreshInformation({
    id:app.globalData.user.id
  }) .then(res => {
    if (code === 1) {
      console.log("昵称修改成功")
    app.globalData.user = res.data
    console.log(app.globalData.user)
    this.setData({
      infos:app.globalData.user
      
      })
  }
  })
console.log("123")
  // 这里一般都是与后台交互过程
  // 关闭loading
  wx.hideLoading()
}})
},
// 点击了提交记录按钮
submitDatasex(e) {
  // 不定时也行的
  setTimeout(() => {
    // 打开弹窗
    this.dialog.showsex()
  }, 100)
},
// 点击了弹出框的取消
handleCancelDialog() {
  this.dialog.hidesex()
},
handleConfirmDialogsex(e) {
  console.log("拿性别")
  this.setData({
    inputinfosex: e.detail.val
  })
 if(this.data.inputinfosex==1){
   this.setData({
     sexname:"男"
   })
 }else{
  this.setData({
    sexname:"女"
  })
 }
  this.dialog.hidesex()
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 1500
  })
api.updateInfo({
  gender: this.data.sexname,
  userAccount:app.globalData.user.userAccount,
}).then(res => {
   var code = res.code;
    if (code === 1) {
  api.refreshInformation({
    id:app.globalData.user.id
   
  }) .then(res => {
    if (code === 1) {
      console.log("性别修改成功")
    app.globalData.user = res.data
    console.log(app.globalData.user)
    this.setData({
      infos:app.globalData.user
      
      })
  }
  })

  // 这里一般都是与后台交互过程
  // 关闭loading
  wx.hideLoading()
}})
},
// 点击了提交记录按钮
submitDataadd(e) {
  // 不定时也行的
  setTimeout(() => {
    // 打开弹窗
    this.dialog.showadd()
  }, 100)
},

// 该地址点击了弹出框的取消
handleCancelDialog() {
  this.dialog.hide()
  this.dialog.hidesex()
  this.dialog.hideadd()
  this.dialog.hidename()
},
handleConfirmDialogadd(e) {
  console.log("拿地址")
  this.setData({
    newadd: e.detail.val
  })
  this.dialog.hideadd()
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 1500
  })
api.updateInfo({
  userAccount:app.globalData.user.userAccount,
  address:this.data.newadd
}).then(res => {
   var code = res.code;
    if (code === 1) {
  api.refreshInformation({
    id:app.globalData.user.id
   
  }) .then(res => {
    if (code === 1) {
      console.log("地址修改成功")
    app.globalData.user = res.data
    console.log(app.globalData.user)
    this.setData({
      infos:app.globalData.user
      
      })
  }
  })

  // 这里一般都是与后台交互过程
  // 关闭loading
  wx.hideLoading()
}})
},
   // 点击换手机相册或者电脑本地图片    
   headimage: function() {   
     let that =this
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         var tempFilePaths = res.tempFilePaths;
         var nowTime = util.formatTime(new Date());

         //支持多图上传
         for (var i = 0; i < res.tempFilePaths.length; i++) {
            //显示消息提示框
            wx.showLoading({
               title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
               mask: true
            })

            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
            uploadImage(res.tempFilePaths[i], 'images/' + nowTime + '/',
               function (result) {
                  console.log("======上传成功图片地址为：", result);
                  //做你具体的业务逻辑操作
                  wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1500
                  })
                  api.updateInfo({
                    avatar: result,
                    userAccount:app.globalData.user.userAccount,
                  }).then(res => {
                   
                     var code = res.code;
                      if (code === 1) {
                        console.log("修改成功")
                    api.refreshInformation({
                      id:app.globalData.user.id
                     
                    }) .then(res => {
                      if (code === 1) {
                        console.log("hfsuid")
                      app.globalData.user = res.data
                      console.log(app.globalData.user)
                      that.setData({
                        infos:app.globalData.user
                        
                        })
                        wx.hideLoading();
                    }
                    })
                  }})
               }, function (result) {
                  console.log("======上传失败======", result);
                  //做你具体的业务逻辑操作

                  wx.hideLoading()
                }
                )
             }
          }
       })
    }

})