// ==UserScript==
// @name         gamble 自動登入
// @namespace    http://tampermonkey.net/
// @version      2024-08-09
// @description  try to take over the world!
// @author       You
// @match        http://8.222.248.207:5601/login?*
// @match        http://8.222.248.207:5601/login?msg=LOGGED_OUT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=248.207
// @grant        none
// ==/UserScript==


function login_es() {
    'use strict';
    const usernameInput = document.querySelector('input.euiFieldText');
    const passwordInput = document.querySelector('input.euiFieldPassword');

    // 手動設置值
    usernameInput.value = 'elastic';
    passwordInput.value = '7ITe1VBpGpMnAptZdyPn';

    // 觸發 input 事件，模擬手動輸入
    usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

    // 觸發 change 事件，模擬手動輸入
    usernameInput.dispatchEvent(new Event('change', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('change', { bubbles: true }));

    // 點擊提交按鈕
    document.querySelector('.css-1km4ln8-euiButtonDisplayContent').click();

    //document.querySelector('input.euiFieldText').value = 'elastic';
    //document.querySelector('input.euiFieldPassword').value = '7ITe1VBpGpMnAptZdyPn';
    //document.querySelector('.css-1km4ln8-euiButtonDisplayContent').click();
}

function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}


function setpass() {
    'use strict';

    // 等待頁面加載完成

    // 填寫用戶名和密碼
    const usernameInput = document.querySelector('input.euiFieldText');
    const passwordInput = document.querySelector('input.euiFieldPassword');

    if (usernameInput && passwordInput) {
        usernameInput.value = 'elastic';
        passwordInput.value = '7ITe1VBpGpMnAptZdyPn';

        // 模擬手動輸入
        usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

        // 點擊登入按鈕
        setTimeout(() => {
            document.querySelector('.css-1km4ln8-euiButtonDisplayContent').click();
        }, 500); // 延遲500毫秒
        console.log('未找到輸入字段12');
    } else {
        console.log('未找到輸入字段');
    }

}
waitForElement('input.euiFieldText', (usernameInput) => {
    setpass()


    //usernameInput.value = 'yourUsername';
});


//login_es();