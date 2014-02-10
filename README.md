kkpager
=======

js分页展示控件，传入简单参数就能使用的分页效果控件

### 准备工作,引入js、css
> \<script type="text/javascript" src="../lib/jquery-1.10.2.min.js"\>\</script\><br/>
> \<script type="text/javascript" src="../src/kkpager.min.js"\>\</script\><br/>
> \<link rel="stylesheet" type="text/css" href="../src/kkpager.css" /\>

### 调用方法
> \<div id="kkpager"\>\</div\>  
> \<script type="text/javascript"\>  
> //生成分页控件  
> kkpager.init({  
>     	&nbsp;&nbsp;&nbsp;&nbsp; pno : '${p.pageNo}',  
>     	&nbsp;&nbsp;&nbsp;&nbsp; //总页码  
>     	&nbsp;&nbsp;&nbsp;&nbsp; total : '${p.totalPage}',  
>     	&nbsp;&nbsp;&nbsp;&nbsp; //总数据条数  
>     	&nbsp;&nbsp;&nbsp;&nbsp; totalRecords : '${p.totalCount}',  
>     	&nbsp;&nbsp;&nbsp;&nbsp; //链接前部  
>     	&nbsp;&nbsp;&nbsp;&nbsp; hrefFormer : '${hrefFormer}',  
>     	&nbsp;&nbsp;&nbsp;&nbsp; //链接尾部  
>     	&nbsp;&nbsp;&nbsp;&nbsp; hrefLatter : '${hrefLatter}'  
> });  
> kkpager.generPageHtml();  
> \</script\>

### 默认链接算法，按需重写  
> getLink : function(n){  
>     &nbsp;&nbsp;&nbsp;&nbsp; //这里的算法适用于比如：  
>     &nbsp;&nbsp;&nbsp;&nbsp; //hrefFormer=http://www.xx.com/news/20131212  
>     &nbsp;&nbsp;&nbsp;&nbsp; //hrefLatter=.html  
>    &nbsp;&nbsp;&nbsp;&nbsp; //那么首页（第1页）就是http://www.xx.com/news/20131212.html  
>     &nbsp;&nbsp;&nbsp;&nbsp; //第2页就是http://www.xx.com/news/20131212_2.html  
>     &nbsp;&nbsp;&nbsp;&nbsp; //第n页就是http://www.xx.com/news/20131212_n.html  
>     &nbsp;&nbsp;&nbsp;&nbsp; if(n == 1){  
>     &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;     return this.hrefFormer + this.hrefLatter;  
>     &nbsp;&nbsp;&nbsp;&nbsp; }else{  
>     &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;     return this.hrefFormer + '_' + n + this.hrefLatter;  
>     &nbsp;&nbsp;&nbsp;&nbsp; }  
> }


### 必选参数

    //当前页码
		pno
		//总页码
		total
		//总数据条数
		totalRecords

### 可选参数

    //divID
		pagerid : 'kkpager'
		
		//是否显示总页数
		isShowTotalPage : true
		
		//是否显示总记录数
		isShowTotalRecords : true
		
		//是否显示页码跳转输入框
		isGoPage : true
		
		//链接前部
		hrefFormer : ''
		
		//链接尾部
		hrefLatter : ''
		
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
		}
		
		//页码跳转dom元素ID
		gopageWrapId : 'kkpager_gopage_wrap'
		//页码跳转按钮ID
		gopageButtonId : 'kkpager_btn_go'
		//页码输入框ID
		gopageTextboxId : 'kkpager_btn_go_input'
		
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
		}
