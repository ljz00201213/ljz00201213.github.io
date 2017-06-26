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
    var FightStage = (function (_super) {
        __extends(FightStage, _super);
        function FightStage(flag0, flag1) {
            var _this = _super.call(this) || this;
            /**
             * -1 随机血量
             * 0 判断是否血量值达到0.9以上
             * 1. 处理火力全开礼包
             */
            _this.flag = -1;
            // 随机血量时间间隔
            _this.blood_scale_flag = false;
            // 是否动力全开
            _this.usingAllPower = -1;
            // 主动使用过战魂觉醒
            _this.usingSoulSelf = false;
            // 陀螺是否用完
            _this.isMeTopOut = false;
            _this.isEnemyTopOut = false;
            /**
             * 游戏状态
             * 0 首次进入
             * 1 me重新进入
             * 2 enemy重新进入
             */
            _this.state = 0;
            // 防止重复进入
            _this.isCanIn = false;
            // 敌方在我方大招回合阵亡
            _this.enemyDieBeforeSkill = false;
            FightStage.LEVEL_B = flag0;
            FightStage.LEVEL_S = flag1;
            _this.enemy_powerLevel = DataBase.levelEnemyType[FightStage.LEVEL_B][FightStage.LEVEL_S];
            _this.init();
            return _this;
        }
        FightStage.prototype.init = function () {
            this.onKeyDown();
            this.enemy_top0 = DataBase.levelEnemyId[FightStage.LEVEL_B][FightStage.LEVEL_S][0];
            this.enemy_top1 = DataBase.levelEnemyId[FightStage.LEVEL_B][FightStage.LEVEL_S][1];
            this.me_top0 = beyondtop.TopReady.TOP_READY[1];
            this.me_top1 = beyondtop.TopReady.TOP_READY[2];
            FightStage.CURR_TOP_ENEMY = this.enemy_top0;
            FightStage.CURR_TOP_ME = this.me_top0;
            if (this.enemy_top1 != -1)
                this.enemy_ready_top.visible = true, this.enemy_ready_top.skin = "game/top" + this.enemy_top1 + ".png";
            //  初始化界面元素
            // 设置我方的战斗力
            this.me_power = DataBase.power;
            beyondtop.JConfig.setNumber("game/num_power_0", this.me_power, [this.stage_me_power4, this.stage_me_power3, this.stage_me_power2, this.stage_me_power1, this.stage_me_power0]);
            // 设置敌方的战斗力
            this.enemy_power = beyondtop.JConfig.culculatePower(DataBase.levelEnemyType[FightStage.LEVEL_B][FightStage.LEVEL_S]);
            beyondtop.JConfig.setNumber("game/num_power_0", this.enemy_power, [this.stage_enemy_power4, this.stage_enemy_power3, this.stage_enemy_power2, this.stage_enemy_power1, this.stage_enemy_power0]);
            // 设置我方等待陀螺
            this.stage_ready_top.skin = "game/top" + this.me_top1 + ".png";
            this.flag = -2;
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        FightStage.prototype.onLoop = function () {
            // 重新登场
            this.reToStage();
            // 防止技能导航栏弹出
            this.limitPlatform();
            // 设置随机血量, 不低于原有血量的50%
            this.setTopBlood();
            // 判断血量是否达到90%, 否则弹出火力全开界面
            this.judgeBloodPercent();
            // 设置陀螺入场
            this.topOut();
            // 开始战斗
            this.fight();
        };
        /**
         * 防止技能导航栏弹出
         */
        FightStage.prototype.limitPlatform = function () {
            if (this.success.visible || this.fail.visible) {
                if (this.stage_skill_platform.visible) {
                    this.setSKillPlatformSee(false);
                    this.onKeyDown();
                }
            }
            // 防止火力全开弹出
            if (!this.stage_progress_bg.visible)
                this.full_energy.visible = false;
        };
        /**
         * 陀螺战败重新登场
         */
        FightStage.prototype.reToStage = function () {
            if (this.flag != 3 || this.isCanIn)
                return;
            // 判断是否有剩余陀螺使用,没有直接判断游戏结束
            var t = this;
            if (!t.me_top.visible && !t.enemy_top.visible && !t.isMeTopOut && !t.isEnemyTopOut) {
                this.isCanIn = true;
                if (t.enemy_top1 != -1) {
                    t.state = 0;
                    t.flag = -2;
                    this.isCanIn = false;
                    FightStage.CURR_TOP_ME = t.me_top1, t.isMeTopOut = true, t.stage_ready_top.visible = false;
                    FightStage.CURR_TOP_ENEMY = t.me_top1, t.isEnemyTopOut = true, t.enemy_ready_top.visible = false;
                }
                else {
                    t.win();
                }
            }
            else if (!t.me_top.visible) {
                this.isCanIn = true;
                if (!t.isMeTopOut)
                    FightStage.CURR_TOP_ME = t.me_top1, t.isMeTopOut = true, t.stage_ready_top.visible = false, t.state = 1;
                else {
                    t.fail.visible = true;
                    beyondtop.JConfig.playSound("music/fail.wav", false);
                    t.onKeyDown();
                }
            }
            else if (!t.enemy_top.visible) {
                this.isCanIn = true;
                if (!t.isEnemyTopOut && t.enemy_top1 != -1)
                    FightStage.CURR_TOP_ENEMY = t.enemy_top1, t.isEnemyTopOut = true, t.enemy_ready_top.visible = false, t.state = 2;
                else {
                    t.win();
                }
            }
        };
        FightStage.prototype.win = function () {
            var t = this;
            var success = t.success;
            success.visible = true;
            var diamond = DataBase.levelRewardDiamond[FightStage.LEVEL_B][FightStage.LEVEL_S];
            var coin = DataBase.levelRewardDiamond[FightStage.LEVEL_B][FightStage.LEVEL_S];
            beyondtop.JConfig.setNumber("game/num_coin_0", diamond, [success.diamond2, success.diamond1, success.diamond0]);
            beyondtop.JConfig.setNumber("game/num_coin_0", coin, [success.coin3, success.coin2, success.coin1, success.coin0]);
            // 获取奖励
            DataBase.diamond += diamond;
            DataBase.coin += coin;
            if (DataBase.passLevel[FightStage.LEVEL_B] < 7)
                DataBase.passLevel[FightStage.LEVEL_B] += 1;
            t.onKeyDown();
            beyondtop.JConfig.playSound("music/win.wav", false);
        };
        /**
         * 设置陀螺战斗
         */
        FightStage.prototype.fight = function () {
            if (this.flag != 3)
                return;
            /**
       * 0 陀螺到中间进行过碰撞
       * 1 敌方陀螺使用大招  我方到一边攻击敌方
       * 2 敌方陀螺是守护陀螺 我方到一边攻击敌方 存在防护罩
       * 3 我方加血 敌方到我方攻击 守护陀螺除外
       * 4 我放觉醒 觉醒完直接攻击 依照前面状态进行攻击
       * 5 我方大招 敌方到我方攻击
       * 6 我方防御 敌方到我方攻击
       */
            if (this.usingSoulSelf)
                this.usingSoulSelf = false, this.setAttackState(beyondtop.JConfig.RIGHT);
            if (FightStage.MODE != FightStage.MODE_ATTACK && FightStage.MODE != -1)
                FightStage.MODE_ATTACK = FightStage.MODE;
            if (FightStage.MODE == 0) {
                this.commonOperate();
                this.me_line.visible = true;
                this.enemy_line.visible = true;
                this.mLine2MeTop();
                this.eLine2EnemyTop();
                var t = this;
                this.tweenTo(this.enemy_top, FightStage.CRASH_MIDDLE_ENEMY_X, 1000, null);
                this.tweenTo(this.me_line, FightStage.CRASH_MIDDLE_ME_X + FightStage.XOFF_ME_MELINE, 1000, null);
                this.tweenTo(this.enemy_line, FightStage.CRASH_MIDDLE_ENEMY_X + FightStage.XOFF_ENEMY_ENEMYLINE, 1000, null);
                this.tweenTo(this.me_top, FightStage.CRASH_MIDDLE_ME_X, 1000, function () {
                    t.setCrashState();
                });
            }
            else if (FightStage.MODE == 1 || FightStage.MODE == 2) {
                // 我方到敌方攻击
                this.commonOperate();
                this.me_line.visible = true;
                this.mLine2MeTop();
                var t = this;
                var pos_line, pos_top;
                if (FightStage.CURR_TOP_ENEMY == 7)
                    pos_line = FightStage.CRASH_ME_DUN_X + FightStage.XOFF_ME_MELINE, pos_top = FightStage.CRASH_ME_DUN_X + 10, this.enemy_dun.visible = true;
                else
                    pos_line = FightStage.CRASH_ME_TO_X + FightStage.XOFF_ME_MELINE, pos_top = FightStage.CRASH_ME_TO_X;
                this.tweenTo(this.me_line, pos_line, 1500, null);
                this.tweenTo(this.me_top, pos_top, 1500, function () {
                    t.setCrashState();
                });
            }
            else if (FightStage.MODE == 6 || FightStage.MODE == 3 || FightStage.MODE == 5) {
                // 我方主动防御6 加血3 大招5
                // 如果敌方是防御陀螺,该回合直接结束
                var t = this;
                // if (FightStage.CURR_TOP_ENEMY == 7) {
                // 设置导航栏不可见
                t.setSKillPlatformSee(false);
                if (FightStage.MODE == 6) {
                    t.me_dun.visible = true;
                    t.setEnemyAttack();
                }
                else if (FightStage.MODE == 3) {
                    t.add_blood.visible = true;
                    t.tweenTo(t.add_blood, t.add_blood.x, 1000, function () {
                        t.add_blood.visible = false;
                        t.blood_me += FightStage.ME_BLOOD * 0.5;
                        if (t.blood_me > FightStage.ME_BLOOD)
                            t.blood_me = FightStage.ME_BLOOD;
                        t.meReduceBlood();
                        t.setEnemyAttack();
                    });
                }
                else {
                    t.showEnemySkill(false);
                }
            }
            else if (FightStage.MODE == 4) {
                // 判断是否有觉醒
                if (DataBase.skill[0] <= 0) {
                    this.showSoul();
                    this.onKeyDown();
                }
                else {
                    this.usingSoulSelf = true;
                }
            }
            FightStage.MODE = -1;
        };
        /**
         * 我方不主动攻击时敌方的动作
         */
        FightStage.prototype.setEnemyAttack = function () {
            var t = this;
            if (FightStage.ENEMY_SKILL_CD == 0) {
                t.showEnemySkill(true);
                t.onKeyDown();
            }
            else if (FightStage.CURR_TOP_ENEMY == 7) {
                t.enemy_dun.visible = true;
                t.tweenTo(t.me_dun, t.me_dun.x, 500, function () {
                    t.me_dun.visible = false;
                    t.enemy_dun.visible = false;
                    t.setSkillCD();
                    t.setSKillPlatformSee(true);
                    t.onKeyDown();
                });
            }
            else {
                t.enemy_line.visible = true;
                t.eLine2EnemyTop();
                var pos_line, pos_top;
                if (FightStage.MODE_ATTACK == 6)
                    pos_line = FightStage.CRASH_ENEMY_DUN_X + FightStage.XOFF_ENEMY_ENEMYLINE, pos_top = FightStage.CRASH_ENEMY_DUN_X;
                else if (FightStage.MODE_ATTACK == 3 || FightStage.MODE_ATTACK == 5)
                    pos_line = FightStage.CRASH_ENEMY_TO_X + FightStage.XOFF_ENEMY_ENEMYLINE, pos_top = FightStage.CRASH_ENEMY_TO_X;
                this.tweenTo(this.enemy_line, pos_line, 1500, null);
                this.tweenTo(this.enemy_top, pos_top, 1500, function () {
                    t.setCrashState();
                });
            }
        };
        /**
         * 所有回合都会执行的操作
         */
        FightStage.prototype.commonOperate = function () {
            // 设置导航栏不可见
            this.setSKillPlatformSee(false);
            // 设置攻击掉血
            this.meAttackInjuried();
            this.enemyAttackInjuried();
        };
        /**
         * 设置速度线跟随陀螺
         */
        FightStage.prototype.eLine2MeTop = function () {
            this.enemy_line.x = this.me_top.x + FightStage.XOFF_ME_ENEMYELINE;
        };
        FightStage.prototype.mLine2MeTop = function () {
            this.me_line.x = this.me_top.x + FightStage.XOFF_ME_MELINE;
        };
        FightStage.prototype.mLine2EnemyTop = function () {
            this.me_line.x = this.enemy_top.x + FightStage.XOFF_ME_MELINE;
        };
        FightStage.prototype.eLine2EnemyTop = function () {
            this.enemy_line.x = this.enemy_top.x + FightStage.XOFF_ME_ENEMYELINE;
        };
        /**
         * 设置攻击效果不可见
         */
        FightStage.prototype.setCrashingSee = function (see) {
            this.crashing.visible = see;
        };
        /**
         *陀螺撞击时效果
         */
        FightStage.prototype.setCrashState = function () {
            this.me_line.visible = false;
            this.enemy_line.visible = false;
            var t = this;
            // 设置动效的位置
            t.setEnergySee(true);
            if (t.me_dun.visible)
                t.crashing.x = t.me_dun.x + 30;
            else
                t.crashing.x = t.me_top.x + FightStage.XOOF_CRASHING;
            t.me_attacked.x = t.me_top.x + FightStage.XOFF_ME_ATTACKED;
            t.enemy_attacked.x = t.enemy_top.x + FightStage.XOFF_ENEMY_ATTACKED;
            t.enemy_attacked.visible = true;
            t.me_attacked.visible = true;
            t.tweenTo(t.me_attacked, t.me_attacked.x, 1000, null);
            t.tweenTo(t.enemy_attacked, t.enemy_attacked.x, 1000, function () {
                t.setCrashingSee(true);
                t.enemy_attacked.visible = false;
                t.me_attacked.visible = false;
                t.onKeyDown();
            });
        };
        /**
         * 陀螺回归到原始位置
         */
        FightStage.prototype.top2Home = function (top) {
            var t = this;
            // 设置进度条消失
            this.setEnergySee(false);
            if (top === this.me_top) {
                t.enemy_line.visible = true;
                this.tweenTo(this.me_top, FightStage.ME_X0, 500, function () {
                    t.enemy_line.visible = false;
                    if (FightStage.MODE_ATTACK == 1 && t.enemy_top.visible) {
                        t.showEnemySkill(true);
                    }
                    else if ((FightStage.MODE_ATTACK == 0 || FightStage.MODE_ATTACK == 2) && t.enemy_top.visible)
                        t.setSKillPlatformSee(true);
                    // 陀螺阵亡重新出长, 回归原始值
                    t.initFlagItem();
                    t.enemy_dun.visible = false;
                });
                this.tweenTo(this.enemy_line, FightStage.ME_X0 + FightStage.XOFF_ENEMY_ENEMYLINE, 500, null);
            }
            else {
                t.me_line.visible = true;
                if (FightStage.MODE_ATTACK == 6)
                    t.me_dun.visible = false;
                this.tweenTo(this.enemy_top, FightStage.ENEMY_X0, 500, function () {
                    t.me_line.visible = false;
                    if (!t.stage_skill_platform.visible && t.me_top.visible)
                        t.setSKillPlatformSee(true);
                    // 陀螺阵亡重新出长, 回归原始值
                    t.initFlagItem();
                });
                this.tweenTo(this.me_line, FightStage.ENEMY_X0 + FightStage.XOFF_ME_MELINE, 500, null);
            }
        };
        /**
         * 大招
         */
        FightStage.prototype.showEnemySkill = function (which) {
            var t = this, crashed, storage;
            if (which)
                crashed = t.me_crashed, storage = t.enemy_storage, FightStage.ENEMY_SKILL_CD = 4, crashed.url = "skill/skill" + FightStage.CURR_TOP_ENEMY + ".swf";
            else
                crashed = t.enemy_crashed, storage = t.me_storage, FightStage.ME_SKILL_CD = 4, crashed.url = "skill/skill" + FightStage.CURR_TOP_ME + ".swf";
            ;
            storage.visible = true;
            t.tweenTo(storage, storage.x, 1000, function () {
                storage.visible = false;
                crashed.visible = true;
                t.tweenTo(crashed, crashed.x, 1000, function () {
                    crashed.visible = false;
                    if (crashed === t.me_crashed)
                        // 计算伤害
                        t.calcllatorInjury(t.enemy_top),
                            // 回复cd
                            t.setSkillCD();
                    else
                        t.calcllatorInjury(t.me_top);
                    // 是否阵亡
                    t.isTopLost();
                    if (t.me_top.visible && crashed === t.me_crashed)
                        t.setSKillPlatformSee(true);
                    else if (!t.me_top.visible) {
                        // 我方阵亡
                        t.initFlagItem();
                    }
                    else if (crashed === t.enemy_crashed && t.enemy_top.visible) {
                        // 敌方回合
                        t.setEnemyAttack();
                    }
                    else if (!t.enemy_top.visible) {
                        // 敌方阵亡
                        this.enemyDieBeforeSkill = true;
                    }
                });
            });
        };
        /**
         * 设置攻击时掉血
         */
        FightStage.prototype.meAttackInjuried = function () {
            var me_reduce = FightStage.ME_BLOOD * 0.05;
            this.setInjuryValue(this.me_injury, me_reduce);
            this.blood_me -= me_reduce;
            if (this.blood_me < 1)
                this.blood_me = 1;
            this.meReduceBlood();
        };
        FightStage.prototype.enemyAttackInjuried = function () {
            var enemy_reduce = FightStage.ENEMY_BLOOD * 0.05;
            this.setInjuryValue(this.enemy_injury, enemy_reduce);
            this.blood_enemy -= enemy_reduce;
            if (this.blood_enemy < 1)
                this.blood_enemy = 1;
            this.enemyReduceBlood();
        };
        /**
         * 设置血量
         */
        FightStage.prototype.meReduceBlood = function () {
            // 设置血量
            this.blood_me = this.getFloor(this.blood_me);
            if (this.blood_me < 0)
                this.blood_me = 0;
            beyondtop.JConfig.setNumber("game/num_red_", this.blood_me, [this.stage_blood_me4, this.stage_blood_me3, this.stage_blood_me2, this.stage_blood_me1, this.stage_blood_me0]);
            //    设置血条缩放
            this.stage_blood_me.scaleX = 1.7 * this.blood_me / FightStage.ME_BLOOD;
        };
        FightStage.prototype.enemyReduceBlood = function () {
            this.blood_enemy = this.getFloor(this.blood_enemy);
            if (this.blood_enemy < 0)
                this.blood_enemy = 0;
            // 设置血量
            beyondtop.JConfig.setNumber("game/num_red_", this.blood_enemy, [this.stage_blood_enemy4, this.stage_blood_enemy3, this.stage_blood_enemy2, this.stage_blood_enemy1, this.stage_blood_enemy0]);
            //    设置血条缩放
            this.stage_blood_enemy.scaleX = -1.7 * this.blood_enemy / FightStage.ENEMY_BLOOD;
        };
        /**
         * 设置技能导航栏的可见性
         */
        FightStage.prototype.setSKillPlatformSee = function (see) {
            this.stage_skill_platform.visible = see;
            this.stage_top_skill.visible = see;
            this.cd_back.visible = see;
            this.cd_time.visible = see;
            if (FightStage.ME_SKILL_CD == 0 && see) {
                this.cd_back.visible = !see;
                this.cd_time.visible = !see;
            }
        };
        /**
         * 设置能量条的可见性
         */
        FightStage.prototype.setEnergySee = function (see) {
            this.ok.visible = see;
            this.plus.visible = see;
            this.stage_progress.visible = see;
            this.stage_progress_bg.visible = see;
            this.full_energy.visible = false;
            if (see) {
                // 特殊技能 在战斗开始便可展现的技能处理
                if (FightStage.CURR_TOP_ME == 9 || DataBase.skill[0] > 0) {
                    if (FightStage.CURR_TOP_ME != 9)
                        DataBase.skill[0] -= 1;
                    this.stage_progress.scaleX = 1.4, this.full_energy.visible = true;
                }
                else if (FightStage.CURR_TOP_ME == 6) {
                    // 攻击加血5%
                    var add_blood = FightStage.ME_BLOOD * 0.05;
                    this.blood_me += add_blood;
                    if (this.blood_me > FightStage.ME_BLOOD)
                        this.blood_me = FightStage.ME_BLOOD;
                    this.meReduceBlood();
                }
                if (FightStage.CURR_TOP_ENEMY == 6) {
                    // 敌方
                    var add_blood = FightStage.ENEMY_BLOOD * 0.05;
                    this.blood_enemy += add_blood;
                    if (this.blood_enemy > FightStage.ENEMY_BLOOD)
                        this.blood_enemy = FightStage.ENEMY_BLOOD;
                    this.enemyReduceBlood();
                }
            }
        };
        /**
         * 设置伤害
         */
        FightStage.prototype.setInjuryValue = function (injury, value) {
            // 设置伤害值的位置
            injury.visible = true;
            value = this.getFloor(value);
            injury.up0.x = 30, injury.up1.x = 55, injury.up2.x = 80, injury.up3.x = 105,
                injury.up0.visible = true, injury.up1.visible = true, injury.up2.visible = true, injury.up3.visible = true;
            if (value < 10)
                injury.up3.x = injury.up0.x, injury.up0.visible = false, injury.up1.visible = false, injury.up2.visible = false;
            else if (value < 100)
                injury.up2.x = injury.up0.x, injury.up3.x = injury.up1.x, injury.up0.visible = false, injury.up1.visible = false;
            else if (value < 1000)
                injury.up3.x = injury.up2.x, injury.up2.x = injury.up1.x, injury.up1.x = injury.up0.x, injury.up0.visible = false;
            beyondtop.JConfig.setNumber("game/num_red_", value, [injury.up3, injury.up2, injury.up1, injury.up0]);
            if (injury === this.enemy_injury) {
                this.enemy_injury.x = this.enemy_top.x + FightStage.XOFF_ME_INJURY;
                if (FightStage.MODE_ATTACK == 0)
                    this.enemy_injury.x += 50;
                this.enemy_injury.y = 500;
                var t = this;
                Laya.Tween.to(this.enemy_injury, { y: this.enemy_injury.y - 140 }, 1000, null, Laya.Handler.create(this, function () {
                    t.enemy_injury.y += 140;
                    t.enemy_injury.visible = false;
                }));
            }
            else {
                this.me_injury.x = this.me_top.x + FightStage.XOFF_ME_INJURY;
                if (FightStage.MODE_ATTACK == 0)
                    this.me_injury.x -= 50;
                this.me_injury.y = 500;
                var t = this;
                Laya.Tween.to(this.me_injury, { y: this.me_injury.y - 140 }, 1000, null, Laya.Handler.create(this, function () {
                    t.me_injury.y += 140;
                    t.me_injury.visible = false;
                }));
            }
        };
        /**
         * 设置动画
         */
        FightStage.prototype.tweenTo = function (obj, x, time, func) {
            Laya.Tween.to(obj, {
                x: x
            }, time, null, Laya.Handler.create(this, func));
        };
        /**
         * 设置陀螺血量
         */
        FightStage.prototype.setTopBlood = function () {
            if (this.flag != -2 && this.flag != 3)
                return;
            if (this.state == 2) {
                if (this.flag = -2)
                    this.flag = 0;
                return;
            }
            if ((this.flag == -2 || this.flag == 3) && !this.blood_scale_flag) {
                // 当是无双战神陀螺时, 保持满血
                if (this.flag != -2 && FightStage.CURR_TOP_ME == 9)
                    return;
                var t = this;
                t.blood_scale_flag = true;
                if (t.state >= 0 && t.state < 2 && !t.stage_progress_bg.visible)
                    t.setEnergySee(true), t.plus.skin = "game/add_blood.png", this.full_energy.visible = false;
                Laya.timer.once(100, this, function () {
                    t.blood_percent = this.getRandom(),
                        t.stage_progress.scaleX = 1.4 * t.blood_percent,
                        t.blood_scale_flag = false;
                });
            }
        };
        /**
         * 判断血量值
         */
        FightStage.prototype.judgeBloodPercent = function () {
            if (this.flag != 0)
                return;
            if (this.state == 2) {
                this.setEnemyTopBlood(FightStage.CURR_TOP_ENEMY);
                return;
            }
            else if (this.blood_per < 0.9) {
                this.flag = 1;
                //  弹出火力全开礼包
                var gift = this.gift;
                gift.scale(0, 0);
                Laya.Tween.to(gift, {
                    scaleX: 1,
                    scaleY: 1
                }, 100, null);
                gift.visible = true;
                gift.gift_choose_sure.visible = true;
                gift.gift_choose_cancel.visible = false;
                gift.gift_des.skin = "game/frame_des_allon.png";
                gift.gift.skin = "game/frame_gift_allon.png";
                beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.giftPrice[3], [gift.money2, gift.money1, gift.money0]);
            }
            else {
                // 设置敌我双方的血量
                this.setMeTopBlood(FightStage.CURR_TOP_ME);
                this.setEnemyTopBlood(FightStage.CURR_TOP_ENEMY);
            }
        };
        /**
         * 设置陀螺入场
         */
        FightStage.prototype.meTopIn = function () {
            this.me_top.visible = true;
            this.me_line.visible = true;
            this.me_top.x = -105;
            this.mLine2MeTop();
            this.enemy_top.url = "rotate/rotate" + FightStage.CURR_TOP_ENEMY + ".swf";
            this.me_top.url = "rotate/rotate" + FightStage.CURR_TOP_ME + ".swf";
            this.me_line.url = "other/bin.swf";
            this.enemy_line.url = "other/bin.swf";
            var t = this;
            this.tweenTo(this.me_top, FightStage.ME_X0, 500, function () {
                t.me_line.visible = false;
                t.me_soul.visible = true;
                t.enemy_soul.url = "soulani/" + FightStage.CURR_TOP_ENEMY + ".swf";
                t.me_soul.url = "soulani/" + FightStage.CURR_TOP_ME + ".swf";
                if (t.state < 2)
                    t.ani1.play(0, false), t.onKeyDown();
                t.flag = 3;
                if (t.state != 0)
                    t.state = -1, t.isCanIn = false;
                // 修改动力条
                t.setEnergySee(false), t.full_energy.visible = false;
                t.plus.skin = "game/add_energy.png";
            });
            this.tweenTo(this.me_line, this.me_line.x + 100, 500, null);
            this.me_injury.x += 100;
        };
        FightStage.prototype.enemyTopIn = function () {
            this.enemy_line.visible = true;
            this.enemy_top.x = 906;
            this.eLine2EnemyTop();
            this.enemy_top.visible = true;
            this.enemy_top.url = "rotate/rotate" + FightStage.CURR_TOP_ENEMY + ".swf";
            this.me_top.url = "rotate/rotate" + FightStage.CURR_TOP_ME + ".swf";
            this.me_line.url = "other/bin.swf";
            this.enemy_line.url = "other/bin.swf";
            var t = this;
            this.tweenTo(this.enemy_top, FightStage.ENEMY_X0, 500, function () {
                t.enemy_line.visible = false;
                t.enemy_soul.url = "soulani/" + FightStage.CURR_TOP_ENEMY + ".swf";
                t.me_soul.url = "soulani/" + FightStage.CURR_TOP_ME + ".swf";
                t.enemy_soul.visible = true;
                if (t.state == 2)
                    t.ani1.play(0, false), t.onKeyDown();
                t.flag = 3;
                t.state = -1, t.isCanIn = false;
                if (t.enemyDieBeforeSkill) {
                    t.enemyDieBeforeSkill = false;
                    t.cd_time.skin = "game/num_fight_03.png";
                    t.showEnemySkill(true);
                }
            });
            this.tweenTo(this.enemy_line, this.enemy_line.x - 100, 500, null);
            this.enemy_injury.x -= 100;
        };
        FightStage.prototype.topOut = function () {
            if (this.flag != 2)
                return;
            // 防止多次进入
            this.flag = 404;
            // 设置陀螺
            if (this.state < 2) {
                this.setEnergySee(true);
                this.plus.skin = "game/add_blood.png";
            }
            if (this.state != 2)
                this.meTopIn();
            if (this.state != 1)
                this.enemyTopIn();
        };
        /**
         * 设置敌我双方的血量
         */
        FightStage.prototype.setMeTopBlood = function (index) {
            // 设置我方血量
            this.blood_me = this.getFloor(DataBase.topProperty[index][2] * this.blood_per + "") + DataBase.soulBoold[DataBase.powerLevel[0]];
            FightStage.ME_BLOOD = this.blood_me;
            this.meReduceBlood();
            this.stage_blood_me.visible = true;
            if (this.flag < 2)
                this.flag = 2;
        };
        FightStage.prototype.setEnemyTopBlood = function (index0) {
            if (this.state == 1)
                return;
            // 设置敌人血量
            var delta = DataBase.strengthenABoold[index0][1] - DataBase.strengthenABoold[index0][0];
            delta /= 100;
            var r = this.getRandom();
            r = r * delta + DataBase.strengthenABoold[index0][0] / 100;
            this.blood_enemy = this.getFloor(DataBase.topProperty[index0][2] * r + "") + DataBase.soulBoold[DataBase.levelEnemyType[FightStage.LEVEL_B][FightStage.LEVEL_S][0]];
            FightStage.ENEMY_BLOOD = this.blood_enemy;
            this.enemyReduceBlood();
            this.stage_blood_enemy.visible = true;
            if (this.flag < 2)
                this.flag = 2;
        };
        /**
        * 设置礼包购买
        */
        FightStage.prototype.buyGift = function (keycode) {
            var gift = this.gift, index;
            if (this.flag == 1)
                index = 3;
            else
                index = 4;
            if (FightStage.MODE_ATTACK == 4)
                index = 4;
            if (gift.visible) {
                if (keycode == beyondtop.JConfig.LEFT || keycode == beyondtop.JConfig.RIGHT) {
                    if (gift.gift_choose_cancel.visible)
                        gift.gift_choose_cancel.visible = false, gift.gift_choose_sure.visible = true;
                    else if (gift.gift_choose_sure.visible)
                        gift.gift_choose_cancel.visible = true, gift.gift_choose_sure.visible = false;
                }
                else if (keycode == beyondtop.JConfig.ENTER) {
                    if (!gift.gift_choose_cancel.visible) {
                        var fee = DataBase.giftPrice[index];
                        if (fee > DataBase.diamond)
                            this.out_of_diamond.play(0, false);
                        else {
                            DataBase.diamond -= fee;
                            // JConfig.setInfo(this.info);
                            if (index == 3) {
                                DataBase.skill[1] += 1;
                            }
                            else {
                                if (FightStage.MODE_ATTACK == 4)
                                    DataBase.skill[0] += 5, this.usingSoulSelf = true;
                                else {
                                    DataBase.skill[0] += 4;
                                    this.me_per = DataBase.strengthenEmitterAttack[DataBase.powerLevel[3]][1] / 100;
                                    this.setALLPower();
                                }
                            }
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
        FightStage.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.LEFT:
                        if (t.success.visible) {
                            if (t.success.choose.x == 155)
                                t.success.choose.x = 246;
                            else
                                t.success.choose.x = 155;
                        }
                        else if (t.fail.visible) {
                            if (t.fail.choose.x == 142)
                                t.fail.choose.x = 233;
                            else
                                t.fail.choose.x = 142;
                        }
                        else if (t.exit.visible) {
                            if (t.exit.cancle.visible)
                                t.exit.sure.visible = true, t.exit.cancle.visible = false;
                            else if (t.exit.sure.visible)
                                t.exit.sure.visible = false, t.exit.cancle.visible = true;
                        }
                        else if (t.gift.visible)
                            t.buyGift(beyondtop.JConfig.LEFT);
                        else if (t.stage_skill_platform.visible) {
                            // 攻击状态判定
                            t.setAttackState(beyondtop.JConfig.LEFT);
                        }
                        break;
                    case beyondtop.JConfig.RIGHT:
                        if (t.success.visible) {
                            if (t.success.choose.x == 155)
                                t.success.choose.x = 246;
                            else
                                t.success.choose.x = 155;
                        }
                        else if (t.fail.visible) {
                            if (t.fail.choose.x == 142)
                                t.fail.choose.x = 233;
                            else
                                t.fail.choose.x = 142;
                        }
                        else if (t.exit.visible) {
                            if (t.exit.cancle.visible)
                                t.exit.sure.visible = true, t.exit.cancle.visible = false;
                            else if (t.exit.sure.visible)
                                t.exit.sure.visible = false, t.exit.cancle.visible = true;
                        }
                        else if (t.gift.visible)
                            t.buyGift(beyondtop.JConfig.RIGHT);
                        else if (t.stage_skill_platform.visible) {
                            // 攻击状态判定
                            t.setAttackState(beyondtop.JConfig.RIGHT);
                        }
                        break;
                    case beyondtop.JConfig.ENTER:
                        if (t.success.visible) {
                            if (t.success.choose.x == 155)
                                t.flag = 100;
                            else
                                t.flag = 101;
                        }
                        else if (t.fail.visible) {
                            if (t.fail.choose.x == 142)
                                t.flag = 100;
                            else
                                t.flag = 102;
                        }
                        else if (t.exit.visible) {
                            if (t.exit.cancle.visible)
                                t.exit.visible = false;
                            else
                                t.flag = 100;
                        }
                        else if (t.flag == -2) {
                            t.ok.visible = false;
                            t.flag = 0;
                            var delta = DataBase.strengthenABoold[t.me_top0][1] - DataBase.strengthenABoold[t.me_top0][0];
                            delta /= 100;
                            t.blood_per = t.blood_percent * delta + DataBase.strengthenABoold[t.me_top0][0] / 100;
                            if (FightStage.CURR_TOP_ME == 8)
                                t.blood_per = 1, t.setALLPower();
                        }
                        else if (t.gift.visible) {
                            t.buyGift(beyondtop.JConfig.ENTER);
                            if (t.flag == 1)
                                t.setMeTopBlood(FightStage.CURR_TOP_ME), t.setEnemyTopBlood(FightStage.CURR_TOP_ENEMY);
                        }
                        else if (t.stage_skill_platform.visible) {
                            t.setAttackState(beyondtop.JConfig.ENTER);
                        }
                        else if (FightStage.MODE_ATTACK == 0) {
                            // 陀螺在中间相撞
                            t.attackOperate();
                            // 设置技能cd
                            if (t.usingAllPower == -1 && !t.ok.visible)
                                t.setSkillCD();
                        }
                        else if (FightStage.MODE_ATTACK == 1 || FightStage.MODE_ATTACK == 2) {
                            t.attackOperate();
                            if (FightStage.MODE_ATTACK == 2 && t.usingAllPower == -1 && !t.ok.visible)
                                t.setSkillCD();
                        }
                        else if (FightStage.MODE_ATTACK == 3 || FightStage.MODE_ATTACK == 6 || FightStage.MODE_ATTACK == 5) {
                            t.attackOperate();
                            if (t.usingAllPower == -1 && !t.ok.visible)
                                t.setSkillCD();
                        }
                        break;
                    case beyondtop.JConfig.DOWN:
                        if (t.stage_skill_platform.visible) {
                            // 攻击状态判定
                            t.setAttackState(beyondtop.JConfig.DOWN);
                        }
                        break;
                    case beyondtop.JConfig.UP:
                        // 返回上一界面
                        if (!t.stage_skill_platform.visible) {
                            t.exit.visible = true;
                        }
                        else if (t.stage_skill_platform.visible) {
                            t.setAttackState(beyondtop.JConfig.UP);
                        }
                        break;
                }
            };
        };
        /**
          * 陀螺阵亡重新出长, 回归原始值
          */
        FightStage.prototype.initFlag = function () {
            if (this.me_top.visible && this.enemy_top.visible)
                return;
            if (((FightStage.MODE_ATTACK == 1 || FightStage.MODE_ATTACK == 2) && !this.me_top.visible) ||
                ((FightStage.MODE_ATTACK == 3 || FightStage.MODE_ATTACK == 5 || FightStage.MODE_ATTACK == 6) && !this.enemy_top.visible))
                this.initFlagItem();
        };
        FightStage.prototype.initFlagItem = function () {
            if (this.me_top.visible && this.enemy_top.visible)
                return;
            var t = this;
            Laya.timer.once(2000, t, function () {
                if (!t.me_top.visible || !t.enemy_top.visible)
                    t.flag = -2;
            });
        };
        /**
         * 攻击流程
         */
        FightStage.prototype.attackOperate = function () {
            var t = this;
            // 随机此次动力攻击的值
            if (t.usingAllPower == -1) {
                t.usingAllPower = 0;
                t.me_per = t.setRanEnergy(t.me_top);
                t.enemy_per = t.setRanEnergy(t.enemy_top);
            }
            else {
                t.usingAllPower = -1;
                t.ok.visible = false;
                // 撞击效果消失
                t.setCrashingSee(false);
                // 伤害值计算 设置伤害值
                t.calcllatorInjury(t.me_top);
                // 当敌方准备大招时不对我方造成伤害
                if (FightStage.MODE_ATTACK != 1)
                    t.calcllatorInjury(t.enemy_top);
                // 判断陀螺是否战败
                t.isTopLost();
                t.initFlag();
                // 如果陀螺战败,则直接消失
                if (t.me_top.visible) {
                    t.eLine2MeTop();
                    if (FightStage.MODE_ATTACK == 0 || FightStage.MODE_ATTACK == 1 || FightStage.MODE_ATTACK == 2)
                        t.top2Home(t.me_top);
                }
                if (t.enemy_top.visible) {
                    // 回到原来的位置
                    t.mLine2EnemyTop();
                    if (FightStage.MODE_ATTACK == 0 || FightStage.MODE_ATTACK == 3 || FightStage.MODE_ATTACK == 6 || FightStage.MODE_ATTACK == 5)
                        t.top2Home(t.enemy_top);
                }
            }
        };
        /**
         * 设置满血
         */
        FightStage.prototype.setALLPower = function () {
            this.stage_progress.scaleX = 1.4, this.full_energy.visible = true;
        };
        /**
         * 判断陀螺是否战败
         */
        FightStage.prototype.isTopLost = function () {
            if (this.blood_me <= 0) {
                this.me_top.visible = false;
                this.me_soul.visible = false;
                this.me_dun.visible = false;
            }
            if (this.blood_enemy <= 0) {
                this.enemy_top.visible = false;
                this.enemy_soul.visible = false;
                this.enemy_attacked.visible = false;
            }
        };
        /**
         * 技能cd设置
         */
        FightStage.prototype.setSkillCD = function () {
            if (FightStage.ENEMY_SKILL_CD > 0)
                FightStage.ENEMY_SKILL_CD--;
            if (FightStage.ME_SKILL_CD > 0) {
                FightStage.ME_SKILL_CD--;
                // 设置技能cd
                // this.cd_back.visible = true, this.cd_time.visible = true;
                if (FightStage.ME_SKILL_CD > 0)
                    this.cd_time.skin = "game/num_fight_0" + FightStage.ME_SKILL_CD + ".png";
                else
                    this.cd_back.visible = false, this.cd_time.visible = false;
            }
        };
        /**
         * 敌方陀螺防御力
         */
        FightStage.prototype.getEnemytopDefence = function () {
            var defence = DataBase.topProperty[FightStage.CURR_TOP_ENEMY][1] * (1 + DataBase.strengthenSoul[this.enemy_powerLevel[0]] / 100) + DataBase.strengthenDefence[this.enemy_powerLevel[2]];
            if (FightStage.CURR_TOP_ENEMY == 7)
                // 防御陀螺
                defence += FightStage.ENEMY_BLOOD * 0.05;
            return defence;
        };
        /**
         * 我方陀螺主动防御
         */
        FightStage.prototype.getMetopDefence = function () {
            var defence = DataBase.topProperty[FightStage.CURR_TOP_ME][1] * (1 + DataBase.strengthenSoul[DataBase.powerLevel[0]] / 100) + DataBase.strengthenDefence[DataBase.powerLevel[2]];
            // 判断我方是否处于防御状态
            if (FightStage.MODE_ATTACK == 6)
                defence *= 1.4;
            return defence;
        };
        /**
         * 我方陀螺伤害计算
         */
        FightStage.prototype.getMetopInjury = function () {
            var injury;
            // 大招伤害
            if (FightStage.MODE_ATTACK == 5) {
                injury = DataBase.topProperty[FightStage.CURR_TOP_ME][3];
            }
            else {
                // 普通伤害
                injury = DataBase.topProperty[FightStage.CURR_TOP_ME][0] * (1 + DataBase.strengthenSoul[DataBase.powerLevel[0]] / 100) * (1 + this.me_per) + DataBase.strengthenFight[DataBase.powerLevel[1]];
                // 增加血量值5%的伤害
                if (FightStage.CURR_TOP_ME == 10)
                    injury += this.blood_me * 0.05;
            }
            return injury;
        };
        /**
         * 敌方大招伤害
         */
        FightStage.prototype.getEnemyInjury = function () {
            var injury;
            // 大招伤害
            if (FightStage.MODE_ATTACK == 1) {
                injury = DataBase.topProperty[FightStage.CURR_TOP_ENEMY][3];
            }
            else {
                // 普通伤害
                injury = DataBase.topProperty[FightStage.CURR_TOP_ENEMY][0] * (1 + DataBase.strengthenSoul[this.enemy_powerLevel[0]] / 100) * (1 + this.enemy_per) + DataBase.strengthenFight[this.enemy_powerLevel[1]];
                if (FightStage.CURR_TOP_ENEMY == 10)
                    injury += this.blood_enemy * 0.05;
            }
            return injury;
        };
        /**
         * 伤害值计算
         */
        FightStage.prototype.calcllatorInjury = function (top) {
            if (top === this.me_top) {
                // 计算我方对敌方的伤害
                // 攻击公式：【陀螺攻击力*（1+战魂%）*（1+动力条%）】+战斗环伤害
                var injury = this.getMetopInjury();
                // 获取敌方的防御力
                // 防御公式：【陀螺防御*（1+战魂%）】+守护环防御
                var defence = this.getEnemytopDefence();
                injury = injury - defence;
                this.blood_enemy -= injury;
                if (injury < 0)
                    injury = 0;
                this.setInjuryValue(this.enemy_injury, injury);
                this.enemyReduceBlood();
            }
            else {
                // 计算敌方对我方的伤害
                var injury = this.getEnemyInjury();
                var defence = this.getMetopDefence();
                injury -= defence;
                if (injury < 0)
                    injury = 0;
                this.blood_me -= injury;
                this.setInjuryValue(this.me_injury, injury);
                this.meReduceBlood();
            }
        };
        /**
         * 设置随机动力值
         */
        FightStage.prototype.setRanEnergy = function (top) {
            var percent = this.getRandom();
            if (percent < 0.2)
                percent = 0.2;
            // 如果我方陀螺
            // 当陀螺是无双战神时, 动力取最大值
            if (top === this.me_top) {
                percent = percent * 100 / (DataBase.strengthenEmitterAttack[DataBase.powerLevel[3]][1] - DataBase.strengthenEmitterAttack[DataBase.powerLevel[3]][0]);
                if (FightStage.CURR_TOP_ME == 9 || DataBase.skill[0] > 0) {
                    percent = DataBase.strengthenEmitterAttack[DataBase.powerLevel[3]][1] / 100;
                }
                else if (percent < 0.6) {
                    //提示战魂觉醒
                    this.showSoul();
                }
            }
            else {
                percent = percent * 100 / (DataBase.strengthenEmitterAttack[this.enemy_powerLevel[3]][1] - DataBase.strengthenEmitterAttack[this.enemy_powerLevel[3]][0]);
                if (FightStage.CURR_TOP_ENEMY == 9) {
                    percent = DataBase.strengthenEmitterAttack[this.enemy_powerLevel[3]][1];
                }
            }
            return percent;
        };
        /**
         * 战魂觉醒界面购买
         */
        FightStage.prototype.showSoul = function () {
            var gift = this.gift;
            gift.scale(0, 0);
            Laya.Tween.to(gift, {
                scaleX: 1,
                scaleY: 1
            }, 100, null);
            gift.visible = true;
            gift.gift_choose_sure.visible = true;
            gift.gift_choose_cancel.visible = false;
            gift.gift_des.skin = "game/frame_des_wake.png";
            gift.gift.skin = "game/frame_gift_wake.png";
            beyondtop.JConfig.setNumber("game/num_coin_0", DataBase.giftPrice[4], [gift.money2, gift.money1, gift.money0]);
        };
        FightStage.prototype.setAttackState = function (key) {
            this.initKeyEvent();
            /**
         * 0 陀螺到中间进行过碰撞
         * 1 敌方陀螺使用大招  我方到一边攻击敌方
         * 2 敌方陀螺是守护陀螺 我方到一边攻击敌方 存在防护罩
         * 3 我方加血 敌方到我方攻击 守护陀螺除外
         * 4 我放觉醒 觉醒完直接攻击 依照前面状态进行攻击
         * 5 我方大招 敌方到我方攻击
         * 6 我方防御 敌方到我方攻击
         */
            switch (key) {
                case beyondtop.JConfig.LEFT:
                    FightStage.MODE = 6;
                    break;
                case beyondtop.JConfig.RIGHT:
                    // 判断是否完成技能CD和陀螺是守护陀螺, 则前往敌方陀螺的位置进行攻击
                    if (FightStage.ENEMY_SKILL_CD == 0) {
                        FightStage.MODE = 1;
                    }
                    else if (FightStage.CURR_TOP_ENEMY == 7) {
                        // 守护陀螺
                        FightStage.MODE = 2;
                    }
                    else {
                        FightStage.MODE = 0;
                    }
                    break;
                case beyondtop.JConfig.DOWN:
                    if (DataBase.coin > 2500)
                        DataBase.coin -= 2500, FightStage.MODE = 3;
                    else
                        this.out_of_coin.play(0, false), this.onKeyDown();
                    break;
                case beyondtop.JConfig.UP:
                    // 判断是否有足够的money
                    if (DataBase.diamond > 30)
                        DataBase.diamond -= 30, FightStage.MODE = 4;
                    else
                        this.out_of_diamond.play(0, false), this.onKeyDown();
                    break;
                case beyondtop.JConfig.ENTER:
                    // 判断技能CD是否读完
                    if (FightStage.ME_SKILL_CD == 0) {
                        FightStage.MODE = 5;
                    }
                    else {
                        this.onKeyDown();
                    }
                    break;
            }
        };
        /**
         * 设置随机数
         */
        FightStage.prototype.getRandom = function () {
            return Math.random();
        };
        /**
         * 取整
         */
        FightStage.prototype.getFloor = function (value) {
            return parseInt(value + "");
        };
        /**
         * 初始化按键事件
         */
        FightStage.prototype.initKeyEvent = function () {
            document.onkeydown = null;
        };
        return FightStage;
    }(ui.fightstageUI));
    // 陀螺初始位置坐标
    FightStage.ME_X0 = 5;
    FightStage.ENEMY_X0 = 806;
    // 陀螺中间相撞的x坐标
    FightStage.CRASH_MIDDLE_ME_X = 320;
    FightStage.CRASH_MIDDLE_ENEMY_X = 480;
    // 我方撞对方陀螺的坐标
    FightStage.CRASH_ENEMY_TO_X = 155;
    FightStage.CRASH_ME_TO_X = 655;
    // 陀螺相撞时攻击效果与陀螺的位置差
    FightStage.XOFF_ME_ATTACKED = -142;
    FightStage.XOFF_ENEMY_ATTACKED = -125;
    // 伤害数值ui与陀螺的位置差
    FightStage.XOFF_ME_INJURY = 81;
    FightStage.XOFF_ENEMY_INJURY = 77;
    // 陀螺撞击效果动画与我方陀螺的位置差
    FightStage.XOOF_CRASHING = -66;
    // 速度线与陀螺的位置差
    FightStage.XOFF_ME_MELINE = -184;
    FightStage.XOFF_ME_ENEMYELINE = 465;
    FightStage.XOFF_ENEMYE_MELINE = -180;
    FightStage.XOFF_ENEMY_ENEMYLINE = 472;
    // 当有盾时敌方攻击位置
    FightStage.CRASH_ENEMY_DUN_X = 225;
    FightStage.CRASH_ME_DUN_X = 570;
    //技能cd时长
    FightStage.ME_SKILL_CD = 3;
    FightStage.ENEMY_SKILL_CD = 3;
    // 当前回合
    FightStage.UP_TO_WHO = false;
    // 攻击模式
    FightStage.MODE = -1;
    FightStage.MODE_ATTACK = -1;
    beyondtop.FightStage = FightStage;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=FightStage.js.map