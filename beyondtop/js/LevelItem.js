var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var beyondtop;
(function (beyondtop) {
    var LevelItem = (function (_super) {
        __extends(LevelItem, _super);
        function LevelItem(flag) {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            // item位置数组
            _this.itemPosArr = [];
            _this.init(flag);
            _this.ani1.play(0, true);
            return _this;
        }
        /**
       * 初始化界面操作
       */
        LevelItem.prototype.init = function (flag) {
            beyondtop.JConfig.setInfo(this.info);
            LevelItem.FLAG = flag;
            // 初始化选中框的位置
            this.initChoosePos();
            this.onKeyDown();
        };
        /**
         * 初始化界面
         */
        LevelItem.prototype.initChoosePos = function () {
            //获取关卡描述
            this.des.skin = "game/level_des" + LevelItem.FLAG + ".png";
            // 设置背景
            this.bg.skin = "game/level_bg" + LevelItem.FLAG + ".png";
            this.item0.level_name.skin = this.item1.level_name.skin = this.item2.level_name.skin = this.item3.level_name.skin = "game/level_name" + LevelItem.FLAG + ".png";
            // 根据数据设置item数组位置
            var pos = DataBase.passLevel[LevelItem.FLAG];
            this.itemPosArr = [0, 1, 2, 3];
            if (pos > 3) {
                this.itemPosArr = [pos - 3, pos - 2, pos - 1, pos];
            }
            // 根据敌方出战陀螺设置关卡背景
            var enemyArr = DataBase.levelEnemyId[LevelItem.FLAG];
            this.item0.level_enemy.skin = "game/level_enemy" + enemyArr[this.itemPosArr[0]][0] + ".png";
            this.item1.level_enemy.skin = "game/level_enemy" + enemyArr[this.itemPosArr[1]][0] + ".png";
            this.item2.level_enemy.skin = "game/level_enemy" + enemyArr[this.itemPosArr[2]][0] + ".png";
            this.item3.level_enemy.skin = "game/level_enemy" + enemyArr[this.itemPosArr[3]][0] + ".png";
            //  根据当前通关关数设置选中信息
            if (pos < 3)
                this.choose.x = LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * pos;
            else
                this.choose.x = LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 3;
            /**
             * 设置装换界面产生的初始化问题
             */
            this.item0.level_lock.visible = true;
            this.item1.level_lock.visible = true;
            this.item2.level_lock.visible = true;
            this.item3.level_lock.visible = true;
            this.setRewardNoSee(this.item0, true, "game/pass_f.png");
            this.setRewardNoSee(this.item1, true, "game/pass_f.png");
            this.setRewardNoSee(this.item2, true, "game/pass_f.png");
            this.setRewardNoSee(this.item3, true, "game/pass_f.png");
            this.setItemContent(this.choose.x);
        };
        /**
         * 设置item的内容
         */
        LevelItem.prototype.setItemContent = function (chooseX) {
            // 根据位置初始化
            var path;
            if (LevelItem.FLAG == 0)
                path = "level_item0_";
            else if (LevelItem.FLAG == 1)
                path = "level_item1_";
            else if (LevelItem.FLAG == 2)
                path = "level_item2_";
            else if (LevelItem.FLAG == 3)
                path = "level_item3_";
            this.item0.level_which.skin = "game/num_" + path + (this.itemPosArr[0] + 1) + ".png";
            this.item1.level_which.skin = "game/num_" + path + (this.itemPosArr[1] + 1) + ".png";
            this.item2.level_which.skin = "game/num_" + path + (this.itemPosArr[2] + 1) + ".png";
            this.item3.level_which.skin = "game/num_" + path + (this.itemPosArr[3] + 1) + ".png";
            var pos = DataBase.passLevel[LevelItem.FLAG];
            var reward = DataBase.levelRewardDiamond[LevelItem.FLAG];
            var item0 = this.item0, item1 = this.item1, item2 = this.item2, item3 = this.item3;
            if (chooseX == LevelItem.CHOOSE_X) {
                item0.scaleY = 1.1, item1.scaleY = item2.scaleY = item3.scaleY = 1, item0.level_lock.visible = false;
                // 设置通关奖励情况
                if (pos == 0) {
                    this.rewardType(reward[this.itemPosArr[0]], item0);
                    this.rewardType(reward[this.itemPosArr[1]], item1);
                    this.rewardType(reward[this.itemPosArr[2]], item2);
                    this.rewardType(reward[this.itemPosArr[3]], item3);
                }
                else if (pos == 1) {
                    this.setRewardNoSee(item0, false, "game/pass.png");
                    this.rewardType(reward[this.itemPosArr[1]], item1);
                    this.rewardType(reward[this.itemPosArr[2]], item2);
                    this.rewardType(reward[this.itemPosArr[3]], item3);
                }
                else if (pos == 2) {
                    this.setRewardNoSee(item0, false, "game/pass.png");
                    this.setRewardNoSee(item1, false, "game/pass.png");
                    this.rewardType(reward[this.itemPosArr[2]], item2);
                    this.rewardType(reward[this.itemPosArr[3]], item3);
                }
                else if (pos >= 3) {
                    this.setRewardNoSee(item0, false, "game/pass.png");
                    this.setRewardNoSee(item1, false, "game/pass.png");
                    this.setRewardNoSee(item2, false, "game/pass.png");
                    // 如果是最后一个 设置通关奖励
                    if (pos == this.itemPosArr[3])
                        this.rewardType(reward[this.itemPosArr[3]], item3);
                    else
                        this.setRewardNoSee(item3, false, "game/pass.png");
                }
                // else {
                //     this.rewardType(reward[this.itemPosArr[3]], item3)
                //     this.setRewardNoSee(item0, false, "game/pass.png"); this.setRewardNoSee(item1, false, "game/pass.png"); this.setRewardNoSee(item2, false, "game/pass.png"); this.setRewardNoSee(item3, false, "game/pass.png");
                // }
            }
            else if (chooseX == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X) {
                item1.scaleY = 1.1, item0.scaleY = item2.scaleY = item3.scaleY = 1, item0.level_lock.visible = false, item1.level_lock.visible = false;
            }
            else if (chooseX == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 2) {
                item2.scaleY = 1.1, item1.scaleY = item0.scaleY = item3.scaleY = 1, item0.level_lock.visible = false, item1.level_lock.visible = false, item2.level_lock.visible = false;
            }
            else if (chooseX == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 3) {
                item3.scaleY = 1.1, item1.scaleY = item2.scaleY = item0.scaleY = 1, item0.level_lock.visible = false, item1.level_lock.visible = false, item2.level_lock.visible = false, item3.level_lock.visible = false;
                // 设置通关奖励情况
                this.setRewardNoSee(item0, false, "game/pass.png");
                this.setRewardNoSee(item1, false, "game/pass.png");
                this.setRewardNoSee(item2, false, "game/pass.png");
                // 如果不是最后一个,则认为过关 否则 设置通关奖励
                if (pos != this.itemPosArr[3])
                    this.setRewardNoSee(item3, false, "game/pass.png");
                else
                    this.setRewardNoSee(item3, true, "game/pass_f.png"), this.rewardType(reward[this.itemPosArr[3]], item3);
            }
        };
        /**
         * 判断奖励是金币还是钻石, 斌进行设置
         */
        LevelItem.prototype.rewardType = function (value, item) {
            // item.level_prize_2.x = 72, item.level_prize_3.x = 83, item.level_prize_4.x = 94;
            // if (value < 100 || value == 300) {
            //     // 钻石
            //     // if (value < 100) item.level_prize_2.x = 61, item.level_prize_3.x = 72, item.level_prize_4.x = 84;
            //     item.level_prize_type.skin = "game/diamond.png"
            // }
            beyondtop.JConfig.setNumber("game/num_coin_0", value, [item.level_prize_2, item.level_prize_1, item.level_prize_0]);
        };
        /**
         * 设置奖励不可见
         */
        LevelItem.prototype.setRewardNoSee = function (item, see, path) {
            item.level_prize.skin = path;
            item.level_prize.y = path == "game/pass.png" ? 213 : 202;
            item.level_prize_type.visible = see;
            item.level_prize_0.visible = see;
            item.level_prize_1.visible = see;
            item.level_prize_2.visible = see;
        };
        /**
         * 键盘监听
         */
        LevelItem.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.LEFT:
                        t.setChoosePos(t.choose.x, false);
                        break;
                    case beyondtop.JConfig.RIGHT:
                        t.setChoosePos(t.choose.x, true);
                        break;
                    case beyondtop.JConfig.ENTER:
                        if (t.choose.x == LevelItem.CHOOSE_X)
                            t.flag = t.itemPosArr[0];
                        else if (t.choose.x == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X)
                            t.flag = t.itemPosArr[1];
                        else if (t.choose.x == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 2)
                            t.flag = t.itemPosArr[2];
                        else if (t.choose.x == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 3)
                            t.flag = t.itemPosArr[3];
                        break;
                    case beyondtop.JConfig.UP:
                        // 返回上一界面
                        t.flag = 7;
                        break;
                }
            };
        };
        /**
        * 设置选择框的位置
        * key true  left
        */
        LevelItem.prototype.setChoosePos = function (pos, key) {
            var t = this;
            if (key) {
                var level = DataBase.passLevel[LevelItem.FLAG];
                if (pos < LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 3) {
                    if ((level == 0 && this.choose.x == LevelItem.CHOOSE_X) || (level == 1 && this.choose.x == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X) || (level == 2 && this.choose.x == LevelItem.CHOOSE_X + LevelItem.CHOOSE_OFF_X * 2))
                        return;
                    this.choose.x += LevelItem.CHOOSE_OFF_X;
                }
                else {
                    if (level > t.itemPosArr[3]) {
                        for (var i = 0; i < t.itemPosArr.length; i++)
                            t.itemPosArr[i] += 1;
                    }
                }
            }
            else {
                if (pos > LevelItem.CHOOSE_X) {
                    this.choose.x -= LevelItem.CHOOSE_OFF_X;
                }
                else {
                    if (t.itemPosArr[0] > 0) {
                        for (var i = 0; i < t.itemPosArr.length; i++)
                            t.itemPosArr[i] -= 1;
                    }
                }
            }
            // 位置变化重新设置内容
            this.setItemContent(this.choose.x);
        };
        return LevelItem;
    }(ui.levelchooseUI));
    // 选中框的初始x坐标
    LevelItem.CHOOSE_X = 187;
    // 选中框的x坐标偏移
    LevelItem.CHOOSE_OFF_X = 260;
    beyondtop.LevelItem = LevelItem;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=LevelItem.js.map