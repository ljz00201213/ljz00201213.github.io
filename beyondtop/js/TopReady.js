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
    var TopReady = (function (_super) {
        __extends(TopReady, _super);
        function TopReady() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            _this.init();
            return _this;
        }
        TopReady.prototype.init = function () {
            if (!this.value_star) {
                this.value_star = new Laya.Sprite;
                this.addChild(this.value_star);
                this.value_star.pos(254, 281);
                this.value_star_tex = Laya.loader.getRes("game/level_star.png");
                this.value_star.graphics.drawTexture(this.value_star_tex);
            }
            beyondtop.JConfig.setInfo(this.info);
            this.initTopPos();
        };
        TopReady.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.LEFT:
                        t.buyGift(beyondtop.JConfig.LEFT);
                        if (t.choose_begin.visible || t.gift.visible)
                            return;
                        if (t.choose.x == TopReady.CHOOSE_X1) {
                            t.choose.x = TopReady.CHOOSE_X0;
                        }
                        else
                            t.setTopPosMove(false);
                        t.setTopPos(TopReady.TOP_POS);
                        break;
                    case beyondtop.JConfig.RIGHT:
                        t.buyGift(beyondtop.JConfig.RIGHT);
                        if (t.choose_begin.visible || t.gift.visible)
                            return;
                        if (t.choose.x == TopReady.CHOOSE_X0) {
                            t.choose.x = TopReady.CHOOSE_X1;
                        }
                        else
                            t.setTopPosMove(true);
                        t.setTopPos(TopReady.TOP_POS);
                        break;
                    case beyondtop.JConfig.ENTER:
                        if (t.gift.visible)
                            t.buyGift(beyondtop.JConfig.ENTER);
                        else
                            t.setChoose();
                        break;
                    case beyondtop.JConfig.DOWN:
                        if (t.gift.visible)
                            return;
                        if (t.choose_begin.visible) {
                            t.choose.visible = true;
                            t.choose_begin.visible = false;
                            t.choose.x = TopReady.CHOOSE_X0;
                            t.setTopPos(TopReady.TOP_POS);
                        }
                        else {
                            t.choose.visible = false;
                            t.choose_begin.visible = true;
                        }
                        break;
                    case beyondtop.JConfig.UP:
                        if (t.choose_begin.visible) {
                            t.choose.visible = true;
                            t.choose_begin.visible = false;
                            t.choose.x = TopReady.CHOOSE_X0;
                            t.setTopPos(TopReady.TOP_POS);
                        }
                        else
                            // 返回上一界面
                            t.flag = 4;
                        break;
                }
            };
        };
        /**
         * 设置礼包购买
         */
        TopReady.prototype.buyGift = function (keycode) {
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
                        var fee = DataBase.giftPrice[2];
                        if (fee > DataBase.diamond)
                            this.out_of_diamond.play(0, false);
                        else {
                            DataBase.diamond -= fee;
                            beyondtop.JConfig.setInfo(this.info);
                            DataBase.skill[0] += 1, DataBase.skill[1] += 1, DataBase.skill[2] += 1;
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
        * 设置选择购买陀螺
        */
        TopReady.prototype.setChoose = function () {
            if (this.choose_begin.visible) {
                if (!this.top_ready1.visible) {
                    // 请选择出战陀螺
                    this.non_of_top.play(0, false);
                }
                else {
                    // 进入游戏界面
                    this.flag = 0;
                }
            }
            else {
                if (DataBase.lock[TopReady.CURRENT] == -1) {
                    // 未解锁 
                    // 判断是否有足够金币购买
                    var fee = DataBase.topPrice[TopReady.CURRENT];
                    if (fee < 1000 && DataBase.diamond < fee) {
                        this.out_of_diamond.play(0, false);
                    }
                    else if (DataBase.coin < fee) {
                        this.out_of_coin.play(0, false);
                    }
                    else {
                        if (fee < 1000)
                            DataBase.diamond -= fee, beyondtop.JConfig.setData(beyondtop.JConfig.DIAMOND, DataBase.diamond);
                        else
                            DataBase.coin -= fee, beyondtop.JConfig.setData(beyondtop.JConfig.COIN, DataBase.coin);
                        // 设置陀螺解锁
                        DataBase.lock[TopReady.CURRENT] = 0;
                        beyondtop.JConfig.setInfo(this.info);
                        this.buy.play(0, false);
                        if (this.choose.x == TopReady.CHOOSE_X0) {
                            // 解锁
                            this.top0_money.visible = false;
                            this.top0_money0.visible = false;
                            this.top0_money1.visible = false;
                            this.top0_money2.visible = false;
                            this.top0_money3.visible = false;
                            this.top0_money4.visible = false;
                        }
                        else {
                            this.top1_money.visible = false;
                            this.top1_money0.visible = false;
                            this.top1_money1.visible = false;
                            this.top1_money2.visible = false;
                            this.top1_money3.visible = false;
                            this.top1_money4.visible = false;
                        }
                    }
                }
                else {
                    if (!this.choose.visible)
                        return;
                    // 设置准备陀螺的添加顺序
                    var aimX, aimY;
                    if (TopReady.TOP_READY.length == 1)
                        aimX = 267, aimY = 533;
                    else if (TopReady.TOP_READY.length == 2)
                        aimX = 393, aimY = 529;
                    else if (TopReady.TOP_READY[0])
                        aimX = 393, aimY = 529;
                    else
                        aimX = 267, aimY = 533;
                    if (this.choose.x == TopReady.CHOOSE_X0) {
                        // 如果已经添加,则不重复添加
                        if (TopReady.TOP_POS[0] == TopReady.TOP_READY[1] || TopReady.TOP_POS[0] == TopReady.TOP_READY[2])
                            return;
                        this.top_fly.pos(690, 461), this.top_fly.skin = "game/top" + TopReady.TOP_POS[0] + ".png";
                        if (TopReady.TOP_READY.length < 3)
                            TopReady.TOP_READY.push(TopReady.TOP_POS[0]);
                        else if (TopReady.TOP_READY[0])
                            TopReady.TOP_READY[2] = TopReady.TOP_POS[0], TopReady.TOP_READY[0] = false;
                        else
                            TopReady.TOP_READY[1] = TopReady.TOP_POS[0], TopReady.TOP_READY[0] = true;
                    }
                    else {
                        // 如果已经添加,则不重复添加
                        if (TopReady.TOP_POS[1] == TopReady.TOP_READY[1] || TopReady.TOP_POS[1] == TopReady.TOP_READY[2])
                            return;
                        this.top_fly.pos(818, 461), this.top_fly.skin = "game/top" + TopReady.TOP_POS[1] + ".png";
                        if (TopReady.TOP_READY.length < 3)
                            TopReady.TOP_READY.push(TopReady.TOP_POS[1]);
                        else if (TopReady.TOP_READY[0])
                            TopReady.TOP_READY[2] = TopReady.TOP_POS[1], TopReady.TOP_READY[0] = false;
                        else
                            TopReady.TOP_READY[1] = TopReady.TOP_POS[1], TopReady.TOP_READY[0] = true;
                    }
                    this.top_fly.visible = true;
                    this.ani1.play(0, true);
                    var t = this;
                    Laya.Tween.to(this.top_fly, {
                        x: aimX,
                        y: aimY
                    }, 300, null, Laya.Handler.create(this, function () {
                        t.top_fly.visible = false;
                        if (aimX == 267)
                            t.top_ready0.visible = true, t.top_ready0.skin = t.top_fly.skin;
                        else
                            t.top_ready1.visible = true, t.top_ready1.skin = t.top_fly.skin;
                    }));
                }
            }
        };
        /**
         * 设置陀螺位置移动
         */
        TopReady.prototype.setTopPosMove = function (direct) {
            var len = TopReady.TOP_POS.length;
            if (direct) {
                for (var i = 0; i < len; i++) {
                    if (i < len - 1)
                        TopReady.TOP_POS[i] = TopReady.TOP_POS[i + 1];
                    else {
                        TopReady.TOP_POS[i] += 1;
                        if (TopReady.TOP_POS[i] == 11)
                            TopReady.TOP_POS[i] = 0;
                    }
                }
            }
            else {
                for (var i = len - 1; i > -1; i--) {
                    if (i > 0)
                        TopReady.TOP_POS[i] = TopReady.TOP_POS[i - 1];
                    else {
                        TopReady.TOP_POS[i] -= 1;
                        if (TopReady.TOP_POS[i] == -1)
                            TopReady.TOP_POS[i] = 10;
                    }
                }
            }
            // this.setTopPos(TopReady.TOP_POS);
        };
        /**
        * 初始化陀螺位置
        */
        TopReady.prototype.initTopPos = function () {
            // 初始化选中陀螺位置
            // 设置开始游戏选中框不可见
            // 设置陀螺选择框在第一个陀螺上
            this.choose.x = TopReady.CHOOSE_X0;
            this.choose_begin.visible = false;
            this.choose.visible = true;
            TopReady.TOP_POS = [0, 1];
            TopReady.TOP_READY = [false];
            this.top_ready0.visible = this.top_ready1.visible = false;
            // 设置礼包界面显示
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
            beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.giftPrice[2], [gift.money2, gift.money1, gift.money0]);
            // 初始化界面陀螺显示
            this.setTopPos(TopReady.TOP_POS);
        };
        /**
         * 设置陀螺位置
         */
        TopReady.prototype.setTopPos = function (poses) {
            this.choose_top0.skin = "game/top" + poses[0] + ".png";
            this.choose_top1.skin = "game/top" + poses[1] + ".png";
            //设置当前选中陀螺的信息
            if (this.choose.x == TopReady.CHOOSE_X0)
                TopReady.CURRENT = poses[0];
            else
                TopReady.CURRENT = poses[1];
            var attack = DataBase.topProperty[TopReady.CURRENT][0];
            if (attack > 500)
                attack = 500;
            var defence = DataBase.topProperty[TopReady.CURRENT][1];
            var lp = DataBase.topProperty[TopReady.CURRENT][2];
            if (lp > 8000)
                lp = 8000;
            var value_attack = DataBase.topProperty[TopReady.CURRENT][3];
            this.ready_lp.scaleX = lp / 8000;
            this.ready_attack.scaleX = attack / 500;
            this.ready_defence.scaleX = defence / 500;
            this.topskill.skin = "game/topskill0" + TopReady.CURRENT + ".png";
            //设置攻击数值
            beyondtop.JConfig.setNumber("game/num_red_", value_attack, [this.value_attack3, this.value_attack2, this.value_attack1, this.value_attack0]);
            this.value_attack3.x = 402, this.value_attack2.x = 383, this.value_attack1.x = 363, this.value_attack0.x = 345;
            if (value_attack >= 1000) {
                this.value_attack3.x += 10, this.value_attack2.x += 10, this.value_attack1.x += 10, this.value_attack0.x += 10;
            }
            // 设置陀螺的星数
            this.value_star.graphics.clear();
            this.value_star.graphics.drawTexture(Laya.Texture.createFromTexture(this.value_star_tex, 0, 0, 124 * DataBase.topStar[TopReady.CURRENT] / 10, 23));
            // 判断陀螺是否有被动技能
            // 初始化位置
            this.topskill.y = TopReady.topskillY;
            this.des_attack.y = TopReady.des_attackY;
            this.value_attack0.y = TopReady.value_attackY;
            this.value_attack1.y = TopReady.value_attackY;
            this.value_attack2.y = TopReady.value_attackY;
            this.value_attack3.y = TopReady.value_attackY;
            if (TopReady.CURRENT > 5) {
                this.bskill0.skin = "game/bskill" + (TopReady.CURRENT - 6) + ".png";
                this.des_skill.skin = "game/des_attack" + (TopReady.CURRENT - 6) + ".png";
                this.bskill0.visible = true;
                this.bskill1.visible = true;
                this.des_skill.visible = true;
            }
            else {
                this.bskill0.visible = false;
                this.bskill1.visible = false;
                this.des_skill.visible = false;
                this.topskill.y += TopReady.move_OFF_Y;
                this.des_attack.y += TopReady.move_OFF_Y;
                this.value_attack0.y += TopReady.move_OFF_Y;
                this.value_attack1.y += TopReady.move_OFF_Y;
                this.value_attack2.y += TopReady.move_OFF_Y;
                this.value_attack3.y += TopReady.move_OFF_Y;
            }
            //判断陀螺是否解锁
            if (DataBase.lock[poses[0]] == -1) {
                // 未解锁
                this.top0_money.visible = true;
                // 解锁花费
                this.top0_money0.x = 667, this.top0_money1.x = 680, this.top0_money2.x = 693, this.top0_money3.x = 706, this.top0_money4.x = 719;
                var fee = DataBase.topPrice[poses[0]];
                if (fee < 1000) {
                    this.top0_money.skin = "game/diamond.png",
                        this.top0_money2.x = 680,
                        this.top0_money3.x = 693,
                        this.top0_money4.x = 706;
                }
                else {
                    this.top0_money.skin = "game/coin.png";
                    if (fee < 10000) {
                        this.top0_money1.x = 670, this.top0_money2.x = 683, this.top0_money3.x = 696, this.top0_money4.x = 709;
                    }
                }
                beyondtop.JConfig.setNumber("game/num_coin_0", fee, [this.top0_money4, this.top0_money3, this.top0_money2, this.top0_money1, this.top0_money0]);
            }
            else {
                // 解锁
                this.top0_money.visible = false;
                this.top0_money0.visible = false;
                this.top0_money1.visible = false;
                this.top0_money2.visible = false;
                this.top0_money3.visible = false;
                this.top0_money4.visible = false;
            }
            if (DataBase.lock[poses[1]] == -1) {
                // 未解锁
                this.top1_money.visible = true;
                // 解锁花费
                this.top1_money0.x = 798, this.top1_money1.x = 811, this.top1_money2.x = 824, this.top1_money3.x = 837, this.top1_money4.x = 850;
                var fee = DataBase.topPrice[poses[1]];
                if (fee < 1000) {
                    this.top1_money.skin = "game/diamond.png",
                        this.top1_money2.x = 811,
                        this.top1_money3.x = 824,
                        this.top1_money4.x = 837;
                }
                else {
                    this.top1_money.skin = "game/coin.png";
                    if (fee < 10000) {
                        this.top1_money1.x = 803, this.top1_money2.x = 816, this.top1_money3.x = 829, this.top1_money4.x = 842;
                    }
                }
                beyondtop.JConfig.setNumber("game/num_coin_0", fee, [this.top1_money4, this.top1_money3, this.top1_money2, this.top1_money1, this.top1_money0]);
            }
            else {
                // 解锁
                this.top1_money.visible = false;
                this.top1_money0.visible = false;
                this.top1_money1.visible = false;
                this.top1_money2.visible = false;
                this.top1_money3.visible = false;
                this.top1_money4.visible = false;
            }
        };
        return TopReady;
    }(ui.readyUI));
    /**
     * 记录初始位置
     */
    TopReady.topskillY = 310;
    TopReady.des_attackY = 313;
    TopReady.value_attackY = 329;
    TopReady.move_OFF_Y = 50;
    /** 记录陀螺位置数组*/
    TopReady.TOP_POS = [];
    // 当前陀螺位置
    TopReady.CURRENT = 0;
    // 选择框的初始位置
    TopReady.CHOOSE_X0 = 635;
    TopReady.CHOOSE_X1 = 763;
    // 记录出战的陀螺
    TopReady.TOP_READY = [];
    beyondtop.TopReady = TopReady;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=TopReady.js.map