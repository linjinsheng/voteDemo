//var urlhead = 'http://localhost:8080/votesys/'
var urlhead = 'https://wx.bczlm.club/votesys/'
//弹出提示框，sms为标题，icon为图标，弹出后执行fn,延迟消失时间为t
function showTip(sms, icon, fn, t) {
    if (!t) {
        t = 1000;
    }
    wx.showToast({
        title: sms,
        icon: icon,
        duration: t,
        complete: fn
    })
}
//弹出提示框，t为标题，c为内容，弹出后执行fn
function showModal(c, t, fn) {
  if (!t)
    t = '提示'
  wx.showModal({
    title: t,
    content: c,
    showCancel: false,
    success: fn
  })
}
//向后台服务器发送POST数据请求，url为请求页面，data为请求参数
function sendRequest(url,data,fn,fnfail){
  wx.request({
    url: urlhead + url,
    data: data,
    method: 'POST',
    success: function (res) {
      // success
      typeof fn == "function" && fn(res.data) 
    },
    fail: function (res) {
      // fail
      fnfail && fnfail(res)
    }
  })
}
module.exports.urlhead = urlhead
module.exports.showTip = showTip;
module.exports.showModal = showModal;
module.exports.sendRequest = sendRequest;