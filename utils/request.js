module.exports = {
    request: function (url, data = {}, method = 'GET',type=1) {
    // 此处baseUrl需要从定义的env.js文件中import
     let header = {}
      if(type==1){
        header={
            'Content-type': 'application/x-www-form-urlencoded'
        }
      }else{
        header={
            'Content-type': 'application/x-www-form-urlencoded',
             'token':wx.getStorageSync('token') || ''
        }
      }
        wx.showLoading({
             title: '加载中',
        })
    // 使用Promise封装一层
        return new Promise((resolve, reject) => {
            wx.request({
                url:  url,
                method,
                data,
                header:header,
                // 成功的回调函数
                success(res) {
                    if(res.data.code==='401'){
                        wx.navigateTo({
                            url: '/pages/logo/index'
                        })
                    }
                    else if (res.statusCode === 200) {
                    // 将response的数据resolve出去
                        resolve(res.data)
                        wx.hideLoading()
                    } else {
                        wx.showToast({
                                title: res.data.message,
                                icon: 'error'
                            })
                        reject(res);
                    }
                },
                fail(error) {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'error'
                    })
                    reject(error);
                }
            })
        })
    },
}