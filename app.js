// app.js
import { api_checktiken,api_login } from './utils/api'
App({
  onLaunch() {
    // 展示本地存储能力
    const token = wx.getStorageSync('token') || ''
    if(token){
      api_checktiken({token}).then((res)=>{
        let {code} = res
        if(code==='9999'){
          let params = {
            code:'',
            phoneNo:wx.getStorageSync('phoneNo') || '',
            encryptedData:'',
            iv:''
          }
          api_login(params).then((res)=>{
            let {code,data} = result
            if(code==='0'){
              wx.setStorageSync('token', data.token)
              wx.setStorageSync('userId', data.userId)
              wx.setStorageSync('phoneNo', data.phoneNo)
            }
          })
          // wx.navigateTo({
          //   url: '/pages/logo/index'
          // })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    userImg:null,
    othersDetails:null,
    followList:null,
    commentList:null,
    draftBox:null,
    giveUpNum:1,
    headData:null
  }
})
