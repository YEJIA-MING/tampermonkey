// ==UserScript==
// @name         Parse Local YAML File in Tampermonkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Parse local YAML file content in Tampermonkey script
// @author       You
// @match        *://ssp-alpha-backend.zzishare.com/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js

// ==/UserScript==
/* global jsyaml */
// *://*/*
function test() {
    'use strict';

    // YAML 字符串
    const yamlString = `
sys_config: # SysConfig 系統配置
  expected_rtp: 9700 # 系統期望RTP
  bet_trigger: 47000 # 系統投注下限(分)
  rounds_trigger: 10 # 系統局數下限
  rtp_limit:
    monthly_rtp_limit_enabled: true # 當月系統RTP上限功能
    monthly_rtp_limit: 15000 # 當月系統RTP上限(萬分比)
    monthly_loss_limit_enabled: true # 單月系統虧損上限功能
    monthly_loss_limit: 2000000 # 單月系統虧損上限(分)
    daily_loss_limit_enabled: true # 單日系統虧損上限功能
    daily_loss_limit: 2000000 # 單日系統虧損上限(分)
  end_period:
    bet_trigger: 5340790 # 結束週期投注下限(分)
    rounds_trigger: 450 # 結束週期局數下限
    rtp_upper_limit: 9720 # 結束週期RTP上限(萬分比)
    rtp_lower_limit: 9680 # 結束週期RTP下限(萬分比)
  force_end_period:
    enabled: true # 強制結束週期功能
    bet_trigger: 12461850 # 強制結束週期投注下限(分)
    rounds_trigger: 450 # 強制結束週期局數下限
    profit_trigger: 2492370 # 強制結束週期盈利下限(分)
  rtp_range:
    upper_range: # 上區間
      - no: 1 # 區間編號
        offset: 20 #系統幅度參數
        adjust: 700 #輸贏調控值(萬分比)
      - no: 2
        offset: 40
        adjust: 1000
      - no: 3
        offset: 60
        adjust: 2000
      - no: 4
        offset: 80
        adjust: 2000
      - no: 5
        offset: 100
        adjust: 3000
      - no: 6
        offset: 120
        adjust: 3300
      - no: 7
        offset: 140
        adjust: 3500
      - no: 8
        offset: 160
        adjust: 3800
      - no: 9
        offset: 180
        adjust: 3800
      - no: 10
        offset: 200
        adjust: 3800
    lower_range: # 下區間
      - no: 1 # 區間編號
        offset: 30 #系統幅度參數
        adjust: 200 #輸贏調控值(萬分比)
      - no: 2
        offset: 60
        adjust: 300
      - no: 3
        offset: 90
        adjust: 400
      - no: 4
        offset: 120
        adjust: 500
      - no: 5
        offset: 150
        adjust: 600
      - no: 6
        offset: 180
        adjust: 700
      - no: 7
        offset: 210
        adjust: 1000
      - no: 8
        offset: 270
        adjust: 1100
      - no: 9
        offset: 1000
        adjust: 2000
      - no: 10
        offset: 3000
        adjust: 3000

player_config: # PlayerConfig 個人配置
  expected_rtp: 9700 # 個人期望RTP
  bet_trigger: 55000 # 個人投注下限(分)
  rounds_trigger: 5 # 個人局數下限
  enabled: true # 個人調控開關
  bscd_rounds: 20 # 個人咬吐冷卻局數
  ctrl_rounds_trigger: 5 # 個人調控局數下限
  range_upper_limit: 9710 # 個人區間上限(萬分比)
  range_lower_limit: 0 # 個人區間下限(萬分比)
  profit_limit: # 個人盈利上限配置
    monthly_profit_limit_enabled: true # 當月個人盈利上限功能
    monthly_profit_limit: 1000000 # 當月個人盈利上限(分)
    daily_profit_limit_enabled: true # 單日個人盈利上限功能
    daily_profit_limit: 500000 # 單日個人盈利上限(分)
  bs_prob: # 大咬大吐機率配置
    bite_profit_limit: 250000 # 大咬盈利上限(分)
    spit_loss_limit: 1000000 # 大吐虧損上限(分)
    bs_range_upper_limit: 9500 # 咬吐區間上限(萬分比)
    bs_range_lower_limit: 8000 # 咬吐區間下限(萬分比)
    bite_prob_config: # 大咬機率配置
      1: 7000 # 上區間外
      2: 6500 # 區間內
      3: 3000 # 下區間外
    spit_prob_config: # 大吐機率配置
      1: 10 # 上區間外
      2: 1500 # 區間內
      3: 4000 # 下區間外
  rtp_range:
    upper_range: # 上區間
      - no: 1 # 區間編號
        offset: 20 #系統幅度參數
        adjust: 700 #輸贏調控值(萬分比)
      - no: 2
        offset: 40
        adjust: 1000
      - no: 3
        offset: 60
        adjust: 2000
      - no: 4
        offset: 80
        adjust: 2000
      - no: 5
        offset: 100
        adjust: 3000
      - no: 6
        offset: 120
        adjust: 3300
      - no: 7
        offset: 140
        adjust: 3500
      - no: 8
        offset: 160
        adjust: 3800
      - no: 9
        offset: 180
        adjust: 3800
      - no: 10
        offset: 200
        adjust: 4500
    lower_range: # 下區間
      - no: 1 # 區間編號
        offset: 30 #系統幅度參數
        adjust: 200 #輸贏調控值(萬分比)
      - no: 2
        offset: 60
        adjust: 300
      - no: 3
        offset: 90
        adjust: 400
      - no: 4
        offset: 120
        adjust: 500
      - no: 5
        offset: 150
        adjust: 600
      - no: 6
        offset: 180
        adjust: 700
      - no: 7
        offset: 210
        adjust: 1000
      - no: 8
        offset: 270
        adjust: 1100
      - no: 9
        offset: 1000
        adjust: 1300
      - no: 10
        offset: 3000
        adjust: 1500

new_player_config:
  expected_rtp: 9750 # 新手期望RTP
  rounds_limit: 30 # 新手局數上限
  profit_limit: 150000 # 新手盈利上限(分)
  bet_limit: 1500000 # 新手投注上限(分)
  enabled: true # 新手調控開關
  bs_rounds_trigger: 5 # 新手咬吐局數下限
  rounds_trigger: 8 # 新手調控局數下限
  range_upper_limit: 9745 # 新手區間上限(萬分比)
  range_lower_limit: 0 # 新手區間下限(萬分比)
  bs_prob: # 大咬大吐機率配置
    bite_profit_limit: 250000 # 大咬盈利上限(分)
    spit_loss_limit: 1000000 # 大吐虧損上限(分)
    bs_range_upper_limit: 9700 # 咬吐區間上限(萬分比)
    bs_range_lower_limit: 8000 # 咬吐區間下限(萬分比)
    bite_prob_config: # 大咬機率配置
      1: 7000 # 上區間外
      2: 6500 # 區間內
      3: 3000 # 下區間外
    spit_prob_config: # 大吐機率配置
      1: 10 # 上區間外
      2: 1000 # 區間內
      3: 4300 # 下區間外
  rtp_range:
    upper_range: # 上區間
      - no: 1 # 區間編號
        offset: 20 #系統幅度參數
        adjust: 200 #輸贏調控值(萬分比)
      - no: 2
        offset: 40
        adjust: 400
      - no: 3
        offset: 60
        adjust: 600
      - no: 4
        offset: 80
        adjust: 800
      - no: 5
        offset: 100
        adjust: 1000
      - no: 6
        offset: 120
        adjust: 1200
      - no: 7
        offset: 140
        adjust: 1400
      - no: 8
        offset: 160
        adjust: 1600
      - no: 9
        offset: 180
        adjust: 1800
      - no: 10
        offset: 200
        adjust: 4500
    lower_range: # 下區間
      - no: 1 # 區間編號
        offset: 30 #系統幅度參數
        adjust: 200 #輸贏調控值(萬分比)
      - no: 2
        offset: 60
        adjust: 300
      - no: 3
        offset: 90
        adjust: 400
      - no: 4
        offset: 120
        adjust: 500
      - no: 5
        offset: 150
        adjust: 600
      - no: 6
        offset: 180
        adjust: 700
      - no: 7
        offset: 210
        adjust: 1000
      - no: 8
        offset: 270
        adjust: 1100
      - no: 9
        offset: 1000
        adjust: 1300
      - no: 10
        offset: 3000
        adjust: 1500

    `;

    // 使用 js-yaml 解析 YAML
    const data = jsyaml.load(yamlString);

    // 使用解析後的數據
    console.log(data);
    console.log('系統期望RTP:', data.sys_config.expected_rtp);
    return data
}

function sysset() {
    console.log('系統調控 clicked!');
    // 在這裡執行你想要的事件邏輯
    const data = test()
    const sys_config = data.sys_config
    // console.log('系統投注下限:', data.sys_config.rtp_range.upper_range[1]);
    // expectedRTP
    document.getElementById('expectedRTP').value = sys_config.expected_rtp
    // roundsTrigger
    document.getElementById('roundsTrigger').value = sys_config.rounds_trigger
    // betTrigger
    document.getElementById('betTrigger').value = sys_config.bet_trigger
    // endPeriod_betTrigger
    document.getElementById('endPeriod_betTrigger').value = sys_config.end_period.bet_trigger
    // endPeriod_roundsTrigger
    document.getElementById('endPeriod_roundsTrigger').value = sys_config.end_period.rounds_trigger
    // endPeriod_rtpUpperLimit
    document.getElementById('endPeriod_rtpUpperLimit').value = sys_config.end_period.rtp_upper_limit
    // endPeriod_rtpLowerLimit
    document.getElementById('endPeriod_rtpLowerLimit').value = sys_config.end_period.rtp_lower_limit
    // forceEndPeriod_betTrigger
    document.getElementById('forceEndPeriod_betTrigger').value = sys_config.force_end_period.bet_trigger
    // forceEndPeriod_roundsTrigger
    document.getElementById('forceEndPeriod_roundsTrigger').value = sys_config.force_end_period.rounds_trigger
    // forceEndPeriod_profitTrigger
    document.getElementById('forceEndPeriod_profitTrigger').value = sys_config.force_end_period.profit_trigger
    // rtpLimit_monthlyRTPLimit
    document.getElementById('rtpLimit_monthlyRTPLimit').value = sys_config.rtp_limit.monthly_rtp_limit
    // rtpLimit_dailyLossLimit
    document.getElementById('rtpLimit_dailyLossLimit').value = sys_config.rtp_limit.daily_loss_limit
    for (let i = 0; i < sys_config.rtp_range.upper_range.length; i++) {
        // rtpRange_upperRange_0_offset
        document.getElementById(`rtpRange_upperRange_${i}_offset`).value = sys_config.rtp_range.upper_range[i].offset
        // rtpRange_upperRange_0_adjust
        document.getElementById(`rtpRange_upperRange_${i}_adjust`).value = sys_config.rtp_range.upper_range[i].adjust
    }
    // rtpRange_upperRange_0_offset
    // rtpRange_upperRange_0_adjust
    for (let i = 0; i < sys_config.rtp_range.lower_range.length; i++) {
        // rtpRange_lowerRange_0_offset
        document.getElementById(`rtpRange_lowerRange_${i}_offset`).value = sys_config.rtp_range.lower_range[i].offset
        // rtpRange_lowerRange_0_adjust
        document.getElementById(`rtpRange_lowerRange_${i}_adjust`).value = sys_config.rtp_range.lower_range[i].adjust
    }
    alert('The system configuration has been completed !');

}

function player() {
    console.log('個人調控 clicked!');
    const data = test()
    const player_config = data.player_config
    // 在這裡執行你想要的事件邏輯
    // expectedRTP
    document.getElementById('expectedRTP').value = player_config.expected_rtp
    // bsProb_biteProfitLimit
    document.getElementById('bsProb_biteProfitLimit').value = player_config.bs_prob.bite_profit_limit
    // betTrigger
    document.getElementById('betTrigger').value = player_config.bet_trigger
    // bsProb_spitLossLimit
    document.getElementById('bsProb_spitLossLimit').value = player_config.bs_prob.spit_loss_limit
    // roundsTrigger
    document.getElementById('roundsTrigger').value = player_config.rounds_trigger
    // bscdRound
    document.getElementById('bscdRound').value = player_config.bscd_rounds
    // ctrlRoundsTrigger
    document.getElementById('ctrlRoundsTrigger').value = player_config.ctrl_rounds_trigger
    // rangeLowerLimit
    document.getElementById('rangeLowerLimit').value = player_config.range_lower_limit
    // rangeUpperLimit
    document.getElementById('rangeUpperLimit').value = player_config.range_upper_limit
    // bsProb_bsRangeLowerLimit
    document.getElementById('bsProb_bsRangeLowerLimit').value = player_config.bs_prob.bs_range_lower_limit
    // bsProb_bsRangeUpperLimit
    document.getElementById('bsProb_bsRangeUpperLimit').value = player_config.bs_prob.bs_range_upper_limit
    // bsProb_biteProbConfig_3
    // bsProb_biteProbConfig_2
    // bsProb_biteProbConfig_1
    for (let i = 0; i < player_config.bs_prob.bite_prob_config.length; i++) {
        // bsProb_biteProbConfig_0
        document.getElementById(`bsProb_biteProbConfig_${i}`).value = player_config.bs_prob.bite_prob_config[i]
    }
    // bsProb_spitProbConfig_3
    // bsProb_spitProbConfig_2
    // bsProb_spitProbConfig_1
    for (let i = 0; i < player_config.bs_prob.spit_prob_config.length; i++) {
        // bsProb_spitProbConfig_0
        document.getElementById(`bsProb_spitProbConfig_${i}`).value = player_config.bs_prob.spit_prob_config[i]
    }
    // profitLimit_monthlyProfitLimit
    document.getElementById('profitLimit_monthlyProfitLimit').value = player_config.profit_limit.monthly_profit_limit
    // profitLimit_dailyProfitLimit
    document.getElementById('profitLimit_dailyProfitLimit').value = player_config.profit_limit.daily_profit_limit
    // rtpRange_upperRange_0_offset
    // rtpRange_upperRange_0_adjust
    for (let i = 0; i < player_config.rtp_range.upper_range.length; i++) {
        // rtpRange_upperRange_0_offset
        document.getElementById(`rtpRange_upperRange_${i}_offset`).value = player_config.rtp_range.upper_range[i].offset
        // rtpRange_upperRange_0_adjust
        document.getElementById(`rtpRange_upperRange_${i}_adjust`).value = player_config.rtp_range.upper_range[i].adjust
    }
    // rtpRange_lowerRange_0_offset
    // rtpRange_lowerRange_0_adjust
    for (let i = 0; i < player_config.rtp_range.lower_range.length; i++) {
        // rtpRange_lowerRange_0_offset
        document.getElementById(`rtpRange_lowerRange_${i}_offset`).value = player_config.rtp_range.lower_range[i].offset
        // rtpRange_lowerRange_0_adjust
        document.getElementById(`rtpRange_lowerRange_${i}_adjust`).value = player_config.rtp_range.lower_range[i].adjust
    }
    alert('The player configuration has been completed !');
}

function newPlayer() {
    console.log('新手調控 clicked!');
    const data = test()
    const new_player_config = data.new_player_config
    // 在這裡執行你想要的事件邏輯
    // expectedRtp
    document.getElementById('expectedRtp').value = new_player_config.expected_rtp
    // bsProb_biteProfitLimit
    document.getElementById('bsProb_biteProfitLimit').value = new_player_config.bs_prob.bite_profit_limit
    // roundsLimit
    document.getElementById('roundsLimit').value = new_player_config.rounds_limit
    // bsProb_spitLossLimit
    document.getElementById('bsProb_spitLossLimit').value = new_player_config.bs_prob.spit_loss_limit
    // profitLimit
    document.getElementById('profitLimit').value = new_player_config.profit_limit
    // betLimit
    document.getElementById('betLimit').value = new_player_config.bet_limit
    // bsRoundsTrigger
    document.getElementById('bsRoundsTrigger').value = new_player_config.bs_rounds_trigger
    // roundsTrigger
    document.getElementById('roundsTrigger').value = new_player_config.rounds_trigger
    // rangeLowerLimit
    document.getElementById('rangeLowerLimit').value = new_player_config.range_lower_limit
    // rangeUpperLimit
    document.getElementById('rangeUpperLimit').value = new_player_config.range_upper_limit
    // bsProb_bsRangeLowerLimit
    document.getElementById('bsProb_bsRangeLowerLimit').value = new_player_config.bs_prob.bs_range_lower_limit
    // bsProb_bsRangeUpperLimit
    document.getElementById('bsProb_bsRangeUpperLimit').value = new_player_config.bs_prob.bs_range_upper_limit
    // bsProb_biteProbConfig_3
    // bsProb_biteProbConfig_2
    // bsProb_biteProbConfig_1
    for (let i = 0; i < new_player_config.bs_prob.bite_prob_config.length; i++) {
        // bsProb_biteProbConfig_0
        document.getElementById(`bsProb_biteProbConfig_${i}`).value = new_player_config.bs_prob.bite_prob_config[i]
    }
    // bsProb_spitProbConfig_3
    // bsProb_spitProbConfig_2
    // bsProb_spitProbConfig_1
    for (let i = 0; i < new_player_config.bs_prob.spit_prob_config.length; i++) {
        // bsProb_spitProbConfig_0
        document.getElementById(`bsProb_spitProbConfig_${i}`).value = new_player_config.bs_prob.spit_prob_config[i]
    }
    // rtpRange_upperRange_0_offset
    // rtpRange_upperRange_0_adjust
    for (let i = 0; i < new_player_config.rtp_range.upper_range.length; i++) {
        // rtpRange_upperRange_0_offset
        document.getElementById(`rtpRange_upperRange_${i}_offset`).value = new_player_config.rtp_range.upper_range[i].offset
        // rtpRange_upperRange_0_adjust
        document.getElementById(`rtpRange_upperRange_${i}_adjust`).value = new_player_config.rtp_range.upper_range[i].adjust
    }
    // rtpRange_lowerRange_0_offset
    // rtpRange_lowerRange_0_adjust
    for (let i = 0; i < new_player_config.rtp_range.lower_range.length; i++) {
        // rtpRange_lowerRange_0_offset
        document.getElementById(`rtpRange_lowerRange_${i}_offset`).value = new_player_config.rtp_range.lower_range[i].offset
        // rtpRange_lowerRange_0_adjust
        document.getElementById(`rtpRange_lowerRange_${i}_adjust`).value = new_player_config.rtp_range.lower_range[i].adjust
    }
    alert('The new player configuration has been completed !');
}

function rr() {
    'use strict';
        // Ensure buttons are always on top
    function adjustButtonZIndex() {
        const buttons = document.querySelectorAll('#mainButton, .subButton');
        buttons.forEach(button => {
            button.style.zIndex = '1000';
        });
    }

    // Create styles for the buttons
    GM_addStyle(`
        #mainButton {
            position: fixed;
            bottom: 10px;
            right: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            z-index: 1000;
            font-size: 1em; /* 字體大小將根據按鈕的內部填充大小縮放 */
        }
        .subButton {
            position: fixed;
            right: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            padding: 1px 2px;
            cursor: pointer;
            z-index: 1000;
            display: none;
            font-size: 1em; /* 字體大小將根據按鈕的內部填充大小縮放 */
        }
    `);

    // Create main button
    const mainButton = document.createElement('button');
    mainButton.id = 'mainButton';
    mainButton.innerText = 'Show Buttons';
    document.body.appendChild(mainButton);

    // Create sub-buttons
    const subButtonName = ['系統調控', '個人調控', '新手調控'];
    const subButtons = [];
    for (let i = 0; i <= 2; i++) {
        const subButton = document.createElement('button');
        subButton.className = 'subButton';
        subButton.innerText = subButtonName[i];
        // Increase the distance between buttons
        subButton.style.bottom = `${40 + (i) * 30}px`;
        document.body.appendChild(subButton);
        subButtons.push(subButton);
    }

    // Toggle sub-buttons visibility
    mainButton.addEventListener('click', () => {
        subButtons.forEach(button => {
            button.style.display = button.style.display === 'none' || !button.style.display ? 'block' : 'none';
        });
    });
    subButtons[0].addEventListener('click', () => {
        sysset()
    });
    subButtons[1].addEventListener('click', () => {
        player()
    });
    subButtons[2].addEventListener('click', () => {
        newPlayer()
    });
        // Adjust z-index to ensure buttons are above other elements
    adjustButtonZIndex();

};

