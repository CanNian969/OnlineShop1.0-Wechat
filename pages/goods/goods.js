// pages/goods/goods.js
const DB = wx.cloud.database();
const Main = DB.collection("Main");
const _ = DB.command

Page({
  data: {
    // 左侧菜单数据
    left_plate: [

    ],
    // 右侧商品数据
    right_plate: [

    ],

    current_index: 0,

    scroll_top: 0
  },
  // 各种板块及商品推荐
  Plates: [],
  // 左侧菜单切换
  left_tap_active: function (e) {
    // console.log(e);
    const current_index = e.currentTarget.dataset.index;
    this.setData({
      current_index,
      right_plate: this.Plates[current_index].children,
      scroll_top: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    Main.doc("14139e12612ef296086ea62266ecbb61").get({

      success: function (res) {
        that.Plates = res.data.Plates;
        
        let left_plate = that.Plates.map(v => v.plate_name);
        console.log(left_plate);
        const index = getApp().globalData.cap_item_index;
        that.setData({
          left_plate,
          current_index: index,
          right_plate: that.Plates[index].children
        });
        getApp().globalData.cap_item_index = 0;
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 这里有个错误,right_plate在(第一次打开)该页面时，
    // 因为获取right_plate比Plates快，所以会报错(空数组)

    const index = getApp().globalData.cap_item_index;
    this.setData({
      current_index: index,
      right_plate: this.Plates[index].children
    });
    getApp().globalData.cap_item_index = 0;
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

  }
})