import { api_getfollowUserList,api_getTargetUserInfo,api_addFollow,api_giveUp} from '../../utils/api'
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
          var index =  this.data.products.findIndex((item)=> item.id === getData.id)
          var isGiveUp = "products[" + index + "].isGiveUp" //这里必须这样拼接
          var giveUpQty = "products[" + index + "].giveUpQty"
          var giveUpQtyNum = this.data.products[index].giveUpQty
          this.setData({ //异步刷新，就是渲染
              [isGiveUp] : getData.isGiveUp === 1 ? 0 : 1, //修改值为0
              [giveUpQty] :getData.isGiveUp === 1 ? giveUpQtyNum-1:giveUpQtyNum+1
          })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getfollowUserList(){
    let params = {
      userId:wx.getStorageSync('userId') || '',
      lastNewId:'',
      pageSize:10,
      followUserId:app.globalData.othersDetails.targetId
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
  addFollowBtn(e){
    let index = e.currentTarget.dataset.isfollow
    let params = {
      userId: wx.getStorageSync("userId") || "",
      followUserId:app.globalData.othersDetails.targetId,
      type: index === 1 ? 2 :1 ,
    }
    api_addFollow(params).then((res)=>{
       if(res.code === '0'){
        this.getDetails()
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