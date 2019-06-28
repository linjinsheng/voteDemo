var app = getApp()
var common = require('../../utils/common.js');
Page({
  data: {   
    uid:null,
    msg:'每人只能投一次',
    items: [],
    img:'../../image/def.gif',
    selected:[]
  },
  loadVote:function(){
    common.showTip("加载中", "loading")
    var that=this
    var param = {
      uid: app.globalData.userInfo.UID,
    }
    common.sendRequest("WxGetItems", param, function (res) {
      if (res.items) {
        if (!res.canVote) {
          app.globalData.res = res
          wx.navigateTo({
            url: '../stat/stat?op=1',
          })
          return
        }
        that.setData({
          msg: '每人只能投一次',
          img:common.urlhead+'upload/'+res.SRC,
          items:res.items
        })
      } else{
        that.setData({ 
          msg: '尚未发起投票',
          items: [],
          img: '../../image/def.gif',
          selected: []
        })
      }
    }, function () {
      common.showTip("连接超时", "loading")
    })
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
        app.getUserInfo((userInfo) => {
          that.data.uid = userInfo.UID
          that.loadVote()
        })
      }
    })
  },
  checkboxChange:function(event){
    this.data.selected = event.detail.value
  },
  doVote:function(){
    if(!this.data.items[0]){
      common.showTip("当前未发起投票", "loading")
      return
    }
    if (!this.data.selected[0]) {
      common.showTip("请至少选择一项内容", "loading")
      return
    }
    common.showTip("提交数据...", "loading")
    var that = this
    var param={
      uid: app.globalData.userInfo.UID,
      vid: this.data.items[0].VID,
      vote:this.data.selected
    }
    common.sendRequest("WxVote", param, function (res) {
      if (res.status==0) {
        wx.navigateTo({
          url: '../stat/stat'
        })
      } else if (res.status == 1) {
        common.showTip("当前无投票", "loading")
      } else if (res.status == 2) {
        wx.showModal({
          title: '提示',
          content:'您已经投过票了，是否查看结果？',
          success:function(res){
            if (res.confirm) {
              wx.navigateTo({
                url: '../stat/stat'
              })
            }
          }
        })
      } else{
        common.showTip("服务器出了点问题", "loading")
      }
    }, function () {
      common.showTip("连接超时", "loading")
    })
  },
  onPullDownRefresh: function (e) {
    //下拉刷新
    this.loadVote()
  },
  onShareAppMessage: function (res) {
    //分享
    return {
      title: '转发此投票',
      path: '/page/vote',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        common.showTip("转发失败", "loading")
      }
    }
  }
})