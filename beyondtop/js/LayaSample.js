// 程序入口
var beyondtop;
(function (beyondtop) {
    var GameMain = (function () {
        function GameMain() {
            this.flag = -1;
            Laya.init(beyondtop.JConfig.WIDTH, beyondtop.JConfig.HEIGHT, Laya.WebGL);
            // Laya.Stat.show(10, 60);
            //设置适配
            Laya.stage.scaleMode = "exactfit";
            // 设置对齐方式
            Laya.stage.alignV = "center";
            Laya.stage.alignH = "middle";
            // 设置竖屏
            Laya.stage.screenMode = "horizontal";
            Laya.stage.bgColor = "#928989";
            var assets = [];
            assets.push({
                url: [
                    "game/firstbg.png",
                    "game/equip.png",
                    "game/info.png",
                    "game/topbg.png",
                    "game/strongerbg.png",
                    "game/down1.png",
                    "game/down2.png",
                    "game/level_bg0.png",
                    "game/level_bg1.png",
                    "game/level_bg2.png",
                    "game/level_bg3.png",
                    "game/shopbg.png",
                    "game/titlebg.png",
                    "game/non_of_top.png",
                    "game/readybg.png",
                    "game/levelbg.png",
                    "game/stage_fight_down.png",
                    "game/stage_up0.png",
                    "game/stage_up1.png",
                ],
                type: Laya.Loader.IMAGE
            });
            assets.push({
                url: [
                    "res/atlas/game.json",
                ],
                type: Laya.Loader.ATLAS
            });
            assets.push({
                url: [
                    "music/bg.wav",
                    "music/win.wav",
                    "music/fail.wav"
                ],
                type: Laya.Loader.SOUND
            });
            Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded));
        }
        /**
         * 初始化加载资源
         */
        GameMain.prototype.onLoaded = function () {
            if (window.loadingView)
                window.loadingView.loading(100);
            this.home = new beyondtop.Home();
            Laya.stage.addChild(this.home);
            this.home.ani1.play(0, true);
            // 获取用户数据
            this.getUserData();
            Laya.timer.frameLoop(1, this, this.onLoop);
            beyondtop.JConfig.playSound("music/bg.wav", true);
        };
        /**
         * 获取用户数据
         */
        GameMain.prototype.getUserData = function () {
            // var diamond = beyondtop.JConfig.getData(beyondtop.JConfig.DIAMOND);
            // var coin = beyondtop.JConfig.getData(beyondtop.JConfig.COIN);
            // var passlevel = beyondtop.JConfig.getData(beyondtop.JConfig.PASSLEVEL);
            // var lock = beyondtop.JConfig.getData(beyondtop.JConfig.LOCK);
            // var powerlevel = beyondtop.JConfig.getData(beyondtop.JConfig.POWERLEVEL);
            // if(!diamond) DataBase.diamond = diamond;
            // if(!coin) DataBase.coin = coin;
            // if(!passlevel) DataBase.passLevel = passlevel;
            // if(!lock) DataBase.lock = lock;
            // if(!powerlevel) DataBase.powerLevel = powerlevel;
        };
        /**
         * 主循环
         */
        GameMain.prototype.onLoop = function () {
            if (this.home.visible) {
                this.flag = this.home.flag;
                if (this.flag == 0) {
                    if (!this.equip) {
                        this.equip = new beyondtop.Equip();
                        Laya.stage.addChild(this.equip);
                    }
                    this.setSurfaceChange(this.home, this.equip);
                }
            }
            else if (this.equip && this.equip.visible) {
                this.flag = this.equip.flag;
                if (this.flag == 4) {
                    // 返回上一界面
                    this.setSurfaceChange(this.equip, this.home);
                }
                else if (this.flag == 0) {
                    // 前往陀螺界面
                    if (!this.topChoose) {
                        this.topChoose = new beyondtop.TopChoose();
                        Laya.stage.addChild(this.topChoose);
                    }
                    this.setSurfaceChange(this.equip, this.topChoose);
                }
                else if (this.flag == 1) {
                    //  前往强化界面
                    if (!this.topStronger) {
                        this.topStronger = new beyondtop.TopStronger();
                        Laya.stage.addChild(this.topStronger);
                    }
                    this.setSurfaceChange(this.equip, this.topStronger);
                }
                else if (this.flag == 2) {
                    //  前往商店界面
                    if (!this.topShop) {
                        this.topShop = new beyondtop.TopShop();
                        Laya.stage.addChild(this.topShop);
                    }
                    this.setSurfaceChange(this.equip, this.topShop);
                }
                else if (this.flag == 3) {
                    //  前往游戏界面
                    if (!this.levelChoose) {
                        this.levelChoose = new beyondtop.LevelChoose();
                        Laya.stage.addChild(this.levelChoose);
                    }
                    this.setSurfaceChange(this.equip, this.levelChoose);
                }
            }
            else if (this.topChoose && this.topChoose.visible) {
                this.flag = this.topChoose.flag;
                if (this.flag == 4) {
                    this.setSurfaceChange(this.topChoose, this.equip);
                }
            }
            else if (this.topStronger && this.topStronger.visible) {
                this.flag = this.topStronger.flag;
                if (this.flag == 4) {
                    this.setSurfaceChange(this.topStronger, this.equip);
                }
            }
            else if (this.topShop && this.topShop.visible) {
                this.flag = this.topShop.flag;
                if (this.flag == 4) {
                    this.setSurfaceChange(this.topShop, this.equip);
                }
            }
            else if (this.levelChoose && this.levelChoose.visible) {
                this.flag = this.levelChoose.flag;
                if (this.flag == 4) {
                    this.setSurfaceChange(this.levelChoose, this.equip);
                }
                else if (this.flag > -1) {
                    // 进入到选关界面
                    if (!this.leveItemChoose) {
                        this.leveItemChoose = new beyondtop.LevelItem(this.flag);
                        Laya.stage.addChild(this.leveItemChoose);
                    }
                    this.bigLevel = this.flag;
                    this.setSurfaceChange2(this.levelChoose, this.leveItemChoose, this.flag);
                }
            }
            else if (this.leveItemChoose && this.leveItemChoose.visible) {
                this.flag = this.leveItemChoose.flag;
                if (this.flag == 7) {
                    this.setSurfaceChange(this.leveItemChoose, this.levelChoose);
                }
                else if (this.flag > -1) {
                    this.smallLevel = this.flag;
                    if (!this.topReady) {
                        this.topReady = new beyondtop.TopReady();
                        Laya.stage.addChild(this.topReady);
                    }
                    this.setSurfaceChange(this.leveItemChoose, this.topReady);
                }
            }
            else if (this.topReady && this.topReady.visible) {
                this.flag = this.topReady.flag;
                if (this.flag == 4) {
                    this.setSurfaceChange2(this.topReady, this.leveItemChoose, this.bigLevel);
                }
                else if (this.flag == 0) {
                    // if(this.fightStage) this.fightStage.destroy();
                    this.fightStage = new beyondtop.FightStage(this.bigLevel, this.smallLevel);
                    Laya.stage.addChild(this.fightStage);
                    this.setSurfaceChange(this.topReady, this.fightStage);
                }
            }
            else if (this.fightStage && this.fightStage.visible) {
                this.flag = this.fightStage.flag;
                if (this.flag == 100) {
                    // 退回到小关卡选择界面
                    this.setSurfaceChange2(this.fightStage, this.leveItemChoose, this.bigLevel);
                }
                else if (this.flag == 101) {
                    // 前往强化页面
                    if (!this.topStronger) {
                        this.topStronger = new beyondtop.TopStronger();
                        Laya.stage.addChild(this.topStronger);
                    }
                    this.setSurfaceChange(this.fightStage, this.topStronger);
                }
                else if (this.flag == 102) {
                    // 前往陀螺界面
                    if (!this.topChoose) {
                        this.topChoose = new beyondtop.TopChoose();
                        Laya.stage.addChild(this.topChoose);
                    }
                    this.setSurfaceChange(this.fightStage, this.topChoose);
                }
            }
        };
        /**
         * 设置界面转换
         */
        GameMain.prototype.setSurfaceChange = function (currSurface, nextSurface) {
            // 隐藏当前界面
            currSurface.visible = false;
            // 初始化当前界面flag
            currSurface.flag = -1;
            if (currSurface === this.fightStage)
                currSurface.destroy();
            // 初始化stage的flag
            this.flag = -1;
            // 设置新的界面可见
            nextSurface.visible = true;
            // 设置界面初始化
            nextSurface.init();
        };
        /**
        * 设置界面转换
        */
        GameMain.prototype.setSurfaceChange2 = function (currSurface, nextSurface, flag) {
            // 隐藏当前界面
            currSurface.visible = false;
            // 初始化当前界面flag
            currSurface.flag = -1;
            if (currSurface === this.fightStage)
                currSurface.destroy();
            // 初始化stage的flag
            this.flag = -1;
            // 设置新的界面可见
            nextSurface.visible = true;
            // 设置界面初始化
            nextSurface.init(flag);
        };
        return GameMain;
    }());
    beyondtop.GameMain = GameMain;
})(beyondtop || (beyondtop = {}));
var game = new beyondtop.GameMain();
//# sourceMappingURL=LayaSample.js.map