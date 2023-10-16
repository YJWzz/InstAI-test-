# InstAI-test前後端串接測試
1. 把前端後端的程式包在同一個資料夾裡
2. 目前使用雙開的方式開啟前後端

   前端:
   1. cd front
   2. npm i --lagacy-peer-deps
   3. npm run build
   4. serve -s build
   
   後端:
   1. npm i --lagacy-peer-deps
   2. npm start
   3. 開啟前端給的連結

目前解決的部分:
1. 登入部分的後端有修改account.js的路徑(原本8000改成3000)
2. 登入串接沒問題
3. txt2img的generate部分轉換成功
4. 
目前遇到的問題:
1. upload部分路徑好像跟以前不太一樣 無法將資料傳到資料庫裡
2. img2img post至後端有點問題
