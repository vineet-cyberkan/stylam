var stylam = window.stylam || {};

var rangeArray = [], categoryArray = [], filters = [], productData = [], filteredProductData = [];

(function (window, document, $, stylam) {
	stylam.products = {
		init: function(options){
			var defaults = {
				paginationWrapper: '#selectPagination',
				//itemsPerPage: '.stylam-my-select-rows',
				//rows: '.open-cases-body .open-cases-row',
				scrollElement: '.stylam-select-head'
			};
			this.options = $.extend(defaults, options);
			stylam.products.dataRequest();
		},

		dataRequest: function(){
			stylam.products.pageLoaderShow();
			$.ajax({
	            url: 'http://localhost/stylam/products.json',
	            //url: '/bin/oneview/rest/sr/technicalbulletin?' + paramInitial,
				//crossDomain: true,
	            type: 'GET',
	            contentType: 'application/json',
	            dataType: 'json',

	            success: function success(productsData) {
					console.log(productsData.total)
					if (productsData.total > 0) {
						var products = productData = productsData.data;
						for ( x in products ){
							//console.log(products[x])
							productNode = products[x];

							for( productDetail in productNode){
								//console.log(productDetail);
								//console.log(productNode[productDetail]);
								var uniqueVal = productNode[productDetail];
								if (productDetail == 'range') {
									if (rangeArray.indexOf(uniqueVal) == -1) {
										rangeArray.push(uniqueVal)
									}
									//rangeArray.push(productNode[productDetail])
								}
								if (productDetail == 'category') {
									if (categoryArray.indexOf(uniqueVal) == -1) {
										categoryArray.push(uniqueVal)
									}
								}
							}
						}
					}
					//debugger;
					/*console.log(rangeArray.sort())
					console.log(categoryArray.sort())*/
					/*console.log(rangeArray);
					console.log(categoryArray);
					console.log(rangeArray.length);
					console.log(categoryArray.length);*/
					stylam.products.genrateFilter(rangeArray, 'range');
					stylam.products.genrateFilter(categoryArray, 'category');
					stylam.products.genrateFilterObj(productData);
	            },

	            complete: function() {
	                stylam.products.pageLoaderRemove();
	            }
        	});
			
		},

		pageLoaderShow: function() {
	        $('body').append('<div class="ajax-loader" style="" ></div>')
	    },

	    pageLoaderRemove: function() {
	        $('body>.ajax-loader').remove();
	    },

	    genrateFilter: function(filterObject, filterName){
	    	if (filterObject.length > 0 ) {
	    		var select = '<select id="'+filterName+'"></select>';
	    		var selectLabel = '<label for="'+filterName+'">'+filterName+'</label>';
	    		if ($('#filterCont').length > 0) {
		    		//$('#filterCont').append(select);
		    		$('#filterCont').append('<div class="filterCont">'+selectLabel+select+'</div>');
		    	}
	    		for( x in filterObject){
	    			//var option = '<option value="'+x+'">'+filterObject[x]+'</option>';
	    			var option = '<option value="'+filterObject[x].replace(/ /gi, "_")+'">'+filterObject[x]+'</option>';
	    			$('select#'+filterName).append(option);
	    		}
	    	}
	    	
	    },

	    genrateFilterObj: function(productData){
	    	var filtersNode = $('#filterCont .filterCont select');
	    	if (productData.length > 0 && filtersNode.length > 0 ) {
	    		//debugger;
	    		//productData;
	    		$.each(filtersNode, function(index, val) {
	    			var key = $(this).attr('id'), val = $(this).val();
	    			//console.log('key =>'+key+'; val =>'+val);
	    			filters[key] = val.replace(/_/gi, " ");
	    		});
	    	};

	    	filters;

	    	filteredProductData = productData.filter(function(obj) {
	            if (obj.category == filters.category && obj.range == filters.range) {
	            	return obj.category
	            }
	        });

	        filteredProductData;
	    }
	}
})(window, document, jQuery, stylam);

window.onload = function(){
	if ($('#productCont').length) {
		stylam.products.init();
	}
}

window.onresize = function(){
	
}