// pages/order/order.js
const DB = wx.cloud.database();
const MyOrder = DB.collection("MyOrder");
const _ = DB.command;

Page({
  data: {
    openID: '',
    myOrder: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.openID);
    let that = this;  

    if(!options.openID) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })

      setTimeout(function () {
        wx.switchTab({
          url: '../my/my',
        });
      }, 2000)
    }

    MyOrder.where({
      _openid: options.openID,
      canceled: false
    }).get({
      success: function(res){
        // console.log(res.data);
        that.setData({
          openID: options.openID,
          myOrder: res.data   //.reverse()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})