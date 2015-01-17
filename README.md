kkpager v1.3
=======

js分页展示控件，传入简单参数就能使用的分页效果控件

<b>在线测试链接：</b>
http://pgkk.github.io/kkpager/example/pager_test.html
http://pgkk.github.io/kkpager/example/pager_test_orange_color.html
http://pgkk.github.io/kkpager/example/pager_test_clickmode.html
### 准备工作,引入js、css
```html
<script type="text/javascript" src="../lib/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../src/kkpager.min.js"></script>
<link rel="stylesheet" type="text/css" href="../src/kkpager_blue.css" />
```
### HTML DOM容器
```html
<div id="kkpager"></div>
```
### 调用方法

#### 1、使用link模式
```html
<script type="text/javascript">
//生成分页控件  
kkpager.generPageHtml({
	pno : '${p.pageNo}',
	mode : 'link', //可选，默认就是link
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
</script>
```
getLink 参数需要按需要重写。


#### 2、使用click模式（自定义跳转函数）
```html
<script type="text/javascript">
//生成分页控件  
kkpager.generPageHtml({
	pno : '${p.pageNo}',
	mode : 'click', //设置为click模式
	//总页码  
	total : '${p.totalPage}',  
	//总数据条数  
	totalRecords : '${p.totalCount}',
	//点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
	//适用于不刷新页面，比如ajax
	click : function(n){
		//这里可以做自已的处理
		//...
		//处理完后可以手动条用selectPage进行页码选中切换
		this.selectPage(n);
	},
	//getHref是在click模式下链接算法，一般不需要配置，默认代码如下
	getHref : function(n){
		return '#';
	}
	
});
</script>
```
click 参数需要按需要重写,而getHref一般需要配置。


### 必选参数
> `pno` 当前页码

> `total` 总页码

> `totalRecords` 总数据条数

### 可选参数
> `pagerid` 分页展示控件容器ID `字符串` 默认值 'kkpager'

> `mode` 模式，click或link `字符串` 默认值 'link'

> `isShowTotalPage` 是否显示总页数 `布尔型` 默认值 true 

> `isShowCurrPage` 是否显示当前页 `布尔型` 默认值 true

> `isShowTotalRecords` 是否显示总记录数 `布尔型` 默认值 false (当`isShowTotalPage`为`true`时，此设置无效)

> `isShowFirstPageBtn` 是否显示首页按钮 `布尔型` 默认值 true

> `isShowLastPageBtn` 是否显示尾页按钮 `布尔型` 默认值 true

> `isShowPrePageBtn` 是否显示上一页按钮 `布尔型` 默认值 true

> `isShowNextPageBtn` 是否显示下一页按钮 `布尔型` 默认值 true

> `isGoPage` 是否显示页码跳转输入框 `布尔型` 默认值 true

> `isWrapedPageBtns`  是否用span包裹住页码按钮 `布尔型` 默认值 true

> `isWrapedInfoTextAndGoPageBtn` 是否用span包裹住分页信息和跳转按钮 `布尔型` 默认值 true

> `hrefFormer` 链接前部 `字符串` 默认值 ''

> `hrefLatter` 链接尾部 `字符串` 默认值 ''

> `lang` 语言配置对象，属性配置列表：

> - `firstPageText` 首页按钮文本 `字符串` 默认值 '首页'

> - `firstPageTipText` 首页按钮提示文本 `字符串` 默认值 '首页'

> - `lastPageText` 尾页按钮文本 `字符串` 默认值 '尾页'

> - `lastPageTipText` 尾页按钮提示文本 `字符串` 默认值 '尾页'

> - `prePageText` 上一页按钮文本 `字符串` 默认值 '上一页'

> - `prePageTipText` 上一页按钮提示文本 `字符串` 默认值 '上一页'

> - `nextPageText` 下一页按钮文本 `字符串` 默认值 '下一页'

> - `nextPageTipText` 下一页提示按钮文本 `字符串` 默认值 '下一页'

> - `totalPageBeforeText` 总页数前缀文本 `字符串` 默认值 '共'

> - `totalPageAfterText` 总页数后缀文本 `字符串` 默认值 '页'

> - `currPageBeforeText` 当前页前缀文本 `字符串` 默认值 '当前第'

> - `currPageAfterText` 当前页后缀文本 `字符串` 默认值 '页'

> - `totalInfoSplitStr` 分页统计信息部分的分隔符 `字符串` 默认值 '/'

> - `totalRecordsBeforeText` 总记录数前缀文本 `字符串` 默认值 '共'

> - `totalRecordsAfterText` 总记录数后缀文本 `字符串` 默认值 '条数据'

> - `gopageBeforeText` 跳转前缀文本 `字符串` 默认值 '转到'

> - `gopageAfterText` 跳转前缀文本 `字符串` 默认值 '页'

> - `gopageButtonOkText` 跳转按钮文本 `字符串` 默认值 '确定'

> - `buttonTipBeforeText` 页码按钮提示信息前缀 `字符串` 默认值 '第'

> - `buttonTipAfterText` 页码按钮提示信息后缀 `字符串` 默认值 '页'

> `gopageWrapId`	页码跳转dom ID `字符串` 默认值 'kkpager_gopage_wrap'

> `gopageButtonId` 页码跳转按钮dom ID `字符串` 默认值 'kkpager_btn_go'

> `gopageTextboxId` 页码输入框dom ID `字符串` 默认值 'kkpager_btn_go_input'
		
> `getLink` 链接算法函数（仅适用于mode为link） `函数类型`

> `click` 自定义事件处理函数（仅适用于mode为click） `函数类型`

> `getHref` 链接算法函数（仅适用于mode为click） `函数类型`

### 公开方法

> `selectPage` 手动调用此函数选中某个页码
```javascript
   //选中第2页码
   kkpager.selectPage(2);
```

### 默认链接算法，按需重写
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

