const app = getApp();
const config = require('./config');
const Toptips = require('../../dist/toptips/toptips');

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
      Toptips('用户名和密码不能为空');
    } else {
      wx.login({
        success(res) {
          if(res.errMsg !== 'login:ok') {
            Toptips('获取code失败请联系管理员');
          } else {
            const code = res.code;

            wx.request({
              url: `${app.globalData.url}/login`,
              method: 'POST',
              header: 'application/json',
              data: {
                code,
                userName,
                password
              },
              success(res) {
                console.log(res);
              }
            });
          }
        }
      })
      return false;


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