// ==UserScript==
// @name         自動點擊vpn登入
// @namespace    http://tampermonkey.net/
// @version      2024-08-12
// @description  try to take over the world!
// @author       You
// @match        *://accounts.google.com/o/oauth2/*
// @match        *://oauth2-chess.baifu-tech.net/oauth2/callback*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==
//oauth2
(function() {
    'use strict';
    // 檢查是否存在「以繼續使用『openvpn』」的文字
    setTimeout( function(){
        var openvpnText = document.body.innerText.includes("以繼續使用「openvpn」");
        if (openvpnText) {
            console.log("Found 'openvpn' text on the page");
            setTimeout( function(){
                // 更改你的帳號
                document.querySelector("div[data-email='jaemin.ye@baifu-tech.net']").click()
                // document.querySelector('.DOLDDf').click()
            },300)
            // 可以在此添加其他行為，例如自動點擊等
        } else {
            console.log("'openvpn' text not found");
            console.log(document.body.innerText);
        }
    },300)


})();
if (window.location.href.startsWith('https://oauth2-chess.baifu-tech.net/oauth2/callback')) {
    console.log('Access granted check');

    // 檢查是否存在 "Access granted" 這行字
    if (document.querySelector('header h1') && document.querySelector('header h1').textContent === 'Access granted') {
        let input = prompt("Access granted. Please enter the next action (e.g., 'dsg' to dsg the page, 'fusion','ac', 'ssp' to go to another page):").toLowerCase();

        // 根據用戶輸入進行操作
        if (input.includes('dsg')) {
            window.location.href = 'https://ssp-backend-dsg.appsinstall.cn/#/login'; // 替換為你希望重定向的URL
            if (input.includes('fusion')) {
                window.open('https://ssp-backend-fusion.appsinstall.cn/#/login');
            }
            if (input.includes('ac')) {
                window.open('https://ssp-backend-acv2.appsinstall.cn/#/login');
            }
        } else if (input.includes('ac')) {
            window.location.href = 'https://ssp-backend-acv2.appsinstall.cn/#/login'; // 替換為你希望重定向的URL
        } else if (input.includes('fusion')) {
            window.location.href = 'https://ssp-backend-fusion.appsinstall.cn/#/login'; // 替換為你希望重定向的URL
        } else if (input.includes('ssp')) {
            window.location.href = 'https://ssp-backend-v3.appsinstall.cn/#/login'; // 替換為你希望重定向的URL
        } else if (input.includes('0')) {
            //alert("Invalid input. Please try again.");
        } else{
            alert("Invalid input. Please try again.");
        }

    }

}