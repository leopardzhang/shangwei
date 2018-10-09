const app = getApp();

Page({
	data: {
		inputValue: '',
		range: [
			'日期',
			'酒店',
			'状态'
		],
		rangeIndex: 0,
    orderList: []
	},

	searchChange(e) {
		this.setData({
			inputValue: e.detail.value
		});
	},

	pickerChange(e) {
		this.setData({
			rangeIndex: e.detail.value
		})
	},

  //搜索事件
  searchDone(e) {
    const _this = this;

    wx.request({
      url: `${app.globalData.url}/order/search`,
      data: {
        type: _this.data.rangeIndex
      },
      method: 'GET',
      success(res) {
        console.log(res);
      },
      fail(err) {
        
      }
    })
  }
});
