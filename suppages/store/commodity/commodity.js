// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
// 引入  用来发送请求的方法  需要将路径补全
import {
  get_goodsInfo,
  get_leave_message_first,getUserInfo
} from '../../../request/api/store_api.js'

import { getData } from '../../../request/index.js'
//index.js
//获取应用实例
const app = getApp()
// 引入全局  请求加载动画方法
const {
  showLoading,
  hideLoading,
  imgURL
} = app.globalData

Page({
  data: {
    // 展示输入框
    inputShow: false,
    // 设置输入框位置
    keyBoardHeight: "0px",
    // 商品id
    id: '',
    // 商品的信息
    goodsInfo: {},
    // 留言当前页 
    currentPage: 1,
    pageSize: 5,
    // 一级留言
    first_lea_mess: [],
    // 一级留言总数
    first_lea_mess_TotalCount: 0,
    // 控制查找更多按钮是否显示
    isShowMore: true,
    // 加载图片基地址
    imgURL:''
  },
  // 方法
  // 点赞
  upFunc() {
    console.log('点击了点赞');
  },
  // 回复
  replyFunc() {
    console.log('点击了回复');
    this.setData({
      inputShow: !this.data.inputShow
    })
  },
  // 收藏
  collectFunc() {
    console.log('点击了点赞');
  },
  // 立即购买
  toPayFunc() {
    console.log('点击了立即购买,发起请求生成预订单');
    wx.navigateTo({
      url: '../creat_order/creat_order',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  // 输入框获得焦点
  inputFocus(e) {
    const h = e.detail.height + 'px'
    console.log(h);
    this.setData({
      keyBoardHeight: h
    })
  },
  // 输入框脱焦
  inputBlur() {
    this.setData({
      inputShow: !this.data.inputShow
    })
  },
  // 点击了发送
  send() {

  },

  // 页面加载  立即根据商品的id获取商品的信息
  async getGoodsInfo(id) {
    const {
      data
    } = await get_goodsInfo(id)
    // console.log(data);
    if (data.code !== 200) {
      // 失败
      wx.showToast({
        title: '获取信息失败',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return
    }
    // 
    const arrList = data.data
    const {
      tagNames,
      mainPicUrl,
      otherImgUrl,
      consumerId
    } = arrList
    // console.log(arrList);
    // 将以|分割的字符串转为数组
    const strArr = tagNames.split('|')
    // console.log(str);
    const otherImgs = otherImgUrl ? otherImgUrl.split(',') : []
    // 附图测试
    // const otherImgs = ['/group1/M00/00/01/rBgYGV6RdkOACa0DAABW5M6zRWk259.jpg','/group1/M00/00/01/rBgYGV6RdkOACa0DAABW5M6zRWk259.jpg','/group1/M00/00/01/rBgYGV6RdkOACa0DAABW5M6zRWk259.jpg']
    // 然后循环每一项  对其头部添加前缀
    const imgs = otherImgs.map(v => {
      return `${imgURL}` + v
    });
    const mainImage = `${imgURL}` + mainPicUrl
    // 这是主图
    // console.log(mainImage);

    // 根据卖家id获得卖家的信息
    const consumerInfo = await this.getUserInfoById(consumerId)
    // console.log(consumerInfo);
    arrList.consumerInfo = consumerInfo
    // 将这三个变量覆盖原来的后台传过来的
    arrList.tagNames = strArr
    arrList.otherImgUrl = imgs
    arrList.mainPicUrl = mainImage
    // console.log(arrList);
    this.setData({
      goodsInfo: arrList
    })
  },
  // 根据商品的id  查询商品的留言信息
  async get_leave_message(id) {
    // get_leave_message_first   给这个接口传递 5个数据 pageSize,currentPage,goodsId,parentId,firstClassId  后两个数据一级留言直接设置为0
    const {
      currentPage,
      pageSize,
      first_lea_mess
    } = this.data
    const {
      data
    } = await get_leave_message_first(pageSize, currentPage, id, -1, -1)
    // 一级留言
    const first_lea_messs = JSON.parse(JSON.stringify(data.data.data))
    // console.log(first_lea_messs);
    first_lea_messs.map(async (v, i) => {
      //  根据一级留言的consumerId 查询用户信息
      const consumerInfo = await this.getUserInfoById(v.consumerId)
      console.log(consumerInfo);
      // 第一个参数商品 id 第二个参数为一级留言id 第二个参数需要循环迭代一级留言
      const sec = await this.get_leave_message_second(id, v.id)
      // 给一级留言对象添加一个二级留言对象
      v.second_lea_mess = sec
      // 给一级留言对象添加作者信息对象
      v.consumerInfo = consumerInfo
       first_lea_mess.push(v)
       this.setData({
        first_lea_mess
       })
    })
    // console.log(Array.isArray(first_lea_mess));
    const totalCount = data.data.totalCount
    // console.log(totalCount);
    this.setData({
      first_lea_mess_TotalCount: totalCount,
      currentPage: currentPage + 1
    })

    // 留言板判断当前页是否为最后一页 如果为最后一页 将最后面的那个 加载更多 按钮隐藏
    // 总页数 = 总条数/页面大小
    // 如果当前页 >= 总页数  隐藏按钮
    const {
      first_lea_mess_TotalCount
    } = this.data
    if ((Math.ceil(first_lea_mess_TotalCount / pageSize)) <= currentPage) {
      // 已经没有了 隐藏这个按钮
      this.setData({
        isShowMore: false
      })

    }

  },
  // 获得更多的一级留言  点击加载更多的留言
  get_more(e) {
    // 商品id值
    // console.log(e.currentTarget.dataset);
    // 
    const {
      id
    } = e.currentTarget.dataset
    const goodsId = id
    this.get_leave_message(goodsId)
  },
  // 根据一级留言查询其下的留言信息
  async get_leave_message_second(id, firstClassId) {
    const pageSize = 5
    const currentPage = 1
    const {
      data
    } = await get_leave_message_first(pageSize, currentPage, id, 0, firstClassId)
    // console.log('一级留言下信息', data);
    return data.data.data
  },
  // 根据用户id获得用户信息
  async getUserInfoById (consumerId) {
    const { data } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },
  // 页面开始加载 就会触发
  onLoad: function(option) {
    // 这个就是上个页面传过来的商品id 根据这个id值获取商品的详细信息和商品的发布者信息 留言板信息
    // console.log(option.id);
    this.setData({
      id: option.id,
      imgURL
    })
    this.getGoodsInfo(option.id)
    this.get_leave_message(option.id)
  }
})