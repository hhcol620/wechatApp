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
const app = getApp()
// 引入全局  请求加载动画方法
const { baseUrl } = app.globalData
// get请求
const getData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json','Authorization':app.globalData.access_token,'userAccessToken':app.globalData.userAccessToken},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        if (e.statusCode === 401) {
          wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      }
    });
      
  })
}
// post 请求
const postData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json','Authorization':app.globalData.access_token,'userAccessToken':app.globalData.userAccessToken},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        if (e.statusCode === 401) {
          wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      }
    });
      
  })
}
// delete 请求
const deleteData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json','Authorization':app.globalData.access_token,'userAccessToken':app.globalData.userAccessToken},
      method: 'DELETE',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        if (e.statusCode === 401) {
          wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      }
    });
      
  })
}
// put 请求
const putData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/json','Authorization':app.globalData.access_token,'userAccessToken':app.globalData.userAccessToken},
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        if (e.statusCode === 401) {
          wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      }
    });
      
  })
}

// 表单提交
const postFormData = (url, params) => {
  return new Promise((reslove, reject) => {
    var reqTask = wx.request({
      url:baseUrl + url,
      data: params || {},
      header: {'content-type':'application/x-www-form-urlencoded','Authorization':app.globalData.access_token,'userAccessToken':app.globalData.userAccessToken},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        if (e.statusCode === 401) {
          wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      }
    });
      
  })
}

module.exports = {
  getData,
  postData,
  deleteData,
  putData,
  postFormData
}