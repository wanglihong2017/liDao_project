// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    listComment:[
      {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"清风不问烟雨",
        subText:'赞了你的笔记',
        time:'2022-08-16',
      },
      {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"Kyiro",
        subText:'收藏了你的笔记',
        time:'2022-08-08',
      }, {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"句号开始",
        subText:'赞了你的笔记',
        time:'2022-09-16',
      }
    ],
    jiashudata:{
      image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t24625/227/54958853/292378/ae81b07/5b63c613Na9176fde.jpg!q80.dpg',
      title: '显瘦中长款系带风衣',
      describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
      count: '888',
      delCount: '666',
      headtext:'花好月圆'
    }
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail })
    if(event.detail===1){
      wx.navigateTo({
        url: '/pages/follow/index'
      })
    }
    if(event.detail===2){
      wx.navigateTo({
        url: '/pages/commentList/index'
      })
    }
  },
  goDetails(){
    wx.navigateTo({
      url:`/pages/detailsPage/index?params=${JSON.stringify(this.data.jiashudata)}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({ active: 0})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})