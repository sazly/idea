var app = getApp();
Page({
  data: {
    cache: [
      { iconurl: '/images/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' }
    ],
    device: [
      { iconurl: '/images/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },
    /*{ iconurl: '/images/icon/wx_app_network.png', title: '网络状态', tap: 'showNetWork' },*/
      { iconurl: '/images/icon/wx_app_location.png', title: '地图显示', tap: 'showMap' },
   /*{ iconurl: '/images/icon/wx_app_compass.png', title: '指南针', tap: 'showCompass' },*/
      { iconurl: '/images/icon/wx_app_lonlat.png', title: '当前位置、速度', tap: 'showLonLat' },
    /*{ iconurl: '/images/icon/wx_app_shake.png', title: '摇一摇', tap: 'shake' },*/
      { iconurl: '/images/icon/wx_app_scan_code.png', title: '二维码', tap: 'scanQRCode' }
    ],
    api: [
      { iconurl: '/images/icon/wx_app_list.png', title: '下载pdf、word文档', tap: 'downloadDocumentList' },
    /*  { iconurl: '', title: '用户登陆', tap: 'login' },
      { iconurl: '', title: '校验用户信息', tap: 'check' },
      { iconurl: '', title: '获取用户加密信息', tap: 'decrypted' },*/
     /* { iconurl: '', title: '模板消息', tap: 'tplMessage' },
      { iconurl: '', title: '微信支付', tap: 'wxPay' }*/
    ],
   /* others: [
      { iconurl: '', title: 'wx:key示例', tap: 'showWxKeyDemo' },
      { iconurl: '', title: 'scroll-view高级用法演示', tap: 'showScrollViewDemo' }
    ]*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.g_userInfo
    })
  },

  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device'
    });
  },

  //获取当前位置经纬度与当前速度
  getLonLat: function (callback) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        callback(res.longitude, res.latitude, res.speed);
      }
    });
  },

  //显示当前位置坐标与当前速度
  showLonLat: function () {
    var that = this;
    this.getLonLat(function (lon, lat, speed) {
      var lonStr = lon >= 0 ? '东经' : '西经',
        latStr = lat >= 0 ? '北纬' : '南纬';
      lon = lon.toFixed(2);
      lat = lat.toFixed(2);
      lonStr += lon;
      latStr += lat;
      speed = (speed || 0).toFixed(2);
      that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
    });
  },

  //在地图上显示当前位置
  showMap: function () {
    this.getLonLat(function (lon, lat) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 15,
        name: "湖州师范学院(西校区)",
        address: "学士路158号",
        fail: function () {
          wx.showToast({
            title: "地图打开失败",
            duration: 1000,
            icon: "cancel"
          });
        }
      });
    });
  },

  //扫描二维码
  scanQRCode: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        console.log(res)
        that.showModal('扫描二维码', res.result, false);
      },
      fail: function (res) {
        that.showModal('扫描二维码', "扫描失败，请重试", false);
      }
    })
  },

  //下载并预览文档
  downloadDocumentList: function () {
    wx.navigateTo({
      url: '/pages/setting/document/download/download'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})