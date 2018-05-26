$.fn.reportgrid = function(data) {
        $.log("report search options data : " + JSON2.stringify(data));
        var obj = $(this);
        data = $.extend(data, {
                page: 1,
                perNumber: 10,
                total: 0,
                pageCount: 0,
                pageN: 3,
        });
        var button = $("<div/>").addClass("btn-group buttons");
		var but_falgs = false;
        $.each(data.buttons,
        function(index, element) {
        		if(element.type == 'export'){
                	var btn = $("<button/>").addClass("btn btn-default").attr({
	                        "type": "button",tag:element.type
	                }).append($("<span/>").addClass("glyphicon glyphicon-export")).append("导出");
	                button.append(btn);
	                $(btn).bind("click", element.click);
                }else if (element.type == "search") {
                    var btn = $("<button/>").addClass("btn btn-default").attr({
	                        "type": "button",tag:element.type
	                }).append($("<span/>").addClass("glyphicon glyphicon-search")).append("查询");
	                button.append(btn);
	                $(btn).bind("click", element.click);
                } 
                if(index>=3){but_falgs=true;}
        });
        var search = $("<form/>");
        $.each(data.conditions, function(index, element) {
                if (element.type == "input") {
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append($("<input/>").attr({
                                name: element.value,
                                id: element.value
                        })));
                } else if (element.type == "select") {
                        var select = $("<select/>").attr({
                                name: element.value,
                                id: element.value
                        });
						$.each(element.data,function(i, n) {
                                 select.append($("<option/>").attr({"value": n.key}).text(n.value));
                        });
						if(element.url) {
							getSelectUrl(element.url,element.value);
							select.append($("<option/>").attr({"value":''}).text('全部'));
							$.each(gloablResult,function(i, n) {
								select.append($("<option/>").attr({"value": n.key}).text(n.value));
							});
						}
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(select));
                } else if (element.type = "dateTime") {
                        var t = $("<input/>").css({
                                width: "205px",
                                height: "32px"
                        }).attr({
                                name: element.value,
                                id: element.value
                        });
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(t));
                        $(t).lxhCalendar("yyyy-mm-dd");
                }
                if(index == 7)
				{
				 search.append($("<div/>").append(button));
				}
        });
        var thead = $("<thead/>").append($("<tr/>").append($("<th/>").append(search)));
        var tab = $("<table/>").addClass("table table-responsive table-bordered grid").append(thead);
        obj.append(tab);
        if(but_falgs){        	
        	$(".sic-condition-button").attr({
        		"style":"padding-left:0px;width:260px",
        	}); 
        }
};
var gloablResult = [];
function getSelectUrl(url,type) {
	$.ajax({
        type: "POST",
        url: url,
		async:false,
        success: function(msg) {
			$.log("get report'options data : " + JSON.stringify(msg));
			var temp = msg.result;
			gloablResult=[];
			$.each(temp,function(i,n){
				var obj = {};
				switch(type){
					case 'domainCode':
						obj.key=n.domainCode;
						obj.value=n.domainName;
						gloablResult.push(obj);
						return;
					case 'caseType':
						obj.key=n.id;
						obj.value=n.name;
						gloablResult.push(obj);
						return;
					case 'depId':
						obj.key=n.id;
						obj.value=n.name;
						gloablResult.push(obj);
						return;
					case 'chiefID':
						obj.key=n.id;
						obj.value=n.name;
						gloablResult.push(obj);
						return;
				}
				
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$.log(textStatus);
			window.parent.unLoading();
		}                     
	});
}

$.fn.lxhgrid = function(data) {
        $.log("grid data : " + JSON2.stringify(data));
        var obj = $(this);
        data = $.extend(data, {
                page: 1,
                perNumber: 10,
                total: 0,
                pageCount: 0,
                pageN: 3,
        });
        // $.alert(JSON.stringify(data));
        var bwidth = obj.width();
        var button = $("<div/>").addClass("btn-group buttons");
        var but_falgs = false;
        $.each(data.buttons,
        function(index, element) {        	
                if (element.type == "add") {
                    var btn = $("<button/>").addClass("btn btn-primary").attr({
                            "type": "button",tag:element.type
                    }).append($("<span/>").addClass("glyphicon glyphicon-plus")).append("创建");
                    button.append(btn);
                    $(btn).bind("click", element.click);
                }else if (element.type == "choose") {
                    var btn = $("<button/>").addClass("btn btn-success").attr({
                            "type": "button",tag:element.type
                    }).append($("<span/>").addClass("glyphicon glyphicon-edit")).append("选择");
                    button.append(btn);
                    $(btn).bind("click", element.click);
              }
                else if (element.type == "modify") {
                        var btn = $("<button/>").addClass("btn btn-success").attr({
                                "type": "button",tag:element.type
                        }).append($("<span/>").addClass("glyphicon glyphicon-edit")).append("修改");
                        button.append(btn);
                        $(btn).bind("click", element.click);

                } else if (element.type == "delete") {
                        var btn = $("<button/>").addClass("btn btn-danger").attr({
                                "type": "button",tag:element.type
                        }).append($("<span/>").addClass("glyphicon glyphicon-remove")).append("删除");
                        button.append(btn);
                        $(btn).bind("click", element.click);
                }
                else if (element.type == "cancel") {
                    var btn = $("<button/>").addClass("btn btn-danger").attr({
                            "type": "button",tag:element.type
                    }).append($("<span/>").addClass("glyphicon glyphicon-remove")).append("取消");
                    button.append(btn);
                    $(btn).bind("click", element.click);
                }
                else if (element.type == "search") {
                    var btn = $("<button/>").addClass("btn btn-default").attr({
	                        "type": "button",tag:element.type
	                }).append($("<span/>").addClass("glyphicon glyphicon-search")).append("查询");
	                button.append(btn);
	                $(btn).bind("click", function(){
	                	 data.page = 1;
	                     getLxhData(data, obj);
	                });
                }
                else if (element.type == "import") {
                    var btn = $("<button/>").addClass("btn btn-success").attr({
	                        "type": "button",tag:element.type
	                }).append($("<span/>").addClass("glyphicon glyphicon-search")).append("导入");
	                button.append(btn);
	                $(btn).bind("click", element.click);
                }
                
                if(index>=3){but_falgs=true;}
        });

        var searchBtn = $("<button/>").addClass("btn btn-default").attr({
                "type": "button",
                "data-role": "searchBtn"
        }).append("<span class='glyphicon glyphicon-search'></span>").bind("click",
        function(event) {
                data.page = 1;
                getLxhData(data, obj);
        });

        var search = $("<form/>");
    
        $.each(data.conditions, function(index, element) {
        	    /**if(index == 2)
        	    	{
        	    	 search.append($("<div/>").addClass("sic-condition-button").append(button));
        	    	}*/
        	    
                if (element.type == "input") {
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append($("<input/>").attr({
                                name: element.value,
                                id: element.value
                        })));
                } else if (element.type == "select") {
                        var select = $("<select/>").attr({
                                name: element.value,
                                id: element.value
                        });
                        $.each(element.data,
                        function(i, n) {
                                select.append($("<option/>").attr({
                                        "value": n.key
                                }).text(n.value));
                        });
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(select));
                } else if (element.type = "dateTime") {
                        var t = $("<input/>").css({
                                width: "205px",
                                height: "32px"
                        }).attr({
                                name: element.value,
                                id: element.value
                        }).val(element.context);
                        $(t).lxhCalendar("yyyy-mm-dd hh:ii:ss");
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(t));
                }
        });
		search.append($("<div/>").addClass("sic-condition-button").append(button));
        
        if(data.conditions && data.conditions.length<=2)
    	{
    	search.append($("<div/>").addClass("sic-condition-button").append(button));
    	}       

        var gridheadtr = $("<tr/>");
        gridheadtr.append($("<th/>").css({
                "width": 40
        }).append("<div class='checker'><span data-role='selectAll'></span></div>"));
        $.each(data.columns,
        function(index, element) {
        	//alert(JSON2.stringify(element));
                gridheadtr.append($("<th/>").css({
                        "width": element.width
                }).append(element.title).append("<div class='colResize'></div>"));
        });
        if(data.options.length > 0 )
        	{
        	
        	gridheadtr.append($("<th/>").css({
        		"width": data.options.length*60+10
        	}).append("操作").append("<div class='colResize'></div>"));
        	
        	}

        var gridhead = $("<div/>").addClass("grid-table-head").css({
                "width": bwidth
        }).append($("<table/>").addClass("table table-bordered").append($("<tbody/>").append(gridheadtr)));

        var gridline = $("<tbody/>").addClass("grid-line");

        var thead = $("<thead/>").append($("<tr/>").append($("<th/>").append(search)));
        var tbody = $("<tbody/>").append($("<tr/>").append($("<td/>").append($("<div/>").addClass("colResizePointer")).append($("<div/>").addClass("grid-body").css({
                "width": bwidth
        }).append(gridhead).append($("<div/>").addClass("grid-table-head").css({
                "width": bwidth
        }).append($("<table/>").addClass("table table-bordered").append(gridline))))));
        var tfootul = $("<ul/>").addClass("pagination").append("<li class='disabled' data-role='firstPage'><a href='#'>«</a></li><li class='disabled' data-role='prev'><a href='#'>‹</a></li><li data-role='role_prev'><a href='#'>...</a></li><li data-role='role_next'><a href='#'>...</a></li><li class='disabled' data-role='next'><a href='#'>›</a></li><li class='disabled' data-role='lastPage'><a href='#'>»</a></li>");
        var tfoot = $("<tfoot/>").append($("<tr/>").append($("<td/>").append($("<div/>").addClass("records").append("<span>当前显示：第 </span> <span data-role='start-record'>0</span> - <span data-role='end-record'>0</span> 条记录, 共 <span data-role='total-record'>"+data.total+"</span> 条记录。&nbsp;每页显示 " + data.perNumber + " 条,总共 <span data-role='page-count'></span> 页。")).append($("<div/>").append($("<div/>").addClass("btn-group pages").append(tfootul)))));
        var tab = $("<table/>").addClass("table table-responsive table-bordered grid").append(thead).append(tbody).append(tfoot);
        obj.append(tab);
        getLxhData(data, obj);
        if(but_falgs){        	
        	$(".sic-condition-button").attr({
        		"style":"padding-left:0px;width:260px",
        	}); 
        }

};

