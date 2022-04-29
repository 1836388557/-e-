```js
  /*
    1.接口在  /src/api  下面

    2.模拟数据在 /mock  下面  (mock相当于接口)
      如果需要添加新的模拟数据  可在mock文件夹下添加
      注意：需要把新的数据模块引入到mock下的index入口文件中

          两步，例：
            const 模块名 = require('./新模块')
            const mocks = [
              模块名
            ]

    3.审核模块在mock/auditT.js  （所有模块后带T的均是模拟数据）
      其内容不符合数据库(不完整)，可自行修改

      如要添加字段  可以在/src/views/audit目录下  找到对应使用模块接口的页面  
        
        添加修改el-table-column标签和el-dialog标签下的内容
  */
```
#### 使用说明

1.  $ git remote add https://github.com/1836388557/microServer.git   建立远端仓库链接
2.  $ git pull    从远端同步到本地 
3.  $ git checkout -b dev    建立开发分支     
4.  $ git add *     从工作区提交所有文件到暂存区     
5.  $ git commit -m "这一次提交的描述"
6.  $ git push -u origin dev    同步本地开发分支到远端
7.  $ git push -u origin master -f 强制推送
