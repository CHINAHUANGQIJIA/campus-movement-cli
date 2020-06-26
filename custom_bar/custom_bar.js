var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data:  {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [
      {
        "pagePath": "/pages/motion/information/information",
        "text": "运动信息",
        "iconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291378484633.png",
        "selectedIconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291381830594.png"
      },
      {
        "pagePath": "/pages/motion/course/course",
        "text": "运动教学",
        "iconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291365812729.png",
        "selectedIconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291367929491.png"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291383824810.png",
        "selectedIconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/15929138577990.png"
      },
      {
        "pagePath": "/pages/motion/to-motion/to-motion",
        "text": "去运动",
        "iconPath": "/image/tars/icon_xiaoxi.png",
        "selectedIconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/159291335459789.png"
      },
      {
        "pagePath": "/pages/personal/personal",
        "text": "我的",
        "iconPath": "/image/tars/icon_wode.png",
        "selectedIconPath": "https://jojoho.oss-cn-beijing.aliyuncs.com/images/2020-06-23/1592913265233100.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      var data = e.currentTarget.dataset
      var url = data.path;
      console.log(url)
      if (url) {
      wx.switchTab({ url });
      } else {
      if (app.globalData.userinfo) {
        wx.navigateTo({
        url: "/pages/publish/publish",
        })
      } else {
        wx.navigateTo({
        url: '/pages/login/login',
        })
      }
      }
    }
  }
})