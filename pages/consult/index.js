// pages/consult/index.js
import {api_getOtFishList} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consultList:[],
    inputValue:''
  },
  getList(text=''){
    let params = {
      articleType:3,
      pageSize:10,
      pageNum:1,
      userId:wx.getStorageSync('userId'),
      lastNewId:'',
      searchText:text
    }
    api_getOtFishList(params).then((res)=>{
      let { code,data }= res
      if(code === '0'){
        this.setData({
          consultList:data.fishArticleList
        })
      }
    })
  },
  onChange(e){
    // console.log(e.detail)
    this.setData({
      inputValue:e.detail
    })
  },
  onSearch(){
    this.getList(this.data.inputValue)
  },
  gosalePage(e){
    wx.navigateTo({
      url: '/pages/salePage/index?url='+e.currentTarget.dataset.url
    })
  },
  onShareTimeline () {
    return {
      title: '鲤道带你了解最新锦鲤拍卖咨询',
      path: '/pages/consult/index?id=123'
    }
  },
  onShareAppMessage(){
    return {
      title: '鲤道带你了解最新锦鲤拍卖咨询',
      path: '/pages/consult/index',
      imageUrl:'http://files.q.lidaokoi.com/FopCeXU7xI3nEYIOaZl4EdWJeqWd'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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
})