function Game(options) {
    //获取dom对象
    this.bg = options.bg;
    this.myplane = options.myplane;
    //调用背景移动方法
    this.bgmove(options);
    //调用我的飞机移动方法
    this.myplaneMove(options);


}

//背景,子弹移动
Game.prototype.bgmove = function (options) {

    //存放this
    var self = this;
    //定义移动的像素
    var x_num = 0;
    //定义子弹生成条件数
    var h = 0;
    setInterval(function () {
        //定义子弹生成条件
        if (x_num == 20 * h) {
            self.bullet(options);
            h++;
        }
        //背景移动
        x_num = x_num + 0.5;
        self.bg.style.backgroundPositionY = x_num + "px";
        //获取所有子弹
        var buls = document.querySelectorAll('.bul');
        for (let i = 0; i < buls.length; i++) {
            var top_num = parseInt(window.getComputedStyle(buls[i], null)["top"]) - 1;
            //删除子弹
            if (top_num == 0) {
                buls[i].remove();
            }
            //子弹移动
            buls[i].style.top = top_num + 'px';

        }

    }, 5)
}
//我的飞机移动
Game.prototype.myplaneMove = function (options) {
    // 存放鼠标的位置，left，top值
    var x_down, y_down, left_move, top_move;
    //存放this
    var self = this;
    //鼠标点击事件
    this.myplane.onmousedown = function (e) {
        //获取鼠标在.game盒子上的位置
        x_down = e.pageX - self.bg.offsetLeft;
        y_down = e.pageY - self.bg.offsetTop;
        //最大位置
        var x_max = self.bg.offsetWidth - self.myplane.offsetWidth / 2;
        var y_max = self.bg.offsetHeight - self.myplane.offsetHeight / 2;
        //我的飞机定位的left，top值
        left_move = parseInt(window.getComputedStyle(this, null)["left"]);
        top_move = parseInt(window.getComputedStyle(this, null)["top"]);
        //飞机边界限制
        if (y_down >= y_max) {
            this.style.top = y_max - self.myplane.offsetHeight / 2 + 'px';
        } else if (y_down <= self.myplane.offsetHeight / 2) {
            this.style.top = 0 + 'px';

        } else {
            this.style.top = y_down - self.myplane.offsetHeight / 2 + 'px';
        }
        if (x_down <= self.myplane.offsetWidth / 2) {
            this.style.left = 0 + 'px';
        } else if (x_down >= x_max) {
            this.style.left = x_max - self.myplane.offsetWidth / 2 + 'px';
        } else {
            this.style.left = x_down - self.myplane.offsetWidth / 2 + 'px';
        }
        // 鼠标移动事件
        self.myplane.onmousemove = function (e) {
            //鼠标每次移动的位置
            var x_mo = e.pageX - self.bg.offsetLeft;
            var y_mo = e.pageY - self.bg.offsetTop;
            console.log(x_mo);
            //飞机移动的值
            var x_move = x_mo - x_down + left_move;
            var y_move = y_mo - y_down + top_move;
            //飞机移动
            this.style.left = x_move + 'px'
            this.style.top = y_move + 'px'
            //获取飞机移动后的left，top值
            var left_move_max = parseInt(window.getComputedStyle(this, null)["left"]);
            var top_move_max = parseInt(window.getComputedStyle(this, null)["top"]);
            //飞机边界限制
            if (left_move_max <= 0) {
                this.style.left = 0 + 'px';
            } else if (left_move_max >= self.bg.offsetWidth - self.myplane.offsetWidth) {
                this.style.left = self.bg.offsetWidth - self.myplane.offsetWidth + 'px';
            }
            if (top_move_max <= 0) {
                this.style.top = 0 + 'px';
            } else if (top_move_max >= self.bg.offsetHeight - self.myplane.offsetHeight) {
                this.style.top = self.bg.offsetHeight - self.myplane.offsetHeight + 'px';
            }
        };
        // 鼠标松开事件
        self.myplane.onmouseup = function (e) {
            // 解除鼠标移动事件
            self.myplane.onmousemove = null;
        }
    };
}
//我的飞机生成子弹]
Game.prototype.bullet = function (options) {
    //创建子弹
    var bul = document.createElement('div');
    //赋类名
    bul.classList.add("bul");
    //子弹生成位置
    var l_num = this.myplane.offsetLeft + 31;
    var t_num = this.myplane.offsetTop - 9;
    console.log(t_num);
    bul.style.left = l_num + 'px';
    bul.style.top = t_num + 'px';
    //子弹放到飞机上
    this.bg.appendChild(bul);
}
//随机生成敌方飞机
Game.prototype.enemyplane = function (options) {

}
//敌方飞机移动


// 实例化Game对象
var game = new Game({
    // 游戏区域的dom对象
    bg: document.querySelector("#game"),
    myplane: document.querySelector('.myairplane'),

});