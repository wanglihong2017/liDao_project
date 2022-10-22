// pages/inquiry/index.js
import {api_onlineAsk,api_giveUp} from '../../utils/api'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inquiryvalue: '',
    active: 0,
    onLineData:[]
  },
  onChange(e) {
    this.setData({
      inquiryvalue: e.detail,
    });
  },
  onSearch() {
    let params = {
      lastNewId:'',
      lastHot:'',
      pageSize:10,
      searchText:this.data.inquiryvalue,
      userId:wx.getStorageSync('userId') || ''
    }
    api_onlineAsk(params).then((res)=>{
      let { code,data } = res
      if(code==='0'){
        this.setData({
          onLineData:data.fishArticleList
        })
      }
    })
  },
  goDetails(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=2`
    })
  },
  goInqueryBtns(){
    if(wx.getStorageSync('userId')){
      this.subscribeMessage()
    }else{
      wx.navigateTo({
        url: '/pages/logo/index'
      })
    }
  },
  giveUpBtns(e){
    let getData = e.currentTarget.dataset.item 
    let params = {
      userId: wx.getStorageSync("userId"),
      targetUserId: getData.userId,
      id: getData.id,
      articleType:getData.articleType,
      upType: 1,
      type: getData.isGiveUp === 1 ? 0 : 1,
    };
    api_giveUp(params).then((res) => {
      let { code } = res;
      if (code === "0") {
          var index =  this.data.onLineData.findIndex((item)=> item.id === getData.id)
          var isGiveUp = "onLineData[" + index + "].isGiveUp" //这里必须这样拼接
          var giveUpQty = "onLineData[" + index + "].giveUpQty"
          var giveUpQtyNum = this.data.onLineData[index].giveUpQty
          this.setData({ //异步刷新，就是渲染
              [isGiveUp] : getData.isGiveUp === 1 ? 0 : 1, //修改值为0
              [giveUpQty] :getData.isGiveUp === 1 ? giveUpQtyNum-1:giveUpQtyNum+1
          })
      }
    });
  },
  getInquiryList(){
    let params = {
      lastNewId:'',
      lastHot:'',
      pageSize:10,
      searchText:'',
      userId:wx.getStorageSync('userId') || ''
    }
    api_onlineAsk(params).then((res)=>{
      let { code,data } = res
      if(code==='0'){
        this.setData({
          onLineData:data.fishArticleList
        })
      }
    })
  },
  subscribeMessage(){
    wx.requestSubscribeMessage({
      tmplIds: ['K8g9-dXi_ulaSklVdDvQ84-GeP3rDSt0YuDzyIc2_5Y'],
      success (res) {
        console.log('res',res)
        wx.navigateTo({
          url:'/pages/publish/index?articleType=1'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInquiryList()
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