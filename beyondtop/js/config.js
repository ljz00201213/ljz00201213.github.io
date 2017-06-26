var beyondtop;
(function (beyondtop) {
    var JConfig = (function () {
        function JConfig() {
        }
        /**
         * 设置数值
         */
        JConfig.setNumber = function (path, num, uis) {
            var w = parseInt(num / 10000 + "");
            var q = parseInt(num / 1000 + "") % 10;
            var b = parseInt(num / 100 + "") % 10;
            var s = parseInt(num / 10 + "") % 10;
            var g = num % 10;
            //  alert(w + " " + q + " " + b + " " + s + " " + g)
            var len = uis.length;
            for (var i = 1; i < len; i++) {
                uis[i].visible = false;
            }
            if (w != 0 && len == 5) {
                uis[4].visible = true,
                    uis[3].visible = true,
                    uis[2].visible = true,
                    uis[1].visible = true,
                    uis[4].skin = path + w + ".png",
                    uis[3].skin = path + q + ".png",
                    uis[2].skin = path + b + ".png",
                    uis[1].skin = path + s + ".png";
            }
            else if (q != 0 && len > 3) {
                uis[3].visible = true,
                    uis[2].visible = true,
                    uis[1].visible = true,
                    uis[3].skin = path + q + ".png",
                    uis[2].skin = path + b + ".png",
                    uis[1].skin = path + s + ".png";
            }
            else if (b != 0 && len > 2) {
                uis[2].visible = true,
                    uis[1].visible = true,
                    uis[2].skin = path + b + ".png",
                    uis[1].skin = path + s + ".png";
            }
            else if (s != 0 && len > 1) {
                uis[1].visible = true,
                    uis[1].skin = path + s + ".png";
            }
            uis[0].visible = true, uis[0].skin = path + g + ".png";
        };
        /**
     * 计算战斗力
     */
        JConfig.culculatePower = function (powers) {
            var power = 0;
            var flag = -1;
            var len = DataBase.lock.length;
            for (var i = len - 1; i > -1; i--) {
                if (DataBase.lock[i] == 0) {
                    power += DataBase.topProperty[i][4];
                    flag++;
                }
                if (flag == 1)
                    break;
            }
            return (powers[0] - 1) * 790 + (powers[1] - 1) * 816 + (powers[2] - 1) * 400 + (powers[3] - 1) * 400 + power;
        };
        /**
         * 设置战斗力 钻石 金币 数量
         */
        JConfig.setInfo = function (info) {
            var paths = [
                "game/num_strong_0",
                "game/num_coin_0"
            ];
            var uiss = [
                [info.f4, info.f3, info.f2, info.f1, info.f0],
                [info.d3, info.d2, info.d1, info.d0],
                [info.c4, info.c3, info.c2, info.c1, info.c0]
            ];
            // 设置钻石
            if (DataBase.diamond > 9999)
                DataBase.diamond = 9999;
            JConfig.setNumber(paths[1], DataBase.diamond, uiss[1]);
            // 设置金币
            if (DataBase.coin > 99999)
                DataBase.coin = 99999;
            JConfig.setNumber(paths[1], DataBase.coin, uiss[2]);
            // 设置战斗力 
            DataBase.power = JConfig.culculatePower(DataBase.powerLevel);
            JConfig.setNumber(paths[0], DataBase.power, uiss[0]);
        };
        JConfig.createMovieClip = function (current, x, y, parent) {
            if (JConfig.mc)
                JConfig.mc.destroy();
            var SWFPath = "soulani/" + current + ".swf";
            JConfig.mc = new Laya.MovieClip();
            JConfig.mc.load(SWFPath);
            JConfig.mc.pos(x, y);
            parent.addChild(JConfig.mc);
        };
        JConfig.getData = function (item) {
            return Laya.LocalStorage.getJSON(item);
        };
        JConfig.setData = function (item, data) {
            Laya.LocalStorage.setJSON(item, data);
        };
        /**
         * 播放音效
         */
        JConfig.playSound = function (path, which) {
            if (which)
                Laya.SoundManager.playMusic(path, 0);
            else
                Laya.SoundManager.playSound(path);
        };
        return JConfig;
    }());
    JConfig.WIDTH = 1080;
    JConfig.HEIGHT = 720;
    // 键盘
//     static BACK = 8;
//     static ENTER = 13;
//     static LEFT = 37;
//     static RIGHT = 39;
//     static UP = 38;
//     static DOWN = 40;
    // 机顶盒
    JConfig.BACK = 4;
    JConfig.ENTER = 23;
    JConfig.LEFT = 21;
    JConfig.RIGHT = 22;
    JConfig.UP = 19;
    JConfig.DOWN = 20;
    /**
    * 设置存贮用户信息
    */
    JConfig.DIAMOND = "diamomd";
    JConfig.COIN = "coin";
    JConfig.PASSLEVEL = "passLevel";
    JConfig.LOCK = "lock";
    JConfig.POWERLEVEL = "powerLevel";
    beyondtop.JConfig = JConfig;
})(beyondtop || (beyondtop = {}));
//# sourceMappingURL=config.js.map
