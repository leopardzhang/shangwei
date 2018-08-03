const config = require('./config');
const Toast = require('../../dist/toast/toast');

Page({
  data: {
    userInfo: {
      userName: '',
      password: ''
    },
    gettingData: false
  },
  onLoad(params) {

  },

  /**
   * 登录
   */
  formSubmit(data) {
    const {
      userName,
      password
    } = data.detail.value;
    
    if (userName === '' || password === '') { // 用户名密码没填
      Toast({
        message: '用户名或密码不能为空',
        selector: '#zan-toast'
      });
    } else {
      this.setData({
        gettingData: true
      });
      
      setTimeout(() => {
        this.setData({
          gettingData: false
        });

        wx.switchTab({
          url: '../submission/submission',
        })
      }, 1000);
    }
  }
});