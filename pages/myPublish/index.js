import { api_getUserFishList } from '../../utils/api'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateLoading:false,
    isAllLoaded:true,
    products:[],
    active:0
  },
  getDetailBtn(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=1`
    })
  },
  onChange(event){
    let name  = event.detail.name===0? 1:2
    this.getList(name)
    this.setData({
      products:[]
    })
  },
  getList(articleType=1){
    let params = {
      userId:wx.getStorageSync('userId') || '',
      lastNewId:'',
      pageSize:10,
      articleType
    }
    api_getUserFishList(params).then((res)=>{
      let {code,data} = res
      if(code==='0'){
        this.setData({
          products:data.fishArticleList
        })
      }
    })
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
   onShareTimeline () {
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/index/index?id=123'
    }
  },
})