(function() {
    'use strict';

    // Define the function in unsafeWindow
    unsafeWindow.myFunction = function() {
        // Ensure buttons are always on top
        function adjustButtonZIndex() {
            const buttons = document.querySelectorAll('#mainButton, .subButton');
            buttons.forEach(button => {
                button.style.zIndex = '1000';
            });
        }

        // Create styles for the buttons
        GM_addStyle(`
            #mainButton {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                z-index: 1000;
                font-size: 1em; /* 字體大小將根據按鈕的內部填充大小縮放 */
            }
            .subButton {
                position: fixed;
                right: 10px;
                background-color: #28a745;
                color: white;
                border: none;
                padding: 1px 2px;
                cursor: pointer;
                z-index: 1000;
                display: none;
                font-size: 1em; /* 字體大小將根據按鈕的內部填充大小縮放 */
            }
        `);

        // Create main button
        const mainButton = document.createElement('button');
        mainButton.id = 'mainButton';
        mainButton.innerText = 'Show Buttons';
        document.body.appendChild(mainButton);

        // Create sub-buttons
        const subButtonName = ['系統調控', '個人調控', '新手調控'];
        const subButtons = [];
        for (let i = 0; i <= 2; i++) {
            const subButton = document.createElement('button');
            subButton.className = 'subButton';
            subButton.innerText = subButtonName[i];
            // Increase the distance between buttons
            subButton.style.bottom = `${40 + (i) * 30}px`;
            document.body.appendChild(subButton);
            subButtons.push(subButton);
        }

        // Toggle sub-buttons visibility
        mainButton.addEventListener('click', () => {
            subButtons.forEach(button => {
                button.style.display = button.style.display === 'none' || !button.style.display ? 'block' : 'none';
            });
        });
        subButtons[0].addEventListener('click', () => {
            if (typeof unsafeWindow.sysset === 'function') {
                unsafeWindow.sysset();
            }
        });
        subButtons[1].addEventListener('click', () => {
            if (typeof unsafeWindow.player === 'function') {
                unsafeWindow.player();
            }
        });
        subButtons[2].addEventListener('click', () => {
            if (typeof unsafeWindow.newPlayer === 'function') {
                unsafeWindow.newPlayer();
            }
        });

        // Adjust z-index to ensure buttons are above other elements
        adjustButtonZIndex();
    };

})();