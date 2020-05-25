// 引入全局的加载效果  加载和隐藏   挂载全局
import { showLoading,hideLoading} from './request/loading.js'


App({
  onLaunch: function() {
    this.setting_Token()
  },
  setting_Token () {
    const token = wx.getStorageSync('access_token');  
    this.globalData.access_token = 'bearer ' + token
    // console.log(this.globalData.access_token);
    const userAccessToken = wx.getStorageSync('userAccessToken');  
    this.globalData.userAccessToken = userAccessToken
  },
  // 全局变量或者方法
  globalData: {
    showLoading, hideLoading,
    // 加载图片 基地址
    imgURL: 'http://39.105.0.169:8080/',
    // 上传文件夹的 url
    uploadImgURL: 'https://www.imuster.top:13163/api/file/file',
    // uploadImgURL: 'https://222.186.174.9:13163/api/file/file',
    // 请求基地址
    // baseUrl: "https://222.186.174.9:13163/api",
    baseUrl: "https://www.imuster.top:13163/api",
    // access_token  请求里面设置的Authorization  当登陆成功设置这个并保存本地一个
    access_token: '',
    // cookie
    userAccessToken:''
  }
})
