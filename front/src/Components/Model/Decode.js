/*使用React
使用AJAX或Fetch API从後端獲取Base64字串。
将Base64字串轉換為圖像
使用（Lazy Loading）来延遲加載圖片。
提供按钮来壓縮多個圖像並打包
提供按钮来下载單張或多張*/

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

const LoadingState = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

const ImageProcessor = () => {
  const [base64Strings, setBase64Strings] = useState([]);
  const [images, setImages] = useState([]);
  const [zipBlob, setZipBlob] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(LoadingState.LOADING);
  const username = 'your_username'; // 喻翔

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/upload/checkdata?username=${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBase64Strings(data);
        setLoadingStatus(LoadingState.LOADED);
      } catch (error) {
        console.error('獲取出錯', error);
        setLoadingStatus(LoadingState.ERROR);
      }
    };

    fetchData();
  }, [username]);

  const convertAndPreviewImages = () => {
    const updatedImages = base64Strings.map((base64, index) => (
      <img key={index} src={`data:image/png;base64, ${base64}`} alt={`Image ${index}`} loading="lazy" />
    ));
    setImages(updatedImages);
  };

  const handleCompressAndDownload = () => {
    if (images.length === 0) {
      alert('先轉換字串為圖片');
      return;
    }

    const zip = new JSZip();

    base64Strings.forEach((base64, index) => {
      zip.file(`image_${index}.png`, base64.split(',')[1], { base64: true });
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      setZipBlob(content);
    });
  };

  const downloadZip = () => {
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed_images.zip';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Base64圖片處理</h1>
      {loadingStatus === LoadingState.LOADING && <p>Loading...</p>}
      {loadingStatus === LoadingState.ERROR && <p>Failed to load data.</p>}
      {loadingStatus === LoadingState.LOADED && (
        <>
          <button onClick={convertAndPreviewImages}>轉換按鈕</button>
          <div>{images}</div>
          <button onClick={handleCompressAndDownload}>壓縮下載</button>
          {zipBlob && <button onClick={downloadZip}>下載壓縮檔</button>}
        </>
      )}
    </div>
  );
};

export default ImageProcessor;
