// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全

import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import {
  get_demandMessage, getCategoryTree, put_demand,
  post_goods_tag_recommend
} from '../../../request/api/store_api.js'
// 引入上传文件方法 参数就是本地的路径
import {
  upLoadImages
} from '../../../utils/uploadImg.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL,
  uploadImgURL
} = app.globalData


// suppages/release/release_product/release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制选择分类框的显示
    cateShow: false,
    // 主图
    mainImg: '',
    // 用于提交后台的主图
    mainImgaddress:'',
    // 组件展示用  附图
    fileList: [],
    // 用于提交后台的附图 
    fileListaddress: [],
    // 页面如果是正在编辑 其id值
    id: '',
    // 标签 提供页面渲染 向后台提交的时候需要使用|分割  下面有格式化方法
    tagNames: '',
    // 上传的格式
    upTags:'',
    // 标题
    title: '',
    // 描述
    productDesc: '',
    // 商品分类表  用户页面回显和比对提交后台
    getCategoryTree: [],
    // 将所有的二级分类信息存取到这里
    cateChlidren: [],
    // 页面显示的分类
    cateValue: '',
    // 分类的id   后台需要的
    cateId: '',
    // 推荐的标签
    addTags: [],
    // 是否为编辑需求
    isEdit:false
  },


  // 选择主图
  chooseMainImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async (result) => {
        // console.log(result)
        
        const res = await upLoadImages(result.tempFilePaths[0])
        const geturl = JSON.parse(res.data)
        // console.log();
        this.setData({
          mainImg: `${imgURL}${geturl.text}`,
          mainImgaddress:`${geturl.text}`
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 上传附图
  // 上传成功之后
  async afterRead(event) {
    const {
      file
    } = event.detail;
    // console.log(file.path);
    const res = await upLoadImages(file.path)
    // console.log(res);
    const data_get_text = JSON.parse(res.data)
    const url = data_get_text.text
    const { fileList, fileListaddress } = this.data
    
    fileList.push({ url: `${imgURL}${url}` })
    // 存储需要传到后台的附图字符串
    fileListaddress.push(url) 
    this.setData({
      fileList,
      fileListaddress
    })
  },
  // 删除附图的某一项
  deleteItem(event) {
    // 下面是一个项数  删除数组中对应的项
    // console.log(event.detail.index);
    const {
      index
    } = event.detail
    const {
      fileList
    } = this.data
    fileList.splice(index, 1)
    console.log(fileList);
    this.setData({
      fileList
    })

  },
  // 获取输入框中的数据
  getInputData(e) {
    const name = e.target.dataset.name.toString()
    const value = e.detail.value
    this.setData({
      [name]: value
    })
    // console.log(e);
  },
  // 将页面显示的标签重排为后台需要的
  getUpTags() {
    // 将中间的空格分隔 改为 | 分割
    const {
      tagNames
    } = this.data
    const str = tagNames.replace(/\s+/g, '|')
    this.setData({
      upTags: str
    })
  },
  // 将后台传过来的带有 | 的字符串upTags转为页面上用户显示的,请求回来数据调用这个方法就可以了
  toTags(tags) {
    const tagStr = tags.split('|').join(' ')
    return tagStr
  },
  // 打开选择分类框
  openCateShow() {
    this.setData({
      cateShow: true
    })
  },
  // 获取到选择框选择的id值
  getAct(e) {
    // 这个里面就是id值了 然后将这个弹框关闭  通过这个id值让页面上回显出来
    console.log(e.detail);
    const { cateChlidren } = this.data
    // 根据组件传过来的数据  让cate显示指定的值
    const cate = cateChlidren.filter((v) => {
      if (v.id === e.detail) {
        return v
      }
    })
    const cateV = cate[0].text
    this.setData({
      cateShow: false,
      cateId:e.detail,
      cateValue:cateV
    })
  },

  // 根据上一个页面传过来的id值获取这个商品的详细数据
  async getDemandInfo(id) {
    const {
      data
    } = await get_demandMessage(id)
    if (data.code !== 200) {
      wx.showToast({
        title: '获取信息成功',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    // 获取信息成功 将信息包装回显到页面上
    console.log(data.data);
    const {
      categoryId,
      mainPic,
      otherPics,
      tagNames,
      topic,
      content
    } = data.data
    const tags = this.toTags(tagNames)
    const mainImg = `${imgURL}${mainPic}`
    const mainImgaddress =`${mainPic}`
    const otherPicss = otherPics ? otherPics.split(',') : []
    const otherImages = otherPicss.map ((v,i) => {
      const url = v
      return {
        url:`${imgURL}${url}`
      }
    })
    const fileListaddress = otherPicss
    // const fileListaddress = upaddress.join(',')
    // console.log('图片列表',fileListaddress);
    // 分类的回显
    await this.getCateTree()
    const { cateChlidren } = this.data
    console.log('cate',cateChlidren);
    // 根据组件传过来的数据  让cate显示指定的值
    const cate = cateChlidren.filter((v) => {
      if (v.id == categoryId) {
        return v
      }
    })
    if (!cate[0]) {
      cate[0] = cateChlidren[0]
    }
    this.setData({
      mainImg: mainImg,
      fileList: otherImages,
      tagNames: tags,
      title: topic,
      productDesc:content,
      cateId: categoryId,
      cateValue: cate[0].text,
      mainImgaddress,
      fileListaddress
    })
  },

  // 获得商品分类树形
  async getCateTree () {
    const { data } = await getCategoryTree()
    // console.log('分类', data);
    // 对传过来的数据进行包装存到data里面 传给子组件
    const list = data.data
    const {cateChlidren} = this.data
    // console.log(list);
    // 只要这个list里面的两层
    const l = list.map((v, i) => {
      const text = v.name
      const children = v.childs.map((p, q) => {
        let text = p.name
        let id = p.id
        return {
          text,
          id
        }
      })
      cateChlidren.push(...children)
      return {
        text,
        children
      }
    })
    // console.log('cateChlidren',cateChlidren);
    // console.log(l);
    this.setData({
      getCategoryTree: l,
      cateChlidren:cateChlidren
    })
  },

  // 点击立即发布
  async submit_btn () {
    // 格式化标签
    this.getUpTags()
    // 获得附图的字符串形式
    const { fileListaddress } = this.data
    const fileListStr = fileListaddress.join(',')
    // 将数据包装到一起发给后台
    const { title,mainImgaddress,upTags,productDesc,cateId } = this.data
    const res = await put_demand({
      categoryId: cateId,
      mainPic: mainImgaddress,
      otherPics: fileListStr,
      topic:title,
      tagNames:upTags,
      content: productDesc,
      unit:1
    })
    Toast.success('发布成功');
    setTimeout(function() {
        wx.navigateBack({
        delta: 1
      });
    },1000)
      
  },
  // 点击完成
  async finish_submit () {
    // 格式化标签
    this.getUpTags()
    // 获得附图的字符串形式
    const { fileListaddress,id } = this.data
    const fileListStr = fileListaddress.join(',')
    // 将数据包装到一起发给后台
    const { title,mainImgaddress,upTags,productDesc,cateId } = this.data
    const res = await put_demand({
      id:id,
      categoryId: cateId,
      mainPic: mainImgaddress,
      otherPics: fileListStr,
      topic:title,
      tagNames:upTags,
      content: productDesc,
      unit:1
    })
    Toast.success('编辑的内容已经成功提交');
    setTimeout(function() {
        wx.navigateBack({
        delta: 1
      });
    },1000)
      
  },
  async getTagsRecommend () {
    const { title,productDesc } = this.data
    // let str = `${title},${productDesc}`
    let arr = [];
    arr[0] = title
    arr[1] = productDesc
    // console.log(arr);
    let text = arr.join(',')
    // console.log(text);
    if (text.length <= 0) {
      return
    }
    let obj = {text}
    const { data } = await post_goods_tag_recommend(obj)
    // console.log(obj);
    if (data.code !== 200) {
      return 
    }
    this.setData({
      addTags:data.data
    })
  },
  // 点击标签 添加
  addTag (e) {
    const { item } = e.currentTarget.dataset
    const { tagNames,addTags } = this.data
    addTags.forEach((v, i) => {
      if (v === item) {
        addTags.splice(i,1)
      }
    })
    let tagNames_str = tagNames + ' ' + item
    this.setData({
      tagNames: tagNames_str,
      addTags
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { id } = options
    if (id) {
      this.setData({
        isEdit:true
      })
    }
    this.getCateTree()
    if (id) {
      this.getDemandInfo(id)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})