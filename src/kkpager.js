/*
  A page showing control achieved by js
  https://github.com/pgkk/kkpager

  Copyright (c) 2013 cqzhangkang@163.com
  Licensed under the GNU GENERAL PUBLIC LICENSE
*/
var kkpager = {
		//divID
		pagerid : 'kkpager',
		//当前页码
		pno : 1,
		//总页码
		total : 1,
		//总数据条数
		totalRecords : 0,
		//是否显示总页数
		isShowTotalPage : true,
		//是否显示总记录数
		isShowTotalRecords : true,
		//是否显示页码跳转输入框
		isGoPage : true,
		//链接前部
		hrefFormer : '',
		//链接尾部
		hrefLatter : '',
		lang : {
			prePageText : '上一页',
			nextPageText : '下一页',
			totalPageBeforeText : '共',
			totalPageAfterText : '页',
			totalRecordsAfterText : '条数据',
			gopageBeforeText : '转到',
			gopageButtonOkText : '确定',
			gopageAfterText : '页',
			buttonTipBeforeText : '第',
			buttonTipAfterText : '页'
		},
		gopageWrapId : 'kkpager_gopage_wrap',
		gopageButtonId : 'kkpager_btn_go',
		gopageTextboxId : 'kkpager_btn_go_input',
		
		/****链接算法****/
		getLink : function(n){
			//这里的算法适用于比如：
			//hrefFormer=http://www.xx.com/news/20131212
			//hrefLatter=.html
			//那么首页（第1页）就是http://www.xx.com/news/20131212.html
			//第2页就是http://www.xx.com/news/20131212_2.html
			//第n页就是http://www.xx.com/news/20131212_n.html
			if(n == 1){
				return this.hrefFormer + this.hrefLatter;
			}else{
				return this.hrefFormer + '_' + n + this.hrefLatter;
			}
		},
		//跳转框得到输入焦点时
		focus_gopage : function (){
			var btnGo = $('#'+this.gopageButtonId);
			$('#'+this.gopageTextboxId).attr('hideFocus',true);
			btnGo.show();
			btnGo.css('left','0px');
			$('#'+this.gopageWrapId).css('border-color','#6694E3');
			btnGo.animate({left: '+=44'}, 50,function(){
				//$('#'+this.gopageWrapId).css('width','88px');
			});
		},
		//跳转框失去输入焦点时
		blur_gopage : function(){
			var _this = this;
			setTimeout(function(){
				var btnGo = $('#'+_this.gopageButtonId);
				btnGo.animate({
				    left: '-=44'
				  }, 100, function(){
					  btnGo.css('left','0px');
					  btnGo.hide();
					  $('#'+_this.gopageWrapId).css('border-color','#DFDFDF');
				  });
			},400);
		},
		//跳转框页面跳转
		gopage : function(){
			var str_page = $('#'+this.gopageTextboxId).val();
			if(isNaN(str_page)){
				$('#'+this.gopageTextboxId).val(this.next);
				return;
			}
			var n = parseInt(str_page);
			if(n < 1 || n >this.total){
				$('#'+this.gopageTextboxId).val(this.next);
				return;
			}
			//这里可以按需改window.open
			window.location = this.getLink(n);
		},
		//分页按钮控件初始化
		init : function(config){
			this.pno = isNaN(config.pno) ? 1 : parseInt(config.pno);
			this.total = isNaN(config.total) ? 1 : parseInt(config.total);
			this.totalRecords = isNaN(config.totalRecords) ? 0 : parseInt(config.totalRecords);
			if(config.pagerid){this.pagerid = config.pagerid;}
			if(config.gopageWrapId){this.gopageWrapId = config.gopageWrapId;}
			if(config.gopageButtonId){this.gopageButtonId = config.gopageButtonId;}
			if(config.gopageTextboxId){this.gopageTextboxId = config.gopageTextboxId;}
			if(config.isShowTotalPage != undefined){this.isShowTotalPage=config.isShowTotalPage;}
			if(config.isShowTotalRecords != undefined){this.isShowTotalRecords=config.isShowTotalRecords;}
			if(config.isGoPage != undefined){this.isGoPage=config.isGoPage;}
			if(config.lang){
				for(var key in config.lang){
					this.lang[key] = config.lang[key];
				}
			}
			this.hrefFormer = config.hrefFormer || '';
			this.hrefLatter = config.hrefLatter || '';
			if(config.getLink && typeof(config.getLink) == 'function'){this.getLink = config.getLink;}
			//validate
			if(this.pno < 1) this.pno = 1;
			this.total = (this.total <= 1) ? 1: this.total;
			if(this.pno > this.total) this.pno = this.total;
			this.prv = (this.pno<=2) ? 1 : (this.pno-1);
			this.next = (this.pno >= this.total-1) ? this.total : (this.pno + 1);
			this.hasPrv = (this.pno > 1);
			this.hasNext = (this.pno < this.total);
			
			this.inited = true;
		},
		//生成控件代码
		generPageHtml : function(){
			if(!this.inited){
				return;
			}
			
			var str_prv='',str_next='';
			if(this.hasPrv){
				str_prv = '<a href="'+this.getLink(this.prv)+'" title="'
					+this.lang.prePageText+'">'+this.lang.prePageText+'</a>';
			}else{
				str_prv = '<span class="disabled">'+this.lang.prePageText+'</span>';
			}
			
			if(this.hasNext){
				str_next = '<a href="'+this.getLink(this.next)+'" title="'
					+this.lang.nextPageText+'">'+this.lang.nextPageText+'</a>';
			}else{
				str_next = '<span class="disabled">'+this.lang.nextPageText+'</span>';
			}
			var str = '';
			var dot = '<span>...</span>';
			var total_info='';
			if(this.isShowTotalPage || this.isShowTotalRecords){
				total_info = '<span class="normalsize">'+this.lang.totalPageBeforeText;
				if(this.isShowTotalPage){
					total_info += this.total + this.lang.totalPageAfterText;
					if(this.isShowTotalRecords){
						total_info += '&nbsp;/&nbsp;';
					}
				}
				if(this.isShowTotalRecords){
					total_info += this.totalRecords + this.lang.totalRecordsAfterText;
				}
				
				total_info += '</span>';
			}
			
			var gopage_info = '';
			if(this.isGoPage){
				gopage_info = '&nbsp;'+this.lang.gopageBeforeText+'<span id="'+this.gopageWrapId+'">'+
					'<input type="button" id="'+this.gopageButtonId+'" onclick="kkpager.gopage()" value="'
						+this.lang.gopageButtonOkText+'" />'+
					'<input type="text" id="'+this.gopageTextboxId+'" onfocus="kkpager.focus_gopage()"  onkeypress="if(event.keyCode<48 || event.keyCode>57)return false;"   onblur="kkpager.blur_gopage()" value="'+this.next+'" /></span>'+this.lang.gopageAfterText;
			}
			
			//分页处理
			if(this.total <= 8){
				for(var i=1;i<=this.total;i++){
					if(this.pno == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a href="'+this.getLink(i)+'" title="'
							+this.lang.buttonTipBeforeText + i + this.lang.buttonTipAfterText+'">'+i+'</a>';
					}
				}
			}else{
				if(this.pno <= 5){
					for(var i=1;i<=7;i++){
						if(this.pno == i){
							str += '<span class="curr">'+i+'</span>';
						}else{
							str += '<a href="'+this.getLink(i)+'" title="'+
								this.lang.buttonTipBeforeText + i + this.lang.buttonTipAfterText+'">'+i+'</a>';
						}
					}
					str += dot;
				}else{
					str += '<a href="'+this.getLink(1)+'" title="'
						+this.lang.buttonTipBeforeText + '1' + this.lang.buttonTipAfterText+'">1</a>';
					str += '<a href="'+this.getLink(2)+'" title="'
						+this.lang.buttonTipBeforeText + '2' + this.lang.buttonTipAfterText +'">2</a>';
					str += dot;
					
					var begin = this.pno - 2;
					var end = this.pno + 2;
					if(end > this.total){
						end = this.total;
						begin = end - 4;
						if(this.pno - begin < 2){
							begin = begin-1;
						}
					}else if(end + 1 == this.total){
						end = this.total;
					}
					for(var i=begin;i<=end;i++){
						if(this.pno == i){
							str += '<span class="curr">'+i+'</span>';
						}else{
							str += '<a href="'+this.getLink(i)+'" title="'
								+this.lang.buttonTipBeforeText + i + this.lang.buttonTipAfterText+'">'+i+'</a>';
						}
					}
					if(end != this.total){
						str += dot;
					}
				}
			}
			
			str = "&nbsp;"+str_prv + str + str_next  + total_info + gopage_info;
			$("#"+this.pagerid).html(str);
		}
};