// pages/index/search/search.js
var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    // 本地缓存中获取数据
    search: [],
    nums: '',
    searchbooks: []
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
    var search = wx.getStorageSync('searchDatas');
    this.setData({
      search: search,
      inputValue: '',
    })
    wx.setStorageSync('searchDatas', wx.getStorageSync('searchDatas'))
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

  // 监听搜索框
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },
  //  清除
  clearInput: function () {
    this.setData({
      inputValue: ''
    })
  },
  // 搜索，把历史记录藏在本地
  setSearchStorage: function () {
    if (this.data.inputValue != '') {
      //调用API从本地缓存中获取数据
      var searchDatas = wx.getStorageSync('searchDatas') || []
      searchDatas.unshift(this.data.inputValue)
      var searchDatas = Array.from(new Set(searchDatas))
      wx.setStorageSync('searchDatas', searchDatas)
      this.setData({
        search: searchDatas
      })
      // 执行查询图书接口
      var that = this
      wx.request({
        url: 'http://47.98.243.51:8080/sysCourse/blurSelect',
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        data: {
          "field": that.data.inputValue
        },
        success: function (res) {
          // 存入全局变量
          app.globalData.searchbook = res.data.data
          that.setData({
            searchbooks: app.globalData.searchbook
          })
          console.log(app.globalData.searchbook)
          // 弹框搜索不到
          if (res.data.data.length === 0) {
            wx.showToast({
              title: '没有内容',
              icon:'none',
              duration: 1000
            })
          }
        }
      })
      // 清除输入的字
      this.clearInput()
    } else {
      //没有输入搜索内容
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none',
        duration: 1000
      })
    }
  },
  // 清除浏览记录
  clearSearchStorage: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 清空getSearch
          wx.setStorageSync('searchDatas', [])
          var searchDatas = wx.getStorageSync('searchDatas')
          that.setData({
            search: searchDatas
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  dian: function (e) {
    // 执行查询图书接口
    var that = this
    // 搜索
    var id = e.currentTarget.id;
    that.setData({
      nums: that.data.search[id]
    })
    console.log(that.data.nums)
    wx.request({
      url: 'http://47.98.243.51:8080/sysCourse/blurSelect',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "field": that.data.nums
      },
      success: function (res) {
        // 存入全局变量
        app.globalData.searchbook = res.data.data
        that.setData({
          searchbooks: app.globalData.searchbook
        })
        console.log(app.globalData.searchbook)
        if (res.data.data.length === 0) {
          wx.showModal({
            title: '提示',
            content: '搜索不到',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })


  },
  // 单删一个历史记录
  shan: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var searchDatas = wx.getStorageSync('searchDatas')
          searchDatas.splice(e.currentTarget.id, 1)
          wx.setStorageSync('searchDatas', searchDatas)
          that.setData({
            search: searchDatas
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //视频详情跳转
  onvideoz: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/motion/course/video/video?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
    // //调用API从本地缓存中获取数据
    // var searchData = wx.getStorageSync('searchData') || []
    // searchData.unshift(e.currentTarget.dataset.item)
    // //去重复
    // let obj = {};
    // searchData = searchData.reduce((item, next) => {
    //   if (!obj[next.course_name]) {
    //     item.push(next);
    //     obj[next.course_name] = true;
    //   }
    //   return item;
    // }, []);
    // console.log(searchData);
    // //存入本地缓存
    // wx.setStorageSync('searchData', searchData)
  },

})