// pages/goods_detail/goods_detail.js
const DB = wx.cloud.database();
const GoodsDetail = DB.collection("GoodsDetail");
const _ = DB.command;

Page({
  data: {
    goods_detail: {}
  },
  // switch to Tab
  switchTab() {
    wx.switchTab({
      url: '../Main/Main'
    })
  },
  // switch to Cart
  switchCart() {
    wx.switchTab({
      url: '../shopCart/shopCart'
    })
  },

  //Add shopcart
  handleAddCart: function () {
    // 从缓存中获取购物车信息
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.data.goods_detail.goods_id);

    console.log(index);
    if (index === -1) {
      // 第一次添加
      this.data.goods_detail.num = 1;
      this.data.goods_detail.checked = true;
      cart.push(this.data.goods_detail);
    }
    else {
      // 已经存在于购物车了
      cart[index].num++;
    }
    // 将购物车信息加入缓存
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户多次点击
      mask: true
    });
  }
  ,
  // 客服
  handleContact: function(e) {
    // console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    GoodsDetail.where({
      goods_id: Number(options.goods_id)
      // _id: "5b5be87f612f6cf5029a48543364084a"
    }).get({
      success: function (res) {
        // console.log(res.data);
        that.setData({
          goods_detail: res.data[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})