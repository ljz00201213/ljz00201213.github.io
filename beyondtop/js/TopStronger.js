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
    var TopStronger = (function (_super) {
        __extends(TopStronger, _super);
        function TopStronger() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            _this.init();
            _this.ani1.play(0, true);
            return _this;
        }
        /**
         * 初始化界面
         */
        TopStronger.prototype.init = function () {
            beyondtop.JConfig.setInfo(this.info);
            // this.onKeyDown();
            // 初始化选中框的位置
            this.initChoosePos();
        };
        TopStronger.prototype.initChoosePos = function () {
            // 初始化gift界面
            // 初始化礼包显示
            this.gift.visible = false;
            if (DataBase.lock[9] == -1) {
                var gift = this.gift;
                var t = this;
                gift.scale(0, 0);
                Laya.Tween.to(gift, {
                    scaleX: 1,
                    scaleY: 1
                }, 500, null, Laya.Handler.create(this, function () {
                    t.onKeyDown();
                }));
                gift.visible = true;
                gift.gift_choose_sure.visible = true;
                gift.gift_choose_cancel.visible = false;
                gift.gift_des.skin = "game/frame_des_wake.png";
                gift.gift.skin = "game/frame_gift_wake.png";
                if (gift.gift_des.x == 160)
                    gift.gift_des.x -= 15, gift.gift_des.y += 5;
                beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.giftPrice[0], [gift.money2, gift.money1, gift.money0]);
            }
            this.choose.x = TopStronger.CHOOSE_X;
            this.e0.scaleY = 1.4, this.e0.scaleX = 1.3;
            this.e1.scaleY = 1.3, this.e1.scaleX = 1.2;
            this.e2.scaleY = 1.3, this.e2.scaleX = 1.2;
            this.e3.scaleY = 1.3, this.e3.scaleX = 1.2;
            this.b0.scaleY = 1.4, this.b0.scaleX = 1.3;
            this.b1.scaleY = 1.3, this.b1.scaleX = 1.2;
            this.b2.scaleY = 1.3, this.b2.scaleX = 1.2;
            this.b3.scaleY = 1.3, this.b3.scaleX = 1.2;
            this.slevel0.pos(113, 229);
            this.slevel1.pos(348, 244);
            this.slevel2.pos(578, 244);
            this.slevel3.pos(808, 244);
            this.level_soul.pos(100, 222);
            this.level_fight.pos(334, 237);
            this.level_defence.pos(564, 237);
            this.level_emitter.pos(795, 237);
            // 初始化战魂数据位置
            this.attack_g.y = this.attack_s.y = this.attack_p.y = 488, this.defence_g.y = this.defence_s.y = this.defence_p.y = 517, this.lp0.y = this.lp1.y = this.lp2.y = this.lp3.y = 548, this.fee_soul0.y = this.fee_soul1.y = 590;
            // 初始化战斗环数据位置
            this.fight0.y = this.fight1.y = this.fight2.y = 509, this.fee_fight0.y = this.fee_fight1.y = this.fee_fight2.y = this.fee_fight3.y = this.fee_fight4.y = 577;
            // 初始化守护环数据位置
            this.defence0.y = this.defence1.y = this.defence2.y = 509, this.fee_defence0.y = this.fee_defence1.y = this.fee_defence2.y = this.fee_defence3.y = this.fee_defence4.y = 577;
            // 初始化发射器数据位置
            this.emitterD_b.y = this.emitterD_g.y = this.emitterD_p.y = this.emitterD_s.y = 525, this.emitterU_g.y = this.emitterU_p.y = this.emitterU_s.y = 492, this.fee_emitter0.y = this.fee_emitter1.y = 575;
            this.setSoulData(DataBase.powerLevel[0]);
            this.setFightData(DataBase.powerLevel[1]);
            this.setDefenceData(DataBase.powerLevel[2]);
            this.setEmitterData(DataBase.powerLevel[3]);
            this.e0.x = 193;
        };
        /**
         * 设置战魂数据
         */
        TopStronger.prototype.setSoulData = function (level) {
            // 设置当前级别
            this.level_soul.skin = "game/strong_s" + level + ".png";
            if (level < 10 && this.level_soul.x < 107)
                this.level_soul.x += 7;
            else if (level >= 10 && this.level_soul.x >= 107)
                this.level_soul.x -= 7;
            level -= 1;
            // 设置攻击值和防御值
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenSoul[level], [this.attack_g, this.attack_s]);
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenSoul[level], [this.defence_g, this.defence_s]);
            // 设置生命值
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.soulBoold[level], [this.lp3, this.lp2, this.lp1, this.lp0]);
            // 设置升级需要花费的钻石
            beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.soulUp[level], [this.fee_soul1, this.fee_soul0]);
        };
        /**
         * 设置战斗环数据
         */
        TopStronger.prototype.setFightData = function (level) {
            // 设置当前级别
            this.level_fight.skin = "game/strong_s" + level + ".png";
            if (level < 10 && this.level_fight.x < 336)
                this.level_fight.x += 7;
            else if (level >= 10 && this.level_fight.x >= 336)
                this.level_fight.x -= 7;
            level -= 1;
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenFight[level], [this.fight2, this.fight1, this.fight0]);
            var value = DataBase.fightUp[level];
            beyondtop.JConfig.setNumber("game/num_coin_0", value, [this.fee_fight4, this.fee_fight3, this.fee_fight2, this.fee_fight1, this.fee_fight0]);
            this.fee_fight1.x = 434, this.fee_fight2.x = 447, this.fee_fight3.x = 460, this.fee_fight4.x = 473;
            if (value < 1000)
                this.fee_fight2.x = 421, this.fee_fight3.x = 434, this.fee_fight4.x = 447;
            else if (value < 10000)
                this.fee_fight1.x = 421, this.fee_fight2.x = 434, this.fee_fight3.x = 447, this.fee_fight4.x = 460;
        };
        /**
         * 设置守护环数据
         */
        TopStronger.prototype.setDefenceData = function (level) {
            // 设置当前级别
            this.level_defence.skin = "game/strong_s" + level + ".png";
            if (level < 10 && this.level_defence.x < 566)
                this.level_defence.x += 7;
            else if (level >= 10 && this.level_defence.x >= 566)
                this.level_defence.x -= 7;
            level -= 1;
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenDefence[level], [this.defence2, this.defence1, this.defence0]);
            var value = DataBase.defenseUp[level];
            beyondtop.JConfig.setNumber("game/num_coin_0", value, [this.fee_defence4, this.fee_defence3, this.fee_defence2, this.fee_defence1, this.fee_defence0]);
            this.fee_defence1.x = 663, this.fee_defence2.x = 676, this.fee_defence3.x = 689, this.fee_defence4.x = 702;
            if (value < 1000)
                this.fee_defence2.x = 650, this.fee_defence3.x = 663, this.fee_defence4.x = 676;
            else if (value < 10000)
                this.fee_defence1.x = 650, this.fee_defence2.x = 663, this.fee_defence3.x = 676, this.fee_defence4.x = 689;
        };
        /**
         * 设置发射器数据
         */
        TopStronger.prototype.setEmitterData = function (level) {
            // 设置当前级别
            this.level_emitter.skin = "game/strong_s" + level + ".png";
            if (level < 10 && this.level_emitter.x < 797)
                this.level_emitter.x += 7;
            else if (level >= 10 && this.level_emitter.x >= 797)
                this.level_emitter.x -= 7;
            level -= 1;
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenEmitterAttack[level][0], [this.emitterU_g, this.emitterU_s]);
            beyondtop.JConfig.setNumber("game/num_strong_0", DataBase.strengthenEmitterAttack[level][1], [this.emitterD_g, this.emitterD_s, this.emitterD_b]);
            // 设置升级需要花费的钻石
            beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.emitterUp[level], [this.fee_emitter1, this.fee_emitter0]);
        };
        /**
         * 设置强化效果
         */
        TopStronger.prototype.setStrongerData = function (x) {
            var fightup, which;
            if (x == TopStronger.FIGHTUP_X)
                fightup = 800, which = 0;
            else if (x == TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 3)
                fightup = 790, which = 3;
            else if (x == TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 2)
                which = 2, fightup = 400;
            else
                fightup = 400, which = 1;
            var level = DataBase.powerLevel[which];
            // 判断是否升级完成
            if (DataBase.powerLevel[which] == 20) {
                // 无需升级
                this.upcomplete.play(0, false);
            }
            else {
                level -= 1;
                var fee;
                if (which == 0)
                    fee = DataBase.soulUp[level];
                else if (which == 1)
                    fee = DataBase.fightUp[level];
                else if (which == 2)
                    fee = DataBase.defenseUp[level];
                else
                    fee = DataBase.emitterUp[level];
                // 判断是否有足够的coin购买升级
                if (fee < 100 && DataBase.diamond < fee) {
                    // 钻石不足
                    this.out_of_diamond.play(0, false);
                }
                else if (fee > 100 && DataBase.coin < fee) {
                    // 金币不足
                    this.out_of_coin.play(0, false);
                }
                else {
                    // 可以升级
                    if (fee < 100)
                        DataBase.diamond -= fee;
                    else
                        DataBase.coin -= fee;
                    this.fightup.visible = true;
                    this.fightup.x = x;
                    // 设置增加的战斗力
                    beyondtop.JConfig.setNumber("game/num_red_", fightup, [this.fightup.up2, this.fightup.up1, this.fightup.up0]);
                    this.fightup.ani1.play(0, false);
                    // 设置info信息
                    beyondtop.JConfig.setInfo(this.info);
                    // 设置升级
                    DataBase.powerLevel[which] += 1;
                    // 设置数据更新
                    level += 2;
                    if (which == 0)
                        this.setSoulData(level);
                    else if (which == 1)
                        this.setFightData(level);
                    else if (which == 2)
                        this.setDefenceData(level);
                    else
                        this.setEmitterData(level);
                }
            }
        };
        /**
         * 按键监听
         */
        TopStronger.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.LEFT:
                        t.buyGift(beyondtop.JConfig.LEFT);
                        if (t.gift.visible)
                            return;
                        t.setChoosePos(t.choose.x, false);
                        break;
                    case beyondtop.JConfig.RIGHT:
                        t.buyGift(beyondtop.JConfig.RIGHT);
                        if (t.gift.visible)
                            return;
                        t.setChoosePos(t.choose.x, true);
                        break;
                    case beyondtop.JConfig.ENTER:
                        if (t.gift.visible)
                            t.buyGift(beyondtop.JConfig.ENTER);
                        else
                            t.setStrongerData(t.fightup.x);
                        break;
                    case beyondtop.JConfig.UP:
                        // 返回上一界面
                        t.flag = 4;
                        break;
                }
            };
        };
        /**
        * 设置礼包购买
        */
        TopStronger.prototype.buyGift = function (keycode) {
            var gift = this.gift;
            if (gift.visible) {
                if (keycode == beyondtop.JConfig.LEFT || keycode == beyondtop.JConfig.RIGHT) {
                    if (gift.gift_choose_cancel.visible)
                        gift.gift_choose_cancel.visible = false, gift.gift_choose_sure.visible = true;
                    else if (gift.gift_choose_sure.visible)
                        gift.gift_choose_cancel.visible = true, gift.gift_choose_sure.visible = false;
                }
                else if (keycode == beyondtop.JConfig.ENTER) {
                    if (!gift.gift_choose_cancel.visible) {
                        var fee = DataBase.giftPrice[1];
                        if (fee > DataBase.diamond)
                            this.out_of_diamond.play(0, false);
                        else {
                            DataBase.diamond -= fee;
                            beyondtop.JConfig.setInfo(this.info);
                            DataBase.diamond += 128, DataBase.coin += 4000, DataBase.lock[9] = 0;
                            this.buy.play(0, false);
                            this.gift.visible = false;
                        }
                    }
                    else {
                        this.gift.visible = false;
                    }
                }
            }
        };
        /**
         * 设置选中框移动
         */
        TopStronger.prototype.setChoosePos = function (pos, key) {
            var t = this;
            if (key) {
                if (pos < TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X * 3) {
                    this.choose.x += TopStronger.CHOOSE_OFF_X;
                    if (pos == TopStronger.CHOOSE_X)
                        t.setChooseScale(t.e0, t.e1, t.b0, t.b1, t.slevel0, t.slevel1, t.level_soul, t.level_fight), this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X;
                    else if (pos == TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e2, t.b1, t.b2, t.slevel1, t.slevel2, t.level_fight, t.level_defence), this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 2;
                    else if (pos == TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e3, t.b2, t.b3, t.slevel2, t.slevel3, t.level_defence, t.level_emitter), this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 3;
                }
                else {
                    this.choose.x = TopStronger.CHOOSE_X;
                    t.setChooseScale(t.e3, t.e0, t.b3, t.b0, t.slevel3, t.slevel0, t.level_emitter, t.level_soul);
                    this.fightup.x = TopStronger.FIGHTUP_X;
                }
            }
            else {
                if (pos > TopStronger.CHOOSE_X) {
                    this.choose.x -= TopStronger.CHOOSE_OFF_X;
                    if (pos == TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e0, t.b1, t.b0, t.slevel1, t.slevel0, t.level_fight, t.level_soul), this.fightup.x = TopStronger.FIGHTUP_X;
                    else if (pos == TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e1, t.b2, t.b1, t.slevel2, t.slevel1, t.level_defence, t.level_fight), this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X;
                    else if (pos == TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X * 3)
                        t.setChooseScale(t.e3, t.e2, t.b3, t.b2, t.slevel3, t.slevel2, t.level_emitter, t.level_defence), this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 2;
                }
                else {
                    this.choose.x = TopStronger.CHOOSE_X + TopStronger.CHOOSE_OFF_X * 3;
                    t.setChooseScale(t.e0, t.e3, t.b0, t.b3, t.slevel0, t.slevel3, t.level_soul, t.level_emitter);
                    this.fightup.x = TopStronger.FIGHTUP_X + TopStronger.CHOOSE_OFF_X * 3;
                }
            }
        };
        /**
         * 设置界面缩放
         */
        TopStronger.prototype.setChooseScale = function (e0, e1, b0, b1, slevel0, slevel1, level_value0, level_value1) {
            e0.scaleY = 1.3, e0.scaleX = 1.2;
            e1.scaleY = 1.4, e1.scaleX = 1.3;
            b0.scaleY = 1.3, b0.scaleX = 1.2;
            b1.scaleY = 1.4, b1.scaleX = 1.3;
            slevel1.pos(slevel1.x - 5, slevel1.y - 15);
            slevel0.pos(slevel0.x + 5, slevel0.y + 15);
            level_value1.pos(level_value1.x - 5, level_value1.y - 15);
            level_value0.pos(level_value0.x + 5, level_value0.y + 15);
            // 初始化战魂数据位置
            // 初始化战斗环数据位置
            // 初始化守护环数据位置
            // 初始化发射器数据位置
            if (e0 === this.e0) {
                this.attack_g.y = this.attack_s.y = this.attack_p.y = 483, this.defence_g.y = this.defence_s.y = this.defence_p.y = 512, this.lp0.y = this.lp1.y = this.lp2.y = this.lp3.y = 543, this.fee_soul0.y = this.fee_soul1.y = 580;
            }
            else if (e0 === this.e1) {
                this.fight0.y = this.fight1.y = this.fight2.y = 509, this.fee_fight0.y = this.fee_fight1.y = this.fee_fight2.y = this.fee_fight3.y = this.fee_fight4.y = 577;
            }
            else if (e0 === this.e2) {
                this.defence0.y = this.defence1.y = this.defence2.y = 509, this.fee_defence0.y = this.fee_defence1.y = this.fee_defence2.y = this.fee_defence3.y = this.fee_defence4.y = 577;
            }
            else if (e0 === this.e3) {
                this.emitterD_b.y = this.emitterD_g.y = this.emitterD_p.y = this.emitterD_s.y = 525, this.emitterU_g.y = this.emitterU_p.y = this.emitterU_s.y = 492, this.fee_emitter0.y = this.fee_emitter1.y = 575;
            }
            if (e1 === this.e0) {
                this.attack_g.y = this.attack_s.y = this.attack_p.y = 488, this.defence_g.y = this.defence_s.y = this.defence_p.y = 517, this.lp0.y = this.lp1.y = this.lp2.y = this.lp3.y = 548, this.fee_soul0.y = this.fee_soul1.y = 590;
            }
            else if (e1 === this.e1) {
                this.fight0.y = this.fight1.y = this.fight2.y = 514, this.fee_fight0.y = this.fee_fight1.y = this.fee_fight2.y = this.fee_fight3.y = this.fee_fight4.y = 587;
            }
            else if (e1 === this.e2) {
                this.defence0.y = this.defence1.y = this.defence2.y = 514, this.fee_defence0.y = this.fee_defence1.y = this.fee_defence2.y = this.fee_defence3.y = this.fee_defence4.y = 587;
            }
            else if (e1 === this.e3) {
                this.emitterD_b.y = this.emitterD_g.y = this.emitterD_p.y = this.emitterD_s.y = 530, this.emitterU_g.y = this.emitterU_p.y = this.emitterU_s.y = 497, this.fee_emitter0.y = this.fee_emitter1.y = 585;
            }
        };
        return TopStronger;
    }(ui.TopStrongerUI));
    /**
     * 记录选中框的初始位置
     */
    TopStronger.CHOOSE_X = 205;
    // 强化效果的初始位置
    TopStronger.FIGHTUP_X = 135;
    TopStronger.CHOOSE_OFF_X = 230;
    beyondtop.TopStronger = TopStronger;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=TopStronger.js.map