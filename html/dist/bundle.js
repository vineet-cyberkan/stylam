/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var stylam = window.stylam || {};\nvar rangeArray = [],\n    categoryArray = [],\n    filters = [],\n    productData = [],\n    filteredProductData = [];\n\n(function (window, document, $, stylam) {\n  stylam.products = {\n    init: function (options) {\n      var defaults = {\n        paginationWrapper: '#selectPagination',\n        //itemsPerPage: '.stylam-my-select-rows',\n        //rows: '.open-cases-body .open-cases-row',\n        scrollElement: '.stylam-select-head'\n      };\n      this.options = $.extend(defaults, options);\n      stylam.products.dataRequest();\n    },\n    dataRequest: function () {\n      stylam.products.pageLoaderShow();\n      $.ajax({\n        url: 'http://localhost/stylam/products.json',\n        //url: '/bin/oneview/rest/sr/technicalbulletin?' + paramInitial,\n        //crossDomain: true,\n        type: 'GET',\n        contentType: 'application/json',\n        dataType: 'json',\n        success: function success(productsData) {\n          console.log(productsData.total);\n\n          if (productsData.total > 0) {\n            var products = productData = productsData.data;\n\n            for (x in products) {\n              //console.log(products[x])\n              productNode = products[x];\n\n              for (productDetail in productNode) {\n                //console.log(productDetail);\n                //console.log(productNode[productDetail]);\n                var uniqueVal = productNode[productDetail];\n\n                if (productDetail == 'range') {\n                  if (rangeArray.indexOf(uniqueVal) == -1) {\n                    rangeArray.push(uniqueVal);\n                  } //rangeArray.push(productNode[productDetail])\n\n                }\n\n                if (productDetail == 'category') {\n                  if (categoryArray.indexOf(uniqueVal) == -1) {\n                    categoryArray.push(uniqueVal);\n                  }\n                }\n              }\n            }\n          } //debugger;\n\n          /*console.log(rangeArray.sort())\r\n          console.log(categoryArray.sort())*/\n\n          /*console.log(rangeArray);\r\n          console.log(categoryArray);\r\n          console.log(rangeArray.length);\r\n          console.log(categoryArray.length);*/\n\n\n          stylam.products.genrateFilter(rangeArray, 'range');\n          stylam.products.genrateFilter(categoryArray, 'category');\n          stylam.products.genrateFilterObj(productData);\n        },\n        complete: function () {\n          stylam.products.pageLoaderRemove();\n        }\n      });\n    },\n    pageLoaderShow: function () {\n      $('body').append('<div class=\"ajax-loader\" style=\"\" ></div>');\n    },\n    pageLoaderRemove: function () {\n      $('body>.ajax-loader').remove();\n    },\n    genrateFilter: function (filterObject, filterName) {\n      if (filterObject.length > 0) {\n        var select = '<select id=\"' + filterName + '\"></select>';\n        var selectLabel = '<label for=\"' + filterName + '\">' + filterName + '</label>';\n\n        if ($('#filterCont').length > 0) {\n          //$('#filterCont').append(select);\n          $('#filterCont').append('<div class=\"filterCont\">' + selectLabel + select + '</div>');\n        }\n\n        for (x in filterObject) {\n          //var option = '<option value=\"'+x+'\">'+filterObject[x]+'</option>';\n          var option = '<option value=\"' + filterObject[x].replace(/ /gi, \"_\") + '\">' + filterObject[x] + '</option>';\n          $('select#' + filterName).append(option);\n        }\n      }\n    },\n    genrateFilterObj: function (productData) {\n      var filtersNode = $('#filterCont .filterCont select');\n\n      if (productData.length > 0 && filtersNode.length > 0) {\n        //debugger;\n        //productData;\n        $.each(filtersNode, function (index, val) {\n          var key = $(this).attr('id'),\n              val = $(this).val(); //console.log('key =>'+key+'; val =>'+val);\n\n          filters[key] = val.replace(/_/gi, \" \");\n        });\n      }\n\n      ; //filters;\n\n      filteredProductData = productData.filter(function (obj) {\n        if (obj.category == filters.category && obj.range == filters.range) {\n          return obj.category;\n        }\n      }); //filteredProductData;\n\n      stylam.products.renderData(filteredProductData);\n    },\n    renderData: function (filteredProductData) {\n      if (filteredProductData.length > 0) {\n        $('#dataCount span').text(filteredProductData.length);\n        $('ul#dataCont').empty();\n        var li = '';\n\n        for (x in filteredProductData) {\n          var p = '',\n              filteredDataNode = filteredProductData[x];\n\n          for (nodes in filteredDataNode) {\n            p += '<p><strong>' + nodes + '</strong>: ' + filteredDataNode[nodes] + '</p>';\n          } //$('ul#dataCont').append(li);\n          //li.append(p);\n\n\n          li += '<li>' + p + '</li>';\n        }\n\n        $('ul#dataCont').append(li);\n      } else {\n        $('ul#dataCont').empty().append('<li>Data not available</li>');\n        $('#dataCount span').text('0');\n      }\n    }\n  };\n})(window, document, jQuery, stylam);\n\nwindow.onload = function () {\n  if ($('#productCont').length) {\n    stylam.products.init();\n  }\n\n  $(document).on(\"change\", '#filterCont .filterCont select', function (e) {\n    stylam.products.genrateFilterObj(productData);\n  });\n};\n\nwindow.onresize = function () {};\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });