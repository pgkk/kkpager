class KKPager {
    'use strict';
    config: KKConfig;
    disabled: string;
    list: Element;
    tips: Element;
    button: HTMLButtonElement;
    input: HTMLInputElement;
    items: HTMLCollectionOf<HTMLLIElement>;

    constructor(config: KKConfig) {
        this.config = config;
        this.disabled = "";
        this.init();
        this.event();
    }

    init() {
        // 页码列表（包括首页、上一页、下一页、尾页）
        document.getElementById(this.config.id).innerHTML = "<ul class='kkpager-pages'></ul>";
        this.list = document.getElementById(this.config.id).getElementsByClassName("kkpager-pages")[0];
        // 首页
        if (this.config.isShowFirstPageBtn) {
            this.disabled = this.config.hasPrv ? "" : "class='kkpager-disabled'";
            this.list.innerHTML += "<li data-value='1' " + this.disabled + ">" + this.config.lang.firstPageText + "</li>";
        }
        // 上一页
        if (this.config.isShowPrePageBtn) {
            this.disabled = this.config.hasPrv ? "" : "class='kkpager-disabled'";
            this.list.innerHTML += "<li data-value='" + this.config.prv + "' " + this.disabled + ">" + this.config.lang.prePageText + "</li>";
        }
        // 页码
        var _kkpageBeforOmit = false, _kkpageAfterOmit = false;
        for (var _kkpageNum = 1; _kkpageNum <= this.config.total; _kkpageNum++) {
            // 最前两页/最后两页
            var _showNum = _kkpageNum == 1 || _kkpageNum == 2 || _kkpageNum == this.config.total - 1 || _kkpageNum == this.config.total;
            // 当前页/当前页前两页/当前页后两页
            _showNum = _showNum || _kkpageNum == this.config.pno || _kkpageNum == this.config.pno - 1 || _kkpageNum == this.config.pno - 2 || _kkpageNum == this.config.pno + 1 || _kkpageNum == this.config.pno + 2;
            if (_showNum) {
                var _kkactive = _kkpageNum == this.config.pno ? "class='active kkpager-disabled'" : "";
                this.list.innerHTML += "<li data-value='" + _kkpageNum + "' " + _kkactive + ">" + _kkpageNum + "</li>";
            }
            // 省略号
            if (!_showNum && (!_kkpageBeforOmit || !_kkpageAfterOmit)) {
                if (!_kkpageBeforOmit && _kkpageNum < this.config.pno) {
                    this.list.innerHTML += "<li class='kkpager-omit'>…</li>";
                    _kkpageBeforOmit = true;
                }
                if (!_kkpageAfterOmit && _kkpageNum > this.config.pno) {
                    this.list.innerHTML += "<li class='kkpager-omit'>…</li>";
                    _kkpageAfterOmit = true;
                }
            }
        }
        // 下一页
        if (this.config.isShowNextPageBtn) {
            this.disabled = this.config.hasNext ? "" : "class='kkpager-disabled'";
            this.list.innerHTML += "<li data-value='" + this.config.next + "' " + this.disabled + ">" + this.config.lang.nextPageText + "</li>";
        }
        // 尾页
        if (this.config.isShowLastPageBtn) {
            this.disabled = this.config.hasNext ? "" : "class='kkpager-disabled'";
            this.list.innerHTML += "<li data-value='" + this.config.total + "' " + this.disabled + ">" + this.config.lang.lastPageText + "</li>";
        }
        // 信息（当前页码、总页码、总条数、跳页）
        this.list.innerHTML += "<div class='kkpager-tips'></div>";
        this.tips = this.list.getElementsByClassName("kkpager-tips")[0];
        var _kkAppendFrist = false;
        // 当前页
        if (this.config.isShowCurrPage) {
            this.tips.innerHTML += "<span>" + this.config.lang.currPageBeforeText + "<span class='kkpager-hilight'>" + this.config.pno + "</span>" + this.config.lang.currPageAfterText + "</span>";
            _kkAppendFrist = true;
        }
        // 总页数
        if (this.config.isShowTotalPage) {
            if (_kkAppendFrist) {
                this.tips.innerHTML += "&nbsp;/&nbsp;";
            }
            _kkAppendFrist = true;
            this.tips.innerHTML += "<span>" + this.config.lang.totalPageBeforeText + "<span class='kkpager-curr'>" + this.config.total + "</span>" + this.config.lang.totalPageAfterText + "</span>";
        }
        // 总数据
        if (this.config.isShowTotalRecords) {
            if (_kkAppendFrist) {
                this.tips.innerHTML += "&nbsp;/&nbsp;";
            }
            _kkAppendFrist = true;
            this.tips.innerHTML += "<span>" + this.config.lang.totalRecordsBeforeText + "<span class='kkpager-curr'>" + this.config.totalRecords + "</span>" + this.config.lang.totalRecordsAfterText + "</span>";
        }
        // 跳页 
        if (this.config.isGoPage) {
            this.tips.innerHTML += "<span>" + this.config.lang.gopageBeforeText + "<input class='kkpager-input' />" + this.config.lang.gopageAfterText + "</span>";
            this.tips.innerHTML += "<button class='kkpager-button'>" + this.config.lang.gopageButtonOkText + "</button>";
        }
    }

    event() {
        this.input = <HTMLInputElement>document.getElementById(this.config.id).getElementsByClassName("kkpager-input")[0];
        this.button = <HTMLButtonElement>document.getElementById(this.config.id).getElementsByClassName("kkpager-button")[0];
        this.items = document.getElementById(this.config.id).getElementsByTagName("li");
        // 跳页输入框赋值
        this.input.value = this.config.next.toString();
        // 键入操作
        this.input.onkeypress = function () {
            var event = arguments[0] || window.event;
            var code = event.keyCode || event.charCode;
            //delete key
            if (code == 8) return true;
            //enter key
            if (code == 13) {
                this.button.click();
                return false;
            }
            //copy and paste
            if (event.ctrlKey && (code == 99 || code == 118)) return true;
            //only number key
            if (code < 48 || code > 57) return false;
            return true;
        }.bind(this)
        // 跳页输入框获得焦点后，显示按钮
        this.input.onfocus = function(){
             this.button.style.display = "inline-block";
             this.button.style.marginLeft = "0px";
             this.button.style.zIndex = "1";
        }.bind(this);
        // 跳页输入框失去焦点，隐藏按钮
        this.input.addEventListener("focusout",function(){
            setTimeout(function () {
                this.button.style.marginLeft = "-54px";
                this.button.style.display = "none";
                this.button.style.zIndex = "1";
            }.bind(this), 400);
        }.bind(this));
        // 点击跳转按钮，跳转指定页
        this.button.onclick = function () {
            var _kkvalue = this.input.value;
            console.log(_kkvalue);
            this.jump(_kkvalue);
        }.bind(this);
        // 点击分页目录跳转 
        for (var _kki = 0; _kki < this.items.length; _kki++) {
            this.items[_kki].onclick = function (e) {
                var _kkvalue =e.target.getAttribute("data-value");
                if(_kkvalue != undefined&&_kkvalue!=null)
                    this.jump(_kkvalue);
            }.bind(this)
        }
    }

    selectPage(no){
        this.jump(no);
    }

    jump(no){
        // 跳转页为当前页不做处理
        if(parseInt(no) == this.config.pno){
            return;
        }
        // 当配置为不要及时响应的话，先返回页码，等待用户手动调用响应
        if(this.config.timelyResponse){
            this.config.pno = parseInt(no==undefined?"1":no);
            this.config.validate();
            this.init();
            this.event();
        }
        this.config.click&&this.config.click(this.config.pno); 
    }
}

