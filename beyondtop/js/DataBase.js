var DataBase = (function () {
    function DataBase() {
    }
    return DataBase;
}());
/** 发射器攻击等级 */
DataBase.strengthenEmitterAttack = [
    [20, 100], [23, 103], [26, 106], [29, 109], [32, 112],
    [35, 115], [38, 118], [41, 121], [44, 124], [47, 127],
    [50, 130], [53, 133], [56, 136], [59, 139], [62, 142],
    [65, 145], [68, 148], [71, 151], [74, 154], [77, 157]
];
/** 陀螺血量 */
DataBase.strengthenABoold = [
    [50, 100], [53, 103], [56, 106], [59, 109], [62, 112],
    [65, 115], [68, 118], [71, 121], [74, 124], [77, 127],
    [80, 130], [83, 133], [86, 136], [89, 139], [92, 142],
    [95, 145], [98, 148], [101, 151], [104, 154], [107, 157]
];
/**发射器升级钻石花费 */
DataBase.emitterUp = [
    6, 12, 30, 60,
    60, 60, 60, 60, 60,
    65, 70, 70, 75, 75,
    80, 80, 80, 80, 80, 0
];
/** 战斗环攻击等级 */
DataBase.strengthenFight = [
    0, 20, 40, 60, 80,
    100, 120, 140, 160, 180,
    200, 220, 240, 260, 280,
    300, 320, 340, 360, 400
];
/**战斗环升级金币花费*/
DataBase.fightUp = [
    150, 300, 600, 900,
    1500, 2000, 2500, 3000, 3500,
    4000, 4500, 5000, 5500, 6000,
    6500, 7000, 7500, 8000, 10000, 0
];
/**守护环*/
DataBase.strengthenDefence = [
    0, 20, 40, 60, 80,
    100, 120, 140, 160, 180,
    200, 220, 240, 260, 280,
    300, 320, 340, 360, 400
];
/**守护环升级金币花费*/
DataBase.defenseUp = [
    150, 300, 600, 900,
    1500, 2000, 2500, 3000, 3500,
    4000, 4500, 5000, 5500, 6000,
    6500, 7000, 7500, 8000, 10000, 0
];
/**战魂守护攻击*/
DataBase.strengthenSoul = [
    0, 2, 4, 6, 8,
    10, 12, 14, 16, 18,
    20, 22, 24, 26, 28,
    30, 32, 34, 36, 40
];
/**战魂对应加血血量*/
DataBase.soulBoold = [
    0, 200, 400, 600, 800,
    1000, 1200, 1400, 1600, 1800,
    2000, 2200, 2400, 2600, 2800,
    3000, 3200, 3400, 3600, 3800
];
/**战魂升级花费钻石*/
DataBase.soulUp = [
    6, 12, 30, 60,
    60, 60, 60, 60, 60,
    65, 70, 70, 75, 75,
    80, 80, 80, 80, 80, 0
];
/**强化等级
 * 0 战魂
 * 1 战斗环
 * 2 守护环
 * 3 发射器
*/
DataBase.powerLevel = [
    1, 1, 1, 1
];
/*
*陀螺基本属性
 *  攻击 防御 生命  主动技能伤害   战斗力
*/
DataBase.topProperty = [
    [150, 50, 1800, 400, 4833],
    [200, 80, 2000, 500, 6167],
    [200, 150, 2300, 500, 7167],
    [250, 100, 3000, 600, 8200],
    [200, 200, 3000, 600, 8400],
    [250, 200, 4000, 700, 10233],
    [350, 100, 5500, 1000, 16500],
    [100, 350, 6500, 1000, 15933],
    [400, 250, 5500, 1500, 17900],
    [650, 300, 8000, 2000, 25967],
    [500, 500, 9000, 2000, 27167]
];
/**陀螺的价格*/
DataBase.topPrice = [
    0, 0, 1500, 3000, 3000,
    7000, 360, 350, 25000, 720,
    720
];
/**陀螺的解锁*/
DataBase.lock = [
    0, 0, -1, -1, -1,
    -1, -1, -1, -1, -1,
    -1
];
/**陀螺的星数 1S:0	 2S:1	2.5S:2	3S:3	3.5S:4	4S:5	4.5S:6	5S:7*/
DataBase.topStar = [
    2, 4, 5, 6, 6,
    7, 8, 8, 9, 10,
    10
];
/**敌方出战陀螺*/
DataBase.levelEnemyId = [
    [
        [0, -1], [1, -1], [3, -1], [2, 0], [1, 1], [2, 1], [4, 1]
    ],
    [
        [3, 0], [4, 1], [2, 1], [4, 2], [3, 4], [5, 3], [6, 5]
    ],
    [
        [4, 3], [5, 4], [7, 3], [8, 4], [7, 6], [8, 6], [9, 8]
    ],
    [
        [6, 7], [7, 8], [6, 10], [10, 9], [7, 9], [10, 9], [10, 9]
    ]
];
/**关卡敌方强化等级*/
DataBase.levelEnemyType = [
    [
        [1, 1, 1, 1], [1, 1, 1, 1], [4, 2, 2, 3], [5, 2, 2, 4], [5, 4, 3, 4],
        [5, 4, 4, 4], [5, 5, 5, 5]
    ],
    [
        [6, 5, 5, 6], [7, 6, 6, 7], [8, 7, 7, 8], [8, 8, 8, 8], [9, 9, 9, 9],
        [9, 9, 9, 9], [8, 8, 8, 8]
    ],
    [
        [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [11, 11, 11, 11], [11, 11, 11, 11],
        [12, 12, 12, 12], [12, 12, 12, 12]
    ],
    [
        [15, 15, 15, 15], [15, 15, 15, 15], [15, 15, 15, 15], [15, 15, 15, 15], [20, 20, 20, 20],
        [17, 17, 17, 17], [20, 20, 20, 20]
    ]
];
/**通过钻石奖励*/
DataBase.levelRewardDiamond = [
    [
        30, 40, 50, 60, 70, 80, 90
    ],
    [
        100, 110, 120, 130, 140, 150, 160
    ],
    [
        170, 180, 190, 200, 210, 220, 230
    ],
    [
        240, 250, 260, 270, 280, 290, 300
    ]
];
/**金币奖励*/
DataBase.levelFirstRewardCoin = [
    [
        100, 200, 300, 400, 500,
        600, 700
    ],
    [
        800, 900, 100, 1100, 1200,
        1300, 1400
    ],
    [
        1500, 1600, 1700, 1800, 1900,
        2000, 2100
    ],
    [
        2200, 2300, 2400, 2500, 2600,
        2700, 2800
    ]
];
/**
 * 商品价格
 */
DataBase.goodPrice = [20, 50, 360, 360, 720];
/**
 * 礼包价格
 * 神圣火焰  无双战神 战神觉醒 火力全开 战神觉醒
 */
DataBase.giftPrice = [360, 720, 360, 30, 60];
/**是否通关*/
DataBase.passLevel = [
    0, 0, 0, 0
];
/**技能数量
 * 觉醒 火力全开 能源
*/
DataBase.skill = [
    0, 0, 0
];
/**金币*/
DataBase.coin = 5000;
/**钻石*/
DataBase.diamond = 200;
/**战斗力*/
DataBase.power = 0;
//# sourceMappingURL=DataBase.js.map