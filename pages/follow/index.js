// pages/follow/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listComment:[
      {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"清风不问烟雨",
        subText:'开始关注了你',
        time:'2022-08-16',
      },
      {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"Kyiro",
        subText:'开始关注了你',
        time:'2022-08-08',
      }, {
        img:"https://sns-avatar-qc.xhscdn.com/avatar/5efea5d5de78f700019feb18.jpg?imageView2/1/w/540/format/jpg",
        officialText:"句号开始",
        subText:'开始关注了你',
        time:'2022-09-16',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  goFollowDetails(){
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