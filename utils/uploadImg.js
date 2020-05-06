const app = getApp()
// 引入全局  请求加载动画方法
const { uploadImgURL } = app.globalData

// 上传图片 url 提交地址的路径 filePath 本地地址 name
const upLoadImages = (filePath) => {
  return new Promise((reslove) => {
    // 可以通过这个uploadTask 来获取上传的 进度 文件大小
    wx.uploadFile({
      // url: 'https://www.imuster.top/api/file/file', 
      url: `${uploadImgURL}`, 
      filePath: filePath,
      name: 'file',
      formData: {},
      success (res){
        // 
        // console.log('上传成功', res);
        reslove(res)
      }
    })
      
  })
}

module.exports = {
  upLoadImages
}