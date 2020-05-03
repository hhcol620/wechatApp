// loading加载提示
const showLoading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success (res) {
        // console.log('显示loading')
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 关闭loading
const hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading()
    // console.log('隐藏loading')
    resolve()
  })
}

module.exports = {
  showLoading,
  hideLoading
}