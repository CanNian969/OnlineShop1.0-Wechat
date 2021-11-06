// pages/Main/Main.js
const DB = wx.cloud.database();
const Main = DB.collection("Main");
const _ = DB.command

Page({
  data: {
    // 首页出现的精选产品图片
    ad_img: [],

    // 下面的便捷分类导航
    cap_img: [],

    // 轮播图
    swiper_img:[],

    // 各种板块及商品推荐
    up_plate: [

    ],
    down_plate: [

    ],
    // 各种板块及商品推荐
    Plates: []
  },

  cap_item_index(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    getApp().globalData.cap_item_index = index;

  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let that = this;
    Main.doc("14139e12612ef296086ea62266ecbb61").get({
      success:function(res) {
        that.setData({
          ad_img: res.data.ad_img,
          cap_img: res.data.cap_img,
          swiper_img: res.data.swiper_img,
          Plates: res.data.Plates
        })
      // console.log(res);
      }
    })

  },

})