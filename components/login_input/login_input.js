// components/login_input/login_input.js
const api = require("../../utils/request")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phoneTab:{
      type:Boolean,
    },
    image:{
      type:Boolean,
      value:true
    },
    telTab:{
      type:Boolean,
      value:true
    }
  },

  options:{
    styleIsolation: 'shared',//样式共享
    multipleSlots: true //在组件定义时的选项中启用多solt支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    // phoneTab: false,
    rename: "",
    repassword: "",
    repasswords: "",
    rephone:"",
    send: false, //正在获取验证码状态
    alreadySend: true, //还未获取验证码状态
    countDown: 60,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    phoneInput: function (e) {
      var that = this;
      that.setData({
        rephone: e.detail.value
      })
      var rephone = e.detail.value == undefined ? that.data.rephone : e.detail.value;
      var myEventDetail = {val:rephone}
      this.triggerEvent('myevent',myEventDetail,{}, {capturePhase:true})
    },
    renameInput: function (e) {
      var that = this;
      that.setData({
        rename: e.detail.value
      })
      var rename = e.detail.value == undefined ? that.data.rename : e.detail.value;
      var myEventDetail = {rename:rename}
      this.triggerEvent('myrename',myEventDetail,{}, {capturePhase:true})
    },
    repasswordInput: function (e) {
      var that = this;
      that.setData({
        repassword: e.detail.value
      })
      var repassword = e.detail.value == undefined ? that.data.repassword : e.detail.value;
      var myEventDetail = {repassword:repassword}
      this.triggerEvent('myrepassword',myEventDetail,{}, {capturePhase:true})
    },

    repasswordsInput: function (e) {
      var that = this;
      that.setData({
        repasswords: e.detail.value
      })
      var repasswords = e.detail.value == undefined ? that.data.repasswords : e.detail.value;
      var myEventDetail = {repasswords:repasswords}
      this.triggerEvent('myrepasswords',myEventDetail,{}, {capturePhase:true})
    },
  
    
  }
})
