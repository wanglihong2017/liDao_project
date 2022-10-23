// pages/news/index.js
import { api_getNewMessageList,api_read } from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    listComment:[],
    followList:[],
    choosseActive:3,
    commentList:[],
    setCodeNun:0
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
  goDetails(e){
    console.log(e.currentTarget.dataset)
    app.globalData.userImg = e.currentTarget.dataset.userimg
    api_read({id:e.currentTarget.dataset.id}).then((res)=>{
      console.log('wwqq',res)
    })
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.articleid}&type=1`
    })
  },
  getList(){
    api_getNewMessageList({ userId:wx.getStorageSync('userId') || '',}).then((res)=>{
      let {code,data} = res
      if(code==='0'){
        this.setData({
          listComment:data.giveUpList
        })
        app.globalData.followList = data.followList
        app.globalData.commentList = data.commentList
      }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.setData({ 
      active: 0,
      choosseActive:3
    })
    this.getList()
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