

kkpager v2.0
=======

JS分页控件，独立版，无需依赖jquery等框架

### 准备工作,引入js、css
```html
<script type="text/javascript" src="../src/js/kkpager.min.js"></script>
<link rel="stylesheet" type="text/css" href="../src/css/kkpager.css" />
```
### HTML DOM容器
```html
<div id="kkpager"></div>
```
### 调用方法

#### 1、使用自动模式（选择页码后，立即突出显示当前页码）
```html
<script type="text/javascript">	
	// 配置kkpager
	var kkconfig = new KKConfig({
		// HTML DOM ID
		id:"kkpager",
		// 当前页
		pno:1,
		// 总页数
		total:17,
		// 总记录条数
		totalRecords:100,
		// 样式颜色，默认为blue
		style:"orange",
		// 切换页码事件
		click:function(n){
			// 输出选择页码
			console.log(n);
		}
	});
	// 创建KKPager
	var kkpager = new KKPager(kkconfig);
</script>
```


#### 2、使用手动模式（选择页码后，不会立即突出显示当前页码，需手动调用selectPage()）
```html
<script type="text/javascript">
// 配置kkpager
	var kkconfig2 = new KKConfig({
		// HTML DOM ID
		id:"kkpager",
		// 当前页
		pno:1,
		// 总页数
		total:15,
		// 总记录条数
		totalRecords:100,
		// 关闭自动响应
		timelyResponse:false,
		// 切换页码事件
		click:function(n){
			// 输出选择页码
			console.log(n);
			// 手动切换页码
			this.selectPage(n);
		}
	});
	// 创建KKPager
	var kkpager2 = new KKPager(kkconfig1);
	// 也可以在外部手动切换页码
	kkpager2.selectPage(10);
});
</script>
```


### 必选参数
> `pno` 当前页码

> `total` 总页码

> `totalRecords` 总数据条数

### 可选参数
> `id` 分页展示控件容器ID `字符串` 默认值 'kkpager'

> `timelyResponse` 是否自动响应切换页码 `布尔型` 默认值 true ，若为 false ，需手动调用 selectPage 函数

> `isShowTotalPage` 是否显示总页数 `布尔型` 默认值 true 

> `isShowCurrPage` 是否显示当前页 `布尔型` 默认值 true

> `isShowTotalRecords` 是否显示总记录数 `布尔型` 默认值 false 

> `isShowFirstPageBtn` 是否显示首页按钮 `布尔型` 默认值 true

> `isShowLastPageBtn` 是否显示尾页按钮 `布尔型` 默认值 true

> `isShowPrePageBtn` 是否显示上一页按钮 `布尔型` 默认值 true

> `isShowNextPageBtn` 是否显示下一页按钮 `布尔型` 默认值 true

> `isGoPage` 是否显示页码跳转输入框 `布尔型` 默认值 true

> `click` 自定义事件处理函数 `函数类型`

> `style` 颜色样式 `字符串` 默认值 'blue' ,可选项：'blue','orange','red','green'

> `align` 横向对齐方式 `字符串` 默认值 'right' ,可选项：'left','center','right'

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

### 公开方法

> `selectPage` 手动调用此函数选中某个页码
```javascript
   //选中第2页码
   kkpager.selectPage(2);
```


