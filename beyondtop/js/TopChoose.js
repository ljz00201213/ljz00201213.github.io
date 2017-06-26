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
    var TopChoose = (function (_super) {
        __extends(TopChoose, _super);
        function TopChoose() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            _this.init();
            return _this;
        }
        TopChoose.prototype.init = function () {
            if (!this.value_star) {
                this.value_star = new Laya.Sprite;
                this.addChild(this.value_star);
                this.value_star.pos(251, 245);
                this.value_star_tex = Laya.loader.getRes("game/level_star.png");
                this.value_star.graphics.drawTexture(this.value_star_tex);
            }
            beyondtop.JConfig.setInfo(this.info);
            // this.onKeyDown();
            // 初始化选中陀螺位置
            this.initTopPos();
        };
        TopChoose.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.LEFT:
                        t.buyGift(beyondtop.JConfig.LEFT);
                        if (t.gift.visible)
                            return;
                        t.setTopPosMove(false);
                        break;
                    case beyondtop.JConfig.RIGHT:
                        t.buyGift(beyondtop.JConfig.RIGHT);
                        if (t.gift.visible)
                            return;
                        t.setTopPosMove(true);
                        break;
                    case beyondtop.JConfig.ENTER:
                        if (t.gift.visible)
                            t.buyGift(beyondtop.JConfig.ENTER);
                        else
                            t.setChoose();
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
        TopChoose.prototype.buyGift = function (keycode) {
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
                        var fee = DataBase.giftPrice[0];
                        if (fee > DataBase.diamond)
                            this.out_of_diamond.play(0, false);
                        else {
                            DataBase.diamond -= fee;
                            beyondtop.JConfig.setInfo(this.info);
                            DataBase.diamond += 60, DataBase.coin += 2000, DataBase.lock[6] = 0;
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
        TopChoose.prototype.setChoose = function () {
            if (DataBase.lock[TopChoose.CURRENT] == -1) {
                // 未解锁 
                // 判断是否有足够金币购买
                var fee = DataBase.topPrice[TopChoose.CURRENT];
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
                    this.buy.play(0, false);
                    // 设置陀螺解锁
                    DataBase.lock[TopChoose.CURRENT] = 0;
                    beyondtop.JConfig.setInfo(this.info);
                    this.lock.visible = false;
                    this.money.visible = false;
                    this.money0.visible = false;
                    this.money1.visible = false;
                    this.money2.visible = false;
                    this.money3.visible = false;
                    this.money4.visible = false;
                }
                // 有 提示购买成功界面
                // 提示金币不足界面
            }
            else {
                // 已解锁 弹出解锁对话框
                this.unlocked.play(0, false);
            }
        };
        /**
         * 设置陀螺位置移动
         */
        TopChoose.prototype.setTopPosMove = function (direct) {
            var len = TopChoose.TOP_POS.length;
            if (direct) {
                for (var i = 0; i < len; i++) {
                    if (i < len - 1)
                        TopChoose.TOP_POS[i] = TopChoose.TOP_POS[i + 1];
                    else {
                        TopChoose.TOP_POS[i] += 1;
                        if (TopChoose.TOP_POS[i] == 11)
                            TopChoose.TOP_POS[i] = 0;
                    }
                }
            }
            else {
                for (var i = len - 1; i > -1; i--) {
                    if (i > 0)
                        TopChoose.TOP_POS[i] = TopChoose.TOP_POS[i - 1];
                    else {
                        TopChoose.TOP_POS[i] -= 1;
                        if (TopChoose.TOP_POS[i] == -1)
                            TopChoose.TOP_POS[i] = 10;
                    }
                }
            }
            this.setTopPos(TopChoose.TOP_POS);
        };
        /**
         * 初始化陀螺位置
         */
        TopChoose.prototype.initTopPos = function () {
            // 初始化礼包显示
            this.gift.visible = false;
            if (DataBase.lock[6] == -1) {
                var gift = this.gift;
                var t = this;
                gift.visible = true;
                gift.scale(0, 0);
                Laya.Tween.to(gift, {
                    scaleX: 1,
                    scaleY: 1
                }, 300, null, Laya.Handler.create(this, function () {
                    t.onKeyDown();
                }));
                gift.gift_choose_sure.visible = true;
                gift.gift_choose_cancel.visible = false;
                gift.gift_des.skin = "game/frame_des_holyfire.png";
                gift.gift.skin = "game/frame_gift_holyfire.png";
                if (gift.gift_des.x == 160)
                    gift.gift_des.x -= 15, gift.gift_des.y += 5;
                beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.giftPrice[0], [this.gift.money2, this.gift.money1, this.gift.money0]);
            }
            TopChoose.TOP_POS = [8, 9, 10, 0, 1];
            // 初始化界面陀螺显示
            this.setTopPos(TopChoose.TOP_POS);
        };
        /**
         * 设置陀螺位置
         */
        TopChoose.prototype.setTopPos = function (poses) {
            this.top0.skin = "game/top" + poses[4] + ".png";
            this.top1.skin = "game/top" + poses[0] + ".png";
            this.top2.skin = "game/top" + poses[1] + ".png";
            this.top3.skin = "game/top" + poses[2] + ".png";
            this.currTop.skin = "game/top" + poses[3] + ".png";
            //设置当前选中陀螺的信息
            TopChoose.CURRENT = poses[3];
            var attack = DataBase.topProperty[TopChoose.CURRENT][0];
            if (attack > 500)
                attack = 500;
            var defence = DataBase.topProperty[TopChoose.CURRENT][1];
            var lp = DataBase.topProperty[TopChoose.CURRENT][2];
            if (lp > 8000)
                lp = 8000;
            var value_attack = DataBase.topProperty[TopChoose.CURRENT][3];
            this.value_lp.scaleX = lp / 8000;
            this.value_attack.scaleX = attack / 500;
            this.value_defence.scaleX = defence / 500;
            this.topskill.skin = "game/topskill0" + TopChoose.CURRENT + ".png";
            //设置攻击数值
            beyondtop.JConfig.setNumber("game/num_red_", value_attack, [this.value_attack3, this.value_attack2, this.value_attack1, this.value_attack0]);
            this.value_attack3.x = 392, this.value_attack2.x = 373, this.value_attack1.x = 353, this.value_attack0.x = 335;
            if (value_attack >= 1000) {
                this.value_attack3.x += 10, this.value_attack2.x += 10, this.value_attack1.x += 10, this.value_attack0.x += 10;
            }
            // 设置陀螺的星数
            this.value_star.graphics.clear();
            this.value_star.graphics.drawTexture(Laya.Texture.createFromTexture(this.value_star_tex, 0, 0, 124 * DataBase.topStar[TopChoose.CURRENT] / 10, 23));
            // 设置陀螺的名字
            this.topname.skin = "game/topname" + TopChoose.CURRENT + ".png";
            // 判断陀螺是否有被动技能
            // 初始化位置
            this.topskill.y = TopChoose.topskillY;
            this.des_attack.y = TopChoose.des_attackY;
            this.value_attack0.y = TopChoose.value_attackY;
            this.value_attack1.y = TopChoose.value_attackY;
            this.value_attack2.y = TopChoose.value_attackY;
            this.value_attack3.y = TopChoose.value_attackY;
            if (TopChoose.CURRENT > 5) {
                this.bskill0.skin = "game/bskill" + (TopChoose.CURRENT - 6) + ".png";
                this.des_skill.skin = "game/des_attack" + (TopChoose.CURRENT - 6) + ".png";
                this.bskill0.visible = true;
                this.bskill1.visible = true;
                this.des_skill.visible = true;
            }
            else {
                this.bskill0.visible = false;
                this.bskill1.visible = false;
                this.des_skill.visible = false;
                this.topskill.y += TopChoose.move_OFF_Y;
                this.des_attack.y += TopChoose.move_OFF_Y;
                this.value_attack0.y += TopChoose.move_OFF_Y;
                this.value_attack1.y += TopChoose.move_OFF_Y;
                this.value_attack2.y += TopChoose.move_OFF_Y;
                this.value_attack3.y += TopChoose.move_OFF_Y;
            }
            //设置战魂动画
            /**
             * 战魂位置 0 460 30   1-7 10 500 -10  8 465 -20 9 370 -150
             */
            var x, y;
            if (TopChoose.CURRENT == 0)
                x = 460, y = 30;
            else if (TopChoose.CURRENT == 9)
                x = 370, y = -150;
            else if (TopChoose.CURRENT == 8)
                x = 465, y = -20;
            else if (TopChoose.CURRENT == 7)
                x = 530, y = -50;
            else
                x = 500, y = -10;
            beyondtop.JConfig.createMovieClip(TopChoose.CURRENT, x, y, this);
            //判断陀螺是否解锁
            if (DataBase.lock[TopChoose.CURRENT] == -1) {
                // 未解锁
                this.lock.visible = true;
                this.money.visible = true;
                // 解锁花费
                this.money0.x = 959, this.money1.x = 976, this.money2.x = 991, this.money3.x = 1007, this.money4.x = 1022;
                var fee = DataBase.topPrice[TopChoose.CURRENT];
                if (fee < 1000) {
                    this.money.skin = "game/diamond.png",
                        this.money2.x = 976,
                        this.money3.x = 991,
                        this.money4.x = 1007;
                }
                else {
                    this.money.skin = "game/coin.png";
                    if (fee < 10000) {
                        this.money1.x = 969, this.money2.x = 984, this.money3.x = 1000, this.money4.x = 1015;
                    }
                }
                beyondtop.JConfig.setNumber("game/num_coin_0", fee, [this.money4, this.money3, this.money2, this.money1, this.money0]);
            }
            else {
                // 解锁
                this.lock.visible = false;
                this.money.visible = false;
                this.money0.visible = false;
                this.money1.visible = false;
                this.money2.visible = false;
                this.money3.visible = false;
                this.money4.visible = false;
            }
        };
        return TopChoose;
    }(ui.topChooseUI));
    /**
     * 记录初始位置
     */
    TopChoose.topskillY = 290;
    TopChoose.des_attackY = 293;
    TopChoose.value_attackY = 309;
    TopChoose.move_OFF_Y = 50;
    /** 记录陀螺位置数组*/
    TopChoose.TOP_POS = [];
    // 当前陀螺位置
    TopChoose.CURRENT = 0;
    beyondtop.TopChoose = TopChoose;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=TopChoose.js.map