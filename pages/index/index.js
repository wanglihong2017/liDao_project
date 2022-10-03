// index.js
// 获取应用实例
import {api_getCity,api_getFishList,api_getFollowFish,api_nearbyFish,api_getNewMessage} from '../../utils/api'
const app = getApp();

Page({
  data: {
    active: 1,
    tabactive:0,
    updateLoading:false,
    isAllLoaded:true,
    products:[],
    firstProducts:[],
    twoProducts:[],
    tabShow:false,
    choosseActive:0
  },
  // 事件处理函数
  onChange(event) {
   this.setData({
    active:event.detail.name
   })
   if(event.detail.name===2){
     let that  = this
    wx.getFuzzyLocation ({
      type: "wgs84",
      success (res) {
        console.log('111222',res)
      let params = {
        lastNewId:'',
        userId:wx.getStorageSync('userId') || '',
        latitude:res.latitude,
        longitude:res.longitude,
        pageNum:1,
        pageSize:10
      }
       api_nearbyFish(params).then((res)=>{
         let {code,data} = res
         if(code==='0'){
          that.setData({
            twoProducts:[...data.fishArticleList]
           })
         }
       })
      }
     })
   }
   if(event.detail.name===0){
    if(!wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/logo/index'
      })
    }else{
      let params = {
       userId:wx.getStorageSync('userId') || '',
       pageSize:10,
       lastNewId:'',
      }
     api_getFollowFish(params).then((res)=>{
       let {code,data} = res
       if(code === '0' ){
         this.setData({
          firstProducts:[...data.fishArticleList]
         })
      }
     })
    }
   }
    if(event.detail.name===1){
      this.getList()
    }
  },
  searchBtns(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  goPageBtns(event){
    if(event.detail.index===1 && event.detail.title ==='拍卖资讯'){
      wx.navigateTo({
        url: '/pages/salePage/index'
      })
    }else{
      if(event.detail.index !=0){
        wx.showToast({
          title: `${event.detail.title}正在开发中,敬请期待`,
          icon: 'error',
        });
      }
    }
  },
  getDetailBtn(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=1`
    })
  },
  getList(){
    let params = {
      lastNewId:'',
      lastHot:'',
      pageSize:10,
      searchText:'',
      userId:wx.getStorageSync('userId') || ''
    }
    api_getFishList(params).then((res)=>{
      let {code,data} = res
      if(code === '0' ){
         this.setData({
          products:[...data.fishArticleList]
         })
      }
    })
  },
  onLoad() {
    // wx.getLocation({
    //   type: "wgs84",
    //   success (res) {
    //   let params = {
    //     key:'AUGBZ-QENCP-YQPDT-LONCQ-N6LYK-SJBQQ',                    
    //     location:`${res.latitude},${res.longitude}`
    //   }
    //    api_getCity(params).then((res)=>{
    //     console.log('00000',res) //获取城市列表
    //    })
    //   }
    //  })  
     this.getList()
  },
  tabShowBtns(){
    this.setData({ tabShow: true })
  },
  getNewMessage(){
    api_getNewMessage({userId:wx.getStorageSync("userId") || ""}).then((res)=>{
      console.log('22222222111',res)
    })
  },
  onClose(){
    this.setData({ tabShow: false })
  },
  onShow() {
    this.setData({
      choosseActive:0
    })
    if(wx.getStorageSync("userId")){
      this.getNewMessage()
    }
  },
});
