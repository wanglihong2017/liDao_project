// pages/detailsPage/index.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import {
  api_getDetails,
  api_delete,
  api_giveUp,
  api_getCommentList,
  api_addComment,
  api_collectionUp,
  api_addFollow,
} from "../../utils/api";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    details: {},
    inputValue: "",
    setColor: "#000",
    setNum: 0,
    showBtns: false,
    reviewValue: "",
    likeNum: 0,
    likeColor: "#000",
    starColor: "#000",
    starNum: 0,
    chatNum: 0,
    isMypublish: false,
    commentList: [],
    countNum: 0,
    articleType: 1,
    Height: "",
  },
  deleteBtns() {
    Dialog.confirm({
      title: "温馨提示",
      message: "删除不可恢复,确认删除？",
    }).then(() => {
      api_delete({
        id: this.data.articleId,
        userId: wx.getStorageSync("userId"),
      }).then((res) => {
        let { code } = res;
        if (code === "0") {
          wx.navigateTo({
            url: "/pages/myPublish/index",
          });
        }
      });
    });
  },
  reviewValueonChange(e) {
    this.setData({
      reviewValue: e.detail,
    });
  },
  openSearchBtn() {
    console.log(wx.getStorageSync("token"));
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: "/pages/logo/index",
      });
    } else {
      this.setData({ showBtns: true });
    }
  },
  sendBtns(parentId = "") {
    let params = {
      articleId: this.data.articleId,
      articleType: 1,
      userId: wx.getStorageSync("userId"),
      commentType: 1,
      parentId: "",
      content: this.data.reviewValue,
      userIds: "", //用户id
    };
    api_addComment(params).then((res) => {
      let { code } = res;
      if (code === "0") {
        this.setData({
          reviewValue: "",
        });
        this.getCommentList(this.data.articleId, this.data.articleType);
      }
    });
    this.setData({ showBtns: false });
  },
  onClickHide() {
    this.setData({ showBtns: false });
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = (winWid * imgh) / imgw + "px"; //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH, //设置高度
    });
  },
  api_giveUpBtn(index) {
    //点赞
    let params = {
      userId: wx.getStorageSync("userId"),
      targetUserId: this.data.details.userId,
      id: this.data.articleId,
      articleType: 1,
      upType: 1,
      type: index === 1 ? 0 : 1,
    };
    api_giveUp(params).then((res) => {
      let { code } = res;
      if (code === "0") {
        this.getDetails(this.data.articleId);
      }
    });
  },
  likeBtns(e) {
    this.api_giveUpBtn(e.currentTarget.dataset.isgiveup);
  },
  starBtns(e) {
    let index = e.currentTarget.dataset.collectionqty
    let params = {
      userId: wx.getStorageSync("userId"),
      targetUserId: this.data.details.userId,
      id: this.data.articleId,
      articleType: 1,
      type: index === 1 ? 0 : 1,
    };
    api_collectionUp(params).then((res) => {
      let { code } = res;
      if (code === "0") {
        this.getDetails(this.data.articleId);
      }
    });
  },
  getDetails(id) {
    let params = {
      id,
      userId: wx.getStorageSync("userId") || '',
    };
    api_getDetails(params).then((res) => {
      let { code, data } = res;
      if (code == 0) {
        this.setData({ details: data })
        if(wx.getStorageSync("userId")==data.userId){
          this.setData({isMypublish: true})
         }
      }
    });
  },
  getCommentList(articleId, articleType) {
    let params = {
      userId: wx.getStorageSync("userId") || "",
      articleId,
      articleType,
    };
    let that = this
    api_getCommentList(params).then((res) => {
      let { code, data } = res;
      if (code === "0") {
        that.setData({
          commentList: data.commentList,
          countNum: data.count,
        })
      }
    });
  },
  addFollowBtn(e){
    let index = e.currentTarget.dataset.isfollow
    let params = {
      userId: wx.getStorageSync("userId") || "",
      followUserId:this.data.details.userId,
      type: index === 1 ? 2 :1 ,
    }
    api_addFollow(params).then((res)=>{
       if(res.code === '0'){
        this.getDetails(this.data.articleId);
       }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDetails(options.articleId);
    this.data.articleId = options.articleId;
    this.data.articleType = options.type;
    this.getCommentList(options.articleId, options.type);
    if (app.globalData.userImg) {
      this.setData({
        headImgs: app.globalData.userImg,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
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