// components/momeyCard/money-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    money_list:{
      type:Array,
      value:[]
    },
    zhidingyi_money:{
      type:Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e){
      var myEventDetail = e.currentTarget.dataset.price; // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
