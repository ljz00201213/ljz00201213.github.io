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
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home() {
            var _this = _super.call(this) || this;
            _this.flag = -1;
            // 设置点击事件
            _this.onKeyDown();
            return _this;
        }
        /**
        * 初始化界面操作
        */
        Home.prototype.init = function () {
            this.onKeyDown();
        };
        /**
         * 按键监听
         */
        Home.prototype.onKeyDown = function () {
            var t = this;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case beyondtop.JConfig.ENTER:
                        t.flag = 0;
                        break;
                }
            };
        };
        return Home;
    }(ui.homeUI));
    beyondtop.Home = Home;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=Home.js.map