class KKConfig {
    // div ID ,kkpager 容器
    id: string;
    // 当前页码
    pno: number;
    // 总页码
    total: number;
    // 总数据条数
    totalRecords: number;
    // 及时响应（跳页后立即选中跳转后的页码，无需等待）
    timelyResponse:boolean;
    // 是否显示首页按钮
    isShowFirstPageBtn: boolean;
    // 是否显示尾页按钮
    isShowLastPageBtn: boolean;
    // 是否显示上一页按钮
    isShowPrePageBtn: boolean;
    // 是否显示下一页按钮
    isShowNextPageBtn: boolean;
    // 是否显示总页数
    isShowTotalPage: boolean;
    // 是否显示当前页
    isShowCurrPage: boolean;
    // 是否显示总记录数
    isShowTotalRecords: boolean;
    // 是否显示页码跳转输入框
    isGoPage: boolean;
    // 语言
    lang: KKLang;
    // 上一页码
    prv: number;
    // 下一页码
    next: number;
    // 是否存在上一页
    hasPrv: boolean;
    // 是否存在下一页
    hasNext: boolean;
    // Click事件
    click: Function;

    constructor(parameters: JSON) {
        this.id = parameters["id"];
        this.pno = parameters["pno"];
        this.total = parameters["total"];
        parameters["totalRecords"] == undefined ? this.totalRecords = 0 : this.totalRecords = parameters["totalRecords"];
        parameters["timelyResponse"] == undefined ? this.timelyResponse = true : this.timelyResponse = parameters["timelyResponse"];
        parameters["isShowFirstPageBtn"] == undefined ? this.isShowFirstPageBtn = true : this.isShowFirstPageBtn = parameters["isShowFirstPageBtn"];
        parameters["isShowLastPageBtn"] == undefined ? this.isShowLastPageBtn = true : this.isShowLastPageBtn = parameters["isShowLastPageBtn"];
        parameters["isShowPrePageBtn"] == undefined ? this.isShowPrePageBtn = true : this.isShowPrePageBtn = parameters["isShowPrePageBtn"];
        parameters["isShowNextPageBtn"] == undefined ? this.isShowNextPageBtn = true : this.isShowNextPageBtn = parameters["isShowNextPageBtn"];
        parameters["isShowTotalPage"] == undefined ? this.isShowTotalPage = true : this.isShowTotalPage = parameters["isShowTotalPage"];
        parameters["isShowCurrPage"] == undefined ? this.isShowCurrPage = true : this.isShowCurrPage = parameters["isShowCurrPage"];
        parameters["isShowTotalRecords"] == undefined ? this.isShowTotalRecords = true : this.isShowTotalRecords = parameters["isShowTotalRecords"];
        parameters["isGoPage"] == undefined ? this.isGoPage = true : this.isGoPage = parameters["isGoPage"];
        parameters["lang"] == undefined ? this.lang = new KKLang() : this.lang = parameters["lang"];
        this.prv = undefined;
        this.next = undefined;
        this.hasPrv = false;
        this.hasNext = false;
        this.click = parameters["click"];
        this.validate();
    }

    validate(){
        if (this.pno < 1) this.pno = 1;
        this.total = (this.total <= 1) ? 1 : this.total;
        if (this.pno > this.total) this.pno = this.total;
        this.prv = (this.pno <= 2) ? 1 : (this.pno - 1);
        this.next = (this.pno >= this.total - 1) ? this.total : (this.pno + 1);
        this.hasPrv = (this.pno > 1);
        this.hasNext = (this.pno < this.total);
    }
}

class KKLang {
    firstPageText = '首页';
    firstPageTipText = '首页';
    lastPageText = '尾页';
    lastPageTipText = '尾页';
    prePageText = '上一页';
    prePageTipText = '上一页';
    nextPageText = '下一页';
    nextPageTipText = '下一页';
    totalPageBeforeText = '共';
    totalPageAfterText = '页';
    currPageBeforeText = '当前第';
    currPageAfterText = '页';
    totalInfoSplitStr = '/';
    totalRecordsBeforeText = '共';
    totalRecordsAfterText = '条数据';
    gopageBeforeText = '&nbsp;转到';
    gopageButtonOkText = '确定';
    gopageAfterText = '页';
    buttonTipBeforeText = '第';
    buttonTipAfterText = '页';
}