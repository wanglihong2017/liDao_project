// pages/set/index.js
import { api_getToken,api_userinfo} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    fileimgsList:[],
    upToken:''
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
  deleteBtns(e){
    let index = e.currentTarget.dataset.index
    this.data.fileimgsList.splice(index, 1)
    this.setData({
      fileimgsList:this.data.fileimgsList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getToken()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.data.value = event.detail
  },
  uploadsimgs(){
    let that = this
    wx.chooseMedia({
      count: 1,
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
  async submitBtns(){
    let imgPath =  await this.getURl(this.data.fileimgsList[0].tempFilePath)
    let params = {
      id:wx.getStorageSync('userId'),
      userName:this.data.value,
      imgPath
    }
    api_userinfo(params).then((res)=>{
       let { code } = res
       if(code==='0'){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })  
       setTimeout(()=>{
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })    
       },2000)  
       }
    })
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