// pages/publish/index.js
const qiniuUploader = require("../../utils/qiniuUploader");
import { api_getToken,api_addfisharticle,api_getUserFollowFish,api_getCity} from "../../utils/api";
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
          fileimgsList:res.tempFiles
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
        var filePath = res.tempFiles[0].tempFilePath;
        var file_length = res.tempFiles.length;
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
  initQiniu(token) {
    var options = {
      region: "SCN", // 华东区
      uptoken: token,
      domain: "https://files.q.lidaokoi.com/",
      uploadURL: "https://up-z2.qiniup.com",
      uptokenURL: "https://files.q.lidaokoi.com/api/uptoken",
    };
    qiniuUploader.init(options);
  },
  getToken() {
    api_getToken().then((res) => {
      console.log(res);
      let { code, data } = res;
      if(code==='0'){
        this.data.upToken = data
      }
      // this.initQiniu(data);
    });
  },
  onTabChange(event) {},
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
      var key = Math.random().toString(36).substr(2); //生成一个随机字符串的文件名
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
    var filePath = this.data.fileimgsList;
    var file_length = filePath.length;
    let that = this
    var getImgData =[]
      for(var i = 0; i < file_length; i++){
          wx.showLoading()
          var getfilePath = that.data.fileimgsList[i].tempFilePath;
          var d = await this.getURl(getfilePath)
          console.log('this.getURl(getfilePath)',d )
          getImgData.push(d)
      }
      // console.log('-------that.data.imglist-----', getImgData.join(','))
      let params = {
        userId:wx.getStorageSync('userId') || '',
        articleType:1, //根据跳转判断
        title:that.data.titlemessage,
        imgType:1,
        coverPath:'', //封面图片地址
        imgPath:getImgData.join(','),
        topic:that.data.topicText.name,//话题
        content:that.data.textmessage,
        cityName:'',
        latitude:that.data.latitude,
        longitude:that.data.longitude,
        address:'',
        userIds:that.data.userIds,//@多个用户
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
            console.log(status)
            console.log(result)
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
