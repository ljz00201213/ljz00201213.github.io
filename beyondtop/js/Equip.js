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
    var Equip = (function (_super) {
        __extends(Equip, _super);
        function Equip() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            // 设置基本信息
            _this.init();
            _this.ani1.play(0, true);
            return _this;
        }
        /**
         * 初始化界面操作
         */
        Equip.prototype.init = function () {
            beyondtop.JConfig.setInfo(this.info);
            this.onKeyDown();
            // 初始化选中框的位置
            this.initChoosePos();
        };
        Equip.prototype.initChoosePos = function () {
            this.choose.x = Equip.CHOOSE_X;
            this.e0.scaleY = 1.2;
            this.e1.scaleY = 1;
            this.e2.scaleY = 1;
            this.e3.scaleY = 1;
        };
        Equip.prototype.onKeyDown = function () {
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
                        if (t.choose.x == Equip.CHOOSE_X)
                            t.flag = 0;
                        else if (t.choose.x == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X)
                            t.flag = 1;
                        else if (t.choose.x == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 2)
                            t.flag = 2;
                        else if (t.choose.x == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 3)
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
        Equip.prototype.setChoosePos = function (pos, key) {
            var t = this;
            if (key) {
                if (pos < Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 3) {
                    this.choose.x += Equip.CHOOSE_OFF_X;
                    if (pos == Equip.CHOOSE_X)
                        t.setChooseScale(t.e0, t.e1);
                    else if (pos == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e2);
                    else if (pos == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e3);
                }
                else {
                    this.choose.x = Equip.CHOOSE_X;
                    t.setChooseScale(t.e3, t.e0);
                }
            }
            else {
                if (pos > Equip.CHOOSE_X) {
                    this.choose.x -= Equip.CHOOSE_OFF_X;
                    if (pos == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e0);
                    else if (pos == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e1);
                    else if (pos == Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 3)
                        t.setChooseScale(t.e3, t.e2);
                }
                else {
                    this.choose.x = Equip.CHOOSE_X + Equip.CHOOSE_OFF_X * 3;
                    t.setChooseScale(t.e0, t.e3);
                }
            }
        };
        /**
         * 设置界面缩放
         */
        Equip.prototype.setChooseScale = function (e0, e1) {
            e0.scaleY = 1;
            e1.scaleY = 1.2;
        };
        return Equip;
    }(ui.equipUI));
    // 选中框的初始x坐标
    Equip.CHOOSE_X = 192;
    // 选中框的x坐标偏移
    Equip.CHOOSE_OFF_X = 230;
    beyondtop.Equip = Equip;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=Equip.js.map