// ==UserScript==
// @name         Dcard_romove_login
// @namespace    http://tampermonkey.net/
// @version      2024-08-21
// @description  try to take over the world!
// @author       You
// @match        https://www.dcard.tw/f*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dcard.tw
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        document.querySelector('.d_nf_2y.d_g6_1s.d_o4_1s.d_6r_1s.d_ei_1h2ngc6.d_2l_1a.d_y5_ifev7s.d_a5_hyeg3x.d_h_1q.d_ft_1q.b2rlo5n').remove();
    }, 200);
})();