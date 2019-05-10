//自调用函数---游戏对象
(function(){
    var that=null;
    //游戏的构造函数
    function Game(map) {
        this.food=new Food();//食物对象
        this.snake=new Snake();//小蛇对象
        this.map=map;//地图
        that=this;
    }
    Game.prototype.init=function () {
        //初始化游戏
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        // this.snake.move(this.food,this.map);
        // this.snake.init(this.map);
        // setInterval(function () {
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150);这行代码不再这里写，尽可能保持一个方法做一件事
        //调用自动移动小蛇的方法
        this.runSnake(this.food,this.map);
        //调用按键的方法
        this.bindkey();
    };
    //添加原型方法---设置小蛇可以自动地跑起来
    Game.prototype.runSnake=function(food,map){
        //自动地去移动
        var timeId=setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food,map);
            //初始化小蛇
            this.snake.init(map);
            //横坐标的最大值
            var maxX=map.offsetWidth/this.snake.width;//40
            //纵坐标的最大值
            var maxY=map.offsetHeight/this.snake.height;
            //小蛇头的坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //横坐标
            if(headX<0||headX>=maxX){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            //纵坐标
            if (headY<0||headY>=maxY){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that),150);
    };//调用了bind就把当前setInterval里的this改为了that，this不再是window
    //添加原型方法--设置用户按键，改变小蛇移动的方向
    Game.prototype.bindkey=function(){
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown",function (e) {
            //这里的this应该时触发keydown的事件的对象--document
            //获取按键的值
            switch (e.keyCode) {
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false)
    };
    window.Game=Game;

}());