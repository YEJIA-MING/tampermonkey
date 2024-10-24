// ==UserScript==
// @name         自動輸入日期
// @namespace    http://tampermonkey.net/
// @version      2024-08-08
// @description  try to take over the world!
// @author       You
// @match        https://myppt.cc/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=myppt.cc
// @grant        none
// ==/UserScript==

//         https://myppt.cc/2Y0Ua
//         https://myppt.cc/o6sJp?GETdpcha2omin=o6sJp&encrypt_pass_vokgj=bjlJR28rNHhnTzYrQ3RLRFVZRnA0Zz09OjoppHWLr4beMNg2sg2Oys3H&myppt_fuck=&pasahaicsword=88888&submit=
//         https://myppt.cc/wVq3w
function setDate() {
    'use strict';
    // const uploadDateText = document.querySelector('.login_span').textContent.trim()
    // 檢查是否已經執行過
    if (sessionStorage.getItem('scriptExecuted')) {
        return; // 如果已經執行過，則退出腳本
    }

    // 記錄已執行狀態
    sessionStorage.setItem('scriptExecuted', 'true');




    const colSm12Element = document.querySelector('.col-sm-12')
    const uploadDateText = colSm12Element.querySelector('.login_span').textContent.trim()

    const datePart = uploadDateText.split(' ')[0].split('：')[1]
    const month = datePart.split('-')[1]; // "08"
    const day = parseInt(datePart.split('-')[2], 10);
    // 轉換為數字 9
    const newDay = day
    // 組合為 "0809" 格式
    const formattedDate = month + (newDay < 10 ? '0' + newDay : newDay)



    document.querySelector ('#pasahaicsword').value = formattedDate
    //const button = document.querySelector('#main_fjim60unBU.btn.standard-hover-effect.bg-red.btn-block');
    //if (button) {
    //    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    //    button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    //    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    //}
    document.querySelector('#main_fjim60unBU').click()

    // Your code here...
}
setDate();