// pages/consult/index.js
import {api_getOtFishList} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setNum:'',
    consultList:[],
    upshowBtns:false,
    vid:'',
    inputValue:''
  },
  getList(text=""){
    let params = {
      articleType:this.data.setNum,
      pageSize:10,
      pageNum:1,
      userId:wx.getStorageSync('userId'),
      lastNewId:'',
      searchText:text,
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
  onChange(e) {
    console.log(e.detail)
    this.setData({
      inputValue: e.detail,
    });
    this.getList(e.detail)
    //  console.log(this.data.inputValue)
  },
  // onSearch(){
  //   this.getList()
  // },
  gosalePage(e){
    if(e.currentTarget.dataset.imgtype===2){
      this.setData({
        upshowBtns:true,
        vid:e.currentTarget.dataset.url
      })
      return false
    }
    let getUrl = e.currentTarget.dataset.url
    if(e.currentTarget.dataset.imgtype===1 && getUrl.indexOf('http')>=0 ||getUrl.indexOf('https')>=0){
      wx.navigateTo({
        url: '/pages/salePage/index?url='+ getUrl
      })
      return false
    }
  },
  onClose(){
    this.setData({
      upshowBtns:false,
      vid:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options',options.index)
    this.data.setNum = options.index
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
      path: '/pages/newHeades/index'
    }
  },
  onShareAppMessage(){
    return {
      title: '鲤道带你了解最新锦鲤咨询',
      path: '/pages/newHeades/index',
      imageUrl:'http://files.q.lidaokoi.com/FopCeXU7xI3nEYIOaZl4EdWJeqWd'
    }
  },
})