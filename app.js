// 引入全局的加载效果  加载和隐藏   挂载全局
import { showLoading,hideLoading} from './request/loading.js'


App({
  onLaunch: function () {
   
  },
  // 全局变量或者方法
  globalData: {
    showLoading, hideLoading,
    // 加载图片 基地址
    imgURL: 'https://www.imuster.top/img',
    // 上传文件夹的 url
    uploadImgURL:'https://www.imuster.top/api/file/file'
  }
})
