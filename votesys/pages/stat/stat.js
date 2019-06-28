var app = getApp()
var common = require('../../utils/common.js');
Page({
  data: {
    openid: null,
    items: [],
    img: '../../image/def.gif',
    selected: []
  },
  loadStat: function () {
    common.showTip("加载中", "loading")
    var that = this
    var param = {
      uid: app.globalData.userInfo.UID,
    }
    common.sendRequest("WxGetItems", param, function (res) {
      if (res.items) {
        that.setData({
          img: common.urlhead + 'upload/' + res.SRC,
          items: res.items
        })
      } else {
        common.showTip("当前无投票", "loading")
      }
    }, function () {
      common.showTip("连接超时", "loading")
    })
  },
  onLoad: function (op) {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
        if(op.op==1){
          var _res = app.globalData.res
          if (_res.items) {
            that.setData({
              img: common.urlhead + 'upload/' + _res.SRC,
              items: _res.items
            })
          } else {
            that.setData({
              items: []
            })
            common.showTip("当前无投票", "loading")
          }
          return
        }
        app.getUserInfo((userInfo) => {
          that.data.openid = userInfo.OPENID
          that.loadStat()
        })
      }
    })
  },
  onPullDownRefresh: function (e) {
    this.loadStat()
  }
})