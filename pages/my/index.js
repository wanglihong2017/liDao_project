// pages/follow/index.js
import { api_getMyData,api_getFollowUser } from '../../utils/api'
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},
    detailsData:{},
    choosseActive:4,
    upShow:false,
    setCodeNun:0
  },
  goPublishBtn(){
    wx.navigateTo({
      url: '/pages/myPublish/index'
    })
  },
  setPersonal(){
    wx.navigateTo({
      url: '/pages/set/index'
    })
  },
  goFansBtn(){
    wx.navigateTo({
      url: '/pages/myFans/index'
    })
  },
  goFollowBtn(){
    wx.navigateTo({
      url: '/pages/myFollow/index'
    })
  },
  goCollectBtn(){
    wx.navigateTo({
      url: '/pages/myCollect/index'
    })
  },
  getMyDataDetails(){
    let params = {
      userId:wx.getStorageSync('userId') || '',
    }
    api_getMyData(params).then((res)=>{
       let {code,data} = res
       if(code==='0'){
          this.setData({
            detailsData:data
          })
       }
    })
  },
  goDraftBtns(){
    wx.navigateTo({
      url: '/pages/draftBox/index'
    })
  },
  gomyFollowCountBtn(){
    wx.navigateTo({
      url: '/pages/myFollow/index'
    })
  },
  giveUpNums(){
    this.setData({
      upShow:true
    })
  },
  onClose() {
    this.setData({ upShow: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('userId')){
      this.getMyDataDetails()
    }
    if(app.globalData.giveUpNum){
      this.setData({
        setCodeNun:app.globalData.giveUpNum
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
    this.setData({choosseActive:4})
    if(wx.getStorageSync('userId')){
      let that = this
      api_getFollowUser({userId:wx.getStorageSync('userId')},).then((res)=>{
        let {code,data} = res
        if(code==='0'){
          that.setData({
            userData:data
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/logo/index'
      })
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