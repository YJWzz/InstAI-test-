# InstAI-test前後端串接測試

1. 把前端後端的程式包在同一個資料夾裡
2. 目前使用雙開的方式開啟前後端

   前端:
   1. cd front
   2. npm i --lagacy-peer-deps
   3. npm run build
   4. serve -s build
   
   後端(要另外開啟一個terminal):
   1. npm i --lagacy-peer-deps
   執行完畢後 打開MYSQL COMMAND LINE 創建DB及TABLE
   FOR LOGIN/REGISTER 以下指令
   CREATE DATABASE test
   CREATE TABLE test.login(
       id INT AUTO_INCREMENT PRIMARY KEY,
       firstname VARCHAR(255),
       lastname VARCHAR(255),
       email VARCHAR(255),
       password VARCHAR(255),
   )
   CREATE TABLE test.photo(
       id INT AUTO_INCREMENT PRIMARY KEY,
       file_name VARCHAR(255) NOT NULL,
       image_data LONGBLOB NOT NULL
   );
   (記得至..\src\database.js改名稱、密碼等等)
   2. npm start
   3. 開啟前端給的連結


有改的部分:
前端:
1. IMGtoIMG.js的路徑原本是https改成http
後端:
1. server.js(原為index.js)新增了app.use(cors...)
2. 登入部分的後端有修改account.js的路徑(原本8000改成3000)

目前解決的部分: 
1. 登入串接沒問題
2. txt2img的generate部分能轉換成功
3. img2img的generate部分能轉換成功

目前遇到的問題:
1. upload部分路徑好像跟以前不太一樣 無法將資料傳到資料庫裡
2. SD要提交的時候沒反應


