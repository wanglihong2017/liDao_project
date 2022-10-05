// pages/publish/index.js
import { api_getToken,api_addfisharticle,api_getUserFollowFish,api_getCity} from "../../utils/api";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileimgsList: [],
    active: 0,
    titlemessage: "",
    textmessage:'',
    upToken:'',
    imglist:[],
    videoList:[],
    showPopup:false,
    userPopup:false,
    useractions:[],
    actions:[
      {
        name:'#鲤鱼很美',
        color: '#999'
      },
      {
        name:'#鲤鱼生病了',
        color: '#999'
      },
      {
        name:'#鲤鱼很美',
        color: '#999'
      },
      {
        name:'#鲤鱼生病了',
        color: '#999'
      },
      {
        name:'#鲤鱼很美',
        color: '#999'
      },
      {
        name:'#鲤鱼生病了',
        color: '#999'
      },
    ],
    topicText:'',
    latitude:'',
    longitude:'',
    getaddress:false,
    userIds:'',
    addressName:'',
    addressPopup:false,
    getchooseIndex:0,
    getarticleType:1
  },
  uploadsimgs(){
    let that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      success: function (res) {
        console.log('11',res)
        that.setData({
          fileimgsList:[...that.data.fileimgsList,...res.tempFiles]
        })
      }
    })
  },
  uploadsvideos() {
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      success: function (res) {
        console.log( res)
        var filePath = res.tempFiles;
        var file_length = filePath.length;
        that.setData({
          count: file_length,
          videoList:res.tempFiles
        })
        // for(var i = 0; i < file_length; i++){
        //   wx.showLoading()
        //   var filePath = res.tempFiles[i].tempFilePath;
        //   var key = Math.random().toString(36).substr(2); //生成一个随机字符串的文件名
        //   wx.uploadFile({
        //    url: 'https://up-z2.qiniup.com', //华东地区上传地址
        //    filePath: filePath,
        //    name: 'file',
        //    formData:{
        //     'token': that.data.upToken,//刚刚获取的上传凭证
        //     'key': key//这里是为文件设置上传后的文件名
        //    },
        //    success: function(r){
        //     console.log(r)
        //     var data = r.data;//七牛会返回一个包含hash值和key的JSON字符串
        //     if(typeof data==='string')data = JSON.parse(data.trim());//解压缩
        //     var imglist = that.data.imglist
        //     //拼接上你的七牛云空间域名
        //     imglist = imglist.concat('https://files.q.lidaokoi.com/' + data.key+'?imageView2/0/w/200/h/300/q/75|watermark/2/text/6bKk6YGT/font/5a6L5L2T/fontsize/320/fill/I0Y1MTAxMA==/dissolve/100/gravity/SouthEast/dx/10/dy/10')
        //     that.setData({
        //       imglist: imglist
        //     });
        //     that.setData({
        //       count: --that.data.count
        //     })
        //     if(that.data.count <= 0){
        //       wx.hideLoading()
        //     }
        //    },
        //    fail:function (res) {
        //     console.log(res)
        //    }
        //   })
        // }
      }
    }
  )
  },
  getToken() {
    api_getToken().then((res) => {
      // console.log(res);
      let { code, data } = res;
      if(code==='0'){
        this.data.upToken = data
      }
    });
  },
  onTabChange(event) {
    this.data.getchooseIndex = event.detail.index
    // console.log('1111',event.detail.index)
  },
  onChange(event) {
    this.setData({
      titlemessage: event.detail
    })
  },
  onChangeText(event){
    this.setData({
      textmessage: event.detail
    })
  },
   getURl(getfilePath){
    const promise = new Promise((resolve,reject)=>{
      var key = (new Date()).valueOf(); //生成一个随机字符串的文件名
      let that = this
      wx.uploadFile({
        url: 'https://up-z2.qiniup.com', //华东地区上传地址
        filePath: getfilePath,
        name: 'file',
        formData:{
         'token': that.data.upToken,//刚刚获取的上传凭证
         'key': key//这里是为文件设置上传后的文件名
        },
        success: function(res){
         var data = res.data;//七牛会返回一个包含hash值和key的JSON字符串
         if(typeof data==='string')data = JSON.parse(data.trim());//解压缩
          resolve('https://files.q.lidaokoi.com/' + data.key)
          wx.hideLoading()
         },
        fail:function (res) {
          reject(res)
          wx.hideLoading()
        }
       })
    })
    return promise
  },
  async publishBtns(){
    if(this.data.titlemessage===''){
      wx.showToast({
        title: `请输入标题`,
        icon: 'error',
      })
      return false
    }else if(this.data.textmessage===''){
      wx.showToast({
        title: `请说说此时的心情`,
        icon: 'error',
      })
      return false
    }else if(!this.data.getaddress){
      wx.showToast({
        title: `请授权`,
        icon: 'error',
      })
      return false
    }
    var filePath
    if(this.data.getchooseIndex===0){
      filePath = this.data.fileimgsList
    }else if(this.data.getchooseIndex===1){
      filePath = this.data.videoList
    }
    var file_length = filePath.length;
    let that = this
    var getImgData =[]
      for(var i = 0; i < file_length; i++){
          wx.showLoading()
          var getfilePath = filePath[i].tempFilePath;
          var d = await this.getURl(getfilePath)
          // console.log('this.getURl(getfilePath)',d )
          getImgData.push(d)
      }
      // console.log('-------that.data.imglist-----', getImgData.join(','))
      let params = {
        userId:wx.getStorageSync('userId') || '',
        articleType:this.data.getarticleType, //根据跳转判断
        title:that.data.titlemessage,
        imgType:that.data.getchooseIndex===0?1:2,
        coverPath:'', //封面图片地址
        imgPath:getImgData.join(','),
        topic:that.data.topicText.name,//话题
        content:that.data.textmessage,
        cityName:'',
        latitude:that.data.latitude,
        longitude:that.data.longitude,
        address:'',
        userIds:that.data.userIds,//@多个用户
        isDraft:0
      }
      api_addfisharticle(params).then((res)=>{
        let {code} = res
        if(code==='0'){
          wx.redirectTo({
            url: '/pages/myPublish/index'
          })
        }
      })
  },
  addAdressBtn(){
    let that = this
    wx.getFuzzyLocation ({
      type: "wgs84",
      success (res) {
        that.data.latitude = res.latitude
        that.data.longitude = res.longitude
        that.setData({
          getaddress:true
        })
        let params = {
          key:'AUGBZ-QENCP-YQPDT-LONCQ-N6LYK-SJBQQ',                    
          location:`${res.latitude},${res.longitude}`
        }
        api_getCity(params).then((res)=>{
            console.log('00000',res) //获取城市列表
            let {status,result} = res
            // console.log(status)
            // console.log(result)
            if(status===0){
              that.setData({
                addressName:result.address_component.province + result.address_component.city 
              })
            }
        })
      }
     })
  },
  onClose(){
    this.setData({showPopup:false})
  },
  onSelect(event){
    this.setData({
      textmessage:this.data.textmessage + event.detail.name,
      topicText:event.detail
    })
  },
  townTalk(){
    this.setData({showPopup:true})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getToken()
    this.getUserFollowFish()
    if(options.articleType){
      this.data.getarticleType = 2
    }
    if(app.globalData.draftBox && options.draft){
      console.log('app.globalData.draftBox',app.globalData.draftBox)
      let getData = app.globalData.draftBox
      this.setData({
        titlemessage:getData.content,
        textmessage:getData.title
      })
      this.data.latitude = getData.latitude
      this.data.longitude = getData.longitude
      if(getData.imgType===1){
        this.data.getchooseIndex = 0
        this.setData({
          fileimgsList:JSON.parse(getData.imgPath),
          active:0
        })
      }else{
        this.data.getchooseIndex = 1
        this.setData({
          videoList:JSON.parse(getData.imgPath),
          active:1
        })
      }
    }
  },
  userBtns(){
    this.setData({userPopup:true})
  },
  onUserClose(){
    this.setData({userPopup:false})
  },
  getUserFollowFish(){
    let params = {
      userId:wx.getStorageSync('userId') || '',
      pageNum:1,
      pageSize:10
    }
    api_getUserFollowFish(params).then((res)=>{
      let { code,data} = res
      if(code==='0'){
        let Arreys = []
        data.forEach((item)=>{
          Arreys.push({name:item.userName,userId:item.userId})
        })
        this.setData({
          useractions:Arreys
        })
      }
    })
  },
  onUserSelect(event){
    this.setData({
      textmessage:this.data.textmessage + '@'+event.detail.name,
      userIds:event.detail.userId
    })
  },
  draftBoxBtns(){
    let that = this
    let imgBox = []
    that.data.fileimgsList.forEach((item)=>{
      imgBox.push(item.tempFilePath)
    })
    let params = {
      userId:wx.getStorageSync('userId') || '',
      articleType:this.data.getarticleType, //根据跳转判断
      title:that.data.titlemessage,
      imgType:that.data.getchooseIndex===0?1:2,
      coverPath:'', //封面图片地址
      imgPath:this.data.getchooseIndex===0?JSON.stringify(this.data.fileimgsList):JSON.stringify(this.data.videoList),
      topic:that.data.topicText.name,//话题
      content:that.data.textmessage,
      cityName:'',
      latitude:that.data.latitude,
      longitude:that.data.longitude,
      address:'',
      userIds:that.data.userIds,//@多个用户
      isDraft:1
    }
    api_addfisharticle(params).then((res)=>{
      let {code} = res
      if(code==='0'){
        wx.redirectTo({
          url: '/pages/draftBox/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(!wx.getStorageSync('userId')){
      wx.navigateTo({
        url: '/pages/logo/index'
      })
   }
  },
  deleteBtns(e){
    // console.log('22222333',e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    this.data.fileimgsList.splice(index, 1)
    this.setData({
      fileimgsList:this.data.fileimgsList
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
