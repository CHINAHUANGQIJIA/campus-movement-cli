// pages/statistics/statistics.js
const app = getApp()
const api = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '2018-11-11',
        week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        lastMonth: 'lastMonth',
        nextMonth:'nextMonth',
        selectVal: '',
        btnText:"https://kkkksslls.oss-cn-beijing.aliyuncs.com/exe/shang.png" ,
        step:[],
        stepnum:[3000,5000,10000],
        stepnum1:0,
        stepnum2:0,
        stepnum3:0,
        percent1:0,
        percent2:0,
        percent3:0,
        port:[],
        infos:"",
        describe:[],
        arr:[],
        hid:false,
        exe:true,
        box:"toggle",
        people:[],
        ka:0,
        infos:""
 

  },


    //组件监听事件
    select(e) {
      this.setData({
        selectVal:e.detail
         
      })
      var that = this
      wx.request({
        url: 'http://47.98.243.51:8080/sysSport/selectSport?userId',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          userId:1
        }, 
        success: function (res) {
          var arr = []
          for (let i = 0; i <res.data.data.length; i++) {
            if (that.data.selectVal == res.data.data[i].sportDate) {
              // console.log(that.data.selectVal);
           
            // var describe = res.data.data[i]
            // console.log("数组"+describe.gmtCreate)
           
            arr.push(res.data.data[i])
            
            //arr=arr.concat([res.data.data[i]])
            //newArr = newArr.concat(arr)
          }  
          
          else{
            
          }
          // describe = describe.concat(describe)
          }
          // console.log(describe);
        

          // console.log(describe)
          //  console.log(that.data.port)
          console.log(arr)
            var exe=that.data.exe;
            if (arr=='') {
              exe=false
              that.setData({
                exe:exe
              })
              console.log(exe)
            }
             else{
              exe=true
              that.setData({
                exe:exe
              })
              console.log(exe)
              }
          that.setData({
            port: res.data.data,
            describe:arr,
            arr:arr,
          })    
        },
        
      })
  },
  toggle(){
    var hid =this.data.hid;
    var btnText="https://kkkksslls.oss-cn-beijing.aliyuncs.com/exe/xia.png"
    var box=this.data.box
    console.log(btnText)
    if (hid == true) {
       hid = false
       btnText ="https://kkkksslls.oss-cn-beijing.aliyuncs.com/exe/shang.png"
       box="toggle"
       this.setData({
        hid:hid,
        btnText:btnText,
        box:box
      })
       console.log(box)
    } else {
      hid = true
      box="togglee"
       this.setData({
      hid:hid,
      btnText:btnText,
      box:box
    })
    console.log(box) 
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      infos:app.globalData.user
      })
      console.log("999"+this.data.infos)
    
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
  
  
    var that = this


    var id = app.globalData.user.id
    wx.request({
      url: 'http://47.98.243.51:8080/sysDailySport/numSport?userId='+id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      // data: {
      //    userId:app.globalData.user.id
      // }, 
      success: function (res) {
        that.setData({
        people: res.data.data[0],
        })
        var ka =that.data.ka
        var k=that.data.people.totalSportDistance
        console.log(k)
        ka=(k*110)
        
        that.setData({
          ka:ka
        })
        console.log("999"+that.data.ka)
      }
    })
    

     
      wx.request({
        url: 'http://47.98.243.51:8080/sysDailySport/selectSport/stepNumber?userId/totalSportNumber',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          totalSportNumber:3000,
          userId:1
        }, 
        success: function (res) {
          // console.log(res.data)
            that.setData({
              stepnum1:res.data.data,
            })
            let i = (that.data.stepnum1/30)*100
            that.setData({
              percent1:i
            })
            // console.log(1111111)
            // console.log(that.data.stepnum1)
          }
        })

        wx.request({
          url: 'http://47.98.243.51:8080/sysDailySport/selectSport/stepNumber?userId/totalSportNumber',
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          data: {
            totalSportNumber:5000,
            userId:1
          }, 
          success: function (res) {
            // console.log(res.data)
              that.setData({
                stepnum2:res.data.data
              })
              let i = (that.data.stepnum2/30)*100
              that.setData({
                percent2:i
              })
              // console.log(1111111)
              // console.log(that.data.stepnum2)
            }
          })

          wx.request({
            url: 'http://47.98.243.51:8080/sysDailySport/selectSport/stepNumber?userId/totalSportNumber',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              totalSportNumber:10000,
              userId:1
            }, 
            success: function (res) {
              // console.log(res.data)

                that.setData({
                  stepnum3:res.data.data
                })
                let i = (that.data.stepnum3/30)*100
                that.setData({
                  percent3:i
                })
                // console.log(1111111)
                // console.log(that.data.stepnum3)
              }
            })
         
        
            const totalSportNumber = totalSportNumber[i];
           
            
          
          that.setData({
          step: res.data,
          totalSportNumber:totalSportNumber
          })
          console.log(that.data.step.data)
          console.log(totalSportNumber)
       // },
        
      
   // }
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

  }
})