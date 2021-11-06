// pages/shop/shop.js
const DB = wx.cloud.database();
const ShopCart = DB.collection("ShopCart");
const _ = DB.command

Page({
  data: {
    isEmpty: true,
    allChecked: false,
    total_price: 0,
    total_num: 0,
    editable: false,
    shopcart: [

    ]
  },

  handlePay() {
    let { total_num } = this.data;
    if (total_num == 0) {
      wx.showToast({
        title: '您还未选择商品',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return;
    }

    wx.navigateTo({
      url: '../pay/pay'
    });

  },

  nav_goods() {
    wx.switchTab({
      url: '../Main/Main'
    })
  },

  onTap() {
    wx.switchTab({
      url: '../Main/Main'
    })
  },

  cal_total_price() {
    let cart = this.data.shopcart;
    let total_price = 0, total_num = 0;
    for (let j = 0, len = cart.length; j < len; j++) {
      if (cart[j].checked == true) {
        total_price += cart[j].num * cart[j].current_price;
        total_num += cart[j].num;
      }
    }
    this.setData({
      total_price,
      total_num
    })
  },

  handlecheckbox(e) {
    const { id } = e.currentTarget.dataset;

    let cart = this.data.shopcart;

    const index = cart.findIndex(v => v.goods_id === id);

    cart[index].checked = !cart[index].checked;

    const allChecked = cart.every(v => v.checked);

    this.setData({
      shopcart: cart,
      allChecked
    })
    wx.setStorageSync("cart", cart);

    this.cal_total_price();
  },

  edit_num(e) {
    const { opreation, id } = e.currentTarget.dataset;

    let cart = this.data.shopcart;

    const index = cart.findIndex(v => v.goods_id === id);

    if (cart[index].num == 1 && opreation == -1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          }
        }
      });
    } else {
      cart[index].num += opreation;
      this.setCart(cart);
    }



    // this.setData({
    //   shopcart: cart  
    // })
    // wx.setStorageSync("cart", cart);
    // console.log(cart);

    // this.cal_total_price();
  },

  selector_all() {
    let allChecked = this.data.allChecked;
    let cart = this.data.shopcart;

    if (allChecked) {
      for (let j = 0, len = cart.length; j < len; j++) {
        cart[j].checked = false;
      }
      allChecked = false;
    } else {
      for (let j = 0, len = cart.length; j < len; j++) {
        if (cart[j].checked == false) {
          cart[j].checked = true;
        }
      }
      allChecked = true;
    }
    this.setCart(cart);
    // this.setData({
    //   allChecked,
    //   shopcart: cart
    // })
    // wx.setStorageSync("cart", cart);

    // this.cal_total_price();
  },


  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let total_price = 0;
    let total_num = 0;
    cart.forEach(v => {
      if (v.checked) {
        total_price += v.num * v.current_price;
        total_num += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      shopcart: cart,
      total_price,
      total_num,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    let cart = wx.getStorageSync("cart") || [];
    // console.log(cart);

    const allChecked = cart.every(v => v.checked);

    if (cart.length == 0) {
      this.setData({
        isEmpty: true
      })
    } else {
      this.setData({
        isEmpty: false,
        shopcart: cart,
        allChecked
      })
    };
    this.cal_total_price();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  // onHide: function () {    
  //   // get OPENID for cloud ShopCart
  //   wx.cloud.callFunction({
  //     name: "getOpenID",
  //   }).then(res => {
  //     console.log(res.result.openid);

  //     // upload ShopCart
  //     /**
  //      * 1. Find Openid
  //      * 2. add/update shopcart depends on if openid exits or not
  //      */
  //     ShopCart.where({
  //       _openid: res.result.openid
  //     }).get().then(res2 => {
  //       console.log(res2);
  //       // Add shopcart
  //       if (res2.data.length == 0) {
  //         ShopCart.add({
  //           data: {
  //             shopcart: this.data.shopcart
  //           }
  //         })
  //         console.log("add");
  //       } else {
  //         // Update shopcart
  //         ShopCart.where({
  //           _openid: res.result.openid
  //         }).update({
  //           data: {
  //             shopcart: this.data.shopcart
  //           },
  //         })
  //         console.log("update");
  //       }//if else END

  //     })// upload ShopCart  END


  //    });//cloud.callFunction END
  // },

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