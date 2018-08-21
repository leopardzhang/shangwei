const app = getApp();
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
    const _this = this;
    this.setData({
      gettingData: true
    });
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
                if(res.data.code !== 0) {
                  Toptips('用户名或密码错误');
                } else {
                  app.globalData.openid = res.data.openid;
                  wx.switchTab({
                    url: '../submission/submission',
                  })
                }
              },
              complete() {
                _this.setData({
                  gettingData: false
                });
              },
              fail() {
                Toptips('登录失败！请检查网络状态');
              }
            });
          }
        }
      });
    }
  }
});