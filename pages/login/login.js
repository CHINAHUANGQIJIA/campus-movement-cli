// pages/login/login.js
//获取应用实例
const app = getApp()
const api = require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    send: false, //正在获取验证码状态
    alreadySend: true, //还未获取验证码状态
    rephone: "",
    rename: "",
    repassword: "",
    repasswords: "",
    countDown: 60,
    username: "",
    password: "",
    phoneTab: false,
    phoneNumber:18851699003,
    register:false
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


  bindInputData:function(e) {
    this.setData({
      rephone:e.detail.val,
    })
    console.log(e.detail.val+123)

  },
  bindrepassword:function(e) {
    this.setData({
      repassword:e.detail.repassword
    })
    console.log(e.detail.repassword)
  },
  bindrepasswords:function(e) {
    this.setData({
      repasswords:e.detail.repasswords
    })
    console.log(e.detail.repasswords)
  },
  bindrename:function(e) {
    this.setData({
      rename:e.detail.rename
    })
    console.log(e.detail.rename)
  },
  register:function(){
    if (this.data.rephone.length == 0 && this.data.rename == 0 && this.data.repassword == 0 && this.data.repasswords == 0) {
      wx.showToast({
        title: '请输入注册信息',
        icon:'none',
        duration: 1000
      })
    } else if (this.data.rephone.length != 11) {
      wx.showToast({
        title: '请输入11位数字账号',
        icon:'none',
        duration: 1000
      })
    } else if (this.data.rename.length == 0) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000
      })
    }else if(this.data.repassword.length != 6 && this.data.repasswords.length != 6){
      wx.showToast({
        title: '请输入六位数密码',
        icon: 'none',
        duration: 1000
      })
     } else if(this.data.repassword !=this.data.repasswords){
      wx.showToast({
        title: '两次密码输入不一至',
        icon:'none',
        duration: 1000
      })
    }else{
  api.register({
    "userAccount": this.data.rephone,
    "userName": this.data.rename,
    "userPassword": this.data.repassword
  }).then(res =>{
    if(res.code==1){
      wx.showModal({
        title: '用户注册',
        content:"注册成功，快去登录吧。",
        confirmText: "返回",
        cancelText: "登录",
        success: res=> {
          if (res.confirm) {
            wx.redirectTo({
              url: '../../pages/login/login',
             });
        }else {
          wx.redirectTo({
            url: '../../pages/login/login',
           });
        }
        }
      })
    }else{
      wx.showToast({
        title: '账号已经存在。',
        icon: 'loading',
        duration: 1500
      })
    }
  })
}
  },
  login: function () {
    var tel = this.data.tel
    var code = this.data.code
    console.log(tel,code)
    var username = this.data.username
    var password = this.data.password
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    if (!this.data.phoneTab) { //判断此时是手机号登陆还是账号密码登录
      if (username.length == 0 && password.length == 0) {
        wx.showToast({
          title: '账号密码不能为空',
          icon:'none',
          duration: 1000
        })
      } else if (username.length == 0) {
        wx.showToast({
          title: '账号不能为空',
          icon:'none',
          duration: 1000
        })
      } else if (password.length == 0) {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 1000
        })
      }else if(password.length != 6){
        wx.showToast({
          title: '请输入六位数密码',
          icon: 'none',
          duration: 1000
        })
        
      }else if(username.length != 11){
        wx.showToast({
          title: '请输入11位数字账号',
          icon: 'none',
          duration: 1000
        })
      } else {
        api.login({
          userAccount: username,
          userPassword: password
        }).then(res => {
           var code = res.code;
           console.log(res.code+"code")
            if (code === 1) {
            app.globalData.user = res.data.user,
           console.log(res.data.user)
           this.info=res.data.user
           wx.setStorage({
            key:"info",
            data:this.info,
            
          })
          wx.switchTab({
              url:'/pages/index/index'
            })
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 1000
            })
         } else {
           console.log("错误")
            wx.showToast({
              title: '账号或密码错误',
              icon: 'none',
              duration: 1000
            })
         }
        })
      }
    }
  },
  usernameInput: function (e) {
    var username = e.detail.value
    this.setData({
      username: username
    })
  },
  passwordInput: function (e) {
    var password = e.detail.value
    this.setData({
      password: password
    })
  },
  changeLogin: function () {
    var phoneTab = this.data.phoneTab
    this.setData({
      phoneTab: !phoneTab,
      register:!this.data.register
    })
  },
  missPassword: function () {
    wx.navigateTo({
      url: '/pages/login/miss_password/miss_password',
    })
  }
})