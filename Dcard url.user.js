// ==UserScript==
// @name         Dcard url
// @namespace    http://tampermonkey.net/
// @version      2024-10-24 2.0
// @description  自動搜尋網站內所有包含 http 的鏈接
// @author       You
// @match        https://www.dcard.tw/f/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dcard.tw
// @updateURL    https://github.com/YEJIA-MING/tampermonkey/raw/main/Dcard%20url.user.js
// @downloadURL  https://github.com/YEJIA-MING/tampermonkey/raw/main/Dcard%20url.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const url = window.location.href; // 獲取當前網址
    const lastSegment = url.substring(url.lastIndexOf('/') + 1); // 取得最後一個 / 後面的部分
    //    const apiUrl = `https://www.dcard.tw/service/api/v2/posts/${lastSegment}/comments?limit=30`;
    const apiUrl = `https://www.dcard.tw/service/api/v2/posts/${lastSegment}`;
    console.log('apiUrl:', apiUrl);

    // 創建按鈕並設置樣式
    let toggleButton = document.createElement('button');
    toggleButton.innerText = '顯示網址';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '70px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '9999';


    // 創建 "開啟所有網址" 按鈕並設置樣式（初始隱藏）
    let openAllButton = document.createElement('button');
    openAllButton.innerText = '開啟所有網址';
    openAllButton.style.position = 'fixed';
    openAllButton.style.top = '110px';
    openAllButton.style.right = '10px';
    openAllButton.style.zIndex = '9999';
    openAllButton.style.display = 'none'; // 初始隱藏


    // 創建一個容器來顯示結果
    let resultDiv = document.createElement('div');
    resultDiv.style.position = 'fixed';
    resultDiv.style.top = '150px';
    resultDiv.style.right = '10px';
    resultDiv.style.backgroundColor = 'white';
    resultDiv.style.padding = '10px';
    resultDiv.style.zIndex = '9999';
    resultDiv.style.maxHeight = '400px';
    resultDiv.style.overflowY = 'scroll';
    resultDiv.style.display = 'none'; // 初始隱藏


    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '輸入範圍，例如18-30';
    input.style.position = 'fixed';
    input.style.top = '40px';
    input.style.right = '10px';
    input.style.zIndex = '9999';


    const button = document.createElement('button');
    button.innerHTML = '抓取並開啟';
    button.style.position = 'fixed';
    button.style.top = '40px';
    button.style.right = '200px';
    button.style.zIndex = '9999';
    document.body.appendChild(button);
    document.body.appendChild(input);
    let collectedUrls = new Set(); // 使用 Set 來避免重複
    let isObserving = false; // 用於控制是否正在監聽
    let observer; // 變數來存儲 MutationObserver

    // 創建按鈕並設置樣式
    const button1 = document.createElement('button');
    button1.innerHTML = '開始收集網址';
    button1.style.position = 'fixed';
    button1.style.top = '10px';
    button1.style.right = '10px';
    button1.style.zIndex = '9999';
    document.body.appendChild(button1);


    // 按鈕點擊事件
    button1.addEventListener('click', () => {
        if (!isObserving) {
            // 開始監聽
            isObserving = true;
            button1.innerHTML = '停止收集網址';
            // 回調函數，在DOM變化時執行
            const callback = function (mutationsList) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // 選取所有 data-key 的節點
                        const nodes = document.querySelectorAll('[data-key]');
                        nodes.forEach(node => {
                            const dataKey = node.getAttribute('data-key');

                            // 檢查 dataKey 是否為整數
                            if (dataKey && /^\d+$/.test(dataKey)) { // 使用正則表達式來檢查整數
                                const link = node.querySelector('a'); // 假設網址在 <a> 元素中
                                if (link && !collectedUrls.has(link.href)) {
                                    console.log(`發現 data-key: ${dataKey}, 網址: ${link.href}`);
                                    collectedUrls.add(link.href); // 添加不重複的網址
                                }
                            }
                        });

                    }
                }
            };

            // 監聽滾動事件
            window.addEventListener('scroll', () => {
                if (isObserving) {
                    console.log('滾動偵測中...');
                    // 開始監聽 DOM 變化
                    if (!observer) {
                        observer = new MutationObserver(callback);
                    }
                    observer.observe(document.body, {childList: true, subtree: true});
                }
            });
            console.log('開始監測滾動與 data-key 的變化');
        } else {
            // 停止監聽
            isObserving = false;
            observer.disconnect();
            button1.innerHTML = '開始收集網址';
            console.log('已停止監測');
        }
    });

    document.body.appendChild(toggleButton);
    document.body.appendChild(openAllButton);
    document.body.appendChild(resultDiv);
    const targetNode = document.querySelector('[aria-label="notification-list-container"]');

    // 檢查網址是否符合條件 https://www.dcard.tw/f/ntpu/p/
    if (
        /^https:\/\/www\.dcard\.tw\/f\/all\/p\/\d+$/.test(window.location.href) ||
        /^https:\/\/www\.dcard\.tw\/f\/ntpu\/p\/\d+$/.test(window.location.href)
    ) {
        console.log('符合條件的網址，將自動關閉');
        window.close();
    }


    // 按鈕點擊事件來打開網址
    button.addEventListener('click', () => {
        const range = input.value.split('-');
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        // 驗證範圍是否有效
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max < collectedUrls.size && min <= max) {
            const urlsArray = Array.from(collectedUrls); // 將 Set 轉換為 Array

            // 循環開啟每個網址
            for (let index = min; index <= max; index++) {
                const urlToOpen = urlsArray[index];
                const newWindow = window.open(urlToOpen, '_blank', 'noopener,noreferrer'); // 在新窗口中打開網址
                if (newWindow) {
                    newWindow.blur(); // 讓新分頁失去焦點
                    window.focus(); // 將焦點返回目前頁面
                }

            }
        } else {
            alert('請輸入有效的範圍 (1-18)');
        }
    });

    let httpLinks = [];

    // 定義一個函數來重新搜索鏈接
    function searchLinks() {
        let links = document.querySelectorAll('a[href]');
        httpLinks = []; // 清空鏈接陣列

        // 篩選不包含 "dcard" 並且 href 包含 "http" 的鏈接
        links.forEach(function (link) {
            let href = link.href;
            if (href.startsWith('http') && !href.includes('dcard') && !httpLinks.includes(href)) {
                // 如果鏈接不重複則加入
                httpLinks.push(href);
            }
        });

        // 顯示結果
        resultDiv.innerHTML = `<h3>找到以下不包含 dcard 的鏈接:</h3><ul>${httpLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}</ul>`;
    }


    // 點擊 "開啟所有網址" 按鈕，開啟所有網址
    openAllButton.addEventListener('click', function () {
        httpLinks.forEach(function (link) {
            window.open(link, '_blank');
        });
    });
    let main_links = []
    let commentCount = 0
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('評論資料:', data);
            main_links = data.links
            commentCount = data.commentCount
            console.log('link:', main_links);
            console.log('commentCount:', commentCount);
            get_main_url()
            get_comment_url()
        })
        .catch(error => {
            console.error('無法抓取資料:', error);
        });

    function get_main_url() {
        // 篩選不包含 "dcard" 並且 href 包含 "http" 的鏈接
        main_links.forEach(function (link) {
            if (link.startsWith('http') && !link.includes('.jpeg') && !link.includes('dcard') && !httpLinks.includes(link)) {
                // 如果鏈接不重複則加入
                httpLinks.push(link);
                console.log('link:', link);
            }
        });
    }

    function get_comment_url() {
        // 按照評論數量（commentCount）來抓取網址
        console.log('commentCount:', commentCount);
        if (commentCount < 30) {
            fetch(`${apiUrl}/comments?limit=$30`)
                .then(response => response.json())
                .then(data => {
                    console.log('評論資料:', data);
                    main_links = data.map(comment => comment.content);
                    console.log('link:', main_links);
                    // 提取網址
                    let urlPattern = /(https?:\/\/[^\s]+|ftp:\/\/[^\s]+)/g;
                    main_links.forEach(content => {
                        let urls = content.match(urlPattern);
                        if (urls) {
                            httpLinks.push(link);
                            console.log('content:', content);
                            console.log('urls:', urls);
                        }
                    });
                    let urls = content.match(urlPattern);
                    get_main_url()
                })
                .catch(error => {
                    console.error('無法抓取資料:', error);
                });
        }
        // 篩選不包含 "dcard" 並且 href 包含 "http" 的鏈接
        main_links.forEach(function (link) {
            if (link.startsWith('http') && !link.includes('.jpeg') && !link.includes('dcard') && !httpLinks.includes(link)) {
                // 如果鏈接不重複則加入
                httpLinks.push(link);
                console.log('link:', link);
            }
        });
    }


    // 點擊顯示/隱藏網址的按鈕切換顯示狀態
    toggleButton.addEventListener('click', function () {
        if (resultDiv.style.display === 'none') {
            searchLinks(); // 每次點擊按鈕時重新搜索當前頁面的鏈接
            openAllButton.style.display = 'block'; // 先顯示 "開啟所有網址" 按鈕
            resultDiv.style.display = 'block'; // 然後顯示結果
            toggleButton.innerText = '隱藏網址';
        } else {
            resultDiv.style.display = 'none';
            openAllButton.style.display = 'none'; // 隱藏 "開啟所有網址" 按鈕
            toggleButton.innerText = '顯示網址';
        }
    });

    // 自動點擊頁面中的 "查看其他" 按鈕
    function open_url() {
        'use strict';

        window.addEventListener('load', function () {
            const buttons = document.querySelectorAll('button:contains("查看其他")');
            buttons.forEach(button => {
                if (button) {
                    button.click();
                }
            });
        });
    }


    open_url();

})();