(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!***************************************!*\
  !*** D:/0upup/hxds-driver-wx/main.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createApp, uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 27));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _uviewUi = _interopRequireDefault(__webpack_require__(/*! uview-ui */ 33));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
_vue.default.config.productionTip = false;
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread({}, _App.default));

//注册uView组件

_vue.default.use(_uviewUi.default);
createApp(app).$mount();
var baseUrl = "http://192.168.31.61:8201/hxds-driver";
_vue.default.prototype.url = {
  registerNewDriver: "".concat(baseUrl, "/driver/registerNewDriver"),
  updateDriverAuth: "".concat(baseUrl, "/driver/updateDriverAuth"),
  uploadCosPrivateFile: "".concat(baseUrl, "/cos/uploadCosPrivateFile"),
  deleteCosPrivateFiel: "".concat(baseUrl, "/cos/deleteCosPrivateFile"),
  createDriverFaceModel: "".concat(baseUrl, "/driver/createDriverFaceModel"),
  verificateDriverFace: "".concat(baseUrl, "/driver/verificateDriverFace"),
  login: "".concat(baseUrl, "/driver/login"),
  searchDriverBaseInfo: "".concat(baseUrl, "/driver/searchDriverBaseInfo"),
  logout: "".concat(baseUrl, "/driver/logout"),
  searchWorkbenchData: "".concat(baseUrl, "/driver/searchWorkbenchData"),
  searchDriverAuth: "".concat(baseUrl, "/driver/searchDriverAuth"),
  startWork: "".concat(baseUrl, "/driver/startWork"),
  stopWork: "".concat(baseUrl, "/driver/stopWork"),
  receiveNewOrderMessage: "".concat(baseUrl, "/message/order/new/receiveNewOrderMessage"),
  acceptNewOrder: "".concat(baseUrl, "/order/acceptNewOrder"),
  searchDriverExecuteOrder: "".concat(baseUrl, "/order/searchDriverExecuteOrder"),
  searchDriverCurrentOrder: "".concat(baseUrl, "/order/searchDriverCurrentOrder"),
  searchOrderForMoveById: "".concat(baseUrl, "/order/searchOrderForMoveById"),
  arriveStartPlace: "".concat(baseUrl, "/order/arriveStartPlace"),
  startDriving: "".concat(baseUrl, "/order/startDriving"),
  uploadRecordFile: "".concat(baseUrl, "/monitoring/uploadRecordFile"),
  updateOrderStatus: "".concat(baseUrl, "/order/updateOrderStatus"),
  updateBillFee: "".concat(baseUrl, "/order/updateBillFee"),
  searchReviewDriverOrderBill: "".concat(baseUrl, "/order/searchReviewDriverOrderBill"),
  searchOrderStatus: "".concat(baseUrl, "/order/searchOrderStatus"),
  updateOrderAboutPayment: "".concat(baseUrl, "/order/updateOrderAboutPayment"),
  searchDriverOrderByPage: "".concat(baseUrl, "/order/searchDriverOrderByPage"),
  searchOrderById: "".concat(baseUrl, "/order/searchOrderById"),
  startCommentWorkflow: "".concat(baseUrl, "/comment/startCommentWorkflow")
};
_vue.default.prototype.tencent = {
  map: {
    referer: "九十代驾",
    key: "FX5BZ-JP6HH-LUODQ-WYD5A-C62O7-QVFFG"
  }
};
_vue.default.prototype.ajax = function (url, method, data, fun, load) {
  var timer = null;
  if (load == true || load == undefined) {
    uni.showLoading({
      title: "执行中"
    });
    timer = setTimeout(function () {
      uni.hideLoading();
    }, 60 * 1000);
  }
  uni.request({
    "url": url,
    "method": method,
    "header": {
      token: uni.getStorageSync("token")
    },
    "data": data,
    success: function success(resp) {
      if (load == true || load == undefined) {
        clearTimeout(timer);
        uni.hideLoading();
      }
      if (resp.statusCode == 401) {
        uni.redirectTo({
          url: "/pages/login/login.vue"
        });
      } else if (resp.statusCode == 200 && resp.data.code == 200) {
        var _data = resp.data;
        if (_data.hasOwnProperty("token")) {
          var token = _data.token;
          uni.setStorageSync("token", token);
        }
        fun(resp);
      } else if (resp.data.error == "该微信无法注册") {
        uni.showToast({
          icon: "none",
          title: "该微信无法注册"
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "执行异常"
        });
        console.error(resp.data);
      }
    },
    fail: function fail(error) {
      if (load == true || load == undefined) {
        clearTimeout(timer);
        uni.hideLoading();
      }
    }
  });
};
_vue.default.prototype.refreshMessage = function (that) {
  uni.request({
    "url": that.url.refreshMessage,
    "method": "POST",
    "header": {
      token: uni.getStorageSync("token")
    },
    "data": {
      identity: 'driver'
    },
    success: function success(resp) {
      if (resp.statusCode == 401) {
        uni.redirectTo({
          url: "/pages/login/login.vue"
        });
      } else if (resp.statusCode == 200 && resp.data.code == 200) {
        uni.$emit("updateMessageService", true);
        var result = resp.data.result;
        var lastRows = result.lastRows;
        var unreadRows = result.unreadRows;
        if (lastRows > 0) {
          uni.$emit("showMessageTip", lastRows);
        }
      } else {
        console.error(resp.data);
        //在工作台页面触发更新消息服务状态，显示服务可用或者不可用
        uni.$emit("updateMessageService", false);
      }
      console.log("刷新消息");
    },
    fail: function fail(error) {
      //在工作台页面触发更新消息服务状态，显示服务可用或者不可用
      uni.$emit("updateMessageService", false);
    }
  });
};
_vue.default.prototype.uploadCos = function (url, path, module, fun) {
  uni.uploadFile({
    url: url,
    filePath: path,
    name: "file",
    header: {
      token: uni.getStorageSync("token")
    },
    formData: {
      "module": module
    },
    success: function success(resp) {
      var data = JSON.parse(resp.data);
      if (resp.statusCode == 401) {
        uni.redirectTo({
          url: "/pages/login/login.vue"
        });
      } else if (resp.statusCode == 200 && data.code == 200) {
        fun(resp);
      } else {
        uni.showToast({
          icon: "none",
          title: data.error
        });
      }
    }
  });
};
_vue.default.prototype.upload = function (url, path, data, fun) {
  uni.uploadFile({
    url: url,
    filePath: path,
    name: "file",
    header: {
      token: uni.getStorageSync("token")
    },
    formData: data,
    success: function success(resp) {
      var data = JSON.parse(resp.data);
      if (resp.statusCode == 401) {
        uni.redirectTo({
          url: "/pages/login/login.vue"
        });
      } else if (resp.statusCode == 200 && data.code == 200) {
        fun(resp);
      } else {
        uni.showToast({
          icon: "none",
          title: data.error
        });
      }
    }
  });
};
_vue.default.prototype.toPage = function (url) {
  uni.navigateTo({
    url: url
  });
};
_vue.default.prototype.checkNull = function (data, name) {
  if (data == null) {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return true;
  }
  return false;
};
_vue.default.prototype.checkBlank = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return true;
  }
  return false;
};
_vue.default.prototype.checkValidName = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return false;
  } else if (!/^[\u4e00-\u9fa5]{2,15}$/.test(data)) {
    this.$refs.uToast.show({
      title: name + "不正确",
      type: 'error'
    });
    return false;
  }
  return true;
};
_vue.default.prototype.checkValidTel = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return false;
  } else if (!/^1[0-9]{10}$/.test(data)) {
    this.$refs.uToast.show({
      title: name + "不正确",
      type: 'error'
    });
    return false;
  }
  return true;
};
_vue.default.prototype.checkValidEmail = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return false;
  } else if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(data)) {
    this.$refs.uToast.show({
      title: name + "不正确",
      type: 'error'
    });
    return false;
  }
  return true;
};
_vue.default.prototype.checkValidAddress = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return false;
  } else if (!/^[0-9a-zA-Z\u4e00-\u9fa5\-]{6,50}$/.test(data)) {
    this.$refs.uToast.show({
      title: name + "不正确",
      type: 'error'
    });
    return false;
  }
  return true;
};
_vue.default.prototype.checkValidFee = function (data, name) {
  if (data == null || data == "") {
    this.$refs.uToast.show({
      title: name + "不能为空",
      type: 'error'
    });
    return false;
  } else if (!/^[1-9]\d*\.\d{1,2}$|^0\.\d{1,2}$|^[1-9]\d*$/.test(data)) {
    this.$refs.uToast.show({
      title: name + "不正确",
      type: 'error'
    });
    return false;
  }
  return true;
};
_vue.default.prototype.changeNumber = function (value) {
  var newValue = ['', ''];
  var fr = 1000;
  var ad = 1;
  var num = 3;
  var fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
  }
  if (num <= 4) {
    // 千
    newValue[1] = '千';
    newValue[0] = parseInt(value / 1000) + '';
  } else if (num <= 8) {
    // 万
    var text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
    var _fm = '万' === text1 ? 10000 : 10000000;
    newValue[1] = text1;
    newValue[0] = value / _fm + '';
  } else if (num <= 16) {
    // 亿
    var _text = (num - 8) / 3 > 1 ? '千亿' : '亿';
    _text = (num - 8) / 4 > 1 ? '万亿' : _text;
    _text = (num - 8) / 7 > 1 ? '千万亿' : _text;
    // tslint:disable-next-line:no-shadowed-variable
    var _fm2 = 1;
    if ('亿' === _text) {
      _fm2 = 100000000;
    } else if ('千亿' === _text) {
      _fm2 = 100000000000;
    } else if ('万亿' === _text) {
      _fm2 = 1000000000000;
    } else if ('千万亿' === _text) {
      _fm2 = 1000000000000000;
    }
    newValue[1] = _text;
    newValue[0] = parseInt(value / _fm2) + '';
  }
  if (value < 1000) {
    newValue[1] = '';
    newValue[0] = value + '';
  }
  var temp = Math.floor(newValue[0] * 100) / 100;
  return temp + newValue[1];
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 27:
/*!***************************************!*\
  !*** D:/0upup/hxds-driver-wx/App.vue ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 28);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 30);
/* harmony import */ var _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 28:
/*!****************************************************************!*\
  !*** D:/0upup/hxds-driver-wx/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 29);
/* harmony import */ var _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 29:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/0upup/hxds-driver-wx/App.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  onLaunch: function onLaunch() {
    var gps = [];
    wx.setKeepScreenOn({
      keepScreenOn: true
    });

    //TODO 每隔3分钟触发自定义事件，接受系统消息

    wx.startLocationUpdate({
      success: function success(resp) {
        console.log('开启定位成功');
      },
      fail: function fail(resp) {
        console.log('开启定位失败');
        uni.$emit('updateLocation', null);
      }
    });
    wx.onLocationChange(function (resp) {
      var latitude = resp.latitude;
      var longitude = resp.longitude;
      var speed = resp.speed;
      var location = {
        latitude: latitude,
        longitude: longitude
      };
      var workStatus = uni.getStorageSync('workStatus');
      var baseUrl = 'http://192.168.31.61:8201/hxds-driver';
      if (workStatus == '开始接单') {
        // TODO 只在每分钟的前10秒上报定位信息，减小服务器压力
        // let current = new Date();
        // if (current.getSeconds() > 10) {
        // 	return;
        // }
        var settings = uni.getStorageSync('settings');
        settings = {
          orderDistance: 0,
          rangeDistance: 5,
          orientation: ''
        };
        var orderDistance = settings.orderDistance;
        var rangeDistance = settings.rangeDistance;
        var orientation = settings.orientation;
        uni.request({
          url: "".concat(baseUrl, "/driver/location/updateLocationCache"),
          method: 'POST',
          header: {
            token: uni.getStorageSync('token')
          },
          data: {
            latitude: latitude,
            longitude: longitude,
            orderDistance: orderDistance,
            rangeDistance: rangeDistance,
            orientateLongitude: orientation != '' ? orientation.longitude : null,
            orientateLatitude: orientation != '' ? orientation.latitude : null
          },
          success: function success(resp) {
            if (resp.statusCode == 401) {
              uni.redirectTo({
                url: 'pages/login/login'
              });
            } else if (resp.statusCode == 200 && resp.data.code == 200) {
              var data = resp.data;
              if (data.hasOwnProperty('token')) {
                var token = data.token;
                uni.setStorageSync('token', token);
              }
              console.log('定位更新成功');
            } else {
              console.error('更新GPS定位信息失败', resp.data);
            }
          },
          fail: function fail(error) {
            console.error('更新GPS定位信息失败', error);
          }
        });
      } else if (workStatus == '接客户') {
        var executeOrder = uni.getStorageSync('executeOrder');
        var orderId = executeOrder.id;
        var data = {
          orderId: orderId,
          latitude: latitude,
          longitude: longitude
        };
        uni.request({
          url: "".concat(baseUrl, "/driver/location/updateOrderLocationCache"),
          method: "POST",
          header: {
            token: uni.getStorageSync("token")
          },
          data: data,
          success: function success(resp) {
            if (resp.statusCode == 401) {
              uni.redirectTo({
                url: 'pages/login/login'
              });
            } else if (resp.statusCode == 200 && resp.data.code == 200) {
              var _data = resp.data;
              if (_data.hasOwnProperty('token')) {
                var token = _data.token;
                uni.setStorageSync('token', token);
              }
              console.log('订单定位更新成功');
            } else {
              console.error('订单定位更新失败', resp.data);
            }
          },
          fail: function fail(error) {
            console.error('订单定位更新失败', error);
          }
        });
      } else if (workStatus == '开始代驾') {
        //每凑够20个定位就上传一次，减少服务器的压力
        var _executeOrder = uni.getStorageSync("executeOrder");
        if (_executeOrder != null) {
          gps.push({
            orderId: _executeOrder.id,
            customerId: _executeOrder.customerId,
            latitude: latitude,
            longitude: longitude,
            speed: speed
          });
          if (gps.length == 1) {
            uni.request({
              url: "".concat(baseUrl, "/order/gps/insertOrderGps"),
              method: 'POST',
              header: {
                token: uni.getStorageSync('token')
              },
              data: {
                list: gps
              },
              success: function success(resp) {
                if (resp.statusCode == 401) {
                  uni.redirectTo({
                    url: '/pages/login/login'
                  });
                } else if (resp.statusCode == 200 && resp.data.code == 200) {
                  var _data2 = resp.data;
                  console.log("上传GPS成功");
                } else {
                  console.error('保存GPS定位失败', resp.data);
                }
                gps.length = 0;
              },
              fail: function fail(error) {
                console.error('保存GPS定位失败', error);
              }
            });
          }
        }
      }
      uni.$emit('updateLocation', location);
    });
  },
  onShow: function onShow() {
    console.log('App Show');
  },
  onHide: function onHide() {
    console.log('App Hide');
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 30:
/*!*************************************************************************!*\
  !*** D:/0upup/hxds-driver-wx/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 31);
/* harmony import */ var _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 31:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/0upup/hxds-driver-wx/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map