$.fn.ycf = function(){
	
		var panel = $(this).attr({"style":"width:100%;color:#333;"});
	
		var topPanel = $("<div>").attr({
			"style":"width: 100%; height: 30px;background-color:#eee;padding-left:5px;"
		});
		
		topPanel.append($("<div/>").addClass("sic-infotabs").attr({
			"id":"bankinfo",
			"name":"bankinfo"
		}).text("银行存款").prepend($("<span/>").addClass("glyphicon glyphicon-bold"))
		.bind("click",function(){
			document.getElementById("sic-iciframe").src="/sic/user/bankinfo.action";
		}));
		
		topPanel.append($("<div/>").addClass("sic-infotabs").text("房产信息").prepend($("<span/>").addClass("glyphicon glyphicon-home"))
		.bind("click",function(){
			document.getElementById("sic-iciframe").src="/sic/user/estateinfo.action";
		}));
		
		topPanel.append($("<div/>").addClass("sic-infotabs").text("户籍信息").prepend($("<span/>").addClass("glyphicon glyphicon-user"))
		.bind("click",function(){
			document.getElementById("sic-iciframe").src="/sic/user/censusinfo.action";
		}));
		
		topPanel.append($("<div/>").addClass("sic-infotabs").text("犯罪记录").prepend($("<span/>").addClass("glyphicon glyphicon-list-alt"))
		.bind("click",function(){
			document.getElementById("sic-iciframe").src="/sic/user/crimeinfo.action";
		}));
		topPanel.append($("<div/>").addClass("sic-infotabs-t"));
		
		panel.prepend(topPanel);
		
		$(".sic-infotabs").bind("click",function(){
		    $(".sic-infotabs-t").show();
		    $(".sic-infotabs-t").css({"left":$(this).position().left - 8});
		    $(".sic-infotabs-t").css({"top":$(this).position().top + 25});
		    
			$(".sic-infotabs").removeClass("active-table");
			$(this).addClass("active-table");
		});
		
		$("#bankinfo").click();
		
};

$.fn.lxhDiv = function(data) {
        $.log("grid data : " + JSON2.stringify(data));
        var obj = $(this);
        data = $.extend(data, {
                page: 1,
                perNumber: 10,
                total: 0,
                pageCount: 0,
                pageN: 4,
        });
        // $.alert(JSON.stringify(data));
        var button = $("<div/>").addClass("btn-group buttons");
        $.each(data.buttons,
        function(index, element) {
                if (element.type == "add") {
                        var btn = $("<button/>").addClass("btn btn-primary").attr({
                                "type": "button"
                        }).append($("<span/>").addClass("glyphicon glyphicon-plus")).append("创建");
                        button.append(btn);
                        $(btn).bind("click", element.click);

                } else if (element.type == "modify") {
                        var btn = $("<button/>").addClass("btn btn-success").attr({
                                "type": "button"
                        }).append($("<span/>").addClass("glyphicon glyphicon-edit")).append("修改");
                        button.append(btn);
                        $(btn).bind("click", element.click);

                } else if (element.type == "delete") {
                        var btn = $("<button/>").addClass("btn btn-danger").attr({
                                "type": "button"
                        }).append($("<span/>").addClass("glyphicon glyphicon-remove")).append("创建");
                        button.append(btn);
                        $(btn).bind("click", element.click);
                }
        });

        var searchBtn = $("<button/>").addClass("btn btn-default").attr({
                "type": "button",
                "data-role": "searchBtn",
                "name": "submit"
        }).append("<span class='glyphicon glyphicon-search'></span>").bind("click",
        function(event) {
                data.page = 1;
                // getLxhData(data, obj);
        });

        var search = $("<form/>");
        $.each(data.conditions,
        function(index, element) {
                if (element.type == "input") {
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append($("<input/>").attr({
                                name: element.value,
                                id: element.value
                        })));
                } else if (element.type == "select") {
                        var select = $("<select/>").attr({
                                name: element.value,
                                id: element.value
                        });
                        $.each(element.data,
                        function(i, n) {
                                select.append($("<option/>").attr({
                                        "value": n.key
                                }).text(n.value));
                        });
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(select));
                } else if (element.type = "dateTime") {
                        var t = $("<input/>").css({
                                width: "205px",
                                height: "32px"
                        }).attr({
                                name: element.value,
                                id: element.value
                        }).val(element.context);
                        $(t).lxhCalendar("yyyy-mm-dd hh:ii:ss");
                        search.append($("<div/>").addClass("sic-condition").append($("<span/>").text(element.title)).append(t));
                }

        });

        search.append(searchBtn);

        var gridheadtr = $("<tr/>");
        gridheadtr.append($("<th/>").css({
                "width": 40
        }).append("<div class='checker'><span data-role='selectAll'></span></div>"));
        $.each(data.columns,
        function(index, element) {
                gridheadtr.append($("<th/>").css({
                        "width": element.width
                }).append(element.title).append("<div class='colResize'></div>"));
        });
        
        if(data.options.length > 0 )
    	{
    	
            gridheadtr.append($("<th/>").css({
                "width": "auto"
        }).append("操作").append("<div class='colResize'></div>"));
    	
    	}
 

        var thead = $("<thead/>").append($("<tr/>").append($("<th/>").append(button).append(search)));
        var tbody = $("<tbody/>").append($("<tr/>").append($("<td/>").append($("<div/>").addClass("colResizePointer"))));
        var tab = $("<table/>").addClass("table table-responsive table-bordered grid").append(thead);//.append(tbody); // .append(tfoot);
        obj.append(tab);
        // getLxhData(data, obj);
};

function getLxhData(data, obj) {
       // window.parent.loading();
        var param = $("form", obj).serialize() + "&page=" + data.page;
        
        // $.alert(param);
        $.ajax({
                type: "POST",
                url: data.url,
                data: param,
                success: function(msg) {
                        $.log("get grid data : " + JSON2.stringify(msg));
                        if (msg.code > 0) {
                                data.total = msg.totalCount;
                                data.pageCount = msg.pageCount;
                                $(".grid-line", obj).empty();
                                $.each(msg.result,
                                function(index, element) {

                                	   var attr = {
                                               "data-role": "indexCheckbox",
                                               "data-value": element.id,
                                               "indexvalue": "0",
                                               "sic-datas":JSON2.stringify(element)
                                       };
                                	   $.each(data.columns,function(idx, node) {
                                           var name = node.name;
                                           attr[name] = element[name];
                                           
                                        });
                                	
                                	   // $.log(JSON2.stringify(attr) + " :: " + JSON2.stringify(data.columns));
                                        var tr = $("<tr/>").append($("<td/>").css({
                                                "width": 40
                                        }).append($("<div/>").addClass("checker").append($("<span/>").attr(attr))));

                                        $.each(data.columns,function(idx, node) {
                                        	var name = node.name;
                                        	var con = element[name];                                        	
                                        	
                                    		if(node.reader)
                                    		  {     
                                    			if(node.recoder){                                    				
                                    				con = node.reader(element[name],element[node.recoder]);                                    			  
                                    			}else{
                                    				con = node.reader(element[name]);
                                    			}
                                    		  }
                                        	  
                                                tr.append($("<td/>").css({
                                                        "width": node.width
                                                }).attr({
                                                	"title":con
                                        		}).append($("<div/>").attr({
                                        			"style":"overflow:hidden; text-overflow:ellipsis;white-space: nowrap;height:20px;"
                                        		}).append(con)));
                                                
                                        });

                                        var opt = $("<td/>").css({"width":data.options.length*60+10});
                                        $.each(data.options,
                                        function(i, el) {
                                                // opt.append($("<span/>").addClass( "glyphicon " +
                                                // el.icon));
                                        	
	                                           var dataNode = el.label;                                            	
	                                           if(el.reader){                                            	
	                                               dataNode = el.reader(element[el.recoder]);
	                                            }
	                                           
	                                            var span = $("<a/>").css({
	                                                    "background-color": el.color
	                                            }).attr({
	                                                    "key": element[el.name],
														"tag":element[el.recoder]
	                                            }).addClass("option-span").html(dataNode).bind("click",
	                                            function() {
	                                                    el.click($(this).attr("key"),$(this).attr("tag"));
	                                            });
	                                            opt.append(span);
                                                
                                        });
                                        if(data.options.length > 0 )
                                    	{                                    	
                                        	tr.append(opt);
                                    	}
                                        $(".grid-line", obj).append(tr);
                                });

                                initPageON(data, obj);
                                initEvent(data, obj);
                        }
                        
                        if(data.url && data.url.indexOf('tcOperationLog')!= -1 
                        		||data.url.indexOf('querySysConfig')!= -1){
                        	 $(".checker").parent().hide();
                        }                        
                       
                        $("tr:odd").addClass("sic-odd");
                        $("tr","tfoot").removeClass("sic-odd");
                        window.parent.unLoading();
                        $(".d-close").show();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // $.alert(data);
                        // $.unLoading("操作失败！" + textStatus);
                        $.log(textStatus);
                        window.parent.unLoading();
                }
        });
}
function initPageON(data, obj) {
        $("span[data-role='total-record']", obj).text(data.total);
        $("span[data-role='start-record']", obj).text((data.page - 1) * data.perNumber + 1);
        $("span[data-role='end-record']", obj).text(data.page * data.perNumber > data.total ? data.total: data.page * data.perNumber);
        $("span[data-role='page-count']", obj).text(data.pageCount);

        $("li[data-role='pageNo']").remove();
        var p = Div(data.page - 1, data.pageN);
        var c = data.page % data.pageN;
        if (c == 0) {
                p = p + c;
        }
        for (var i = 1; i <= data.pageN; i++) {
                var idx = p * data.pageN + i;
                $("li[data-role='role_next']", obj).before("<li data-role='pageNo' data-value='" + idx + "'><a href='#'>" + idx + "</a></li>");
                if (idx >= data.pageCount) {
                        break;
                }

        }

        if ($("li[data-value='1']", obj).length > 0) {
                $("li[data-role='role_prev']", obj).hide();

        } else {
                $("li[data-role='role_prev']", obj).show();
        }
        // $.alert($("li[data-value=" + pageCount + "]").html());
        if ($("li[data-value=" + data.pageCount + "]", obj).length > 0 || data.pageCount <= data.page) {
                // $.alert(1);
                $("li[data-role='role_next']", obj).hide();

        } else {
                // $.alert(2);
                $("li[data-role='role_next']", obj).show();
        }

        if (data.pageCount > data.page) {
                $("li[data-role='next']", obj).removeClass("disabled");
        } else {
                $("li[data-role='next']", obj).addClass("disabled");
        }
        if (data.page > 1) {
                $("li[data-role='prev']", obj).removeClass("disabled");
        } else {
                $("li[data-role='prev']", obj).addClass("disabled");
        }
        if (Div(data.page - 1, data.pageN) > 0) {
                $("li[data-role='firstPage']", obj).removeClass("disabled");
        } else {
                $("li[data-role='firstPage']", obj).addClass("disabled");
        }

        if (Div(data.page - 1, data.pageN) < Div(data.pageCount - 1, data.pageN)) {
                $("li[data-role='lastPage']", obj).removeClass("disabled");
        } else {
                $("li[data-role='lastPage']", obj).addClass("disabled");
        }

        var active = $("li[data-value=" + data.page + "]", obj);
        if (active) {
                $(".pagination li", obj).removeClass("active");
                active.addClass("active");
        }

}

