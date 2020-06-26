//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    news:[],
    url:["https://images.unsplash.com/photo-1592754553948-17e0f4c2a990?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60","https://images.unsplash.com/photo-1592749624315-34d1174f869d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60","https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60","https://images.unsplash.com/photo-1592820201555-60dc50bad498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60","https://images.unsplash.com/photo-1592888992374-5f7e3a492028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"]
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  onShow:function() {
    var that = this
    wx.request({
       url: 'https://www.fastmock.site/mock/7cc981c5eeafab44debd8a6916e00d6e/api/daily',
      method: 'Get',
      header: {
        'content-type': 'application/json'
      },
      data: {
       
      }, 
      success: function (res) {
        console.log(res)
        that.setData({
        news: res.data.data
        })
 
        var news = that.data.news
        news.forEach(item => {
          item.zan = false
          item.sou = false
        })
        console.log(news)
        that.setData({
          news:news
        })
        console.log(that.data.news)
      }
    })

  },
    //今日看点跳转跳转
    unjump: function(e){
      console.log("歌曲是"+JSON.stringify(e.currentTarget.dataset.item))
      wx.navigateTo({
        url: '/pages/news/news?item='+JSON.stringify(e.currentTarget.dataset.item)
      })
    },
     //index跳转
     onjump: function(e){
      wx.navigateTo({
        url: '/pages/'+e.currentTarget.dataset.item+'/'+e.currentTarget.dataset.item
      })
    },
    //motion跳转
    onjumpmotion: function(e){
      wx.switchTab({
        url: '/pages/motion/'+e.currentTarget.dataset.item+'/'+e.currentTarget.dataset.item
      })
    },
    zan:function(e) {
      var id = e.currentTarget.dataset.id 
      console.log(id)
      var news = 'news['+id+']'+'.zan'
      if(this.data.news[id].zan == false){
        this.setData({
          [news]:true
        })
      }else{
        this.setData({
          [news]:false
        })
      }
      
    },
    sou:function(e) {
      var id = e.currentTarget.dataset.id 
      console.log(id)
      var news = 'news['+id+']'+'.sou'
      if(this.data.news[id].sou == false){
        this.setData({
          [news]:true
        })
      }else{
        this.setData({
          [news]:false
        })
      }
      
    }
})
