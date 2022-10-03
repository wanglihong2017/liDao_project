// pages/myCollection/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followArrey:[
      {
        headimgs:'https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg',
        name:'清风不问秋月',
        publishNum:6
      },
      {
        headimgs:'https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg',
        name:'清风不问秋月',
        publishNum:6
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  goFans(){
    wx.navigateTo({
      url: '/pages/othersDetails/index'
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})