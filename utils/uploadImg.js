
// 上传图片 url 提交地址的路径 filePath 本地地址 name
const upLoadImages = (filePath) => {
  return new Promise((reslove) => {
    // 可以通过这个uploadTask 来获取上传的 进度 文件大小
    wx.uploadFile({
      url: 'https://sm.ms/api/v2/upload', 
      filePath: filePath,
      name: 'smfile',
      formData: {},
      success (res){
        // 
        console.log('上传成功',res);
      }
    })
      
  })
}

module.exports = {
  upLoadImages
}