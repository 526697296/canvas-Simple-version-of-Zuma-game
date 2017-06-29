# canvas-Simple-version-of-Zuma-game

[演示地址](https://526697296.github.io/canvas-Simple-version-of-Zuma-game/)

## 实现的功能

* 游戏可以正常的运行
* 子弹和吐出来的小球--碰撞检测
* 吐出来的小球根据我们画出来的轨迹运行

##  代码实现

* 运动轨迹的实现
OGC.clearRect(0,0,OG.width,OG.height);
OGC.beginPath();
//绘制圆
OGC.arc(300,200,200,-90*Math.PI/180,180*Math.PI/180,false);
OGC.stroke();
		
OGC.beginPath();
//绘制小圆
OGC.arc(250,200,150,180*Math.PI/180,360*Math.PI/180,false);
OGC.stroke();
		
OGC.beginPath();
//绘制
OGC.arc(400,200,20,0*Math.PI/180,360*Math.PI/180,false);
OGC.stroke();

* 碰撞检测

function pz(x1,y1,x2,y2){
		
		var a = x1 - x2;
		var b = y1 - y2;
		
		var c = Math.sqrt(a*a + b*b);
		
		if(c < 40){
			return true;
		}
		else{
			return false;
		}
		
	}
......
