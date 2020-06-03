// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsInfo,
  getCategoryTree,
  put_goods,
  put_goods_edit,
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
  imgURL
} = app.globalData


// suppages/release/release_product/release_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制选择分类框的显示
    cateShow: false,
    // 价格
    price: '',
    // 新旧程度
    degreeValue: '',
    // 主图
    mainImg: '',
    // 用于提交后台的主图
    mainImgaddress: '',
    // 组件展示用  附图
    fileList: [],
    // 用于提交后台的附图 
    fileListaddress: [],
    // 测试多选框
    way_checkbox_items: [{
        name: '自提',
        value: '1',
        checked: false
      },
      {
        name: '面交',
        value: '2',
        checked: true
      },
      {
        name: '快递',
        value: '3',
        checked: false
      }
    ],
    // 测试单选框
    type_ridio_items: [{
        name: '正常交易',
        value: '10',
        checked: false
      },
      {
        name: '公益捐赠',
        value: '20',
        checked: false
      },
    ],
    // 页面如果是正在编辑 其id值
    id: '',
    // 标签 提供页面渲染 向后台提交的时候需要使用|分割  下面有格式化方法
    tagNames: '',
    // 上传的格式
    upTags: '',
    // 标题
    title: '',
    // 交易类型
    tradeType: '',
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
    addTags:[]
  },
  // 单选框
  handleItemChange(e) {
    const {
      index
    } = e.detail
    const arr = JSON.parse(JSON.stringify(this.data.type_ridio_items))
    arr.forEach((i, v) => v === index ? i.checked = true : i.checked = false)
    this.setData({
      type_ridio_items: arr
    })
  },
  // 多选框
  checkboxItemChange(e) {
    // console.log(e.detail.index);  这个是被点击的索引
    const {
      index
    } = e.detail
    const arrList = JSON.parse(JSON.stringify(this.data.way_checkbox_items))
    arrList.forEach((v, i) => {
      if (i === index) {
        if (v.checked == true) {
          v.checked = false
        } else {
          v.checked = true
        }

      }
    })
    this.setData({
      way_checkbox_items: arrList
    })
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
          mainImgaddress: `${geturl.text}`
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
    const {
      fileList,
      fileListaddress
    } = this.data

    fileList.push({
      url: `${imgURL}${url}`
    })
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
  // 点击立即发布 
  /* 需要进行的  获取每一项中的数据 判断合法性 然后提交 */
  // submit_btn() {
  //   console.log(this.data.titleValue);
  //   const {
  //     titleValue,
  //     mainImageUrl,
  //     mian_desc,
  //     price,
  //     upTags
  //   } = this.data
  //   if (!titleValue.trim() || !mian_desc.trim() || !price.trim() || !upTags.trim()) {
  //     // 输入不合法
  //     wx.showToast({
  //       title: '输入不合法',
  //       icon: 'none',
  //       //  禁止用户手抖连续点击
  //       mask: true
  //     });
  //   }
  //   // 发起请求 提交  提交成功 提醒用户成功  向后回退一页 到我的需求
  //   wx.showToast({
  //     title: '发布成功',
  //     icon: 'success',
  //     image: '',
  //     duration: 3000,
  //     mask: true,
  //     success: (result) => {
  //       setTimeout(() => {
  //         wx.navigateBack({
  //           delta: 1
  //         });
  //       }, 3000)
  //     },
  //     fail: () => {},
  //     complete: () => {
  //       console.log('成功');
  //     }
  //   });
  // },
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
    const {
      cateChlidren
    } = this.data
    // 根据组件传过来的数据  让cate显示指定的值
    const cate = cateChlidren.filter((v) => {
      if (v.id === e.detail) {
        return v
      }
    })
    // console.log(cate[0].text);
    this.setData({
      cateShow: false,
      cateId: e.detail,
      cateValue: cate[0].text
    })
  },

  // 根据上一个页面传过来的id值获取这个商品的详细数据
  async getGoodsInfo (id) {
    showLoading(this)
    const {
      data
    } = await get_goodsInfo(id)
    if (data.code !== 200) {
      wx.showToast({
        title: '获取信息成功',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      hideLoading(this)
      return
    }
    // 获取信息成功 将信息包装回显到页面上
    // console.log(data.data);
    const {
      categoryId,
      mainPicUrl,
      otherImgUrl,
      oldDegree,
      salePrice,
      tagNames,
      title,
      tradeType,
      productDesc
    } = data.data
    const tags = this.toTags(tagNames)
    const mainImg = `${imgURL}${mainPicUrl}`
    const mainImgaddress = `${mainPicUrl}`
    const otherPicss = otherImgUrl ? otherImgUrl.split(',') : []
    const otherImages = otherPicss.map((v, i) => {
      const url = v
      return {
        url: `${imgURL}${url}`
      }
    })
    const fileListaddress = otherPicss
    // const fileListaddress = upaddress.join(',')
    console.log('图片列表', fileListaddress);
    // 交易方式的回显  将tradeType的值 与 单选框数据中value对比 返回一致的
    const {
      type_ridio_items
    } = this.data
    type_ridio_items.forEach((v, i) => {
      if (v.value == tradeType) {
        v.checked = true
      }
    })
    // 分类的回显  避免在代码走到这个位置仍然为获取这个分类树  让其阻塞在获取一次这个分类树
    await this.getCateTree()
    const {
      cateChlidren
    } = this.data
    // 根据组件传过来的数据  让cate显示指定的值
    const cate = cateChlidren.filter((v) => {
      if (v.id === categoryId) {
        return v
      }
    })
    if (!cate[0]) {
      cate[0] = cateChlidren[0]
    }
    this.setData({
      price: salePrice,
      degreeValue: oldDegree,
      mainImg: mainImg,
      fileList: otherImages,
      tagNames: tags,
      title: title,
      tradeType,
      productDesc,
      type_ridio_items,
      cateId: categoryId,
      cateValue: cate[0].text,
      mainImgaddress,
      fileListaddress
    })
    hideLoading(this)
  },

  // 获得商品分类树形
  async getCateTree() {
    const {
      data
    } = await getCategoryTree()
    // console.log('分类', data);
    // 对传过来的数据进行包装存到data里面 传给子组件
    const list = data.data
    const {
      cateChlidren
    } = this.data
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
      cateChlidren: cateChlidren
    })
  },

  // 点击立即发布
  async submit_btn() {

    // 如果data里面的id值不为空  存在的话 进行编辑修改   提交的时候使用这个接口
    // 格式化标签
    this.getUpTags()
    // 根据选择的交易方式提取其value值赋值给tradeType
    const {
      type_ridio_items
    } = this.data
    let i = 10; //默认为正常交易
    type_ridio_items.forEach(v => {
      if (v.checked === true) {
        i = v.value
      }
    })
    console.log(i);
    // 获得附图的字符串形式
    const {
      fileListaddress
    } = this.data
    const fileListStr = fileListaddress.join(',')
    // 将数据包装到一起发给后台
    const {
      title,
      price,
      degreeValue,
      mainImgaddress,
      upTags,
      productDesc,
      cateId,
      id
    } = this.data
    // 如果这里面的id存在 则表示是正在编辑  走编辑的接口  否则走提交的接口
    let res;
    if (id) {
      // 编辑接口
      res = await put_goods_edit({
        categoryId: cateId,
        mainPicUrl: mainImgaddress,
        otherImgUrl: fileListStr,
        title,
        oldDegree: degreeValue,
        salePrice: price,
        tagNames: upTags,
        tradeType: i-0,
        productDesc: productDesc
      })
    } else {
      // 发布接口
      res = await put_goods({
        categoryId: cateId,
        mainPicUrl: mainImgaddress,
        otherImgUrl: fileListStr,
        title,
        oldDegree: degreeValue,
        salePrice: price,
        tagNames: upTags,
        tradeType: i-0,
        productDesc: productDesc
      })
    }
    console.log(res);
    if (res.data.code !== 200) {
      wx.showToast({
        title: '发布失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
        
      return
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
      success: (result) => {
        wx.navigateBack({
          delta: 1
        });      
      },
      fail: () => {},
      complete: () => {}
    });
      

  },
  // 根据标题获取智能推荐的关键词
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
    this.getCateTree()
    if (options.id) {
      this.getGoodsInfo(options.id)
      this.setData({
        id: options.id
      })
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