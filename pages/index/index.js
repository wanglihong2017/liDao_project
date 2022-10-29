// index.js
// 获取应用实例
import {api_getCity,api_getFishList,api_getFollowFish,api_nearbyFish,api_getNewMessage,api_giveUp} from '../../utils/api'
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
    choosseActive:0,
    setCodeNun:1,
    lastNewId:'',
    lastHot:''
  },
  // 事件处理函数
  onChange(event) {
   this.setData({
    active:event.detail.name
   })
   if(event.detail.name===2){
     this.setData({
      twoProducts:[]
     })
     let that  = this
    wx.getFuzzyLocation ({
      type: "wgs84",
      success (res) {
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
    this.setData({
      firstProducts:[]
     })
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
       this.setData({
        products:[]
       })
        this.getList()
    }
  },
  searchBtns(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  goPageBtns(event){
    console.log(this.data.tabactive)
    if(event.detail.index===1 && event.detail.title ==='拍卖资讯'){
      wx.navigateTo({
        url: '/pages/consult/index'
      })
    }else if(event.detail.index===2 && event.detail.title ==='鲤道头条'){
      wx.navigateTo({
        url: '/pages/newHeades/index?index=4'
      })
    }else if(event.detail.index===3 && event.detail.title ==='答鱼友问'){
      wx.navigateTo({
        url: '/pages/headLines/index?index=5'
      })
    }else if(event.detail.index===4 && event.detail.title ==='鲤道课堂'){
      wx.navigateTo({
        url: '/pages/headLines/index?index=6'
      })
    }
  },
  getDetailBtn(e){
    app.globalData.userImg = e.currentTarget.dataset.userimg
    wx.navigateTo({
      url:`/pages/detailsPage/index?articleId=${e.currentTarget.dataset.id}&type=1`
    })
  },
  getList(lastNewId="",lastHot=""){ 
    let params = {
      lastNewId:lastNewId,
      lastHot:lastHot,
      pageSize:10,
      searchText:'',
      userId:wx.getStorageSync('userId') || ''
    }
    api_getFishList(params).then((res)=>{
      let {code,data} = res
      if(code === '0' ){
         this.data.lastNewId = data.lastNewId
         this.data.lastHot = data.lastHot
         let getData= [...this.data.products,...data.fishArticleList]
         this.setData({
          products:getData
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
  goMydetails(e){
    app.globalData.othersDetails = {
      userId:wx.getStorageSync("userId") || "",
      targetId:e.currentTarget.dataset.userid,
    }
    wx.navigateTo({
      url: '/pages/othersDetails/index'
    })
  },
  tabShowBtns(){
    this.setData({ tabShow: true })
  },
  getNewMessage(){
    api_getNewMessage({userId:wx.getStorageSync("userId") || ""}).then((res)=>{
      let {code,data} = res
      if(code==='0'){
        this.setData({
          setCodeNun:data
        })
        app.globalData.giveUpNum =data
      }
    })
  },
  onClose(){
    this.setData({ tabShow: false })
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
        if(this.data.active==1){
          var index =  this.data.products.findIndex((item)=> item.id === getData.id)
          var isGiveUp = "products[" + index + "].isGiveUp" //这里必须这样拼接
          var giveUpQty = "products[" + index + "].giveUpQty"
          var giveUpQtyNum = this.data.products[index].giveUpQty
          this.setData({ //异步刷新，就是渲染
              [isGiveUp] : getData.isGiveUp === 1 ? 0 : 1, //修改值为0
              [giveUpQty] :getData.isGiveUp === 1 ? giveUpQtyNum-1:giveUpQtyNum+1
          })
        }else if(this.data.active==2){
          var index =  this.data.twoProducts.findIndex((item)=> item.id === getData.id)
          var isGiveUp = "twoProducts[" + index + "].isGiveUp" 
          var giveUpQty = "twoProducts[" + index + "].giveUpQty"
          var giveUpQtyNum = this.data.twoProducts[index].giveUpQty
          this.setData({ //异步刷新，就是渲染
              [isGiveUp] : getData.isGiveUp === 1 ? 0 : 1, //修改值为0
              [giveUpQty] :getData.isGiveUp === 1 ? giveUpQtyNum-1:giveUpQtyNum+1
          })
        }else if(this.data.active==0){
          var index =  this.data.firstProducts.findIndex((item)=> item.id === getData.id)
          var isGiveUp = "firstProducts[" + index + "].isGiveUp" 
          var giveUpQty = "firstProducts[" + index + "].giveUpQty"
          var giveUpQtyNum = this.data.firstProducts[index].giveUpQty
          this.setData({ //异步刷新，就是渲染
              [isGiveUp] : getData.isGiveUp === 1 ? 0 : 1, //修改值为0
              [giveUpQty] :getData.isGiveUp === 1 ? giveUpQtyNum-1:giveUpQtyNum+1
          })
        }
      }
    });
  },
  onShow() {
    this.setData({
      choosseActive:0,
      tabactive:0
    })
    if(wx.getStorageSync("userId")){
      this.getNewMessage()
    }
    // this.data.products = []
    // this.getList()
  },
  onPullDownRefresh(){
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },500)
  },
  onReachBottom(){
    if(!(this.data.lastNewId===-1 && this.data.lastHot===-1)){
       if(this.data.lastNewId!='' && this.data.lastHot!=''){
         this.getList(this.data.lastNewId,this.data.lastHot)
       }
    }
  }
});

