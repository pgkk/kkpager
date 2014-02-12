kkpager
=======

js分页展示控件，传入简单参数就能使用的分页效果控件

<b>在线测试链接：</b>http://pgkk.github.io/kkpager/example/pager_test.html

### 准备工作,引入js、css
```html
<script type="text/javascript" src="../lib/jquery-1.10.2.min.js"></script><br/>
<script type="text/javascript" src="../src/kkpager.min.js"></script><br/>
<link rel="stylesheet" type="text/css" href="../src/kkpager.css" />
```
### 调用方法
```html
<div id="kkpager"></div>  
<script type="text/javascript">
//生成分页控件  
kkpager.init({
	pno : '${p.pageNo}',
	//总页码  
	total : '${p.totalPage}',  
	//总数据条数  
	totalRecords : '${p.totalCount}',  
	//链接前部  
	hrefFormer : '${hrefFormer}',
	//链接尾部  
	hrefLatter : '${hrefLatter}',
	//链接算法
	getLink : function(n){
		//这里是默认算法，算法适用于比如：
		//hrefFormer=http://www.xx.com/news/20131212
		//hrefLatter=.html
		//那么首页（第1页）就是http://www.xx.com/news/20131212.html
		//第2页就是http://www.xx.com/news/20131212_2.html
		//第n页就是http://www.xx.com/news/20131212_n.html
		if(n == 1){
			return this.hrefFormer + this.hrefLatter;
		}
		return this.hrefFormer + '_' + n + this.hrefLatter;
	}
	
});  
kkpager.generPageHtml();  
</script>
```
getLink 参数需要按需要重写。


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
> `pno` 当前页码

> `total` 总页码

> `totalRecords` 总数据条数

### 可选参数
> `pagerid` 分页展示控件容器ID,`字符串`, 默认值 'kkpager'

> `isShowTotalPage` 是否显示总页数,`布尔型`, 默认值 true

> `isShowTotalRecords` 是否显示总记录数,`布尔型`,默认值 true

> `isGoPage` 是否显示页码跳转输入框,`布尔型`,默认值 true

> `hrefFormer` 链接前部,`字符串类型`,默认值 ''

> `hrefLatter` 链接尾部,`字符串类型`,默认值 ''

> `lang` 语言配置对象，属性配置列表：

> - `prePageText` 上一页按钮文本,`字符串`,默认值 '上一页'

> - `nextPageText` 下一页按钮文本,`字符串`,默认值 '下一页'

> - `totalPageBeforeText` 总页数前缀文本,`字符串`,默认值 '共'

> - `totalPageAfterText` 总页数后缀文本,`字符串`,默认值 '页'

> - `totalRecordsAfterText` 总记录数文本,`字符串`,默认值 '条数据'

> - `gopageBeforeText` 跳转前缀文本,`字符串`,默认值 '转到'

> - `gopageAfterText` 跳转前缀文本,`字符串`,默认值 '页'

> - `gopageButtonOkText` 跳转按钮文本,`字符串`,默认值 '确定'

> - `buttonTipBeforeText` 页码按钮提示信息前缀,`字符串`,默认值 '第'

> - `buttonTipAfterText` 页码按钮提示信息后缀,`字符串`,默认值 '页'

> `gopageWrapId`	页码跳转dom ID,`字符串`,默认值 'kkpager_gopage_wrap'

> `gopageButtonId` 页码跳转按钮dom ID,`字符串`,默认值 'kkpager_btn_go'

> `gopageTextboxId` 页码输入框dom ID,`字符串`,默认值 'kkpager_btn_go_input'
		
> `getLink` 链接算法函数，`函数类型`

```javascript
//默认链接算法函数，使用时需要按需要重写
getLink : function(n){
	//这里的算法适用于比如：
	//hrefFormer=http://www.xx.com/news/20131212
	//hrefLatter=.html
	//那么首页（第1页）就是http://www.xx.com/news/20131212.html
	//第2页就是http://www.xx.com/news/20131212_2.html
	//第n页就是http://www.xx.com/news/20131212_n.html
	if(n == 1){
		return this.hrefFormer + this.hrefLatter;
	}
	return this.hrefFormer + '_' + n + this.hrefLatter;
}
```

