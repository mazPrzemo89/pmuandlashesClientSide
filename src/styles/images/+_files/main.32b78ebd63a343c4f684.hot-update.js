webpackHotUpdate("main",{

/***/ "./src/Components/Testimonial/Testimonial.js":
/*!***************************************************!*\
  !*** ./src/Components/Testimonial/Testimonial.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth */ "./src/auth/index.js");
/* harmony import */ var _Menu_Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Menu/Menu */ "./src/Components/Menu/Menu.js");
/* harmony import */ var _Utils_aux_Aux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/aux/Aux */ "./src/Components/Utils/aux/Aux.js");
var _jsxFileName = "/home/przem/Desktop/FRONTEND LATEST VERION/src/Components/Testimonial/Testimonial.js";






const Testimonial = () => {
  const [error, setError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [success, setSuccess] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [values, setValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    name: '',
    photo: '',
    error: '',
    loading: false,
    formData: ''
  });
  const {
    name,
    formData
  } = values;

  const init = () => {
    setValues({ ...values,
      formData: new FormData()
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    init();
  }, []); // destructure user and info from localstorage

  const {
    user,
    token
  } = Object(_auth__WEBPACK_IMPORTED_MODULE_2__["isAuthenticated"])();

  const handleChange = name => event => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values,
      [name]: value
    });
  };

  const handlePhoto = event => {
    const value = event.target.files[0];
    formData.set('photo', event.target.files[0]);
    setValues({ ...values,
      photo: value
    });
  };

  const clickSubmit = event => {// event.preventDefault()
    // createCategory(user._id, token, formData)
    // .then(data=>{
    //     if(data.error) {
    //         setValues({...values, error: data.error})
    //     } else {
    //         setValues({
    //             ...values,
    //             name:'', 
    //             photo:'',
    //             loading: false
    //         })
    //     }
    // })
  };

  const photoForm = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: clickSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }, "Post Photo"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "btn btn-secondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    onChange: handlePhoto,
    type: "file",
    name: "photo",
    accept: "image/*",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: undefined
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: undefined
  }, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    onChange: handleChange('name'),
    type: "text",
    className: "form-control",
    value: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-outline-primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: undefined
  }, "Submit"));

  const showSuccess = () => {
    if (success) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "text-success",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: undefined
      }, name, " is created");
    }
  };

  const showError = () => {
    if (error) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "text-danger",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: undefined
      }, "Category name should be unique");
    }
  };

  const goBack = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mt-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
      },
      __self: undefined
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/admin/dashboard",
      className: "text-warning",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112
      },
      __self: undefined
    }, "Back to dashboard"));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Utils_aux_Aux__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu_Menu__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121
    },
    __self: undefined
  }), showSuccess(), showError(), photoForm(), goBack());
};

/* harmony default export */ __webpack_exports__["default"] = (Testimonial);

/***/ })

})
//# sourceMappingURL=main.32b78ebd63a343c4f684.hot-update.js.map