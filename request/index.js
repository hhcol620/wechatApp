// 同时发送异步代码的次数  在同时有多个请求发出之后  需要都等到回来之后才能关闭loading
// let ajaxTimes = 0;

// 封装请求 promise
// export const request = (params) => {
//   ajaxTimes++;
//   // 显示加载中效果
//   wx.showLoading({
//     title: "加载中",
//     mask: true
//   });
//   // 定义公共的url 
//   
//   return new Promise((reslove, reject) => {
//     wx.request({
//       ...params, 
//       url:baseUrl+params.url,
//       success: (result) => {
//         reslove(result)
//       },
//       fail: (err) => {
//         reject(err)
//       },
//       complete: () => {
//         ajaxTimes--;
//         if(ajaxTimes===0){
//           wx.hideLoading();
//         }
//       }
//     })
//   })
// }
// 配置基地址
// const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
const baseUrl = "http://39.97.123.63:10900/api"
// get请求
const getData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
      
  })
}
// post 请求
const postData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
      
  })
}
// delete 请求
const deleteData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json'},
      method: 'DELETE',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
      
  })
}
// put 请求
const putData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json'},
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
      
  })
}

module.exports = {
  getData,
  postData,
  deleteData,
  putData
}