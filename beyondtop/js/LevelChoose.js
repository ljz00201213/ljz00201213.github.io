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
    var LevelChoose = (function (_super) {
        __extends(LevelChoose, _super);
        function LevelChoose() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            _this.level0 = new Laya.Sprite;
            _this.addChild(_this.level0);
            _this.level1 = new Laya.Sprite;
            _this.addChild(_this.level1);
            _this.level2 = new Laya.Sprite;
            _this.addChild(_this.level2);
            _this.level3 = new Laya.Sprite;
            _this.addChild(_this.level3);
            _this.level0_tex = Laya.loader.getRes("game/level0.png");
            _this.level1_tex = Laya.loader.getRes("game/level1.png");
            _this.level2_tex = Laya.loader.getRes("game/level2.png");
            _this.level3_tex = Laya.loader.getRes("game/level3.png");
            _this.level0.size(112, 268);
            _this.level1.size(112, 268);
            _this.level2.size(112, 268);
            _this.level3.size(112, 268);
            _this.level0.pivotY = 134;
            _this.level1.pivotY = 134;
            _this.level2.pivotY = 134;
            _this.level3.pivotY = 134;
            _this.init();
            _this.ani1.play(0, true);
            return _this;
        }
        /**
        * 初始化界面操作
        */
        LevelChoose.prototype.init = function () {
            beyondtop.JConfig.setInfo(this.info);
            this.onKeyDown();
            // 初始化选中框的位置
            this.initChoosePos();
        };
        LevelChoose.prototype.initChoosePos = function () {
            this.choose.x = LevelChoose.CHOOSE_X;
            this.e0.scaleY = 1.1;
            this.e1.scaleY = 1;
            this.e2.scaleY = 1;
            this.e3.scaleY = 1;
            this.b0.scaleY = 1.1;
            this.b1.scaleY = 1;
            this.b2.scaleY = 1;
            this.b3.scaleY = 1;
            /**
             * 设置关卡靓图
             */
            this.level0.graphics.clear();
            this.level1.graphics.clear();
            this.level2.graphics.clear();
            this.level3.graphics.clear();
            this.level0.scaleY = 1.1;
            var height = this.level0_tex.height * (DataBase.passLevel[0] + 1) / 8;
            this.level0.graphics.drawTexture(Laya.Texture.createFromTexture(this.level0_tex, 0, 0, this.level0_tex.width, height), 151, 382 - 35);
            this.level1.graphics.drawTexture(Laya.Texture.createFromTexture(this.level1_tex, 0, 0, this.level1_tex.width, this.level1_tex.height * (DataBase.passLevel[1] + 1) / 8), 379, 382);
            this.level2.graphics.drawTexture(Laya.Texture.createFromTexture(this.level2_tex, 0, 0, this.level2_tex.width, this.level2_tex.height * (DataBase.passLevel[2] + 1) / 8), 609, 382);
            this.level3.graphics.drawTexture(Laya.Texture.createFromTexture(this.level3_tex, 0, 0, this.level3_tex.width, this.level3_tex.height * (DataBase.passLevel[3] + 1) / 8), 839, 382);
        };
        LevelChoose.prototype.onKeyDown = function () {
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
                        if (t.choose.x == LevelChoose.CHOOSE_X)
                            t.flag = 0;
                        else if (t.choose.x == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X)
                            t.flag = 1;
                        else if (t.choose.x == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 2)
                            t.flag = 2;
                        else if (t.choose.x == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 3)
                            t.flag = 3;
                        break;
                    case beyondtop.JConfig.UP:
                        // 返回上一界面
                        t.flag = 4;
                        break;
                }
            };
        };
        /**
        * 设置选择框的位置
        * key true  left
        */
        LevelChoose.prototype.setChoosePos = function (pos, key) {
            var t = this;
            if (key) {
                if (pos < LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 3) {
                    this.choose.x += LevelChoose.CHOOSE_OFF_X;
                    if (pos == LevelChoose.CHOOSE_X)
                        t.setChooseScale(t.e0, t.e1, t.b0, t.b1, this.level0, this.level1);
                    else if (pos == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e2, t.b1, t.b2, this.level1, this.level2);
                    else if (pos == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e3, t.b2, t.b3, this.level2, this.level3);
                }
                else {
                    this.choose.x = LevelChoose.CHOOSE_X;
                    t.setChooseScale(t.e3, t.e0, t.b3, t.b0, this.level3, this.level0);
                }
            }
            else {
                if (pos > LevelChoose.CHOOSE_X) {
                    this.choose.x -= LevelChoose.CHOOSE_OFF_X;
                    if (pos == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e0, t.b1, t.b0, this.level1, this.level0);
                    else if (pos == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e1, t.b2, t.b1, this.level2, this.level1);
                    else if (pos == LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 3)
                        t.setChooseScale(t.e3, t.e2, t.b3, t.b2, this.level3, this.level2);
                }
                else {
                    this.choose.x = LevelChoose.CHOOSE_X + LevelChoose.CHOOSE_OFF_X * 3;
                    t.setChooseScale(t.e0, t.e3, t.b0, t.b3, this.level0, this.level3);
                }
            }
        };
        /**
         * 设置界面缩放
         */
        LevelChoose.prototype.setChooseScale = function (e0, e1, b0, b1, level0, level1) {
            e0.scaleY = 1;
            e1.scaleY = 1.1;
            b0.scaleY = 1;
            b1.scaleY = 1.1;
            level0.scaleY = 1;
            level1.scaleY = 1.1;
            level0.graphics.clear();
            level1.graphics.clear();
            if (level0 === this.level0) {
                var height = this.level0_tex.height * (DataBase.passLevel[0] + 1) / 8;
                this.level0.graphics.drawTexture(Laya.Texture.createFromTexture(this.level0_tex, 0, 0, this.level0_tex.width, height), 151, 382);
            }
            else if (level0 === this.level1) {
                var height = this.level1_tex.height * (DataBase.passLevel[1] + 1) / 8;
                this.level1.graphics.drawTexture(Laya.Texture.createFromTexture(this.level1_tex, 0, 0, this.level1_tex.width, height), 379, 382);
            }
            else if (level0 === this.level2) {
                var height = this.level2_tex.height * (DataBase.passLevel[2] + 1) / 8;
                this.level2.graphics.drawTexture(Laya.Texture.createFromTexture(this.level2_tex, 0, 0, this.level2_tex.width, height), 609, 382);
            }
            else if (level0 === this.level3) {
                var height = this.level3_tex.height * (DataBase.passLevel[3] + 1) / 8;
                this.level3.graphics.drawTexture(Laya.Texture.createFromTexture(this.level3_tex, 0, 0, this.level3_tex.width, height), 839, 382);
            }
            if (level1 === this.level0) {
                var height = this.level0_tex.height * (DataBase.passLevel[0] + 1) / 8;
                this.level0.graphics.drawTexture(Laya.Texture.createFromTexture(this.level0_tex, 0, 0, this.level0_tex.width, height), 151, 382 - 35);
            }
            else if (level1 === this.level1) {
                var height = this.level1_tex.height * (DataBase.passLevel[1] + 1) / 8;
                this.level1.graphics.drawTexture(Laya.Texture.createFromTexture(this.level1_tex, 0, 0, this.level1_tex.width, height), 379, 382 - 35);
            }
            else if (level1 === this.level2) {
                var height = this.level2_tex.height * (DataBase.passLevel[2] + 1) / 8;
                this.level2.graphics.drawTexture(Laya.Texture.createFromTexture(this.level2_tex, 0, 0, this.level2_tex.width, height), 609, 382 - 35);
            }
            else if (level1 === this.level3) {
                var height = this.level3_tex.height * (DataBase.passLevel[3] + 1) / 8;
                this.level3.graphics.drawTexture(Laya.Texture.createFromTexture(this.level3_tex, 0, 0, this.level3_tex.width, height), 839, 382 - 35);
            }
        };
        return LevelChoose;
    }(ui.stagechooseUI));
    // 选中框的初始x坐标
    LevelChoose.CHOOSE_X = 217;
    // 选中框的x坐标偏移
    LevelChoose.CHOOSE_OFF_X = 230;
    beyondtop.LevelChoose = LevelChoose;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=LevelChoose.js.map