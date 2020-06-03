// 如果使用  async  await 这个es7 的将异步的请求
import regeneratorRuntime from '../../../lib/runtime/runtime.js'
import { createComparisonFunction } from '../../../utils/sort_self.js'

// 引入  用来发送请求的方法  需要将路径补全
import {
  get_demandsInfo,
  get_demand_reply_lea_msg,
  post_demand_reply_lea_msg,
  getUserInfo,
  get_goodsInfo
} from '../../../request/api/store_api.js'

import {
  get_recommend_byProductId,
  get_collect,
  delete_collect,
  isCollect,
  write_msg
} from '../../../request/api/store_front_api.js'

import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

import {
  getTime
} from '../../../utils/getTime.js'
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
    // 需求id
    id: '',
    // 需求的版本
    version:'',
    // 需求的信息
    demandInfo: {},
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
    imgURL: '',
    // 根据商品的id推荐喜欢
    recommend_byId: [],
    // 用户是否收藏了商品
    isCollect: false,
    // 留言输入内容 
    msg_content: '',
    // 举报商品弹出层是否显示
    overlay_show_comm: false,
    // 举报留言弹出层是否显示
    overlay_show_lea: false,
    // 被长按点击的留言id
    lea_msg_id: '',
    // 被长按点击的留言的作者id
    lea_msg_customerId: '',
    // 是否显示主要的内容
    is_show:true
  },
  // 回复
  replyFunc() {
    // console.log('点击了回复');
    this.setData({
      inputShow: !this.data.inputShow
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
  async sendFunc() {
    const access_token = wx.getStorageSync('access_token');
    if (!access_token) {
      // 未登录
      wx.showToast({
        title: '您还未登录',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });

      return
    }
    console.log('点击了发送');
    const {
      id,
      msg_content
    } = this.data

  },
  // 回复商品 
  async sendComm () {
    // demandId   targetId 

  },
  // 获取输入框中数据
  getData(e) {
    const {
      name
    } = e.currentTarget.dataset
    const value = e.detail
    // console.log(name);
    this.setData({
      [name]: value
    })
  },

  // 页面加载  立即根据需求的id获取需求的信息
  async getDemandInfo (id) {
    showLoading(this)
    const {
      data
    } = await get_demandsInfo(id)
    
    hideLoading(this)
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
      this.setData({
        is_show: false
      })
      return
    }
    // console.log('data',data);
    // 
    let arrList = data.data
    // console.log('arrList',arrList);
    let {
      tagNames,
      otherPics,
      consumerId,
      mainPic
    } = arrList
    const strArr = tagNames.split('|')||[]
    // console.log(tagNames);
    
    let otherImgs = otherPics ? (otherPics.split(',')) : []
    otherImgs.unshift(mainPic)
    let imgs = otherImgs.map(v => {
      return `${imgURL}` + v
    });
    // 根据卖家id获得卖家的信息
    const consumerInfo = await this.getUserInfoById(consumerId)
    // console.log(consumerInfo);
    arrList.consumerInfo = consumerInfo
    // 将这三个变量覆盖原来的后台传过来的
    arrList.tagNames = strArr
    arrList.otherImgUrl = imgs
    this.setData({
      demandInfo: arrList,
      version:arrList.version
    })

    this.get_leave_message(id)
  },
  // 根据需求的id  查询需求的留言信息  
  async get_leave_message(id) {
    // get_demand_reply_lea_msg   给这个接口传递 5个数据 pageSize,currentPage,goodsId,parentId,firstClassId  后两个数据一级留言直接设置为0
    const {
      currentPage,
      pageSize,
      first_lea_mess
    } = this.data
    const {
      data
    } = await get_demand_reply_lea_msg(pageSize, currentPage, id)
    // console.log(first_lea_messs);
    // 一级留言
    const first_lea_messs = data.data.data || []
    // console.log('一级留言',first_lea_messs);
    first_lea_messs.forEach(async (v, i) => {
      //  根据一级留言的consumerId 查询用户信息
      const consumerInfo = await this.getUserInfoById(v.userId)
      let goodsInfo
      if (v.targetId) {
        goodsInfo = await this.getGoodsInfo(v.targetId)
        v.consumerInfo = consumerInfo
        v.goodsInfo = goodsInfo
        first_lea_mess.push(v)
        first_lea_mess.sort(createComparisonFunction('createTime'))
        this.setData({
          first_lea_mess
        })
      }
    })
    
    const totalCount = data.data.totalCount
    const c_page = currentPage + 1
    this.setData({
      first_lea_mess_TotalCount: totalCount,
      currentPage: c_page
    })

    // 留言板判断当前页是否为最后一页 如果为最后一页 将最后面的那个 加载更多 按钮隐藏
    // 总页数 = 总条数/页面大小
    // 如果当前页 > 总页数  隐藏按钮
    if (c_page>Math.ceil(totalCount/pageSize)) {
      // 已经没有了 隐藏这个按钮
      this.setData({
        isShowMore: false
      })
    }

  },
  // 根据商品的id获取商品的信息
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
    let arrList = data.data
    return arrList
  },
  // 跳转到商品的详情页
  to_comm_detail (e) {
    const { goodsid, state} = e.currentTarget.dataset
    if (state === 4) {
      // 商品已卖出
      Dialog.alert({
        message: '商品已卖出',
      })
      return 
    }
    wx.navigateTo({
      url: `/suppages/store/commodity/commodity?id=${goodsid}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    }); 
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
  // 根据用户id获得用户信息
  async getUserInfoById(consumerId) {
    const {
      data
    } = await getUserInfo(consumerId)
    // console.log(data.data);
    return data.data
  },
  // 根据商品的id 获得推荐的内容
  async get_recommend_byProductId(productId) {
    const {
      recommend_byId
    } = this.data
    const pageSize = 10
    const currentPage = 1
    const {
      data
    } = await get_recommend_byProductId(pageSize, currentPage, productId)
    if (data.code !== 200) {
      return 
    }
    // console.log(data);
    const List = data.data.data || []
    List.map(async (v, i) => {
      const consumerInfo = await this.getUserInfoById(v.consumerId)
      v.consumerInfo = consumerInfo
      recommend_byId.push(v)
      this.setData({
        recommend_byId
      })
    })
    this.setData({
      recommend_byId: List
    })
  },
  // 跳转到选择商品中
  toSelect_comm (e) {
    const { id } = this.data
    // 查看是否用token 判断用户是否已经登陆  如果已经登陆  则可以跳转  
    const token = wx.getStorageSync('access_token')
    if (!token) {
      Dialog.confirm({
        title: '提示',
        message: '您还未登录,请登陆后再来留言哦',
      })
        .then(() => {
          wx.wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        })
        .catch(() => {
          // on cancel
          return
        });
    }
    wx.navigateTo({
      url: `/suppages/demand/demand_select_comm/demand_select_comm?id=${id}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      

    

  },
  // 点击更多
  click_more () {
    // 打开弹框 
    this.setData({
      overlay_show_comm:true
    })
  },
  // 举报求购
  to_report_demand () {
    const { id, demandInfo } = this.data
    const customerId = demandInfo.consumerInfo.userId
    // console.log(customerId);
    wx.navigateTo({
      url: `/suppages/store/commodity_report/commodity_report?type=5&targetid=${id}&customerid=${customerId}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 打开举报留言弹出层
  open_lea_report (e) {
    // console.log(e);
    const { tarid,tarcustomerid } = e.currentTarget.dataset  
    // 打开弹框 
    this.setData({
      overlay_show_lea: true,
      lea_msg_id: tarid,
      lea_msg_customerId:tarcustomerid
    })
  },
  // 隐藏弹出层
  onClickHide_comm() {
    this.setData({ overlay_show_comm: false });
  },
  // 隐藏弹出层
  onClickHide_lea() {
    this.setData({ overlay_show_lea: false });
  },
  // 跳到举报留言的弹出层
  to_report_lea () {
    const { lea_msg_id,lea_msg_customerId } = this.data
    wx.navigateTo({
      url: `/suppages/store/commodity_report/commodity_report?type=2&targetid=${lea_msg_id}&customerid=${lea_msg_customerId}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 跳转到其他的用户页面
  toOtherInfoPage (e) {
    const { userid } = e.currentTarget.dataset
    // console.log(userid);
    wx.navigateTo({
      url: `/suppages/store/other_userInfo_page/other_userInfo_page?userid=${userid}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  // 提交商品留言  demandId   targetId 
  async post_demand_comm (demandId,targetId) {
    const obj = { demandId,targetId }
    const { data } = await post_demand_reply_lea_msg(obj)
    // console.log(data);
    this.get_leave_message(demandId)
  },

  // 预览图片
  previewImage (e) {
    const { imgurl } = e.currentTarget.dataset
    let { otherImgUrl } = this.data.demandInfo
    let { imgURL } = this.data
    console.log(otherImgUrl);
    wx.previewImage({
      current: imgurl,
      urls: otherImgUrl,
      success: (result) => {
        
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {}
    }); 
      
  },
  // 页面开始加载 就会触发
  onLoad: function(option) {
    // 这个就是上个页面传过来的需求id 根据这个id值获取需求的详细信息和需求的发布者信息 留言板信息
    // console.log(option.id);
    this.setData({
      id: option.id,
      imgURL
    })
    // 获得需求信息
    this.getDemandInfo(option.id)
    // 获得留言信息
    // this.get_leave_message(option.id)
    // 获得推荐信息
    // this.get_recommend_byProductId(option.id)
    
  },
  onShow: function() {
    // 需求id
    const { id } = this.data
    let commodityId
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptSelectComm', function(data) {
      // 选择的商品的id
      const { goodsInfo } = data
      console.log('goodsInfo',goodsInfo);
      commodityId = goodsInfo.id
    })
    this.post_demand_comm(id,commodityId)
    this.setData({
      currentPage: 1,
      pageSize: 5,
      // 一级留言
      first_lea_mess: [],
    })
    
  }
})