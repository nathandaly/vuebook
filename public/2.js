(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/layouts/MyLayout.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MyLayout.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var quasar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quasar */ "./node_modules/quasar/src/index.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'MyLayout',
  data: function data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL: quasar__WEBPACK_IMPORTED_MODULE_0__["openURL"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/layouts/MyLayout.vue?vue&type=template&id=525142b5&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MyLayout.vue?vue&type=template&id=525142b5& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "q-layout",
    { attrs: { view: "lHh Lpr lFf" } },
    [
      _c(
        "q-header",
        { attrs: { elevated: "" } },
        [
          _c(
            "q-toolbar",
            [
              _c(
                "q-btn",
                {
                  attrs: {
                    flat: "",
                    dense: "",
                    round: "",
                    "aria-label": "Menu"
                  },
                  on: {
                    click: function($event) {
                      _vm.leftDrawerOpen = !_vm.leftDrawerOpen
                    }
                  }
                },
                [_c("q-icon", { attrs: { name: "menu" } })],
                1
              ),
              _vm._v(" "),
              _c("q-toolbar-title", [_vm._v("\n        Quasar App\n      ")]),
              _vm._v(" "),
              _c("div", [_vm._v("Quasar v" + _vm._s(_vm.$q.version))])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-drawer",
        {
          attrs: { bordered: "", "content-class": "bg-grey-2" },
          model: {
            value: _vm.leftDrawerOpen,
            callback: function($$v) {
              _vm.leftDrawerOpen = $$v
            },
            expression: "leftDrawerOpen"
          }
        },
        [
          _c(
            "q-list",
            [
              _c("q-item-label", { attrs: { header: "" } }, [
                _vm._v("Essential Links")
              ]),
              _vm._v(" "),
              _c(
                "q-item",
                {
                  attrs: {
                    clickable: "",
                    tag: "a",
                    target: "_blank",
                    href: "https://quasar.dev"
                  }
                },
                [
                  _c(
                    "q-item-section",
                    { attrs: { avatar: "" } },
                    [_c("q-icon", { attrs: { name: "school" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", [_vm._v("Docs")]),
                      _vm._v(" "),
                      _c("q-item-label", { attrs: { caption: "" } }, [
                        _vm._v("quasar.dev")
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item",
                {
                  attrs: {
                    clickable: "",
                    tag: "a",
                    target: "_blank",
                    href: "https://github.com/quasarframework/"
                  }
                },
                [
                  _c(
                    "q-item-section",
                    { attrs: { avatar: "" } },
                    [_c("q-icon", { attrs: { name: "code" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", [_vm._v("Github")]),
                      _vm._v(" "),
                      _c("q-item-label", { attrs: { caption: "" } }, [
                        _vm._v("github.com/quasarframework")
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item",
                {
                  attrs: {
                    clickable: "",
                    tag: "a",
                    target: "_blank",
                    href: "https://chat.quasar.dev"
                  }
                },
                [
                  _c(
                    "q-item-section",
                    { attrs: { avatar: "" } },
                    [_c("q-icon", { attrs: { name: "chat" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", [_vm._v("Discord Chat Channel")]),
                      _vm._v(" "),
                      _c("q-item-label", { attrs: { caption: "" } }, [
                        _vm._v("chat.quasar.dev")
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item",
                {
                  attrs: {
                    clickable: "",
                    tag: "a",
                    target: "_blank",
                    href: "https://forum.quasar.dev"
                  }
                },
                [
                  _c(
                    "q-item-section",
                    { attrs: { avatar: "" } },
                    [_c("q-icon", { attrs: { name: "record_voice_over" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", [_vm._v("Forum")]),
                      _vm._v(" "),
                      _c("q-item-label", { attrs: { caption: "" } }, [
                        _vm._v("forum.quasar.dev")
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item",
                {
                  attrs: {
                    clickable: "",
                    tag: "a",
                    target: "_blank",
                    href: "https://twitter.com/quasarframework"
                  }
                },
                [
                  _c(
                    "q-item-section",
                    { attrs: { avatar: "" } },
                    [_c("q-icon", { attrs: { name: "rss_feed" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", [_vm._v("Twitter")]),
                      _vm._v(" "),
                      _c("q-item-label", { attrs: { caption: "" } }, [
                        _vm._v("@quasarframework")
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("q-page-container", [_c("router-view")], 1)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/layouts/MyLayout.vue":
/*!**********************************!*\
  !*** ./src/layouts/MyLayout.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyLayout.vue?vue&type=template&id=525142b5& */ "./src/layouts/MyLayout.vue?vue&type=template&id=525142b5&");
/* harmony import */ var _MyLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyLayout.vue?vue&type=script&lang=js& */ "./src/layouts/MyLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MyLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/layouts/MyLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/layouts/MyLayout.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/layouts/MyLayout.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./MyLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/layouts/MyLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/layouts/MyLayout.vue?vue&type=template&id=525142b5&":
/*!*****************************************************************!*\
  !*** ./src/layouts/MyLayout.vue?vue&type=template&id=525142b5& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./MyLayout.vue?vue&type=template&id=525142b5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/layouts/MyLayout.vue?vue&type=template&id=525142b5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyLayout_vue_vue_type_template_id_525142b5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);