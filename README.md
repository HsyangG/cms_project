# 系统配置以及运行要求

## 1. 电脑配置

* windows 10 操作系统
* 浏览器（推荐使用chrome浏览器）

## 2. 系统环境

* 安装配置 `Node.js`  环境，具体方法请参照：https://jingyan.baidu.com/article/48b37f8dd141b41a646488bc.html
* 安装配置 `MySQL`  环境，具体方法请参照：https://jingyan.baidu.com/article/46650658e73a82f548e5f874.html

## 3. 安装依赖

```shell
  # 以安装 Node.js 环境为前提
  # 进入到商城目录下
  npm install
```

本商城的所有第三方依赖都保存在商城目录下的 `package.json` 文件中

## 4. 配置后台服务

### 4.1 配置数据库

* 在 `MySQL` 中导入文件中的数据库文件，以生成气泡网上商城的数据库
* 在系统的后台服务配置数据库连接
  - 在本商城的目录下找到 `./bubble_server/model`  文件夹

  - 打开 `db.js`  文件

  - 配置数据库连接

    ```javascript
    const pool = mysql.createPool({
      host: 'localhost', // 数据库连接
      user: 'root', // 数据库用户名
      password: '123456', // 数据库连接密码
      database: 'bubble_mall', // 数据库名称
      port: 3306
    })
    ```

    

### 4.2 开启后台服务

* 进入到后台服务文件夹 `bubble_server`  

* ```shell
  # 进入到商城目录下的 bubble_server 文件夹中
  node app.js
  ```

* 注意：运行后台服务后请不要关闭 `shell`  命令行窗口，后台服务需要保持开启状态

## 5. 运行

* 新建一个 `shell`  命令行窗口

* 执行

  ```shell
  # 进入到商城目录下
  npm run dev
  ```

* 通过浏览器打开：http://localhost:8080/

* 打开浏览器的调试模式，将浏览器的视图窗口设置成手机模式

  - 在chrome浏览器中，按 `F12` 打开调试模式
  - `Shift+Ctrl+M` 进入手机模式
    * 账号：17875511790
    * 密码：12345678

* 注意：运行本商城系统也需要保持 `shell` 的开启状态