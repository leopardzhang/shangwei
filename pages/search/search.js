Page({
	data: {
		inputValue: '',
		range: [
			'日期',
			'酒店',
			'状态'
		],
		rangeIndex: 0
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
	}
});
