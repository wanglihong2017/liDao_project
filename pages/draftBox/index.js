// pages/draftBox/index.js
import {api_getDraftList,api_deleteDraft} from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    draftList:[]
  },
  getDraftList(){
    api_getDraftList({userId:wx.getStorageSync("userId") || ""}).then((res)=>{
       let {code,data} = res
       if(code==='0'){
          this.setData({
            draftList:data
          })
       }
    })
  },
  publishBtns(e){
    app.globalData.draftBox = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/publish/index?articleType='+  e.currentTarget.dataset.item.articleType+'&draft=1'
    })
  },
  deleBtns(e){
    api_deleteDraft({id:e.currentTarget.dataset.id}).then((res)=>{
      let { code } = res
      if(code === '0'){
        this.getDraftList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDraftList()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})