function Div(exp1, exp2) {
        var n1 = Math.round(exp1); // 四舍五入
        var n2 = Math.round(exp2); // 四舍五入
        var rslt = n1 / n2; // 除
        if (rslt >= 0) {
                rslt = Math.floor(rslt); // 返回值为小于等于其数值参数的最大整数值。
        } else {
                rslt = Math.ceil(rslt); // 返回值为大于等于其数字参数的最小整数。
        }

        return rslt;
}

function initEvent(data, obj) {
        $(".pagination li", obj).unbind("click");
        $(".pagination li", obj).bind("click",
        function(event) {
                var type = $(this).attr("data-role");

                if ($(this).hasClass("disabled")) {

} else {
                        if (type == "pageNo") {

                                data.page = $(this).attr("data-value");
                                getLxhData(data);
                        } else if (type == "next") {
                                data.page = data.page * 1 + 1;
                                getLxhData(data);
                        } else if (type == "prev") {

                                data.page = data.page * 1 - 1;
                                getLxhData(data);
                        } else if (type == "firstPage") {
                                data.page = 1;
                                getLxhData(data);
                        } else if (type == "lastPage") {
                                data.page = data.pageCount;
                                getLxhData(data);
                        }
                }
        });

        $(".checker span[data-role='selectAll']", obj).unbind("click");
        $(".checker span[data-role='selectAll']", obj).bind("click",
        function() {

                if ($(this).hasClass("checked")) {
                        $(".checker span[data-role='indexCheckbox']", obj).removeClass("checked");
                        $(this).removeClass("checked");
                } else {
                        $(".checker span[data-role='indexCheckbox']", obj).addClass("checked");
                        $(this).addClass("checked");
                }
        });
        $(".checker span[data-role='indexCheckbox']", obj).unbind("click");

        $.each($(".checker span[data-role='indexCheckbox']", obj),
        function(index, element) {

                $(element).bind("click",
                function(event) {

                        if ($(this).hasClass("checked")) {
                                $(this).removeClass("checked");
                        } else {
                                $(this).addClass("checked");
                        }
                });

        });
}
$.fn.extend({
        sic_time: function(date) {
                var obj = $(this);
                obj.empty();
                var day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                var w = obj.width();
                var h = obj.height();
                $(obj).append($("<div/>").addClass("sic_time-left").css({
                        "width": w * 0.55,
                        "height": h
                }).append($("<div/>").css({
                        "height": h * 0.45,
                        "font-size":"15px"
                }).append($("<span/>").text(day[date.getDay()]))).append($("<div/>").css({
                        "height": h * 0.55,
                        "font-size": "16px"
                }).append($("<span/>").text($.date_format(date, "mm月dd日"))))).append($("<div/>").addClass("sic_time-right").css({
                        "width": w * 0.45,
                        "height": h,
                        "font-size": "16px",
                        "vertical-align": "middle",
                        "display": "table-cell"
                }).append($("<span/>").text($.date_format(date, "hh:ii:ss"))));
        }

});
$.extend({
        date_format: function(myDate, dateTime) {
                dateTime = dateTime.replace("yyyy", myDate.getFullYear());
                dateTime = dateTime.replace("mm", myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1));
                dateTime = dateTime.replace("dd", myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate());
                dateTime = dateTime.replace("hh", myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours());
                dateTime = dateTime.replace("ii", myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes());
                dateTime = dateTime.replace("ss", myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds());
                return dateTime;
        },
        log: function(message) {
                window.console && window.console.log($.date_format(new Date(),"yyyy-mm-dd hh:ii:ss") + " :: " + message);
        },
       
     
        /**
			 * 过滤空的条件
			 */
        filterEmpty: function(params) {
                $.each(params,
                function(name, value) {
                        if ((typeof(value) == "number" && value == -1) || (typeof(value) == "string" && $.trim(value) == "")) {
                                delete params[name];
                        }
                });
                return params;
        },
        initOcx: function(ip, port) {
                sysCache["serverIP"] = ip; // ocx服务地址
                sysCache["serverPort"] = port; // ocx服务端口
                var mcocx = document.getElementById("mcocx");
                $.invoke(mcocx, "SetIpAddr", sysCache["serverIP"], sysCache["serverPort"]);
        },
        queryReception: function(domainCode, userID) {
                var params = {
                        domain_code: domainCode,
                        // user_id: userID,
                        sstart_date: $.date_format(new Date(), "yyyy-mm-dd"),
                        estart_date: $.date_format(new Date(), "yyyy-mm-dd"),
                        /*
					 * start_time : $.date_format(new Date(), "hh:ii:ss"),
					 * end_time : $.date_format(new Date(), "hh:ii:ss"),
					 */
                        status: 1,
                        page_num: 1,
                        per_number: 100

                };
                $.sendOcxRequest("query_reception", params, "func_100003");
        },
        videoNode: function(obj, type, thisCode) {
                var domainCode = $(obj).attr("id");
                $("li[nodetype='node']").remove();
                $.ajax({
                        type: "POST",
                        data: {
                                'domainCode': domainCode,
                                'typeId': type
                        },
                        url: '/sic/tcCourt/getGridInner.action',
                        success: function(data) {
                                $.log("getGridInner result : " + JSON2.stringify(data));
                                $.each(data.result,
                                function(index, element) {
                                        var a = $("<a/>").attr({
                                                id: element.id,
                                                name: element.roomName,
                                                nodetype: "node",
                                                domainCode: domainCode
                                        }).html("<i class='icon-facetime-video'/>&nbsp;" + element.roomName);
                                        if ($(obj).attr("level") == 1) {
                                                a.addClass("sic_tree_two");
                                        } else {
                                                a.addClass("sic_tree_there");
                                        }
                                        $("ul[id=" + domainCode + "]").append($("<li/>").attr({
                                                nodetype: "node"
                                        }).append(a));

                                });

                                $("a[nodetype='node']", $("ul[id=" + domainCode + "]")).bind("click",
                                function(event) {
                                        treeNodeClick($(this));
                                });
                                $("a[nodetype='node']:first", "ul[id=" + domainCode + "]").click();
                                $.refreshTreeMark(thisCode);

                        }
                });
        },
        videoPanel: function(data) {
                //	$.log('--->'+JSON2.stringify(data));
                $.each(data,
                function(index, element) {
                        $(".sic-video").append($("<div/>").addClass("sic-video-panel").attr({
                                id: element.id,
                                domainCode: element.domainCode,
                                title: element.roomName,
                                courtRoomId: element.courtRoomId,
                                codes: element.sdomainCode + "-" + element.devCode + "-" + element.videoChannelCode + "-" + element.videoStreamCode
                        }).append($("<img/>").attr({
                                "src": "../theme/images/right.png"
                        })).append($("<a/>").text(element.nodeName)));
                });
                $(".sic-video-panel").bind("click",
                function() {

                        var obj = $(this);
                        $.plays($(obj).attr("title"));
                        var playocx = document.getElementById("sic_playocx");

                        $.stopPlayer(playocx, -1,
                        function() {
                                if ($(obj).attr("codes")) {
                                        $.invoke(playocx, "SetLayOut", 1);
                                        var codes = $(obj).attr("codes");
                                        $.log(JSON2.stringify(codes));
                                        $.invoke(playocx, "StartRealPlaybyServiceUrl", codes, "1", sysCache["SIE_IPADDR"], sysCache["SIE_PORT"], 0, 0);

                                }
                        });

                });
        },
        
        playsStr: function(obj, element, palyFlag) {

                if ('1' == palyFlag || '3' == palyFlag) {

                        var roomIds = palyFlag == '1' ? $(obj).attr("roomId") : $(obj).attr("courtRoomId");
                        $.log("roomID" + roomIds);

                        $.ajax({
                                type: "POST",
                                url: '/sic/user/getRoomNode.action',
                                data: "roomID=" + roomIds,
                                success: function(msg) {
                                        $.log(JSON2.stringify(msg));
                                        $.plays($(obj).attr("title"));

                                        var playocx = document.getElementById("sic_playocx");

                                        $.stopPlayer(playocx, -1,
                                        function() {
                                                if (msg.result.length) {
                                                        $.invoke(playocx, "SetLayOut", msg.result.length == 3 ? 67 : msg.result.length );
                                                        $.each(msg.result,
                                                        function(index, element) {
                                                                $.log(JSON2.stringify(element));
                                                                var codes = [element.sdomainCode, element.devCode, element.videoChannelCode, element.videoStreamCode];
                                                                $.invoke(playocx, "StartRealPlaybyServiceUrl", codes.join("-"), "1", sysCache["SIE_IPADDR"], sysCache["SIE_PORT"], index, element.voice_flag == 0 ? 0 : 1);
                                                        });
                                                }
                                        });
                                }
                        });

                } else if ('2' == palyFlag || '4' == palyFlag) {
                        $.ajax({
                                type: "POST",
                                url: '/sic/user/getRoomNodeByAF.action',
                                data: "id=" + $(obj).attr("id"),
                                success: function(msg) {
                                        $.log(JSON2.stringify(msg));
                                        $.plays($(obj).attr("title"));

                                        var playocx = document.getElementById("sic_playocx");

                                        $.stopPlayer(playocx, -1,
                                        function() {
                                                if (msg.result.length) {
                                                        $.invoke(playocx, "SetLayOut", msg.result.length == 3 ? 67 : msg.result.length);
                                                        $.each(msg.result,
                                                        function(index, element) {
                                                                $.log(JSON2.stringify(element));
                                                                var codes = [element.sdomainCode, element.devCode, element.videoChannelCode, element.videoStreamCode];
                                                                $.invoke(playocx, "StartRealPlaybyServiceUrl", codes.join("-"), "1", sysCache["SIE_IPADDR"], sysCache["SIE_PORT"], index, element.voice_flag == 0 ? 0 : 1);
                                                        });
                                                }
                                        });
                                }
                        });
                }

        },
        playsZP: function(obj, element, docode, url) {
                $.ajax({
                        type: "POST",
                        url: '/sic/user/getVideoDetail.action',
                        data: {
                                'domainCode': docode,
                                'videoID': element.activityID
                        },
                        success: function(msg) {
                                $.log('5play==>' + JSON2.stringify(msg));
                                $.stopHxPlay();
                                var fileInfo = "0|";
                                $.each(msg.result,
                                function(index, element) {
                                        fileInfo = fileInfo + element.fileName + '|';
                                });
                                if (fileInfo.length > 3) {
                                        fileInfo = fileInfo.substring(0, fileInfo.length - 1);
                                }

                                $.log('[fileInfo]=>' + fileInfo + ';[url]=' + url);

                                $.startHxPlay(url, fileInfo);
                        }
                });
        },
     
        tree_checked:function(node,obj)
        {
        	var key = $(node).attr("tag");
        	var thisNode = $(".sic-tree-unchecked",$("ul[id='"+key+"']",obj));
    		if($(node).hasClass("icon-unchecked"))
    			{
	    			$(node).removeClass("icon-unchecked");
	    			$(node).removeClass("icon-check-sign");
	    			$(node).addClass("icon-check");
	    			thisNode.removeClass("icon-unchecked");
	    			thisNode.removeClass("icon-check-sign");
	    			thisNode.addClass("icon-check");
	    			
	    			//$.tree_up(node,obj);
    			}
    		else
    			{
	    			$(node).removeClass("icon-check");
	    			$(node).removeClass("icon-check-sign");
	    			$(node).addClass("icon-unchecked");
	    			thisNode.removeClass("icon-check");
	    			thisNode.removeClass("icon-check-sign");
	    			thisNode.addClass("icon-unchecked");
    			}
    		$.tree_up(node,obj);
        },
        tree_up:function(node,obj)
        {
        	var pid = $(node).attr("parentID");
            var checked = $(".icon-check[parentId='"+pid+"']",obj).length;
            var unchecked = $(".icon-unchecked[parentId='"+pid+"']",obj).length;
            var allchecked = $(".sic-tree-unchecked[parentId='"+pid+"']",obj).length;
            $.log(checked +" " + unchecked + " " + allchecked);
            var thisNode = $("i[tag="+pid+"]",obj);
            if(checked == allchecked)
            	{
            	thisNode.removeClass("icon-unchecked");
            	thisNode.removeClass("icon-check-sign");
            	thisNode.addClass("icon-check");
            	}
            else if(unchecked == allchecked)
        	{
            	thisNode.removeClass("icon-check");
            	thisNode.removeClass("icon-check-sign");
            	thisNode.addClass("icon-unchecked");
        	}else
    		{
        		thisNode.removeClass("icon-check");
        		thisNode.removeClass("icon-unchecked");
        		thisNode.addClass("icon-check-sign");
    		}
            if(pid!=-1)
            	{
            	 $.tree_up(thisNode,obj);
            	}
        	
        },
       
 
        head_click: function() {
                $(".sic-sortcut-panel").bind("click",
                function() {

                        var tid = $(this).attr("menu");
                        $("a[id='"+tid+"']",".main-left").click();
                       /* var src = $(this).attr("src");
                        if (src && src.length > 3) {
                                $.ajax({
                                        type: "POST",
                                        url: '/sic/index/setMenu.action',
                                        data: "id=" + tid,
                                        success: function(msg) {
                                               window.location.href = src;
                                        }
                                });

                        }*/
                });
        },
        init_sic: function() {
                $(".main-left").sic_left();
                $(".sic-conf").sic_conf();
                $(".sic-title").sic_title();
                $(".sic-shortcut").sic_shortcut();

                $(".sic-time").sic_time(new Date());
                setInterval(function() {
                        $(".sic-time").sic_time(new Date());
                },
                1000);
                $(".main-right").append($("<div/>").addClass("sic-footer").append($("<span/>").html("版权所有&copy;2015  南京怀业信息技术有限公司")));
                
            	$(".sic-menu").liangMeun();

        		var h = $(".main-right").height();
        		$(".main-left").css({
        			"height" : h
        		});
        		
        		$.head_click();
        		

        },
        getDomainCode: function(name) {
                var code = "";
                $.each(courtTree,
                function(index, element) {
                        if (element.name == name) {
                                code = element.domain_code;
                                return true;
                        }

                });
                return code;
        },
        getName: function(domainCode) {
                var name = "";
                $.each(courtTree,
                function(index, element) {
                        if (element.domain_code == domainCode) {
                                name = element.name;
                                return true;
                        }

                });
                return name;
        },
        getMonthName: function(num) {
                var name = "";
                $.each(month_data,
                function(index, element) {
                        if (element.num == num) {
                                name = element.name;
                                return true;
                        }

                });
                return name;
        },
        getMonthNum: function(name) {
                var num = "";
                $.each(month_data,
                function(index, element) {
                        if (element.name == name) {
                                num = element.num;
                                return true;
                        }

                });
                return num;
        },
        invoke: function(obj, method) {
        	var params = new Array();
			for(var i = 2; i < arguments.length; i++) {
				if (typeof(arguments[i]) == "number") {
					params.push(arguments[i]);
				} else {
					params.push("'" + arguments[i] + "'");
				}
			}
			
			if (method == "SetLayOut") {
				$.invoke(obj, "ResetLayOut");
			}
			
			
			var args = params.join(", ");
				
			var specials = ["StartRealPlay", "StartRealPlaybyServiceUrl", "StartPlayBack", "StartPlayBackEx", "StartDownloadEx"];
			if($.inArray(method, specials) > -1) {
				var sid = $.invoke(obj, "GetPlaySession");
				args = sid + ", " + args;
			}
			$.log("<" + $(obj).attr("id") + "> : invoke method ( " + method + " ) with arguments ( " + args + " ) ...");
			
			return eval("obj[method](" + args + ")");
        },
        stopPlayer: function(obj, wid, callback) {
                $.invoke(obj, "StopPlayByWinID", wid);

                var times = 10;
                var checkAndCall = function() {
                	
                        // 如果关闭成功或者超过10次仍未成功，则直接播放
                        if ($.invoke(obj, "GetPlayState", -1) == 0 || times == 0) {
                        	    $.log("get play state : " + 0 );
                                callback();
                        } else {
                        	     $.log("get play state : " + 1 );
                                // 未关闭成功，等待单位时间(1.5s)，并且有效次数减一
                                times--;
                                setTimeout(checkAndCall, 1500);
                        }
                };

                // 调用方法
                checkAndCall();
        },
        removeOCXS: function() {
                var objects = document.getElementsByTagName("object");
                if (objects && objects.length) {
                        $.each(objects,
                        function(index, element) {
                                var oid = $(element).attr("id");
                                if (oid && oid.indexOf("sic_playocx") != -1) {
                                        $.invoke(element, "StopPlayByWinID", -1);
                                }
                                if (oid && oid.indexOf("wall_playocx") != -1) {
                                    $.invoke(element, "StopPlayByWinID", -1);
                                }
                                if (oid && oid.indexOf("mcocx") != -1) {
                                        $.invoke(element, "StopPlayByWinID", -1);
                                }

                                if (oid && oid.indexOf("hxPlay") != -1) {
                                        $.invoke(element, "Close");
                                }
                        });
                        $(objects).remove();
                }
        },
        bindEvents: function() {
                var agent = navigator.userAgent.toLowerCase();
                if (agent.indexOf("msie") != -1) {
                        window.onbeforeunload = function() {
                                $.removeOCXS();
                        };
                        window.onunload = function() {
                                $.removeOCXS();
                        };
                }
        },
        getTheDate: function(time, format) {
                var date = new Date();
                date.setTime(date.getTime() + time * 1);
                return $.date_format(date, format);
        },
        getTimeLine: function() {
                var date = new Date();
                date.setHours(8);
                date.setMinutes(0);

                var time = [];
                for (var i = 0; i < 24; i++) {

                        var h = date.getHours();
                        var m = date.getMinutes();
                        time.push((h < 10 ? "0" + h: h) + ":" + (m < 30 ? "00": "30"));
                        date.setTime(date.getTime() + 30 * 60 * 1000);
                }
                //$.alert(JSON2.stringify(time));
                return time;
        },
        getHourTime: function() {
            var date = new Date();
            date.setHours(8);
            date.setMinutes(0);

            var time = [];
            for (var i = 0; i < 12; i++) {

                    var h = date.getHours();
                    var m = date.getMinutes();
                    time.push((h < 10 ? "0" + h: h));
                    date.setTime(date.getTime() + 60 * 60 * 1000);
            }
            //$.alert(JSON2.stringify(time));
            return time;
        },
       
        initHxPlay: function(obj) {
        	$(obj).empty();
                $(obj).append('<OBJECT id="hxPlay" height="' + $(obj).height() + '" width="' + $(obj).width() + '" classid="clsid:76F1E09E-7505-491F-B4BE-9159062F201A"	VIEWASTEXT>' + '<param name="_Version" value="65536">' + '<param name="_ExtentX" value="34793">' + '<param name="_ExtentY" value="13229">' + '<param name="_StockProps" value="0">' + '<param name="sMaxPlayer" value="5">' + '<param name="bTechCourt" value="-1">' + '<param name="bShowPanel" value="-1">' + '<param name="bQuotePlayLeft" value="0">' + '<param name="bQuotePlayRight" value="0">' + '</OBJECT>');
        },
        initHyPlay: function(obj) {
        	$(obj).empty();
                $(obj).append('<object height="' + ($(obj).height()) + '" width="' + $(obj).width() + '" id="sic_playocx" classid="clsid:A48CA6A2-D901-4E82-BF51-CDAFDAD78045" VIEWASTEXT><param name="ShowPlayBar" value="1"/><param name="ShowStretchBtn" value="1"/><param name="ShowTalkBack" value="1"/></object>');
              
                fullHyPlay();
                
        },
       
        startHxPlay: function(serverUri, fileInfo) {
                $.log("hx play params :" + serverUri + " : " + fileInfo);
                var play = document.getElementById("hxPlay");
                var ret = play.PlayFiles(serverUri, fileInfo);
                $.log("hx play start result : " + ret);
        },
        stopHxPlay: function() {
                var play = document.getElementById("hxPlay");
                if(play){                	
                	play.Close();
                }
        },
        initMxCloud: function() {
                $.ajax({
                        type: "POST",
                        url: sysCache["MxCloud"]+'/mxlogin.BSI?username=admin&userp=admin&encoding=uft-8',
                        dataType: "jsonp",
                        jsonp: "callbackparam",
                        //服务端用于接收callback调用的function名的参数
                        jsonpCallback: "openMx" //callback的function名称
                });
        },
        sicValidate:function(obj)
        {
        	var res = true;
        	$(".validate",$(obj)).each(function(index){
        		var p = $(this).attr("validate_type");
        		if(p)
        		{
        			var ps = p.split(",");
        			 for(var i=0;i<ps.length;i++)
        				 {
        				   if(ps[i] == "required")
    					   {
        					   $.log($._required($(this)));
    					     if(!$._required($(this)))
    					    	 {
    					    	  res = false;
    					    	  return ;
    					    	 }
    					   }else if(ps[i] == "number"){
    						   if(!$._number($(this))){
    							   res = false;
    							   return ;
    						   }
    					   }
        				 }
        			 if(!res)
        				 {
        				 return;
        				 }
        		}
        	});
        	return res;
        	
        },
        /**
         * Required validation
        *
        * @param {jqObject} field
        * @param {Array[String]} rules
        * @param {int} i rules index
        * @param {Map}
        *            user options
        * @return an error string if validation failed
        */
       _required: function(obj) {
    	   var field = $(obj);
    	   $.log(field.attr("sicType"));
    	   var flag= true;
    	   $.removeValTitle(field);    	   
           switch (field.attr("sicType")) {
               case "text":
               case "password":
               case "textarea":
               case "file":
               case "select":
               default:
                   if ((!field.val()) || $.trim(field.val())=='' || $.trim(field.val())=='根节点' || $.trim(field.val())=='选择上传文件')
            	   {
                	   $.addValTitle(field,allRules.required.alertText); 
                	   flag = false;
            	   }
                   break;
               case "radio":
               case "checkbox":
					var form = field.closest("form");
                   var name = field.attr("name");
                   if (form.find("input[name='" + name + "']:checked").size() == 0) {
                       if (form.find("input[name='" + name + "']").size() == 1)
                       {
                    	   $.addValTitle(field,allRules.required.alertTextCheckboxe); 
                    	   flag = false;
                    	   }
                       else
                       {
                    	   $.addValTitle(field,allRules.required.alertTextCheckboxMultiple); 
                    	   flag = false;
                    	   }
                   }
                   break;
               // required for <select>
               case "select-one":
                   // added by paul@kinetek.net for select boxes, Thank you
                   if (!field.val())
                   {
                	   $.addValTitle(field,allRules.required.alertTextCheckboxMultiple); 
                	   flag = false;
                	   }
                   break;
               case "select-multiple":
                   // added by paul@kinetek.net for select boxes, Thank you
                   if (!field.find("option:selected").val())
                   {
                	   $.addValTitle(field,allRules.required.alertTextCheckboxMultiple); 
                	   flag = false;
            	   }
                   break;
           }
           return flag;
       },
       _number:function(obj){
    	   var field = $(obj);
    	   $.log(field.attr("sicValType"));
    	   var flag= true;
    	   $.removeValTitle(field);
    	   
		   if ((!field.val()) || $.trim(field.val())=='')
		   {
			   $.addValTitle(field,allRules.required.alertText); 
			   flag = false;
    	   }else{    		   
    		   switch (field.attr("sicValType")) {
    		   case "number":
    		   default:
    			  if(!(allRules.integer.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.integer.alertText);
    				   flag = false;
    			   }
    		   break;
    		   case "onlyLetterNumber":
    			   if(!(allRules.onlyLetterNumber.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.onlyLetterNumber.alertText);
    				   flag = false;
    			   }
    		   break;
    		   case "onlyNumberSp":
    			   if(!(allRules.onlyNumberSp.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.onlyNumberSp.alertText);
    				   flag = false;
    			   }
    		   break;
    		   case "email":
    			   if(!(allRules.email.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.email.alertText);
    				   flag = false;
    			   }
    			   break;
    		   case "ipv4":
    			   if(!(allRules.ipv4.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.ipv4.alertText);
    				   flag = false;
    			   }
    			   break;
    		   case "identityId":
    			   /*if(!(allRules.identityId.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.identityId.alertText);
    				   flag = false;
    			   }*/
    			   flag = true;
    			   break;
    		   case "validName":
    			   /* 
    			    * if(!(allRules.validName.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.validName.alertText);
    				   flag = false;  
    			   }*/
    			   flag = true;
    			   break;
    		   case "bankAccount":
    			   /*if(!(allRules.bankAccount.regex.test(field.val()))){
    				   $.addValTitle(field,allRules.bankAccount.alertText);
    				   flag = false;
    			   }*/
    			   flag = true;
    			   break;
    		   case "userName":
    			   $.ajax({
                       type: "POST",
                       url: allRules.ajaxUserCall.url,
                       data: "loginName=" + $("#loginName").val(),
                       success: function(msg) {
                              if(msg.code==1){                            	  
                            	  $.addValTitle(field,allRules.ajaxUserCall.alertText);
       				   			  flag = false;
                              }
                       }
               });
    		   }
    	   }  	   
                   return flag;
       },
       addValTitle:function(obj, message) {
    		$(obj).css("border", "1px solid #b3508f");
    		$(obj).after("<div class='valid_all'><div class='wms_title'>" + message + "</div></div>");
    		var off = $(obj).offset();
    		var width = $(obj).width();
    		$(obj).next("div").offset({
    			top : off.top - 32,
    			left : off.left + 30
    		});
    		setTimeout(function() {
    			$(".valid_all").fadeOut(2000);
    			$(obj).css("border", "1px solid #ddd");
    		}, 3000);
    	},
    	removeValTitle:function(obj) {
    		$(obj).next("div").remove();
    		$(obj).css("border", "1px solid #ddd");
    	},
    	sic_clock:function(){

	    	    ///得到时分秒
	    	    var now = new Date();
	    	    var sec = now.getSeconds(),
	    	    min = now.getMinutes(),
	    	    hour = now.getHours();
	    	    hour = hour >= 12 ? hour - 12 : hour;
	    	    var c = document.getElementById("myCanvas").getContext("2d");
	
	    	    c.save();
	    	    c.clearRect(0, 0, 350, 350); ///初始化画布
	    	    c.translate(150, 150);
	    	    c.scale(0.4, 0.4);
	
	    	    c.rotate( - Math.PI / 2);
	
	    	    c.strokeStyle = "#77c5f1";
	    	    c.fillStyle = "#77c5f1";
	    	    c.lineWidth = 8;
	    	    c.lineCap = "round";
	
	    	    c.save();
	    	  /* c.beginPath();
	    	    c.strokeStyle = "#333";
	    	    for (var i = 0; i < 12; i++) { ///小时刻度
	    	        c.rotate(Math.PI / 6);
	    	        c.moveTo(280, 0);
	    	        c.lineTo(320, 0);
	    	        c.font = "40px Arial";
	    	        c.fillText(i + 1, 220, 15);
	    	    }
	    	    c.stroke();
	    	    c.restore();
	    	    c.save();*/
	
	    	 /*   c.lineWidth = 5;
	    	    c.beginPath();
	    	    for (var i = 0; i < 60; i++) { ///分钟刻度
	    	        if (i % 5 != 0) {
	    	            c.moveTo(300, 0);
	    	            c.lineTo(320, 0);
	    	        }
	    	        c.rotate(Math.PI / 30);
	    	    }
	    	    c.stroke();
	    	    c.restore();
	    	    c.save();*/
	    	    c.rotate((Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec); ///画上时针
	    	    c.strokeStyle = "#333";
	    	    c.lineWidth = 12;
	    	    c.beginPath();
	    	    c.moveTo( - 20, 0);
	    	    c.lineTo(160, 0);
	    	    c.stroke();
	    	    c.restore();
	    	    c.save();
	
	    	    c.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec); ///分针
	    	    c.strokeStyle = "#29A8DE";
	    	    c.lineWith = 4;
	    	    c.beginPath();
	    	    c.moveTo( - 28, 0);
	    	    c.lineTo(185, 0);
	    	    c.stroke();
	    	    c.restore();
	    	    c.save();
	
	    	    c.rotate(sec * Math.PI / 30); ///秒针
	    	    c.strokeStyle = "#D40000";
	    	    c.lineWidth = 2;
	    	    c.beginPath();
	    	    c.moveTo( - 30, 0);
	    	    c.lineTo(240, 0);
	    	    c.stroke();
	    	    c.restore();
	    	    c.save();
	    	    ///表框      
	    	    c.lineWidth = 10;
	    	    c.strokeStyle = "#29A8DE";
	    	    c.beginPath();
	    	   /* c.arc(0, 0, 342, 0, Math.PI * 2, true);*/
	    	    c.stroke();
	    	    c.restore();
	    	    c.restore();
    	},
    	  /**
    	   * 获得 录像ID 的具体回放信息
    	   */
    	 fillVideoPlayback:function(data){	
    		 $.log("fillVideoPlayback : " + JSON2.stringify(data));
    	  	// 拼接json 通过json调用ocx进行回放
    	  	var i = 0;
    	  	var videos = new Array();
    	  	var records = new Array();
    	  	
    	  	/*var obj = $("#sic_playocx");*/
    	  	var v_recordtypeflag = 0;//1:经济录像，0 ：非经济录像   $("#recordtype_flag", obj).intVal();
    	  	
    	  	$.each($.filterVideo2(data , v_recordtypeflag), function(index, element) {
    	  		var record = {
    	  			recordId: element.record_id,
    	  			rdomainCode: element.rdomain_code,
    	  			startTime: 0,
    	  			stopTime: 100,
    	  			speed: 1,
    	  			isAudioValid: element.voice_flag,
    	  			ntype: 1 //传输类型 
    	  		};
    	  		//record_type 采集点  非0 是举证
    	  		if (element.record_type == 0) {
    	  			videos.push({ wid: i++, recordList: [ record ] });
    	  		} else {
    	  			records.push(record);
    	  		}
    	  	});
    	  	records.length > 0 && videos.push({ wid: i++, recordList: records });
    	  	
    	  	var _data = {
    	  		domainIP: sysCache["SIE_IPADDR"],
    	  		port: sysCache["SIE_PORT"] * 1,
    	  		videoList: videos
    	  	};
    	  	
    	  	$.log(" _data : " + JSON2.stringify(_data));
    	  	//获得当前的播放控件
    	  	var playOcx = document.getElementById("sic_playocx");
    	  	//先关闭全部流
    	  	$.stopPlayer(playOcx, -1, function() {
    	  		$.invoke(playOcx, "SetLayOut", v_recordtypeflag == 1 ? 128 + 4 : i );
    	  		$.invoke(playOcx, "StartMultiSyncPlayBack", JSON2.stringify(_data));
    	  	});
    	  },
    	  filterVideo2:function(data, recordtype_flag) {
    			var flag = recordtype_flag == 0 ? 0 : 1;
    			return $.grep(data, function(n) { return flag == n.synthesis_flag || flag == 1 && n.record_type == 1 ;} );
    		},
    	  _initMap:function(obj,domainCode)
    	  {
    		  $(obj).empty();
    		  $.each(tc_area_params,function(i,n){
    			  if(n.domainCode == domainCode)
				  {
    				  $(obj).append($("<div/>").addClass("map_panel").append($("<img/>").attr({
    					    "src": "/sic/theme/images/map/"+domainCode+".png",
    					    "id": "map_id",
    					    "border": 0,
    					    "usemap": "#planetmap",
    					    "alt": "Planets",
    					    "domainCode":domainCode,
    					    "hidefocus":"true" 
    					}).append($("<map/>").attr({
    					    name: "planetmap",
    					    id: "planetmap"
    					}))));
    				  
    				  $.each(n.area,function(k,m){
    					         
    					        	 $("#planetmap").append($("<area/>").attr({
    					        		 id:m.key,
    					        		 shape:"poly",
    					        		 coords:m.value,
    					        		 href:"javascript:void(0);"	    							  
    					        	 }));
    					        	 
    					        	 if(m.hasMap == 0)
    					        	 {
    					        	 $(".map_panel").append($("<a/>").attr({							  
	    					        	 }).addClass(m.key + "_lable").html(m.name));
    					        	 }
    						  
    						  
    				  });
				  }
    		  });
    		  $("area").bind("click",function(){
    				if($("#map_id").attr("domainCode") ==  $(this).attr("id"))
    					{
	    					$("#map_id").attr({"src":"/sic/theme/images/map/" + sysCache["LOCAL_DOMAIN_CODE"] + ".png","domainCode":sysCache["LOCAL_DOMAIN_CODE"]});
	    					meunClick($("a[id='"+sysCache["LOCAL_DOMAIN_CODE"]+"']", ".sic-tree"));
	    					refreshMark(sysCache["LOCAL_DOMAIN_CODE"]+"']");
    					}
    				else
    					{
	    					  $("#map_id").attr({"src":"/sic/theme/images/map/" + $(this).attr("id") + ".png","domainCode":$(this).attr("id")});
	    					  
	    					  meunClick($("a[id='"+$(this).attr("id")+"']", ".sic-tree"));
	    					  
	    					  refreshMark($(this).attr("id"));
    					}
    				
    			});
    	  },
    	  _chailSelectCourt:function(obj,url){
    		  $.ajax({
    	            type: "POST",
    	            async: false, 
    	            dataType : 'json', 
    	            url: url,            
    	            success: function(msg) {
    		           	if(msg && msg.code == 0)
    	       		 	{
    		           		var temp = $(obj);
    		           		temp.append($("<option/>").attr({value:1}).text("全部"));
    		           		$.each(msg.result,function(index, element){
    		           			temp.append($("<option/>").attr({value:element.domainCode}).text(element.domainName));
    	      				});
    	       		 	}
    	            },error: function(XMLHttpRequest, textStatus, errorThrown){
    	           	  $.log("XMLHttpRequest: "+ XMLHttpRequest +" textStatus: "
    	         			  + textStatus + " errorThrown:" + errorThrown);
    	         	 window.parent.alert("操作失败");
    	           }
    	   	 	});
    	  },
    	  _chailSelectCaseType:function(obj,url){
    		  $.ajax({
    	            type: "POST",
    	            async: false, 
    	            dataType : 'json', 
    	            url: url,            
    	            success: function(msg) {
    		           	if(msg && msg.code == 0)
    	       		 	{
    		           		var temp = $(obj);
    		           		temp.append($("<option/>").attr({"value":''}).text('全部'));
    		           		$.each(msg.result,function(index, element){
    		           			temp.append($("<option/>").attr({value:element.id}).text(element.name));    		           				
    	      				});
    	       		 	}
    	            },error: function(XMLHttpRequest, textStatus, errorThrown){
    	           	  $.log("XMLHttpRequest: "+ XMLHttpRequest +" textStatus: "
    	         			  + textStatus + " errorThrown:" + errorThrown);
    	         	 window.parent.alert("操作失败");
    	           }
    	   	 	});
    	  },
    	  _chailSelectDept:function(obj,url,domainCode,reportModel){
    		  $.ajax({
    	            type: "POST",
    	            async: false, 
    	            dataType : 'json', 
    	            url: url,
    	            data:{
    	            	"domainCode":domainCode,
    	            	"reportModel":reportModel
    	            },
    	            success: function(msg) {
    		           	if(msg && msg.code == 0)
    	       		 	{
    		           		var temp = $(obj);
    		           		temp.append($("<option/>").attr({"value":''}).text('全部'))
    		           		$.each(msg.result,function(index, element){
    		           			temp.append($("<option/>").attr({value:element.id}).text(element.name));
    	      				});
    	       		 	}
    	            },error: function(XMLHttpRequest, textStatus, errorThrown){
    	           	  $.log("XMLHttpRequest: "+ XMLHttpRequest +" textStatus: "
    	         			  + textStatus + " errorThrown:" + errorThrown);
    	         	 window.parent.alert("操作失败");
    	           }
    	   	 	});
    	  },
		  _getMonthSection:function(startTime,endTime,nowTime)
			{
				if(nowTime.length < 8 )
					{
					nowTime = nowTime + "-01";
					}
				
			   var sTime;
				var eTime;
				var startDate = new Date(Date.parse(startTime.replace(/-/g, "/")));
				var endDate = new Date(Date.parse(endTime.replace(/-/g, "/")));
				var nowDate = new Date(Date.parse(nowTime.replace(/-/g, "/")));
			    var day = new Date(nowDate.getFullYear(),nowDate.getMonth() + 1,0);  
				
				var nowMonthEndDay = new Date(nowDate.getFullYear(),nowDate.getMonth() + 1,0);
				var nowMonthStartDay = new Date(nowDate.getFullYear(),nowDate.getMonth(),01);
			
				$.log($.date_format(startDate, "yyyy-mm-dd hh:ii:ss") + " " +$.date_format(endDate, "yyyy-mm-dd hh:ii:ss") + " " +$.date_format(nowMonthEndDay, "yyyy-mm-dd hh:ii:ss") + " " + $.date_format(nowMonthStartDay, "yyyy-mm-dd hh:ii:ss") +" " +$.date_format(nowDate, "yyyy-mm-dd hh:ii:ss") );
				
				if(startDate.getTime() > nowMonthStartDay.getTime())
				{
					 sTime = startDate;
				}
				else 
				{
					 sTime = nowMonthStartDay;
				}
				
				if(nowMonthEndDay.getTime() > endDate.getTime())
				{
					 eTime = endDate;
				}
				else 
				{
					 eTime = nowMonthEndDay;
				}
				
				return {"startDate" : $.date_format(sTime, "yyyy-mm-dd"),"endDate" : $.date_format(eTime, "yyyy-mm-dd")};
			},
			_formToJson: function (data) {
				data=data.replace(/&/g,"\",\"");
			    data=data.replace(/=/g,"\":\"");
			    data="{\""+data+"\"}";
			    return data;
			 },
			 _JsonToParam:function(data){
				 var s = "";
				 var i = 0;
				 for(var x in data)
					 {
					  if(i == 0)
						  {
						  s = x +"=" + data[x];
						  }
					  else
						  {
						  s = s+"&"+x +"=" + data[x];
						  }
					  i++;
					
					 }
				 s = s.replace(/undefined/g, "");
				 s = s.replace(/null/g, "");
				 $.log(s);
				 return "?" + s;
			 }

});

