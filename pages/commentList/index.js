// pages/commentList/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listComment:[],
    showBtns:false,
    reviewValue:'',
  },
  commentBtn(){
    this.setData({showBtns:true})
  },
  onClickHide(){
    this.setData({ showBtns: false })
  },
  sendBtns(){
    this.setData({ 
      showBtns: false,
      reviewValue:''
     })
  },
  reviewValueonChange(e){
    this.setData({
      reviewValue: e.detail,
    })
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
    if(app.globalData.commentList){
      this.setData({
        listComment:app.globalData.commentList
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})