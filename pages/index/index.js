// pages/Main/Main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,

    list:[{
      id: 0,
      name: "az"
    },
    {
      id: 1,
      name: "bz"
    },
    {
      id: 2,
      name: "cz"
    },
    {
      id: 3,
      name: "dz"
    },]
  },

  handleInput: function(e){
    console.log(e);

  },
  handletap: function(e){
    // console.log(e);
    // this.data.num++;
    // console.log(this.data.num);   wrong writing
    const operation = e.target.dataset.operation; //correct writing
    console.log(operation);
    this.setData({
      num: this.data.num + operation
    })
  },

})