$.fn.liangMeun = function() {
	    var id = sysCache["menuID"];
        var obj = $(this);
        var ul = $("<ul/>");
        // $.log(datas);
        var data = JSON2.parse(sysCache["menu"]);
        $.each(data,
        function(index, element) {
                ul.append($("<li/>").attr({
                        "id": element.id,
                        "parentID": element.parentId,
                        "level": element.level,
                        "itype": element.description
                }).append($("<a/>").attr({
                        "id": element.id,
                        "src": element.url,
                        "level": element.level,
                        "active": 0,
                        "parentID": element.parentId,
                        "itype": element.description
                }).append($("<i/>").addClass("left-i").addClass(element.imgUrl)).append(element.name).append($("<i/>").addClass("right-i").addClass("icon-chevron-right"))).append($("<ul/>").css({
                        "display": "none"
                }).attr({
                        "id": element.id,
                        "parentID": element.parentId,
                        "level": element.level
                }).addClass("menu-one")));

        });
        obj.append(ul);

        $(".right-i", "a[level='2']").remove();

        $.each($("li[level='2']"),
        function(index, element) {
                $("ul[id=" + $(this).attr("parentId") + "]").append(element);
        });
        $("a[id='1']").addClass("active");

        $("a", obj).bind("click",
        function() {
        	    $(".active").removeClass("active");
        	    $(this).addClass("active");
                $("li ul[id!=" + $(this).attr("parentid") + "]", $(obj)).hide();
                $("li ul[id=" + $(this).attr("parentid") + "]", $(obj)).show();
                $("ul[id=" + $(this).attr("id") + "]", $(obj)).show();
                
                var tid = $(this).attr("id");
                var src = $(this).attr("src");
                if (src && src.length > 3) {
                        $.ajax({
                                type: "POST",
                                url: '/sic/index/setMenu.action',
                                data: "id=" + tid,
                                success: function(msg) {
                                      //window.location.href = src+"?time="+Math.random();
                                       $("#sic-iframe").attr({src:src+"?time="+Math.random()});
                                }
                        });

                	 
                }

        });

        $("a[id=" + id + "]", $(obj)).addClass("active");
        $("ul[id=" + $("a[id=" + id + "]", $(obj)).attr("parentID") + "]").slideToggle("slow");

};
$.fn.rTree = function(data) {

        var obj = $(this);
        var ul = $("<ul/>");
        $.each(data,
        function(index, element) {
                ul.append($("<li/>").attr({
                        id: element.domainCode,
                        level: element.level,
                        parentID: element.parentCode,
                        nodeType: "court"
                }).append($("<a/>").attr({
                        id: element.domainCode,
                        name: element.domainName,
                        tag: element.shortName,
                        title: element.shortName,
                        level: element.level,
                        parentID: element.parentCode,
                        json: element.json,
                        show: 0,
                        nodeType:"tree"
                }).append($("<i/>").html("&nbsp;" + element.domainName).attr({
                        id: element.domainCode,
                        level: element.level,
                }))).append($("<ul/>").attr({
                        id: element.domainCode,
                        level: element.level,
                        parentID: element.parentCode
                })));
        });
        obj.append(ul);

        $.each($("li", obj),
        function(index, element) {
                $("ul[id=" + $(this).attr("parentID") + "]").append(element);
        });
        $("ul",ul).hide();
        $("i[level='1']", obj).addClass("icon-sitemap");
        $("i[level='2']", obj).addClass("icon-sitemap");
        $("i[level='3']", obj).addClass("icon-home");
        
        $("a[level='1']", obj).addClass("sic-tree-parent");
        $("a[level='2']", obj).addClass("sic-tree-second");
        $("a[level='3']", obj).addClass("sic_tree_child");
};

