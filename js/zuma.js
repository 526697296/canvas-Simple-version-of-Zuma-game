window.onload = function(){
	
	var OG = document.getElementById('c1');
	var OGC = OG.getContext('2d');  //建立画布
	
	var i =0;
	
	//引入图片
	var yImg = new Image();
	yImg.src = '1.jpg';
	yImg.onload = function(){
		//开定时器
	setInterval(function(){
		//清除画布
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
		
		//绘制实心的小球
		for(var i=0;i<ball.length;i++){
			OGC.beginPath();
			OGC.moveTo(ball[i].x,ball[i].y);
			OGC.arc(ball[i].x,ball[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
			OGC.fill();
		}
		
		//图标添加到画布里面
		OGC.save();				//设置局部，因为这里在定时器里面，会受到定时器的影响
		OGC.translate(300,200);		//平移
		OGC.rotate(iRotate);
		OGC.translate(-40,-40);
		OGC.drawImage(yImg,0,0);		//图标的角度
		OGC.restore();					//把图标添加到画布里面
		
		//生成吐出来的子弹
		for(var i=0;i<bullet.length;i++){
			
			OGC.save();
			OGC.fillStyle = 'red';
			OGC.beginPath();
			OGC.moveTo(bullet[i].x,bullet[i].y);
			OGC.arc(bullet[i].x,bullet[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
			OGC.fill();
			OGC.restore();
		}
		
	},1000/60);
	
	
	setInterval(function(){
		
		for(var i=0;i<ball.length;i++){
			//实心小球运动的轨迹
			ball[i].num++;
			
			if(ball[i].num == 270){
				ball[i].r = 150;
				ball[i].StartX = 250;
				ball[i].StartY = 50;
			}
			
			//判断小球是否到了中心点，到了则停止
			if(ball[i].num == 270+180){
				alert("游戏结束!");
				window.location.reload();
			}
			
			ball[i].x = Math.sin(ball[i].num*Math.PI/180)*ball[i].r+ball[i].StartX;
			ball[i].y = ball[i].r-Math.cos(ball[i].num*Math.PI/180)*ball[i].r+ball[i].StartY;
		}
		//循环所有的子弹，更改他们的位移
		for(var i =0;i<bullet.length;i++){
			bullet[i].x = bullet[i].x + bullet[i].sX;
			bullet[i].y = bullet[i].y + bullet[i].sY;
		}
		//调用碰撞检测方法
		for(var i =0;i<bullet.length;i++){
			for(var j =0;j<ball.length;j++){
				if(pz(bullet[i].x,bullet[i].y,ball[j].x,ball[j].y)){
					
					bullet.splice(i,1);
					ball.splice(j,1);
					break;
				}
			}
		}
		
	},30);
	
	
	//创建动态的小球
	var ball = [];//创建一个数组
	
	//开一个定时器，没350往数组ball添加一次数据
	setInterval(function(){     
		ball.push({
			x:300,
			y:0,
			r:200,    //小球的半径
			num:0,
			StartX:300,   //最开始的x位置
			StartY:0    //最开始y的位置
		});
	},350);
	
	
	var iRotate = 0;
	OG.onmousemove = function(ev){
		var ev = ev||window.event;
		
		var x = ev.clientX - OG.offsetLeft;
		var y = ev.clientY - OG.offsetTop;
		
		var a = x-300;
		var b = y-200;
		var c = Math.sqrt(a*a+b*b);
		
		if(a>0 && b>0){
			iRotate = Math.asin(b/c)+90*Math.PI/180;
		}else if(a>0){
			iRotate = Math.asin(a/c);
		}
		if(a<0 && b>0){
			iRotate = -(Math.asin(b/c)+90*Math.PI/180);
		}else if(a<0){
			iRotate = Math.asin(a/c);
		}
	};
	
	//创建祖玛吐出的小球
	var bullet = [];
	OG.onmousedown = function(ev){
		var ev = ev||window.event;
		
		var x = ev.clientX - OG.offsetLeft;
		var y = ev.clientY - OG.offsetTop;
		
		var a = x-300;
		var b = y-200;
		var c = Math.sqrt(a*a+b*b);
		
		var speed = 5;
		var sX = speed * a/c;
		var sY = speed * b/c;
		
		bullet.push({
			x:300,
			y:200,
			sX:sX,
			sY:sY
		});
	};
	
	};
	
	//小球碰撞检测
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
};
