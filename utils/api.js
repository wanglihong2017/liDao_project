const { request } = require('./request')
const api_getCity = (params)=> request('https://apis.map.qq.com/ws/geocoder/v1',{...params})
const baseUrl = 'https://mini.lidaokoi.com'
const api_checktiken = (params) => request(baseUrl +'/luckyfish/login/v1/checkToken',{...params}) //检测token
const api_getPhoneNo = (params) => request(baseUrl +'/luckyfish/login/v1/getPhoneNo',{...params}) //检测token
const api_login = (params) => request(baseUrl +'/luckyfish/login/v1/login',{...params},'POST') //检测token
const api_getFollowUser =  (params) => request(baseUrl +'/luckyfish/user/v1/getById',{...params},'GET',2) //获取用户信息
const api_getFishList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getFishList',{...params}) //鱼友列表
const api_onlineAsk = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/onlineAsk',{...params}) //在线问诊列表
const api_getToken = (params) => request(baseUrl +'/luckyfish/qiniu/v1/getToken',{...params},'GET',2) //在线问诊列表
const api_getDetails = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getDetail',{...params}) //获取帖子详情 
const api_delete = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/delete',{...params},'POST',2) //删帖功能
const api_giveUp = (params) => request(baseUrl +'/luckyfish/oper/v1/giveUp',{...params},'POST',2) //点赞功能
const api_getCommentList = (params) => request(baseUrl +'/luckyfish/comment/v1/getCommentList',{...params}) //获取评价列表
const api_addComment = (params) => request(baseUrl +'/luckyfish/comment/v1/add',{...params},'POST',2) //发表评价
const api_addfisharticle = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/add',{...params},'POST',2) //发表图文
const api_getFollowFish = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getFollowFish',{...params},'GET',2) //首页关注
const api_getUserFollowFish = (params) => request(baseUrl +'/luckyfish/user/v1/getMyFollowUser',{...params},'GET',2) //我的关注
const api_getfollowUserList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/followUserList',{...params},'GET',2) //我的关注详情
const api_getMyData = (params) => request(baseUrl +'/luckyfish/my/v1/getMyData',{...params},'GET',2) //我的点赞收藏
const api_getUserFishList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getUserFishList',{...params},'GET',2) //我的发布
const api_getCollectionFishList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getCollectionFishList',{...params},'GET',2) //我的发布
const api_collectionUp = (params) => request(baseUrl +'/luckyfish/oper/v1/collectionUp',{...params},'POST',2) //收藏按钮
const api_nearbyFish = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/nearbyFish',{...params},'GET',2) //发表图文
const api_addFollow = (params) => request(baseUrl +'/luckyfish/user/v1/addFollow',{...params},'POST',2) //关注
const api_getNewMessage = (params) => request(baseUrl +'/luckyfish/message/v1/getNewMessage',{...params},'GET',2) //消息通知
const api_getNewMessageList = (params) => request(baseUrl +'/luckyfish/message/v1/getList',{...params},'GET',2) //消息列表
const api_getDraftList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getDraftList',{...params},'GET',2) //草稿箱消息
const api_getFollowMe = (params) => request(baseUrl +'/luckyfish/user/v1/getFollowMe',{...params},'GET',2) //我的粉丝
const api_deleteDraft = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/deleteDraft',{...params},'POST',2) //我的粉丝 
const api_read = (params) => request(baseUrl +'/luckyfish/message/v1/read',{...params},'POST',2) //消息已读
const api_userinfo = (params) => request(baseUrl +'/luckyfish/user/v1/update',{...params},'POST',2) //修改个人信息
const api_getOtFishList = (params) => request(baseUrl +'/luckyfish/fisharticle/v1/getOtFishList',{...params},'GET',2) //修改个人信息
const api_getTargetUserInfo = (params) => request(baseUrl +'/luckyfish/user/v1/getTargetUserInfo',{...params},'GET',2) //修改个人信息
const api_getHuatiList = (params) => request(baseUrl +'/luckyfish/topic/v1/getList',{...params},'GET',2) //话题列表
module.exports = {
    api_getCity,
    api_checktiken,
    api_login,
    api_getPhoneNo,
    api_getFollowUser,
    api_getFishList,
    api_onlineAsk,
    api_getToken,
    api_getDetails,
    api_getMyData,
    api_delete,
    api_giveUp,
    api_getCommentList,
    api_addComment,
    api_addfisharticle,
    api_getFollowFish,
    api_getUserFollowFish,
    api_getfollowUserList,
    api_getUserFishList,
    api_getCollectionFishList,
    api_collectionUp,
    api_nearbyFish,
    api_addFollow,
    api_getNewMessage,
    api_getNewMessageList,
    api_getDraftList,
    api_getFollowMe,
    api_deleteDraft,
    api_read,
    api_userinfo,
    api_getOtFishList,
    api_getTargetUserInfo,
    api_getHuatiList
}