$.fn.xsyTree = function(data) {

        var obj = $(this);
        var ul = $("<ul/>");
        $.each(data,
        function(index, element) {
                ul.append($("<li/>").attr({
                        id: element.id,
                        level: element.courtType,
                        parentID: element.parentId,
                        nodeType: "court"
                }).append($("<a/>").attr({
                        "id": element.id,
                        "name": element.courtName,
                        "tag": element.shortName,
                        "title": element.shortName,
                        "num": element.value,
                        "level": element.courtType,
                        parentID: element.parentId,
                        show: 0
                }).append($("<i/>").html("&nbsp;" + element.courtName).attr({
                        id: element.id,
                        level: element.courtType,
                }))).append($("<ul/>").attr({
                        id: element.id,
                        level: element.courtType,
                        parentID: element.parentId
                })));
        });
        obj.append(ul);

        $.each($("li[level='2']", obj),
        function(index, element) {
                $("ul[id=" + $(this).attr("parentID") + "]").append(element);
        });
        $("i[level='1']", obj).addClass("icon-sitemap");
        $("i[level='2']", obj).addClass("icon-home");
        $("a[level='1']", obj).addClass("sic-tree-parent");
        $("a[level='2']", obj).addClass("sic_tree_child");

};

$.fn.sic_left = function() {
        $(this).empty();
        /*$(this).append($("<div/>").addClass("sic-logo").append($("<img/>").attr({
                "src": "/sic/theme/images/logo_ico.png"
        })))*/
        $(this).append($("<div/>").addClass("sic-menu"));
};
$.fn.sic_conf = function() {
		
	//$(this).empty();
	$(this).append($("<div/>").addClass("sic-name").append($("<span/>").text(sysCache["LOCAL_TITLE"])));
    $(this).append($("<div/>").addClass("sic-logout").append($("<img/>").attr({
          "src": "/sic/theme/images/quit_ico.png"
    }))).append($("<div/>").addClass("sic-time")).append("<div class='sic-login-info'><span>"+sysCache["loginName"]+"</span><img src='/sic/theme/images/user_ico.png'/></div>");
};
$.fn.sic_title = function() {
        //$(this).empty();$(this).append($("<div/>").addClass("sic-name").append($("<span/>").text(sysCache["sortName"] + "司法信息集控中心"))).append($("<div/>").addClass("sic-time"));
		$('.sic-title').hide();
};
$.fn.sic_shortcut = function() {
        $(this).empty();
        $(this).append($("<div/>").addClass("sic-sortcut-panel").attr({
                "src": "/sic/live/trialvideo.action",
                "menu": "8"
        }).append($("<img/>").attr({"src":"/sic//theme/images/icon_tingshenshikuang.png"})).append($("<span/>").text("庭审实况"))).append($("<div/>").addClass("sic-sortcut-panel").attr({
                "src": "/sic/user/mobile.action",
                "menu": "57"
        }).append($("<img/>").attr({"src":"/sic//theme/images/icon_ydongjiankong.png"})).append($("<span/>").text("移动监控"))).append($("<div/>").addClass("sic-sortcut-panel").attr({
                "src": "/sic/live/security.action",
                "menu": "10"
        }).append($("<img/>").attr({"src":"/sic//theme/images/icon_anbaojiankong.png"})).append($("<span/>").text("安保监控"))).append($("<div/>").addClass("sic-sortcut-panel").attr({
                "src": "/sic/user/video.action",
                "menu": "21"
        }).append($("<img/>").attr({"src":"/sic//theme/images/icon_tingshenluxiang.png"})).append($("<span/>").text("庭审录像"))).append($("<div/>").addClass("sic-sortcut-panel").css({"border-right":"1px solid #ddd"}).attr({
                "src": "/sic/user/ab.action",
                "menu": "22"
        }).append($("<img/>").attr({"src":"/sic//theme/images/icon_anbaoluxiang.png"})).append($("<span/>").text("安保录像")));
};
$.fn.sic_timeline = function() {
        var root = $(this);
        var top = $("<div/>").addClass("sic-time-panel");
        var span = $("<div/>");
        var bottom = $("<div/>").addClass("sic-time-panel");

        $.each($.getTimeLine(),
        function(i, n) {
                span.append($("<span/>").text(n));
                if (i % 2 == 0) {
                        top.append($("<div/>").addClass("sic-time-panel-top").attr({
                                "tag": n
                        }).append($("<div/>").addClass("sic-time-content").append($("<div/>").addClass("sic-time-title").text(n + "正在开庭的庭审")).append($("<div/>").addClass("sic-time-act"))).append($("<div/>").addClass("triangle-down")));
                } else {
                        bottom.append($("<div/>").addClass("sic-time-panel-top").attr({
                                "tag": n
                        }).append($("<div/>").addClass("triangle-up")).append($("<div/>").addClass("sic-time-content").append($("<div/>").addClass("sic-time-title").text(n + "正在开庭的庭审")).append($("<div/>").addClass("sic-time-act"))));
                }
        });
        root.append(top);
        root.append($("<div/>").addClass("sic-time-line"));
        root.append(span);

        root.append($("<div/>").addClass("sic-time-chevron-right"));
        root.append(bottom);
};
$(function() {
        $.init_sic();
        $.bindEvents();

        $("img", ".sic-logout").bind("mouseover",
        function(index, element) {
                $(this).attr({
                        "src": "/sic/theme/images/quit_ico_hover.png"
                });
        });
        $("img", ".sic-logout").bind("mouseout",
        function(index, element) {
                $(this).attr({
                        "src": "/sic/theme/images/quit_ico.png"
                });
        });
        $("img", ".sic-logout").bind("click",
        function(index, element) {
                location.href = "/sic/tcUser/logout.action";
        });

});
function openMx(data) {
        if (data.status == "success") {
       /* 	   var company = {
        			"name":"北京美信时代科技有限公司",
        			"url":"http://www.mxsoft.com",
        			"infotitle":"关于CreCloud",
        			"infoname":"CreCloud云管理平台V2.0",
        			"infocompany":"北京美信时代科技有限公司",
        			"infourl":"http://www.mxsoft.com",
        			"pagetitle":"CreCloud | 美信云网管"};
        	   setCookie('company',JSON2.stringify(company));*/
                 window.open(sysCache["MxCloud"]+"/index.html", "t10098");
                //location.href = sysCache["MxCloud"]+"/index.html";
        }
}
function setCookie(names, values, hours, path) {
		var name = escape(names);
		var value = escape(values);
		var expires = new Date();
		//expires.setTime(expires.getTime() + hours * 3600000);
		expires.setTime(expires.getTime() + (30*24*60*60*1000));
		path = path == "" ? "" : ";path=" + path;
		_expires = (typeof hours) == "string" ? "" : ";expires="
				+ expires.toUTCString();
		document.cookie = name + "=" + value + _expires + path;
	}

