// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: [],
    winWidth: 0,
    winHeight: 0,
    scrollleft: 0,
    currentTab: 0,
    infos:'',
    // 本地缓存中获取数据
    getSearch: [],


  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 1) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
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
  onLoad: function (options) {
    var that = this;
    var getSearch = wx.getStorageSync('searchData');
    that.setData({
      getSearch: getSearch,
    })
    wx.setStorageSync('searchData', wx.getStorageSync('searchData'))
    console.log(that.data.getSearch)


    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    wx.request({
      url: 'http://47.98.243.51:8080/sysCourse/type',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        for (let i = 0; i < res.data.data.length; i++) {
          // console.log(i)

        }
        that.setData({
          exercise: res.data.data,

        })
        console.log(res.data.data)
        //  console.log(999)

      }
    })

  },
 
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //视频详情跳转
  onvideo: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/motion/course/video/video?item=' + JSON.stringify(e.currentTarget.dataset.item.child[index])
    })
    console.log("准备传值")
    console.log(e.currentTarget.dataset.item.child[index])
    if (e.currentTarget.dataset.item.child[index] != '') {
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      searchData.unshift(e.currentTarget.dataset.item.child[index])
      //去重复
      let obj = {};
      searchData = searchData.reduce((item, next) => {
        if (!obj[next.course_name]) {
          item.push(next);
          obj[next.course_name] = true;
        }
        return item;
      }, []);
      console.log(searchData);
      //存入本地缓存
      wx.setStorageSync('searchData', searchData)
      this.setData({
        getSearch: searchData
      })
      console.log(this.data.getSearch)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  //视频详情跳转
  //    onvideo: function(e){
  //     console.log(e.currentTarget.id)
  //    wx.navigateTo({
  //      url: '/pages/motion/course/video/video?item='+JSON.stringify(e.currentTarget.dataset.item.child[0])
  //    })
  //    console.log("准备传值")
  //     console.log(e.currentTarget.dataset.item.child[0])
  //  },
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

  }
})