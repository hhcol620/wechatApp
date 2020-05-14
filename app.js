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
    uploadImgURL: 'https://www.imuster.top/api/file/file',
    // uploadImgURL: 'https://222.186.174.9:13163/api/file/file',
    // 请求基地址
    baseUrl: "https://222.186.174.9:13163/api"
    // const baseUrl = "https://www.imuster.top/api"
  }
})
