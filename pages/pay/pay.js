// pages/shop/shop.js
const DB = wx.cloud.database();
const MyOrder = DB.collection("MyOrder");
const GoodsDetail = DB.collection("GoodsDetail");
const _ = DB.command;

const app = getApp();

Page({
  data: {
    // isEmpty: true,
    // allChecked: false,
    address: {},
    total_price: 0,
    total_num: 0,
    // editable: false,
    shopcart: [

    ],

    items: [
      {value: '自提'},
      {value: '邮寄'}
    ],

    pickupValues: []
  },
  get_address() {
    let that = this;
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        // console.log(result);
        const scope_address = result.authSetting["scope.address"];


        if (scope_address === false) {
          wx.openSetting({
            success: (result2) => {

              wx.chooseAddress({
                success: (result3) => {
                  // res = result3; 
                  wx.setStorageSync("address", result3);
                  // console.log(result3);
                },
              });
            }
          });
        }
        // if end

        wx.chooseAddress({
          success: (result1) => {
            // res = result1;
            console.log(result1);
            wx.setStorageSync("address", result1);
            that.setData({
              address: result1
            })
          },
        });
        // console.log(res);

      }
    });


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

  handlePay() {
    let that = this;

    if (!that.data.address.userName) {
      wx.showToast({
        title: '地址未填写',
        icon: 'none'
      });
      return;
    }
    if (!that.data.total_price) {
      wx.showToast({
        title: '未添加商品',
        icon: 'none'
      });
      return;
    }
    if (!that.data.pickupValues.length) {
      wx.showToast({
        title: '请选择取货方式',
        icon: 'none'
      });
      return;
    }

    //get some key-value about shopCart
    let obj = that.data.shopcart;
    var order = [];
    for (var i = 0; i < obj.length; i++) {
        order.push({
          "goods_name": obj[i].goods_name,
          "goods_id": obj[i].goods_id,
          "current_price": obj[i].current_price,
          "num": obj[i].num,
          "origin_price": obj[i].origin_price,
          "goods_img": obj[i].goods_img
        });
    }
    let times = app.getNowFormatDate();
    console.log(times);
    // upload order
    MyOrder.add({
        data: {
          order: order,
          address: that.data.address,
          times,
          total_price: that.data.total_price,
          confirm_receipt: false, //确认收货
          canceled: false, //是否取消
          pickup: that.data.pickupValues[0] //取货方式
        }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      // 防止用户多次点击
      mask: true
    })
    wx.setStorageSync("cart", []);
    setTimeout(function () {
      wx.switchTab({
        url: '../my/my',
      });
    }, 2000)


  },

  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    const items = this.data.items;
    const values = e.detail.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;
      // console.log(values[values.length - 1]);

      if (items[i].value === values[values.length - 1]) {
        items[i].checked = true;
        console.log(values[values.length - 1]);
      }
    }
    this.setData({
      items,
      pickupValues: values
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let address = wx.getStorageSync("address");
    var cart = [];

    let that = this;
    // 为订单信息加料
    if (Object.keys(options).length > 0) {
      GoodsDetail.where({
        goods_id: Number(options.goods_id)
      }).get({
        success: function (res) {
          cart.push(res.data[0]);
          cart[0].num = 1;
          cart[0].checked = true;
          console.log(cart, "123");
          that.setData({
            shopcart: cart,
            address
          })
          that.cal_total_price();
        }
      })
    } else {
      cart = wx.getStorageSync("cart") || [];

      this.setData({
        shopcart: cart,
        address
      })
      this.cal_total_price();

    }
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

})