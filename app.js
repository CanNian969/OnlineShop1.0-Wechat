// app.js
App({
  onLaunch() {
    // 云数据库初始化
    wx.cloud.init({
      env: 'onlineshop-7azxl'
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // 便捷分类导航传值
    cap_item_index: 0
  },

  // get Times "2021-9-3-21:38"
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }

    if (minutes >= 1 && minutes <= 9) {
      minutes = "0" + minutes;
    }

    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month
     + seperator1 + strDate + seperator1 + hours + ":" + minutes;
    return currentdate;
  }
})
