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
    var TopShop = (function (_super) {
        __extends(TopShop, _super);
        function TopShop() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            _this.init();
            _this.ani1.play(0, true);
            return _this;
        }
        /**
        * 初始化界面操作
        */
        TopShop.prototype.init = function () {
            beyondtop.JConfig.setInfo(this.info);
            this.onKeyDown();
            // 初始化选中框的位置
            this.initChoosePos();
        };
        TopShop.prototype.initChoosePos = function () {
            this.choose.x = TopShop.CHOOSE_X;
            this.e0.scaleY = 1.1;
            this.e1.scaleY = 1;
            this.e2.scaleY = 1;
            this.e3.scaleY = 1;
            this.b0.scaleY = 1.1;
            this.b1.scaleY = 1;
            this.b2.scaleY = 1;
            this.b3.scaleY = 1;
        };
        TopShop.prototype.onKeyDown = function () {
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
                        var which;
                        if (t.choose.x == TopShop.CHOOSE_X)
                            which = 0;
                        else if (t.choose.x == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X)
                            which = 1;
                        else if (t.choose.x == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 2)
                            which = 2;
                        else if (t.choose.x == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 3)
                            which = 3;
                        else if (t.choose.x == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 4)
                            which = 4;
                        t.buyGood(which);
                        break;
                    case beyondtop.JConfig.UP:
                        // 返回上一界面
                        t.flag = 4;
                        break;
                }
            };
        };
        /**
         * 购买商品操作
         */
        TopShop.prototype.buyGood = function (which) {
            var price = DataBase.goodPrice[which];
            if (DataBase.diamond < price) {
                // 钻石不足
                this.out_of_diamond.play(0, false);
            }
            else {
                DataBase.diamond -= price;
                this.buy.play(0, false);
                if (which == 0)
                    DataBase.coin += 1000;
                else if (which == 1)
                    DataBase.coin += 3000;
                else if (which == 2)
                    DataBase.skill[0] += 3, DataBase.skill[1] += 3, DataBase.skill[2] += 3;
                else if (which == 3) {
                    DataBase.diamond += 60, DataBase.coin += 2000;
                    if (DataBase.lock[3] == 0)
                        DataBase.coin += 3000;
                    else
                        DataBase.lock[3] = 0;
                }
                else if (which == 4) {
                    DataBase.diamond += 128, DataBase.coin += 4000;
                    if (DataBase.lock[6] == 0)
                        DataBase.diamond += 360;
                    else
                        DataBase.lock[6] = 0;
                }
                beyondtop.JConfig.setInfo(this.info);
            }
        };
        /**
         * 设置选择框的位置
         * key true  left
         */
        TopShop.prototype.setChoosePos = function (pos, key) {
            var t = this;
            if (key) {
                if (pos < TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 4) {
                    this.choose.x += TopShop.CHOOSE_OFF_X;
                    if (pos == TopShop.CHOOSE_X)
                        t.setChooseScale(t.e0, t.e1, t.b0, t.b1);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e2, t.b1, t.b2);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e3, t.b2, t.b3);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 3)
                        t.setChooseScale(t.e3, t.e4, t.b3, t.b4);
                }
                else {
                    this.choose.x = TopShop.CHOOSE_X;
                    t.setChooseScale(t.e4, t.e0, t.b4, t.b0);
                }
            }
            else {
                if (pos > TopShop.CHOOSE_X) {
                    this.choose.x -= TopShop.CHOOSE_OFF_X;
                    if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X)
                        t.setChooseScale(t.e1, t.e0, t.b1, t.b0);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 2)
                        t.setChooseScale(t.e2, t.e1, t.b2, t.b1);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 3)
                        t.setChooseScale(t.e3, t.e2, t.b3, t.b2);
                    else if (pos == TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 4)
                        t.setChooseScale(t.e4, t.e3, t.b4, t.b3);
                }
                else {
                    this.choose.x = TopShop.CHOOSE_X + TopShop.CHOOSE_OFF_X * 4;
                    t.setChooseScale(t.e0, t.e4, t.b0, t.b4);
                }
            }
        };
        /**
         * 设置界面缩放
         */
        TopShop.prototype.setChooseScale = function (e0, e1, b0, b1) {
            e0.scaleY = 1;
            e1.scaleY = 1.1;
            b0.scaleY = 1;
            b1.scaleY = 1.1;
        };
        return TopShop;
    }(ui.topshopUI));
    // 选中框的初始x坐标
    TopShop.CHOOSE_X = 175;
    // 选中框的x坐标偏移
    TopShop.CHOOSE_OFF_X = 190;
    beyondtop.TopShop = TopShop;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=TopShop.js.map