greenDot
=============
    简单的node.js应用，输入用户id,node抓取用户主页的小绿点数据，然后借助chart.js生成相关数据的柱状图

##更新日志
* 2017-1-10 实现的是被动显示表格，在后端修改github用户名(user变量)，前端负责显示表格，无法交互
* 2017-1-11 实现前端交互，项目有三条路由，localhost:3000/对应输入github用户名页面，/user/:id路由对应在新页面显示表格，/ajax/:id对应ajax请求在当前页面显示表格。
* 2017-1-12 express增加静态资源,增加bootstrap,优化界面，优化代码结构 bug:'Error: Can't set headers after they are sent.'
* 2017-1-13 修复再次请求相同用户出现Can't set headers after they are sent BUG，方法是将on监听改为once监听。
* 2017-1-16 增加pk模式的视图，点击pk with someone会切换到pk模式输入，要求输入两个id
* 2017-1-17 实现pk模式，将两个id的周活跃度用折线图表示出来
* 2017-1-19 对于id不存在的情况给出提示
* 2017-2-6  jsonp请求github api获取user信息并显示
* 2017-2-7  pk模式也实现user信息展示，重写getUserInfo函数，使它更通用。
* 2017-5-7  mongoDb储存user数据，首先从db读取，如果没有，再去请求。

##应用截图

图中的数据分别来自imgss,阮一峰和张鑫旭:grin:


![](https://github.com/imgss/greenDot/raw/master/image/chart.PNG "chart截图")
![](https://github.com/imgss/greenDot/raw/master/image/pc.PNG "chart截图")
<img src="https://github.com/imgss/greenDot/raw/master/image/pk.PNG" alt="pk模式" width='500px'>
<img src="https://github.com/imgss/greenDot/raw/master/image/users.PNG" alt="含个人信息" width='500px'>

##ToDo

* 优化界面
* 增加数据库缓存来提高响应速度
* 增加支持图表种类  

##体验一下

1. git clone https://github.com/imgss/greenDot.git

2. npm install

3. node index(暂时)

4. 打开浏览器`http://localhost:3000`