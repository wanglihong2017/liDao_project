// pages/follow/index.js
const app = getApp()
import {api_read} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listComment:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.followList){
      this.setData({
        listComment:app.globalData.followList
      })
      this.getReadList()
    }
  },
  getReadList(){
    api_read({
      userId:wx.getStorageSync("userId") || "",
      type:2
    }).then((res)=>{
      console.log('wwqq',res)
    })
  },
  goFollowDetails(e){
    app.globalData.othersDetails = {
      userId:wx.getStorageSync("userId") || "",
      targetId:e.currentTarget.dataset.item.postUserId,
    }
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
  onShareTimeline () {
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/index/index?id=123'
    }
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