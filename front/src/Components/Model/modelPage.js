import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Model() {
  const { username } = useParams();
  const [modelFile, setModelFile] = useState(null);

  useEffect(() => {
    // 模擬請求
    const mockResponseData = {
      //"/api/upload/checkdata?username=${username}"
      method: "GET",
      response: {
        messages: "这是模拟的响应数据",
      },
    };

    // 測試
    setTimeout(() => {
      // 使用數據更新
      setModelFile(JSON.stringify(mockResponseData, null, 2));
    }, 1000); // 延遲設計
  }, [username]);
  /*try {
    console.log('發送請求到URL:', 'http://localhost:8080/api/upload/checkdata?username=${username}');
    const response = await fetch('http://localhost:8080/api/upload/checkdata?username=${username}', {
      method: 'GET',
    });
    console.log('收到後端響應:', response);
    if (response.ok) {
      // 上傳到後端
      console.log('文件上傳成功');
    } else {
      // 處理失敗
      console.error('文件上傳失敗');
    }
  } catch (error) {
    console.error('發生錯誤:', error);
  } */
  
  // 提供下載選項並處理資料 => 虛擬標籤
  function handleDownload() {
    if (modelFile) {
      const a = document.createElement("a");
      const blob = new Blob([modelFile], { type: "application/json" }); // 使用json 數據類型
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = "model-file-name.json"; // 更改文件名和擴展名
      a.click();
      URL.revokeObjectURL(url); // URL对象
    }
  }

  return (
    <div>
      <h1>模型預覽</h1>
      {modelFile ? (
        <>
          <pre>{modelFile}</pre>
          <button onClick={handleDownload}>下載模型</button>
        </>
      ) : (
        <p>正在加載模型...</p>
      )}
    </div>
  );
}

export default Model;

// 處理回傳後的檔案要怎麼擺放
// 性能優化 避免頁面過載占用過多記憶體空間
// 