import { forEach } from "../../../utils/underscore";

// sign-in.js
const App = getApp()
const api = require("../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    SigninDays:[],
    cur_year:0,
    infos:"",
    length:'',//天数
    cur_month:0,
    cur_day:0,
    jsonId:0,
    btnText:'今日打卡',
    bIsRelMonth:true,
    moveStartX:0,
    bIsActionOver:false,
    onepost:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const date = new Date();
    const cur_day = date.getDate();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    api.findone({
      userId:App.globalData.user.id
      }).then(res => {
        console.log(res)
      this.setData({
        onepost:res.data.totalSportNumber
      })
      })
      console.log(this.data.bIsRelMonth)
      console.log(this.data.onepost)
    wx.request({
      url: 'http://47.98.243.51:8080/sysDailyAttendance/getDailyArray',
      data: {
        userId:App.globalData.user.id,
        type: cur_year.toString() + cur_month.toString()
      },
      success: function (res) {

        console.log(res);
        var SigninDays = [];
        console.log(SigninDays)
        var jsonId = 0;
        if(res.data.data !=null){
          var news =res.data.data.dailyArray
          console.log(news);
          var newArry=news.split(",");
          console.log(typeof news)
          console.log(newArry);
          var newNew = [];
          for(var i=0;i<newArry.length;i++){
          console.log(newArry[i])
          newNew.push(Number(newArry[i]));
          }
          console.log(newNew)
          var length=newNew.length
          console.log(length)
          that.setData({
            length:length
          })
          if (res.data.code == 1) {
            SigninDays = newNew;
           
            
          }
        }
        
       
        that.setData({
          SigninDays: SigninDays,
          jsonId: jsonId
        });
        that.calculateEmptyGrids(cur_year, cur_month);
        that.calculateDays(cur_year, cur_month);
        that.setData({
          cur_day: cur_day,
          cur_year: cur_year,
          cur_month: cur_month,
          weeks_ch
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    this.setData({
      infos:App.globalData.user
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
    return {
      title: '校园运动',
      desc: '明天别忘了打卡哦!',
      path: 'pages/index/index'
    }
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    const that = this;
    const date = new Date();
    const rel_day = date.getDate();
    const rel_year = date.getFullYear();
    const rel_month = date.getMonth() + 1;
    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      let day = {};
      if (rel_year === year && rel_month === month && i === rel_day){
        day.index = '今';
      }
      else{
        day.index = i;
      }
      day.isSignin = this.contains(this.data.SigninDays,i);
      // console.log(day)
      days.push(day);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    this.handleCalendarEx(handle);
  },
  handleCalendarEx:function(handle){
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let newMonth, newYear;
    const that = this;
    if (handle === 'prev') {
      newMonth = cur_month - 1;
      newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
    } else {
      newMonth = cur_month + 1;
      newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
    }
    wx.request({
      url: 'http://47.98.243.51:8080/sysDailyAttendance/getDailyArray',
      data: {
        userId:App.globalData.user.id,
        type: newYear.toString() + newMonth.toString()
        
      },
      success: function (res) {

        console.log(res);
        var SigninDays = [];
        console.log(SigninDays)
        that.setData({
          length:SigninDays.length
        })
        var jsonId = 0;
        if(res.data.data !=null){
          var news =res.data.data.dailyArray
          console.log(news);
          var newArry=news.split(",");
          console.log(typeof news)
          console.log(newArry);
          var newNew = [];
          for(var i=0;i<newArry.length;i++){
          console.log(newArry[i])
          newNew.push(Number(newArry[i]));
          }
          console.log(newNew)
          that.setData({
            length:newNew.length
          })
          if (res.data.code == 1) {
            SigninDays = newNew;
          }
        }
        that.setData({
          SigninDays: SigninDays,
          jsonId: jsonId
        });
        that.calculateDays(newYear, newMonth);
        that.calculateEmptyGrids(newYear, newMonth);
        that.setData({
          cur_year: newYear,
          cur_month: newMonth,
        });
       console.log("到这里")
        const date = new Date();
        const rel_year = date.getFullYear();
        const rel_month = date.getMonth() + 1;
        if (rel_year !== newYear || rel_month !== newMonth) {
          that.setData({
            btnText: '回到当月',
            bIsRelMonth: false
          })
        }
        else {
          that.setData({
            btnText: '今日打卡',
            bIsRelMonth: true
          })
        }
      }
    });
  },
  contains: function (arr, obj) {  
    var i = arr.length;  
    while(i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;  
  },
  SigninToday: function(){
  
    const that = this;
    const date = new Date();
    const cur_day = date.getDate();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    var SigninDays = this.data.SigninDays;
    console.log(SigninDays)
    if (!this.data.bIsRelMonth){
      wx.request({
        url: 'http://47.98.243.51:8080/sysDailyAttendance/getDailyArray',
        data: {
          userId:App.globalData.user.id,
          type: cur_year.toString() + cur_month.toString()
        },
        success: function (res) {
  
          console.log(res);
          var SigninDays = [];
          console.log(SigninDays)
          if(res.data.data !=null){
            var news =res.data.data.dailyArray
            console.log(news);
            var newArry=news.split(",");
            console.log(typeof news)
            console.log(newArry);
            var newNew = [];
            for(var i=0;i<newArry.length;i++){
            console.log(newArry[i])
            newNew.push(Number(newArry[i]));
            }
            console.log(newNew)
            that.setData({
              length:newNew.length
            })
            if (res.data.code == 1) {
              SigninDays = newNew;
            }
          }
          
         
          that.setData({
            SigninDays: SigninDays,
          });
          that.calculateEmptyGrids(cur_year, cur_month);
          that.calculateDays(cur_year, cur_month);
          that.setData({
            cur_day: cur_day,
            cur_year: cur_year,
            cur_month: cur_month,
          });
        }
        
      });
      that.calculateEmptyGrids(cur_year, cur_month);
      that.calculateDays(cur_year, cur_month);
      that.setData({
        cur_day: cur_day,
        cur_year: cur_year,
        cur_month: cur_month,
        btnText: '今日打卡',
        bIsRelMonth: true
      });
      return
    }else{
      wx.request({
        url: 'http://47.98.243.51:8080/sysDailyAttendance/getDailyArray',
        data: {
          userId:App.globalData.user.id,
          type: cur_year.toString() + cur_month.toString()
        },
        success: function (res) {
  
          console.log(res);
          var SigninDays = [];
          console.log(SigninDays)
          if(res.data.data !=null){
            var news =res.data.data.dailyArray
            console.log(news);
            var newArry=news.split(",");
            console.log(typeof news)
            console.log(newArry);
            var newNew = [];
            for(var i=0;i<newArry.length;i++){
            console.log(newArry[i])
            newNew.push(Number(newArry[i]));
            }
            console.log(newNew)
            if (res.data.code == 1) {
              SigninDays = newNew;
            }
          }
          
         
          that.setData({
            SigninDays: SigninDays,
          });
          that.calculateEmptyGrids(cur_year, cur_month);
          that.calculateDays(cur_year, cur_month);
          that.setData({
            cur_day: cur_day,
            cur_year: cur_year,
            cur_month: cur_month,
          });
        }
        
      });
      that.calculateEmptyGrids(cur_year, cur_month);
      that.calculateDays(cur_year, cur_month);
      that.setData({
        cur_day: cur_day,
        cur_year: cur_year,
        cur_month: cur_month,
        btnText: '今日打卡',
        bIsRelMonth: true
      });
    }
    if (this.contains(SigninDays, cur_day)){
      wx.showToast({
        title: '今日已打过卡~',
        image:"../../../image/Close2.png"
      });
      return;
    }
    
    if(this.data.onepost <2000 && this.data.bIsRelMonth==true){
      wx.showModal({
        title: '每日打卡',
        content:"抱歉，当日步数达到2000才能打卡，立即运动把。",
        confirmText: "去运动",
        cancelText: "取消",
        success: res=> {
          if (res.confirm) {
            this.setData({
              istrue: false
            })
            wx.switchTab({
              url:"../../motion/to-motion/to-motion"
            })
        }
        }
      })
    }else if(this.data.bIsRelMonth==true){
    SigninDays.push(cur_day);
    console.log(SigninDays)
    that.setData({
      length:SigninDays.length
    })
    var newArrysin=SigninDays.join(",")
    console.log(newArrysin)
    console.log(cur_year.toString() + cur_month.toString(),)
    wx.request({
      url: 'http://47.98.243.51:8080/sysDailyAttendance/updateOrInsert',
      method: "POST",
      data: {
        userId: App.globalData.user.id,
        dailyArray: newArrysin,
        type: cur_year.toString() + cur_month.toString(),
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: '打卡成功',
          });
          that.setData({
            SigninDays: SigninDays,
          });
          that.calculateDays(cur_year, cur_month);
        }
        else{
          wx.showToast({
            title: '打卡失败',
          });
        }
      }
    });
  }
  },
  handletouchend:function(e){

  },
  handletouchmove:function(e){
    const moveEndX = e.touches[0].pageX;
    if (moveEndX - this.data.moveStartX < -40 && !this.data.bIsActionOver) {
      this.handleCalendarEx('next');
      this.data.bIsActionOver = true;
    } else if (moveEndX - this.data.moveStartX > 40 && !this.data.bIsActionOver) {
      this.handleCalendarEx('prev');
      this.data.bIsActionOver = true;
    }
  },
  handletouchstart: function (e) {
    this.data.moveStartX = e.touches[0].pageX;
    this.data.bIsActionOver = false;
  }
})