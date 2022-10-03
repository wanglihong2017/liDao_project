// common/foot/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choosseActive:{
      type:Number,
      value:0
    }
  },
  observers:{
    choosseActive(value){
       if(value || value==0){
        this.setData({
          active:value
        })
       }
    } 
  },
  /**
   * 组件的初始数据
   */
  data: {
    active:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({ 
        active: event.detail 
      })
      if( event.detail ===0){
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }
      if( event.detail ===1){
        wx.navigateTo({
          url: '/pages/inquiry/index'
        })
      }
      if( event.detail ===2){
        wx.navigateTo({
          url: '/pages/publish/index'
        })
      }
      if( event.detail ===3){
        wx.navigateTo({
          url: '/pages/news/index'
        })
      }
      if( event.detail ===4){
        wx.navigateTo({
          url: '/pages/my/index'
        })
      }
    },
  }
})
