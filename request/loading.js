// loading加载提示
const showLoading = (items) => {
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true,
    //   success (res) {
    //     resolve(res)
    //   },
    //   fail (err) {
    //     reject(err)
    //   }
    // })
    let that = items
    that.selectComponent("#loading").show();
  })
}

// 关闭loading
const hideLoading = (items) => {
  return new Promise((resolve) => {
    // wx.hideLoading()
    // resolve()
    let that = items
    that.selectComponent("#loading").hide();
  })
}

module.exports = {
  showLoading,
  hideLoading
}