$.fn.slect_multi = function(obj)
{
	$(".multi-body").remove();
	$(this).after($("<div/>").addClass("multi-body"));
		

};

function click_play(obj)
{
	
 $.ajax({
    type: "POST",
    url: '/sic/live/getRoomNodeList.action',
    data: {
        roomID: $(obj).attr("roomid"),
        domainCode: $(obj).attr("domainCode")
    },
    success: function(msg) {
        $.log("getRoomNode " + JSON2.stringify(msg));
        $(".sic-report").empty();
        $(".sic-report").append('<object width="100%" height="590" id="sic_playocx" classid="clsid:A48CA6A2-D901-4E82-BF51-CDAFDAD78045" VIEWASTEXT><param name="ShowPlayBar" value="1"/><param name="ShowProgressBar" value="1"/><param name="ShowAudioBar" value="1"/><param name="ShowPlayPauseBtn" value="1"/><param name="ShowStretchBtn" value="1"/><param name="ShowTalkBack" value="1"/></object>');
       
        fullHyPlay();
        var res = [];
        var videoList = [];
        var par = initPlayParams(msg.result);
        var minStartTime="";
        $.each(par.list,
        function(index, element) {
            $.log(JSON2.stringify(element));
            var params = {
                strDomainCode: element.sdomainCode,
                strDeviceCode: element.devCode,
                strChannelCode: element.videoChannelCode,
                strStreamCode: element.videoStreamCode,
                //RecordLocation		录像所在位置(1:平台 2：前端)
                //RECORD_TYPE	Int	录像类型（1:计划 2：手动 4:告警 )
                strRecordLocation: "1",
                unRecordType: 7,
                strStartTime: $("#startTime").val(),
                strEndTime: $("#endTime").val(),
                nRecordDomain:1
            };
            $.ajax({
                type: "POST",
                url: '/sic/index/getSieData.action',
                data: {
                    msgID: 422,
                    cmd: "get_recordUrlList",
                    func_id: "1000",
                    session_id:1,
                    params: JSON2.stringify(params)
                },
                success: function(result) {
                	res.push(index);
                	var data_1 = JSON2.parse(result.json);
                	$.log("sie返回的json："+JSON2.stringify(data_1));
                	var data_2 = data_1.params;
               		/*if(data_2.nResultCode == 0)
              			{*/
               			var recordList=[];
              			  $.each(data_2.recordUrlList,function(j,m){
              				  //$.log("j :: " + JSON2.stringify(m));
							  var offset = 0;
							  var firstTime = "";
              				 $.each(m.playbackTimeList,function(i,n){
              					// $.log("i :: " + i);
								 if(i == 0)
								 {
									 offset = 0;
									 firstTime = n.strStartTime;
								 }else
								 {
									 offset = getTime(firstTime,n.strStartTime)/1000;
								 }
              					 if(j==0){
              						 minStartTime = n.strStartTime;
              					 }else{
              						if(minStartTime>n.strStartTime)
              							minStartTime=n.strStartTime;
              					 }
     							 var datas = {
                                        "recordId":  m.nRecordID, 
                                        "rdomainCode":sysCache["LOCAL_DOMAIN_CODE"], 
                                        "startTime": 0, 
                                        "stopTime": 0, 
                                        "speed": 1, 
                                        "isAudioValid": 1, 
                                        "ntype": sysCache["nts_type"]*1,
										"offset":offset
                                  };
     							 $.log(JSON2.stringify(recordList));
     							 if(recordList.length == 0)
     								 {
     								 datas.startTime = 0;
     								 datas.stopTime = getTime(n.strStartTime,n.strEndTime)/1000;
     								 }
     							 else 
     								 {
     								  
     								  datas.startTime= recordList[recordList.length-1].stopTime;
     							      datas.stopTime = getTime(n.strStartTime,n.strEndTime)/1000 + datas.startTime;
     								 }
     							recordList.push(datas);
 							 });
              			  });
               		     videoList.push({"wid":index,"seat":0,recordList: recordList});
              		
               		if(res.length == (par.list.length))
               			{
		                	var _data = {
		                	  		domainIP: sysCache["SIE_IPADDR"],
		                	  		port: sysCache["SIE_PORT"] * 1,
									videoStartTime: minStartTime,
		                	  		videoList: videoList
		                	  	};
		    				$.log("向OCX发送_data : " + JSON2.stringify(_data));
		    	    	  	//获得当前的播放控件
		    	    	  	var playOcx = document.getElementById("sic_playocx");
		    	    	  	//先关闭全部流
		    	    	  	 $.stopPlayer(playOcx, -1, function() {
		    	    	  		$.invoke(playOcx, "SetLayOut", par.layout == 3 ? 67 : par.layout );
		    	    	  		$.invoke(playOcx, "StartMultiSyncPlayBack", JSON2.stringify(_data));
		    	    	  	}); 
               			}
                }
            });
        });

        window.scrollTo(0, 0);
    }
});
}
function getTime(start,end)
{
  return new Date(Date.parse(end.replace(/-/g, "/"))).getTime() - new Date(Date.parse(start.replace(/-/g, "/"))).getTime();
}

