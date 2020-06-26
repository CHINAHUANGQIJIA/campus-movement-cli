
const app = getApp()
const api = require("../../../utils/request")

var uploadImage = require('../../../utils/im/uploadFile');//地址换成你自己存放文件的位置
var util = require('../../../utils/im/utils');

Page({
  data: {
    content: '',
    contenttwo:'',
    contentLength: 0,
    contact: '',
    title: '',
    picUrl: '',
    files: [],
    hasPicture: false,
    infos:"",
    url:""
  },

  upload: function (res) {
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
            that.setData({
              files: res.tempFilePaths
            });
            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
            uploadImage(res.tempFilePaths[i], 'images/' + nowTime + '/',
               function (result) {
                  console.log("======上传成功图片地址为：", result);
                 
                  that.setData({
                    url:result
                    
                  })        
                  console.log(that.data.contenttwo+"复合")         
                  wx.hideLoading();
                })
              }
      },
      fail: function (e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },


  //输入内容函数
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },

  contactInput: function (e) {
    this.setData({
      contact: e.detail.value
    });
  },

  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  contentInput: function (e) {
    this.setData({
     
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
  },

  clearTitle: function (e) {
    this.setData({
      title: ''
    });
  },

  clearContact: function (e) {
    this.setData({
      contact: ''
    });
  },
  clearcontent: function (e) {
    this.setData({
      content: ''
    });
  },
  imagede:function(){
  this.setData({
    files: []
  })
  },

  submitFeedback: function (e) {
    let that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(that.data.title==""){
    wx.showModal({
      title: '提示',
      content: '请输入反馈主题！！！',
      success (res) {
        if (res.confirm) {
          wx.hideLoading();
        } else if (res.cancel) {
          console.log("您点击了取消按钮")
          wx.hideLoading();}
      }
    })
  }if(that.data.contenttwo=="" && that.data.content==""){
    wx.showModal({
      title: '提示',
      content: '请输入反馈内容！！！',
      success (res) {
        if (res.confirm) {
          wx.hideLoading();
        } else if (res.cancel) {
          console.log("您点击了取消按钮")
          wx.hideLoading();}
      }
    })
  }else if(!that.data.contact ==""){
    console.log("手机号不为空")
    if(that.data.contact.length < 11 || that.data.contact.length >11){
      wx.showModal({
        title: '提示',
        content: '输入的手机号不符合规范,请重新填写',
        success (res) {
        that.setData({
          contact:""
        })
          if (res.confirm) {
            wx.hideLoading();
          } else if (res.cancel) {
            console.log("您点击了取消按钮")
            wx.hideLoading();}
        }
      })
    }else if(!myreg.test(that.data.contact)){
      wx.showModal({
        title: '提示',
        content: '输入的手机号不符合规范,请重新填写',
        success (res) {
        that.setData({
          contact:""
        })
          if (res.confirm) {
            wx.hideLoading();
          } else if (res.cancel) {
            console.log("您点击了取消按钮")
            wx.hideLoading();}
        }
      })
    } else{

      api.insertFeedback({
        "userId": app.globalData.user.id,
        "title": that.data.title,   //标题
        "mobile": that.data.contact,  //手机号
        "content": that.data.content,  //内容
        "picture": this.data.url   //图片
  
      }).then(res => {
        var code = res.code;
        
        if (code === 1) {
          console.log("意见反馈提交走接口成功")
          wx.showToast({
            title: '反馈成功',
            icon: 'loading',
            duration: 1500
          })
         wx.switchTab({
           url: '/pages/personal/personal',
         })
         
        }
        
      });
    }
  }else{
   
      api.insertFeedback({
          "userId": app.globalData.user.id,
          "title": that.data.title,   //标题
          "mobile": that.data.contact,  //手机号
          "content": that.data.content,  //内容
          "picture": this.data.url   //图片
      }).then(res => {
        var code = res.code;
        
        if (code === 1) {
          console.log("意见反馈提交走接口成功")
          console.log("意见反馈提交走接口成功")
          wx.showToast({
            title: '反馈成功',
            icon: 'loading',
            duration: 1500
          })
         wx.switchTab({
           url: '/pages/personal/personal',
         })
         
        }
        
      });
  }
 
  
   
     
      
   
  
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
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
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})