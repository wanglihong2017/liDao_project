// pages/commentList/index.js
import { api_read } from '../../utils/api'
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
  goMydetails(e){
    app.globalData.othersDetails = {
      userId:wx.getStorageSync("userId") || "",
      targetId:e.currentTarget.dataset.userid,
    }
    wx.navigateTo({
      url: '/pages/othersDetails/index'
    })
  },
  goDetails(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    api_read({id:e.currentTarget.dataset.tzid}).then((res)=>{
      console.log('wwqq',res)
    })
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=1`
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
  onShareTimeline () {
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/index/index?id=123'
    }
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