function upWallControl()
{
	//$(".sic-tree").css({height:"524px"});
	$(".all-control-wall").empty();
    $(".all-control-wall")
	  .append($("<a/>").attr({
  		    })
  		    .append($("<i/>").attr({
  		    }).addClass("glyphicon glyphicon-floppy-open"))
  		    .append(" 全部上墙").bind("click",function(event){
				 $.each($(".sic-video-panel"),function(i,n){
					 $.log($(this).css("display"));
					 if($(this).css("display") == "block")
					 {
						 upWall($(this));
					 }
				 });
				}))
  		    
			 .append($("<a/>").attr({
				    })
					    .append($("<i/>").attr({
					    }).addClass("glyphicon glyphicon-floppy-save"))
					    .append(" 下墙").bind("click",function(event){
					    	
					    	 var _data = {
				            		 "domainIP":sysCache["SIE_IPADDR"],
				            		 "port":sysCache["SIE_PORT"]*1,
				            		 "domainCode":sysCache["LOCAL_DOMAIN_CODE"],
				            		 "serviceUrlList":[]
				             };
					    	 var playocx = document.getElementById("wall_playocx");
					    	 if(playocx)
					    		 {
					    		  $.log("DownTVWall result : " + playocx.DownTVWall(JSON2.stringify(_data)));
					    		 }
					    	 else {
								 $(".sic-video").append('<object width="1" height="1" id="wall_playocx" classid="clsid:A48CA6A2-D901-4E82-BF51-CDAFDAD78045" VIEWASTEXT><param name="ShowPlayBar" value="1"/><param name="ShowStretchBtn" value="1"/><param name="ShowTalkBack" value="1"/></object>');
								 playocx = document.getElementById("wall_playocx");
								 $.log("DownTVWall result : " + playocx.DownTVWall(JSON2.stringify(_data)));
							 }
						})
					   
			  ).append($("<a/>").attr({
			    })
			    .append($("<i/>").attr({
			    }).addClass("glyphicon glyphicon-share"))
			    .append(" 返回").bind("click",function(event){
			    	
			    	$("a[id='"+nowCode+"']", ".sic-tree").click();
			    	
				})
			   
	           );
}

