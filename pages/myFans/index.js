// pages/myCollection/index.js
import { api_getFollowMe } from '../../utils/api'
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followArrey:[]
  },
  getList(num){
    let params = {
      userId:wx.getStorageSync('userId') || '',
      pageNum:num,
      pageSize:10
    }
    api_getFollowMe(params).then((res)=>{
      let { code,data } = res
      if(code==='0'){
        this.setData({
          followArrey:data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList(1)
  },
  goFans(e){
    console.log('111',e.currentTarget.dataset.item)
    app.globalData.othersDetails = e.currentTarget.dataset.item
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