// ==UserScript==
// @name         在指定時間自動點擊按鈕
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在指定時間自動點擊按鈕
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

    // 插入時間輸入框（使用24小時制）
    let input = document.createElement("input");
    input.type = "time";
    input.id = "timeInput";
    input.style.marginRight = "10px";

    // 取得當前時間並格式化為 hh:mm:ss（24小時制）
    function formatTime(date) {
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    // 插入文字輸入框
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "userInput";
    textInput.placeholder = "2024-10-29";
    textInput.style.marginRight = "10px";
    if (localStorage.getItem("userInput")){
        textInput.value = localStorage.getItem("userInput")
    } else {
        textInput.value = "2024-10-29"
    }


    let submitButton = document.createElement("button");
    submitButton.innerHTML = "確認入山日期";
    submitButton.id = "submitTextButton";

    // 第一個按鈕的點擊事件
    submitButton.addEventListener("click", function() {
        let userText = document.getElementById("userInput").value;
        if (userText) {
            let savedOption = localStorage.getItem("selectedActivityType");
            if (localStorage.getItem("selectedActivityType")) {
                selectList.value = savedOption; // 設定選擇為之前保存的值
            }
            alert(savedOption + "入山日期是: " + userText); // 顯示用戶輸入的文字
            localStorage.setItem("userInput", userText); // 保存文字到 LocalStorage
            console.log("入山日期是:", userText);
        } else {
            alert("請輸入入山日期");
        }
    });
    // 插入一個下拉選單
    let selectList = document.createElement("select");
    selectList.id = "activityType";
    selectList.style.marginLeft = "10px"; // 添加一點間距

    // 選項 "單攻"
    let option1 = document.createElement("option");
    option1.value = "單攻";
    option1.text = "單攻";
    selectList.appendChild(option1);

    // 選項 "住宿"
    let option2 = document.createElement("option");
    option2.value = "住宿";
    option2.text = "住宿";
    selectList.appendChild(option2);
    let currentTime = new Date();
    input.value = formatTime(currentTime); // 設定預設值為當前時間（24小時制）

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
        clock.innerHTML = `當前時間：${formatTime(now)}`; // 使用24小時制格式
    }

    // 每秒更新一次時鐘，從系統直接獲取時間
    setInterval(updateClock, 500);
    updateClock(); // 頁面載入時立即顯示當前時間

    // 將元素添加到頁面上
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(clock);
    container.appendChild(selectList);
    container.appendChild(textInput);
    container.appendChild(submitButton);
    document.body.appendChild(container);

    // 當使用者改變選擇時保存新的值
    selectList.addEventListener('change', function() {
        let savedOption = selectList.value;
        localStorage.setItem("selectedActivityType", savedOption); // 保存選擇到 LocalStorage
    });
    let savedOption = localStorage.getItem("selectedActivityType");
    if (savedOption) {
        selectList.value = savedOption; // 設定選擇為之前保存的值
    }

    window.addEventListener('load', function() {
        if (document.getElementById('con_applystart')) {
            console.log('4');
            let storedText = localStorage.getItem("userInput");
            if (storedText) {
                document.getElementById("userInput").value = storedText; // 讀取並填充文字
            }
            let selectElement = document.getElementById('con_applystart')
            // 設置選項的值為 '2024-10-26'
            selectElement.value = storedText;
            console.log('5');
            let targetElement1 = document.getElementById('con_btnstepdown');
            if (targetElement1) {
                // 找到元素後點擊它
                targetElement1.click();
                console.log('7');
            }
            // 觸發 change 事件來模擬用戶改變選項
            //let event = new Event('change', { bubbles: true });
            //selectElement.dispatchEvent(event);
        } else if (document.getElementById('con_btnsetp2upnext')){
            if (document.getElementById('lineonechk')) {
                document.getElementById('lineonechk').click()
            }
            let targetElement2 = document.getElementById('con_btnsetp2upnext');
            targetElement2.click();
            console.log('11');
        } else if (document.getElementById('con_btnsave')){
            window.scrollTo(0, document.body.scrollHeight);
            // 將焦點設置到驗證碼輸入框上，讓用戶可以直接輸入
            document.getElementById('con_vcode').value = ""
            document.getElementById('con_vcode').focus();
        } else if (document.getElementById('con_apply_nation')) {
            let originalInput = document.getElementById('con_apply_sid');

            document.getElementById('con_apply_nation').value = "中華民國"
            // 隱藏原本的 input 元素
            originalInput.style.display = 'none';

            // 插入一個新的 select 元素作為清單
            let selectList = document.createElement('select');
            selectList.id = 'identitySelect';
            selectList.className = 'form-control';

            // 添加選項
            let option1 = document.createElement('option');
            option1.value = ''; // 預設選項不會有值
            option1.text = '請選擇身份證/護照號碼類型';
            selectList.appendChild(option1);

            let option2 = document.createElement('option');
            option2.value = 'A126840961'; // 假設的身分證號碼
            option2.text = 'A126840961';
            selectList.appendChild(option2);

            let option3 = document.createElement('option');
            option3.value = 'U121823592'; // 假設的護照號碼
            option3.text = 'U121823592';
            selectList.appendChild(option3);

            let option4 = document.createElement('option');
            option4.value = 'U101370385'; // 假設的護照號碼
            option4.text = 'U101370385';
            selectList.appendChild(option4);


            // 將選擇的值自動放回到原本的 input 中
            selectList.addEventListener('change', function() {
                let selectedValue = selectList.value;
                originalInput.value = selectedValue; // 將選擇的值設置到隱藏的 input 中
                if (selectedValue == 'A126840961'){
                    document.getElementById('con_apply_email').value = "ericzsos39@gmail.com"
                } else {
                    document.getElementById('con_apply_email').value = "zxtsubasa@gmail.com"
                }
                document.getElementById('con_vcode').focus();
            });

            // 將 select 清單插入到原本的 input 元素之前
            originalInput.parentNode.insertBefore(selectList, originalInput);

        }


    });


    // 設定按鈕點擊事件
    button.addEventListener("click", function() {
        let setTime = document.getElementById("timeInput").value;
        if (setTime) {
            alert("已設置時間為: " + setTime);

            let interval = setInterval(function() {
                let currentTime = new Date();
                let formattedTime = formatTime(currentTime); // 使用24小時制格式

                // 當時間到達時自動點擊保存按鈕
                if (formattedTime === setTime) {
                    clearInterval(interval);
                    if (document.getElementById('con_btnsave')){
                        location.reload(); // 重新加載頁面
                    }
                    let savedOption = localStorage.getItem("selectedActivityType");
                    if (savedOption) {
                        selectList.value = savedOption; // 設定選擇為之前保存的值
                    }
                    // 監聽 DOM 的變化
                    if (savedOption == "單攻") {
                        let targetElement = document.getElementById('con_New_List_btnupd_0');
                        if (targetElement) {
                            // 找到元素後點擊它
                            targetElement.click();
                            console.log('1');
                        }
                    } else{
                        let targetElement = document.getElementById('con_New_List_btnupd_1');
                        if (targetElement) {
                            // 找到元素後點擊它
                            targetElement.click();
                            console.log('2');
                        }
                    }
                    //let saveButton = document.getElementById("con_btnsave");
                    //if (saveButton) {
                    //    saveButton.click();
                    //    alert("已自動點擊保存按鈕");
                    //} else {
                    //    alert("未找到保存按鈕");
                    //}
                }
            }, 1000); // 每秒檢查一次
        } else {
            alert("請輸入時間");
        }
    });
})();