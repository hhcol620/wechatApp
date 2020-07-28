var app = getApp();
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'ws://请填写您的长链接接口地址';
var upload_url ='请填写您的图片上传接口地址'
Page({
  data: {
    user_input_text: '',//用户输入文字
    inputValue: '',
    returnValue: '',
    addImg: false,
    //格式示例数据，可为空
    allContentList: [],
    num: 0
  },
  // 页面加载
  onLoad: function () {
    this.bottom();
  },
  onShow: function (e) {
    if (!socketOpen) {
      this.webSocket()
    }
  },
  // 页面加载完成
  onReady: function () {
    var that = this;
    SocketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
      var onMessage_data = JSON.parse(onMessage.data)
      if (onMessage_data.cmd == 1) {
        that.setData({
          link_list: text
        })
        console.log(text, text instanceof Array)
        // 是否为数组
        if (text instanceof Array) {
          for (var i = 0; i < text.length; i++) {
            text[i]
          }
        } else {
 
        }
        that.data.allContentList.push({ is_ai: true, text: onMessage_data.body });
        that.setData({
          allContentList: that.data.allContentList
        })
        that.bottom()
      }
    })
  },
  webSocket: function () {
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: url,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
 
  // 提交文字
  submitTo: function (e) {
    let that = this;
    var data = {
      body: that.data.inputValue,
    }
 
    if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(data)
      this.data.allContentList.push({ is_my: { text: this.data.inputValue }});
      this.setData({
        allContentList: this.data.allContentList,
        inputValue: ''
      })
 
      that.bottom()
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
 
  onHide: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    })
  },
  upimg: function () {
    var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img: res.tempFilePaths
          })
          wx.uploadFile({
            url: upload_url,
            filePath: res.tempFilePaths,
            name: 'img',
            success: function (res) {
              console.log(res)
                wx.showToast({
                  title: '图片发送成功！',
                  duration: 3000
                });
            }
          })  
          that.data.allContentList.push({ is_my: { img: res.tempFilePaths } });
          that.setData({
            allContentList: that.data.allContentList,
          })
          that.bottom();
        }
      })
  },   
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })
 
  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    this.setData({
      scrollTop: 1000000
    })
  },
})
 
//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
  var that = this;
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  SocketTask.send({
    data: JSON.stringify(msg)
  }, function (res) {
    console.log('已发送', res)
  })
} 
