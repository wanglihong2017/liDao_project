import { api_getfollowUserList,api_getTargetUserInfo } from '../../utils/api'
const app =  getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    updateLoading:false,
    isAllLoaded:true,
    products:[],
    headDatas:{}
  },
  goDetailBtns(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=1`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getfollowUserList(){
    let params = {
      userId:wx.getStorageSync('userId') || '',
      lastNewId:'',
      pageSize:10,
      followUserId:app.globalData.othersDetails.userId
    }
    api_getfollowUserList(params).then((res)=>{
      let {code,data} = res
      if( code==='0'){
        this.setData({
          products:data.fishArticleList
        })
      }
    })
  },
  getDetails(){
    console.log('app.globalData.othersDetails', app.globalData.othersDetails)
    api_getTargetUserInfo(app.globalData.othersDetails).then((res)=>{
      console.log(res)
      let { code,data } = res
      if(code==='0'){
        this.setData({
          headDatas:data
        })
      }
    })
  },
  onLoad(options) {
    if(app.globalData.othersDetails){
      this.getDetails()
      this.getfollowUserList()
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