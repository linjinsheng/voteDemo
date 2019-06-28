//app.js
var common = require('utils/common.js');
App({
  onLaunch: function () {
    wx.clearStorageSync()
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo.UID) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (result) {
              var wxUser = result.userInfo;
              that.globalData.userInfo.NICKNAME = wxUser.nickName;
              that.globalData.userInfo.AVATAR = wxUser.avatarUrl;
              //获取登录用户的后台id,code为登录微信成功后返回的code值（有效期五分钟）
//fn为接收openid的处理函数
              common.sendRequest("WxGetUID", { code: res.code }, function (res) {
                if (res.uid) {
                  that.globalData.userInfo.UID = res.uid
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
            },
            fail: function () {
              //失败
            }
          });
        }
      }, function (err) {
        console.log(err, 'err');
      });
    }
  },
  globalData: {
    userInfo: {
      UID: null,
      NICKNAME:"-",
      AVATAR:""
    },
    res:null
  }
})