// pages/my/index.js
import { api_login,api_getPhoneNo } from '../../utils/api'
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    companName:'《鲤道用户注册协议》',
    agreementName:'《鲤道隐私政策》',
    agreemenShow:false,
    form:{
      code:'',
      encryptedData:'',
      phoneNo:'',
      iv:''
    },
     actions: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
  },
  getPhoneNumber(e){
    let that = this
    api_getPhoneNo({code:e.detail.code}).then((res)=>{
      let { code,data } = JSON.parse(res)
      if(code==0){
        that.data.form.phoneNo = data
        console.log('参数',that.data.form)
        api_login(that.data.form).then((result)=>{
          let {code,data} = result
          console.log('1111',code)
          if(code==='0'){
            wx.setStorageSync('token', data.token)
            wx.setStorageSync('userId', data.userId)
            wx.setStorageSync('phoneNo', data.phoneNo)
            wx.navigateBack({
              delta: 1
            })
          }
        })

      }
    }).catch((err)=>{
      console.log('1111',err)
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  getUserInfo(event) {
    app.globalData.userInfo = event.detail.userInfo
    this.data.form.encryptedData = event.detail.encryptedData
    this.data.form.iv = event.detail.iv
  },
  onClose(){
    this.setData({checked:false})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   let that = this
    wx.login({
      success(res){
        console.log('11111',res.code)
        that.data.form.code = res.code
      }
    })
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