// ==UserScript==
// @name         ssp 自動登入
// @namespace    http://tampermonkey.net/
// @version      2024-10-23
// @description  try to take over the world!
// @author       You
// @match        https://ssp-alpha-backend.zzishare.com/*
// @match        https://ssp-backend-v3.appsinstall.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=appsinstall.cn
// @grant        none
// ==/UserScript==

function simulateInput(selector, text) {
    const inputElement = document.querySelector(selector);

    if (inputElement) {
        inputElement.focus(); // 將焦點設置在輸入框

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // 模擬 keydown 事件
            const keydownEvent = new KeyboardEvent('keydown', {
                key: char,
                code: `Key${char.toUpperCase()}`,
                charCode: char.charCodeAt(0),
                keyCode: char.charCodeAt(0),
                bubbles: true
            });
            inputElement.dispatchEvent(keydownEvent);

            // 設置輸入框的值
            inputElement.value += char;

            // 模擬 keyup 事件
            const keyupEvent = new KeyboardEvent('keyup', {
                key: char,
                code: `Key${char.toUpperCase()}`,
                charCode: char.charCodeAt(0),
                keyCode: char.charCodeAt(0),
                bubbles: true
            });
            inputElement.dispatchEvent(keyupEvent);
        }

        // 觸發輸入框的 input 事件，通知瀏覽器有變動
        const inputEvent = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
    }
}



(function() {
    'use strict';
    let currentURL = window.location.href;
    console.log(currentURL);
    console.log(111);
    //if (currentURL == "https://ssp-backend-v3.appsinstall.cn/#/login") {
    if (currentURL.includes("login")) {
        console.log(1);
        const observer1 = new MutationObserver((mutations) => {
            const button1 = document.querySelector('#validateOnly_account');
            console.log(1234);

            if (button1) {
                button1.value = 'superadmin'
                document.querySelector('#validateOnly_password').value = 'superadmin'
                observer1.disconnect(); // 點擊之後停止監聽
            }
        });

        // 開始監聽 DOM 變化
        // observer1.observe(document.body, { childList: true, subtree: true });


        console.log(1234);

        const observer = new MutationObserver((mutations) => {
            const button = document.querySelector('.ant-btn.ant-btn-primary.ant-btn-lg.login__submitButton');

            console.log(123111);

            if (button) {
                // 模擬輸入 "superadmin" 到 validateOnly_password 輸入框
                simulateInput('#validateOnly_password', 'superadmin');
                document.querySelector('.iconfont.icon-ic-input-eye-off').click()
                console.log(12312312);
                button.click();
                observer.disconnect(); // 點擊之後停止監聽
            }
        });

        // 開始監聽 DOM 變化
        observer.observe(document.body, { childList: true, subtree: true });

    }

    // Your code here...
})();

// let url = '';
// let headers = {};
// let data = {};
// url = 'https://rgs-aplha-api.zzishare.com/v1/admin/login';
// headers = {
//     'Content-Type': 'application/json'
// };
// data = {
//     account: "superadmin",
//     password: "superadmin"
// };


// if (url) {
//     fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//         const authorizationToken = result.data.token;
//         console.log('Authorization Token:', authorizationToken);

//         // 儲存 token 到本機儲存空間 (localStorage)
//         localStorage.setItem('ssp-v3_auth-token', authorizationToken);
//         localStorage.setItem('ssp-v3_auth-token1', 1);
//         window.location.href = 'https://ssp-backend-v3.appsinstall.cn////admin/data-report/real-time-dashboard'
//     })
//         .catch(error => {
//         console.error('Error:', error);
//     });
// }