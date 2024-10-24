// ==UserScript==
// @name         igg-games 去除廣告
// @namespace    http://tampermonkey.net/
// @version      1.3.0
// @description  去除igg-games開啟ADBlock的阻擋器
// @author       You
// @match        https://igg-games.com/*
// @grant        none
// ==/UserScript==

(function() {
    document.getElementById("idModal").remove();
    document.getElementsByClassName('taxonomy-description')[0].remove()
})();