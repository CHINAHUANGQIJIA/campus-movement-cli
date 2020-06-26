//index.js
//获取应用实例
const app = getApp()
const api = require("../../utils/request")

Page({
  data: {
    item: 0,
    tab: 0,
    winWidth: 0,
    winHeight: 0,
    scrollleft: 0,
    currentTab: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    weather: "",
    life: "",
    san: "",
    Icon: 'https://cdn.heweather.com/cond_icon/999.png',
    sanIcon: 'https://cdn.heweather.com/cond_icon/999.png',
    sanIcon1: 'https://cdn.heweather.com/cond_icon/999.png',
    sanIcon2: 'https://cdn.heweather.com/cond_icon/999.png',
    people: [],
    infos: "",
    indexs: [],
    isColect: 0,
    num: 800,
    exercise: [],
    news: [],
    circular: true,
    imgUrls: [{
        url: 'https://images.unsplash.com/photo-1565676408893-b47074f26eb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        title: "永无止境1"
      },
      {
        url: 'https://images.unsplash.com/photo-1565676408893-b47074f26eb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        title: "永无止境2"
      },
      {
        url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        title: "永无止境3"
      },
      {
        url: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        title: "永无止境4"
      },
      {
        url: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        title: "永无止境5"
      }
    ],
    // 本地缓存中获取数据
    getSearch: []

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

  changeItem: function (e) {
    // console.log(e);
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function (e) {
    // console.log(e);
    this.setData({
      tab: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */






  swiperchange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      'currentTab': e.detail.current
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
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
  },
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },

  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  },
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var _index = e.currentTarget.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(this.data._index)
    videoContextPrev.stop();
    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index)
      videoContext.play();
    }, 500)
  },
  onCollect: function (e) {
    var Index = e.currentTarget.dataset.index;
    var indexs = this.data.indexs;
    for (let i in indexs) {
      //遍历列表数据      
      if (i == Index) {
        //根据下标找到目标,改变状态  
        if (indexs[i].status == 0) {
          indexs[i].status = parseInt(indexs[i].status) + 1
        }
      }
    }

    this.setData({
      isColect: indexs,
    })
  },
  unCollect: function (e) {
    this.setData({
      isColect: false

    })
  },
  onShow: function () {
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      infos: app.globalData.user,
      getSearch: getSearch
    })
  },
  bindChange: function (e) {

    
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  qidai:function(){
    wx.showModal({
      title: '敬请期待',
      content:"我们正在快马加鞭的开发中，此功能敬请期待哦！",
      confirmText: "确定",
      cancelText: "取消",
      success: res=> {
        if (res.confirm) {
          this.setData({
            istrue: false
          })
      }else {
        this.setData({
          istrue: false
        })
      }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
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

    wx.request({
      url: 'http://47.98.243.51:8080/sysUser/stepRanking',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        that.setData({
          people: res.data.data,
        })
        var people = that.data.people
        people.forEach(item => {
          item.zan = false
        })
        that.setData({
          people: people
        })

      }
    })
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
        //  console.log(res.data.data)
        //  console.log(999)

      }
    })
    wx.request({
      url: 'http://api.tianapi.com/tiyu/index?key=a2fba4cc608bcd3beb08629562bc9e15&num=20',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        that.setData({
          news: res.data.newslist,
        })
        // console.log(that.data.news)

      }
    })
  },
  //点赞
  zan: function (e) {
    wx.vibrateShort()

    var id = e.currentTarget.dataset.id
    console.log(id)
    var people = 'people[' + id + ']' + '.zan'
    if (this.data.people[id].zan == false) {
      this.setData({
        [people]: true,
      })
    } else {
      this.setData({
        [people]: false
      })
    }

  },
  yemian: function (e) {
    var that = this
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
        console.log("当前页面高度:" + calc)
      }
    })
  },
  //今日看点跳转
  unjump: function (e) {
    // console.log("歌曲是"+JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: '/pages/news/news?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  //视频详情跳转
  // onvideoz: function (e) {
  //   console.log(e.currentTarget.id)
  //   wx.navigateTo({
  //     url: '/pages/motion/course/video/video?item=' + JSON.stringify(e.currentTarget.dataset.item.child[0])
  //   })
  //   console.log("准备传值")
  //   console.log(e.currentTarget.dataset.item.child[0])
  // },
  // //视频详情跳转
  // onvideo: function (e) {

  //   console.log("类型" + JSON.stringify(e.currentTarget.dataset.item))
  //   wx.navigateTo({
  //     url: '/pages/motion/course/video/video?item=' + JSON.stringify(e.currentTarget.dataset.item.child[0])
  //   })

  // },
  //视频详情跳转
  onvideoz: function (e) {
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
  //index跳转
  onjump: function (e) {
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.item + '/' + e.currentTarget.dataset.item
    })
  },
  onjumps: function (e) {
    wx.navigateTo({
      url: '../../pages/statistics/statistics'
    })
  },
  //motion跳转
  onjumpmotion: function (e) {
    wx.switchTab({
      url: '/pages/motion/' + e.currentTarget.dataset.item + '/' + e.currentTarget.dataset.item
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      getSearch: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
  },
  // 点击标签页面滑动到该对应标签
  switch: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)

    wx.pageScrollTo({
      duration: 300,
      selector: e.currentTarget.dataset.id,
      success: function (e) {
        console.log("成功" + e)
      },
      file: function (e) {
        console.log("失败" + e)
      }
    })
  },
  swichNav: function (e) {

    var that = this;
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.pageScrollTo({
      duration: 300,
      selector: e.currentTarget.dataset.id,
      success: function (e) {
        console.log("成功" + e)
      },
      file: function (e) {
        console.log("失败" + e)
      }
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //页面跳转
  bindEnter: function (e) {
    wx.navigateTo({
      url: '/pages/index/' + e.currentTarget.dataset.item + '/' + e.currentTarget.dataset.item
    })
  },


})