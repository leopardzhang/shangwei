const app = getApp();
const Toptips = require('../../dist/toptips/toptips');

Page({
  data: {
    userInfo: {
      userName: '',
      password: ''
    },
    gettingData: false,
    items: [{
        name: '1',
        value: '统筹师',
        checked: 'true'
      },
      {
        name: '2',
        value: '花艺师'
      }
    ],
    identity: '1'
  },
  onLoad() {
    wx.getStorage({
      key: 'openid',
      success(res) {
        app.globalData.openid = res.data;
        wx.switchTab({
          url: '../submission/submission',
        });
      }
    });
  },

  handleRadioChange(e) {
    this.setData({
      identity: e.detail.detail.value
    })
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
          if (res.errMsg !== 'login:ok') {
            Toptips('获取code失败请联系管理员');
          } else {
            const code = res.code;
            wx.request({
              url: `${app.globalData.url}/login`,
              method: 'POST',
              data: {
                code,
                userName,
                password,
                identity: _this.data.identity
              },
              success(res) {
                const openid = res.data.openid;
                wx.setStorage({
                  key: 'openid',
                  data: openid,
                  success(res) {
                    wx.switchTab({
                      url: '../submission/submission',
                    });
                  }
                });
                app.globalData.openid = openid;
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