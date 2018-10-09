// pages/submission/submission.js
const app = getApp();
const Toast = require('../../dist/toast/toast');
const utils = require('../../utils/util');
const { formatTime } = utils;

Page({
  data: {
    imgList: [],
    weddingTime: '',
    sendTime: ''
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
      success: function(res) {
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
   * 表单事件
   */
  upload(e) {
    Toast({
      type: 'loading',
      message: '上传数据中...',
      selector: '#zan-toast-test'
    });

    const _this = this;
    const imgList = this.data.imgList;
    const formData = e.detail.value;

    Object.assign(formData, {
      weddingTime: formatTime(_this.data.weddingTime),
      sendTime: formatTime(_this.data.sendTime, 1),
      salespersonID: app.globalData.openid
    });
    const promiseUpload = new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.url}/order/info`,
        data: formData,
        method: 'GET',
        success(res) {
          resolve(res.data.info.insertId);
        },
        fail(err) {
          reject(err);
        }
      })
    });

    promiseUpload.then((insertId) => {
      for (const item of imgList) {
        wx.uploadFile({
          url: `${app.globalData.url}/order/images`,
          filePath: item,
          name: 'images',
          formData: { insertId },
          success(res) {
            Toast({
              type: 'loading',
              message: `上传图片中...`,
              selector: '#zan-toast-test'
            });
          },
          fail(err) {
            console.log('失败了');
          }
        })
      }
    }).catch((err) => {
      Toptips('上传失败请检查网络或联系管理员');
    });

    promiseUpload.then(()=> {
      // 成功
    });
    
  },

  /**
   * 选择时间
   */
  dateChange(e) {
    const typeId = e.target.dataset.type;
    console.log(e.detail.date);
    const dateTime = new Date(e.detail.date);
    if (typeId == 0) {
      this.setData({
        weddingTime: dateTime
      });
    } else {
      this.setData({
        sendTime: dateTime
      });
    }
    
  }
})