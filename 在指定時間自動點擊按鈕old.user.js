// ==UserScript==
// @name         在指定時間自動點擊按鈕old
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在指定時間自動點擊按鈕old
// @author       You
// @match        https://hike.taiwan.gov.tw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 插入容器來放置按鈕、時間輸入框和時鐘
    let container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.zIndex = "1000"; // 確保按鈕不被其他元素覆蓋
    container.style.backgroundColor = "white"; // 背景色以便清楚顯示
    container.style.padding = "10px";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "5px";

    // 插入時間輸入框
    let input = document.createElement("input");
    input.type = "time";
    input.id = "timeInput";
    input.style.marginRight = "10px";

    // 取得當前時間並格式化為 hh:mm:ss
    let currentTime = new Date();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minutes = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
    input.value = `${hours}:${minutes}:${seconds}`; // 設定預設值為當前時間

    // 插入按鈕
    let button = document.createElement("button");
    button.innerHTML = "設置時間";
    button.id = "setTimeButton";

    // 插入動態時鐘
    let clock = document.createElement("div");
    clock.id = "liveClock";
    clock.style.marginTop = "10px";
    clock.style.fontSize = "16px";

    // 更新時鐘時間
    function updateClock() {
        let now = new Date();
        let clockHours = String(now.getHours()).padStart(2, '0');
        let clockMinutes = String(now.getMinutes()).padStart(2, '0');
        let clockSeconds = String(now.getSeconds()).padStart(2, '0');
        clock.innerHTML = `當前時間：${clockHours}:${clockMinutes}:${clockSeconds}`;
    }

    // 每秒更新一次時鐘，從系統直接獲取時間
    setInterval(updateClock, 1000);
    updateClock(); // 頁面載入時立即顯示當前時間

    // 將元素添加到頁面上
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(clock);
    document.body.appendChild(container);

    // 設定按鈕點擊事件
    button.addEventListener("click", function() {
        let setTime = document.getElementById("timeInput").value;
        if (setTime) {
            alert("已設置時間為: " + setTime);

            let interval = setInterval(function() {
                let currentTime = new Date();
                let formattedTime = currentTime.toTimeString().slice(0, 8); // 格式化為 hh:mm:ss

                // 當時間到達時自動點擊保存按鈕
                if (formattedTime === setTime) {
                    clearInterval(interval);
                    let saveButton = document.getElementById("con_btnsave");
                    if (saveButton) {
                        saveButton.click();
                        // alert("已自動點擊保存按鈕");
                    } else {
                        alert("未找到保存按鈕");
                    }
                }
            }, 1000); // 每秒檢查一次
        } else {
            alert("請輸入時間");
        }
    });
})();