// pages/submission/submission.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setTimeout(() => {
      this.setData({
        date: new Date('2300/12/12').getTime()
      })
    }, 100)
  },
  /**
   * 用户点击上传图片事件
   */
  choseImg() {
    const _this = this;
    let imgList = _this.data.imgList;
    const num = 9 - imgList.length;

    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        if (res.errMsg === "chooseImage:ok") {
          const tempFilePaths = res.tempFilePaths;

          for (const item of tempFilePaths) {
            imgList.push(item);
          }

          _this.setData({
            imgList
          });
        } else {
          console.log("选择图片失败");
        }
      }
    });
  },

  /**
   * 删除图片
   */
  remove(e) {
    const index = e.target.dataset.index;
    let imgList = this.data.imgList;

    imgList.splice(index, 1);

    this.setData({
      imgList
    })
  },

  /**
   * 上传
   */
  submit() {
    const imgList = this.data.imgList;
    for(const item of imgList) {
      wx.uploadFile({
        url: `${app.globalData.url}/images`,
        filePath: item,
        name: 'images',
        success(res) {
          console.log('success');
        },
        fail(err) {
          console.log('失败了');
        }
      })
    }
  }
})