
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      // 初始值
      value: '请确认提交信息'
    },
    content: {
      type: Array
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    inputText:{
      type: String,
      value: '取消'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: false,
    showDialogname: false,
    showDialogsex: false,
    showDialogadd: false,
    inputinfo:"",
    inputinfoname:"",
    inputinfosex:null,
    inputinfoadd:[],
    contentLength:0,
    infos:"",
    array: ['选择性别','男', '女'],
    index: 0,//默认显示位置,
    region: ['---', '---', '---'],
    customItem: '全部',
    newadd:null,
    content:"456"
  },



  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      this.setData({
        showDialog: true
      })
    },
    showname() {
      this.setData({
        showDialogname: true
      })
    },
    showsex() {
      this.setData({
        showDialogsex: true
      })
    },
    showadd() {
      this.setData({
        showDialogadd: true
      })
    },
    hide() {
      this.setData({
        showDialog: false
      })
    },
    hidesex() {
      this.setData({
        showDialogsex: false
      })
    },
    hidename() {
      this.setData({
        showDialogname: false
      })
    },
    hideadd() {
      this.setData({
        showDialogadd: false
      })
    },

    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    Text(e){
      this.setData({
        contentLength: e.detail.cursor,
        inputinfo:e.detail.value,
        inputinfoname:e.detail.value
      })
      console.log(this.data.inputinfo+"12323")
    },
    Texts(e){
      this.setData({
      
        inputinfo:"",
        inputinfoname:""
      })
      console.log(this.data.inputinfo+"12323")
    },
    _confirm() {
      //触发成功回调
      let val = this.data.inputinfo,
      my_event_detail = {
        val: val
      }
      this.triggerEvent("confirm",my_event_detail);
    },
    _confirmname() {
      //触发成功回调
      let val = this.data.inputinfoname,
      my_event_detail = {
        val: val
      }
      this.triggerEvent("confirmname",my_event_detail);
    },
    _confirmsex() {
      //触发成功回调
      let val = this.data.index,
      my_event_detail = {
        val: val
      }
      console.log(val+"val");
      this.triggerEvent("confirmsex",my_event_detail);
    },
    clearcon(){
      console.log("dswajwoqii")
      this.setData({
        inputinfo:"123",
      })
      },
    _confirmadd() {
      //触发成功回调
      let val = this.data.newadd,
      my_event_detail = {
        val: val
      }
      console.log(val+"val");
      this.triggerEvent("confirmadd",my_event_detail);
    },
    bindPickerChange: function (e) {
          console.log('picker发送选择改变，携带值为', e.detail.value) 
             this.setData({
              index: e.detail.value
                        })  },
                        bindRegionChange: function (e) {
                          console.log('picker发送选择改变，携带值为', e.detail.value)
                          this.setData({
                            region: e.detail.value,
                            newadd: e.detail.value[0]+'-'+e.detail.value[1]+'-'+e.detail.value[2]
                          })
                          console.log(this.data.newadd+"地址")
                        },

   
   
  }

})