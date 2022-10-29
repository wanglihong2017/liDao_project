// pages/salePage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lidaoSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('222222',options)
    if(options){
      this.setData({
        lidaoSrc: options.url
      })
    }
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
  onShareTimeline () {
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/index/index?id=123'
    }
  },
  onShareAppMessage(){
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/salePage/index?url='+ this.data.lidaoSrc,
      imageUrl:'http://files.q.lidaokoi.com/FopCeXU7xI3nEYIOaZl4EdWJeqWd'
    }
  },
  /**
   * 用户点击右上角分享
   */
})