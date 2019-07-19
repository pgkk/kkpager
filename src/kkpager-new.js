/*
  kkpager V1.3
  https://github.com/pgkk/kkpager

  Copyright (c) 2013 cqzhangkang@163.com
  Licensed under the GNU GENERAL PUBLIC LICENSE
*/

(function () {
	'use strict';
	var KKPager = function (conf) {
		// KKPager("conf") 或者 new KKPager("conf")都可以使用KKPager方法
		if (!(this instanceof KKPager))
			return new KKPager(conf);
		// 初始化
		this.init(conf);
	};
	KKPager.prototype = {
		config: {
			id: '', //div ID ,kkpager 容器
			pno: 1, //当前页码
			total: 1, //总页码
			totalRecords: 0, //总数据条数
			isShowFirstPageBtn: true, //是否显示首页按钮
			isShowLastPageBtn: true, //是否显示尾页按钮
			isShowPrePageBtn: true, //是否显示上一页按钮
			isShowNextPageBtn: true, //是否显示下一页按钮
			isShowTotalPage: true, //是否显示总页数
			isShowCurrPage: true,//是否显示当前页
			isShowTotalRecords: false, //是否显示总记录数
			isGoPage: true,	//是否显示页码跳转输入框
			isWrapedPageBtns: true,	//是否用span包裹住页码按钮
			isWrapedInfoTextAndGoPageBtn: true, //是否用span包裹住分页信息和跳转按钮
			hrefFormer: '', //链接前部
			hrefLatter: '', //链接尾部
			click: null,
			lang: {
				firstPageText: '首页',
				firstPageTipText: '首页',
				lastPageText: '尾页',
				lastPageTipText: '尾页',
				prePageText: '上一页',
				prePageTipText: '上一页',
				nextPageText: '下一页',
				nextPageTipText: '下一页',
				totalPageBeforeText: '共',
				totalPageAfterText: '页',
				currPageBeforeText: '当前第',
				currPageAfterText: '页',
				totalInfoSplitStr: '/',
				totalRecordsBeforeText: '共',
				totalRecordsAfterText: '条数据',
				gopageBeforeText: '&nbsp;转到',
				gopageButtonOkText: '确定',
				gopageAfterText: '页',
				buttonTipBeforeText: '第',
				buttonTipAfterText: '页'
			},
		},
		tips: {
			pluginName: "KKPager",
			say: "：",
			idIsUndefined: "请配置id属性"
		},
		init: function (config) {
			if (!this.checkConfig(config)) {
				return;
			}
			this.config.id = config.id;
			this.config.pno = isNaN(config.pno) ? 1 : parseInt(config.pno);
			this.config.total = isNaN(config.total) ? 1 : parseInt(config.total);
			this.config.totalRecords = isNaN(config.totalRecords) ? 1 : parseInt(config.totalRecords);
			if (config.isShowFirstPageBtn != undefined) { this.config.isShowFirstPageBtn = config.isShowFirstPageBtn; }
			if (config.isShowLastPageBtn != undefined) { this.config.isShowLastPageBtn = config.isShowLastPageBtn; }
			if (config.isShowPrePageBtn != undefined) { this.config.isShowPrePageBtn = config.isShowPrePageBtn; }
			if (config.isShowNextPageBtn != undefined) { this.config.isShowNextPageBtn = config.isShowNextPageBtn; }
			if (config.isShowTotalPage != undefined) { this.config.isShowTotalPage = config.isShowTotalPage; }
			if (config.isShowCurrPage != undefined) { this.config.isShowCurrPage = config.isShowCurrPage; }
			if (config.isShowTotalRecords != undefined) { this.config.isShowTotalRecords = config.isShowTotalRecords; }
			if (config.isWrapedPageBtns) { this.config.isWrapedPageBtns = config.isWrapedPageBtns; }
			if (config.isWrapedInfoTextAndGoPageBtn) { this.config.isWrapedInfoTextAndGoPageBtn = config.isWrapedInfoTextAndGoPageBtn; }
			if (config.isGoPage != undefined) { this.config.isGoPage = config.isGoPage; }
			if (config.lang) {
				for (var key in config.lang) {
					this.config.lang[key] = config.lang[key];
				}
			}
			this.config.click = config.click;
			// validate
			if (this.config.pno < 1) this.config.pno = 1;
			this.config.total = (this.config.total <= 1) ? 1 : this.config.total;
			if (this.config.pno > this.config.total) this.config.pno = this.config.total;
			this.config.prv = (this.config.pno <= 2) ? 1 : (this.config.pno - 1);
			this.config.next = (this.config.pno >= this.config.total - 1) ? this.config.total : (this.config.pno + 1);
			this.config.hasPrv = (this.config.pno > 1);
			this.config.hasNext = (this.config.pno < this.config.total);
			this.showKKPager();
		},
		checkConfig: function (conf) {
			var _tips = this.tips;
			if (conf.id == undefined) {
				console.error(_tips.pluginName + _tips.say + _tips.idIsUndefined);
				return false;
			}
			return true;
		},
		showKKPager: function () {
			var _kkcon = this.config, _kklang = this.config.lang;
			var _disabled = "";
			var _kkpagerContent = "#" + _kkcon.id;
			// 页码列表（包括首页、上一页、下一页、尾页）
			$(_kkpagerContent).html("<ul class='kkpager-pages'></ul>");
			// 首页
			if (_kkcon.isShowFirstPageBtn) {
				_disabled = _kkcon.hasPrv ? "" : "class='kkpager-disabled'";
				$(_kkpagerContent + " .kkpager-pages").append("<li data-value='1' " + _disabled + ">" + _kklang.firstPageText + "</li>");
			}
			// 上一页
			if (_kkcon.isShowPrePageBtn) {
				_disabled = _kkcon.hasPrv ? "" : "class='kkpager-disabled'";
				$(_kkpagerContent + " .kkpager-pages").append("<li data-value='" + _kkcon.prv + "' " + _disabled + ">" + _kklang.prePageText + "</li>");
			}
			// 页码
			var _kkpageBeforOmit = false, _kkpageAfterOmit = false;
			for (var _kkpageNum = 1; _kkpageNum <= _kkcon.total; _kkpageNum++) {
				// 最前两页/最后两页
				var _showNum = _kkpageNum == 1 || _kkpageNum == 2 || _kkpageNum == _kkcon.total - 1 || _kkpageNum == _kkcon.total;
				// 当前页/当前页前两页/当前页后两页
				_showNum = _showNum || _kkpageNum == _kkcon.pno || _kkpageNum == _kkcon.pno - 1 || _kkpageNum == _kkcon.pno - 2 || _kkpageNum == _kkcon.pno + 1 || _kkpageNum == _kkcon.pno + 2;
				if (_showNum) {
					var _kkactive = _kkpageNum == _kkcon.pno ? "class='active kkpager-disabled'" : "";
					$(_kkpagerContent + " .kkpager-pages").append("<li data-value='" + _kkpageNum + "' " + _kkactive + ">" + _kkpageNum + "</li>");
				}
				if (!_showNum && (!_kkpageBeforOmit || !_kkpageAfterOmit)) {
					if (!_kkpageBeforOmit && _kkpageNum < _kkcon.pno) {
						$(_kkpagerContent + " .kkpager-pages").append("<li class='kkpager-omit'>…</li>");
						_kkpageBeforOmit = true;
					}
					if (!_kkpageAfterOmit && _kkpageNum > _kkcon.pno) {
						$(_kkpagerContent + " .kkpager-pages").append("<li class='kkpager-omit'>…</li>");
						_kkpageAfterOmit = true;
					}
				}
			}
			// 下一页
			if (_kkcon.isShowNextPageBtn) {
				_disabled = _kkcon.hasNext ? "" : "class='kkpager-disabled'";
				$(_kkpagerContent + " .kkpager-pages").append("<li data-value='" + _kkcon.next + "' " + _disabled + ">" + _kklang.nextPageText + "</li>");
			}
			// 尾页
			if (_kkcon.isShowLastPageBtn) {
				_disabled = _kkcon.hasNext ? "" : "class='kkpager-disabled'";
				$(_kkpagerContent + " .kkpager-pages").append("<li data-value='" + _kkcon.total + "' " + _disabled + ">" + _kklang.lastPageText + "</li>");
			}
			// 信息（当前页码、总页码、总条数、跳页）
			var _kkAppendFrist = false;
			$(_kkpagerContent).append("<div class='kkpager-tips'></div>");
			// 当前页
			if (_kkcon.isShowCurrPage) {
				$(_kkpagerContent + " .kkpager-tips").append("<span>" + _kklang.currPageBeforeText + "<span class='kkpager-hilight'>" + _kkcon.pno + "</span>" + _kklang.currPageAfterText + "</span>");
				_kkAppendFrist = true;
			}
			// 总页数
			if (_kkcon.isShowTotalPage) {
				if (_kkAppendFrist) {
					$(_kkpagerContent + " .kkpager-tips").append("/");
				}
				_kkAppendFrist = true;
				$(_kkpagerContent + " .kkpager-tips").append("<span>" + _kklang.totalPageBeforeText + "<span class='kkpager-curr'>" + _kkcon.total + "</span>" + _kklang.totalPageAfterText + "</span>");
			}
			// 总数据
			if (_kkcon.isShowTotalRecords) {
				if (_kkAppendFrist) {
					$(_kkpagerContent + " .kkpager-tips").append("/");
				}
				_kkAppendFrist = true;
				$(_kkpagerContent + " .kkpager-tips").append("<span>" + _kklang.totalRecordsBeforeText + "<span class='kkpager-curr'>" + _kkcon.totalRecords + "</span>" + _kklang.totalRecordsAfterText + "</span>");
			}
			// 跳页
			if (_kkcon.isGoPage) {
				$(_kkpagerContent + " .kkpager-tips").append("<span>" + _kklang.gopageBeforeText + "<input class='kkpager-input' />" + _kklang.gopageAfterText + "</span>");
				$(_kkpagerContent + " .kkpager-tips").append("<button class='kkpager-button'>" + _kklang.gopageButtonOkText + "</button>");
			}
			this.bindKKPagerEvent();
		},
		// 绑定交互事件
		bindKKPagerEvent: function () {
			var _kkpager = this;
			// 跳页输入框赋值
			$(".kkpager-input").val(this.config.next);
			// 跳页输入框获取焦点后，显示输入框
			$(".kkpager-input").focus(function () {
				$(".kkpager-button").show();
				$(".kkpager-button").css("margin-left", "0");
				$(".kkpager-button").css("z-index", "1");
			});
			// 跳页输入框失去焦点后，隐藏输入框
			$(".kkpager-input").focusout(function () {
				setTimeout(function () {
					var btnGo = $('.kkpager-button');
					btnGo.animate({
						'margin-left': '-54px'
					}, 100, function () {
						btnGo.hide();
						$(".kkpager-button").css("z-index", "-1");
					});
				}, 400);
			});
			// 点击跳转按钮，跳转指定页
			$(".kkpager-button").bind("click", function () {
				var _kkinput = $(".kkpager-input").val();
				_kkpager.jumpPage(_kkinput);
			});
			// 点击分页目录跳转
			$("#" + this.config.id + " li").bind("click", function () {
				var _kkpageVal = $(this).data("value");
				var _kkpageDis = $(this).hasClass("kkpager-disabled");
				if (Number.isInteger(_kkpageVal) && !_kkpageDis) {
					_kkpager.jumpPage(_kkpageVal);
				}
			});
		},
		// 执行跳页
		jumpPage: function (page) {
			this.config.pno = page;
			this.init(this.config);
			this.config.click && this.config.click(page);
		}
	}

	//暴露对象
	window.KKPager = KKPager;
}());