function dataTime_setValue(val,id){
	$("#"+id).val(val);
}

function fullHyPlay()
{
	 $(".play_full").bind("click",function(){
		 var playocx = document.getElementById("sic_playocx");
		 if(playocx)
		 {
			 playocx.SetFullScreen(1);
		 }
		 
	 });
}
function initPlayParams(data) {

    var list = [];
    var layout = 1;
    var rtype = sysCache["record_type"];
    var gqList = $.grep(data,
    function(n) {
        return 0 == n.synthesisFlag;
    });
    var hcList = $.grep(data,
    function(n) {
        return 1 == n.synthesisFlag;
    });
    $.log("rtype : " + rtype);
    $.log("gqList : " + JSON2.stringify(gqList));
    $.log("hcList : " + JSON2.stringify(hcList));
    
    if (rtype == 0) {
        if (gqList.length > 0) {
            layout = gqList[0].layout;
            list = gqList;
            if(layout == 0)
        	{
        	  layout = list.length;
        	}
        } else {
            list = hcList;
        }
    } else {
        if (hcList.length > 0) {
            list = hcList;
        } else if (gqList.length > 0) {
            layout = gqList[0].layout;
            list = gqList;
            if(layout == 0)
        	{
        	  layout = list.length;
        	}
        }

    }
    var params = {
        layout: layout,
        list: list
    };
    $.log("initPlayParams : " + JSON2.stringify(params));
    return params;
}

function initRecordParams(data,layouts) {

	 var list = [];
	    var layout = 1;
	    var rtype = sysCache["record_type"];
	    var gqList = $.grep(data,
	    function(n) {
	        return 0 == n.synthesisFlag;
	    });
	    var hcList = $.grep(data,
	    function(n) {
	        return 1 == n.synthesisFlag;
	    });
	    $.log("rtype : " + rtype);
	    $.log("gqList : " + JSON2.stringify(gqList));
	    $.log("hcList : " + JSON2.stringify(hcList));
	    
	    if (rtype == 0) {
	        if (gqList.length > 0) {
	            layout = layouts;
	            list = gqList;
	            if(layout == 0)
	        	{
	        	  layout = list.length;
	        	}
	        } else {
	            list = hcList;
	        }
	    } else {
	        if (hcList.length > 0) {
	            list = hcList;
	        } else if (gqList.length > 0) {
	            layout = layouts;
	            list = gqList;
	            if(layout == 0)
	        	{
	        	  layout = list.length;
	        	}
	        }

	    }
	    var params = {
	        layout: layout,
	        list: list
	    };
	    $.log("initPlayParams : " + JSON2.stringify(params));
	    return params;
}
function hasElement(data,key){
	var result = false;
	$.each(data,function(i,n){
		if(n.key == key)
			{
			result = true;
			return false;
			}
	});
	return result;
}
