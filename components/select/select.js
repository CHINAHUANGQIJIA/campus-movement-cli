// components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray:{
      type:Array,
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
    selectShow:false,//初始option不显示
    nowText:"+86",//初始内容
    animationData:{},//右边箭头的动画
    showModal: false, //false关闭模态框  true开启模态框
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //option的显示与否
    selectToggle:function(){
      var nowShow=this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
          timingFunction:"ease"
      })
      this.animation=animation;
      if(nowShow){
          animation.rotate(0).step();
          this.setData({
              animationData: animation.export()
          })
      }else{
          animation.rotate(180).step();                
          this.setData({
              animationData: animation.export()
          })
      }
      this.setData({
          selectShow: !nowShow,
          showModal: true
      })
  },
  //设置内容
  setText:function(e){
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].number;//当前点击内容的区号
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
          selectShow: false,
          nowText:nowText,
          animationData: this.animation.export()
      })
      var nowDate={
        id:nowIdx,
        text:nowText
    }
    this.triggerEvent('myget', nowDate)
  },
  /**
   * 隐藏模态对话框
   */
  hideModal() {
    var that = this;
    that.setData({
      showModal: false,
    })
  },
  openBorder:function() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  }
})
