// 引入全局的加载效果  加载和隐藏   挂载全局
import { showLoading,hideLoading} from './request/loading.js'


App({
  onLaunch: function () {
   
  },
  // 全局变量或者方法
  globalData: {
    showLoading, hideLoading,
    // 加载图片 基地址
    imgURL: 'http://39.105.0.169:8080/',
    // 上传文件夹的 url
    uploadImgURL:'/file/file'
  }
})
