// pages/my/my.js
Page({

  data: {
    userInfo: {},
    openID: ""
  },

  handleGetuserinfo() {

    if (!this.data.userInfo.nickName) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res);
          wx.setStorageSync("userInfo", res.userInfo);
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }//if END

    wx.cloud.callFunction({
      name: 'getOpenID'
    }).then(res => {
      // console.log(res);
      wx.setStorageSync("openID", res.result.openid);
      this.setData({
        openID: res.result.openid
      })
    })
  },

  onShow(){
    let userInfo = wx.getStorageSync("userInfo") || {};
    let openID = wx.getStorageSync("openID") || "";

    this.setData({
      userInfo,
      openID
    })
  }
})