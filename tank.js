const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// canvasのサイズを設定
canvas.width = 1000;
canvas.height = 1000;


// 戦車の画像を設定
const tankImg = new Image();
tankImg.src = "tank.png";

// キャンバスをウィンドウのサイズに合わせる
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 戦車の位置とサイズ
const tank = {
    x: 50,
    y: canvas.height - 120,
    width: 100,
    height: 100
};

// 球を格納する配列
const balls = [];

// 戦車の描画
function drawTank() {
    ctx.drawImage(tankImg, tank.x, tank.y, tank.width, tank.height);
}

// 球のクラスを定義
class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.speed = 5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y -= this.speed;
    }
}

// キーの状態を追跡するオブジェクト
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

// タンクを動かすためのイベントリスナー
document.addEventListener("keydown", (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    } else if (event.key === " ") {
        // スペースキーで球を発射
        balls.push(new Ball(tank.x + tank.width / 2, tank.y));
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

// アニメーションループ
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // タンクの移動処理
    if (keys.ArrowUp && tank.y > 0) {
        tank.y -= 5;
    }
    if (keys.ArrowDown && tank.y < canvas.height - tank.height) {
        tank.y += 5;
    }
    if (keys.ArrowLeft && tank.x > 0) {
        tank.x -= 5;
    }
    if (keys.ArrowRight && tank.x < canvas.width - tank.width) {
        tank.x += 5;
    }

    // 戦車を描画
    drawTank();
    
    // 球を更新し、描画
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
        
        // 画面外に出た球を配列から削除
        if (balls[i].y + balls[i].radius < 0) {
            balls.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animate);
}

// 画像が読み込まれた後にアニメーションを開始
tankImg.onload = () => {
    animate();
};

// 敵戦車の画像を読み込む
function LoadEtank() {
    let LEtank = new Image();
    LEtank.src = "EN.png";
    return LEtank;
}

// 敵戦車を格納する
const Enemytank = [];

// スポーンさせる
function EnemytankSpawn() {
    for(let i = 0; i < 10; i++) {
        Enemytank.push({
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 100),
            img: LoadEtank()
        });
    }
}

//もし敵戦車が10台あるなら関数Enemytank処理をを３０秒止める
 if(Enemytank.length >= 10) {
    setTimeout(() => {
        Enemytank() = []
    }, 30000);
 }

// アニメーションループ
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // タンクの移動処理
    if (keys.ArrowUp && tank.y > 0) {
        tank.y -= 5;
    }
    if (keys.ArrowDown && tank.y < canvas.height - tank.height) {
        tank.y += 5;
    }
    if (keys.ArrowLeft && tank.x > 0) {
        tank.x -= 5;
    }
    if (keys.ArrowRight && tank.x < canvas.width - tank.width) {
        tank.x += 5;
    }

    // 戦車を描画
    drawTank();

    // 球を更新し、描画
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();

        if (balls[i].y + balls[i].radius < 0) {
            balls.splice(i, 1);
            i--;
        }
    }

    // 敵戦車を描画
    for (let i = 0; i < Enemytank.length; i++) {
        ctx.drawImage(Enemytank[i].img, Enemytank[i].x, Enemytank[i].y, 100, 100);
    }

    requestAnimationFrame(animate);
}

// 画像が読み込まれた後にアニメーションを開始
tankImg.onload = () => {
    animate();
};

// 2秒ごとに敵戦車を追加する
setInterval(EnemytankSpawn, 2000);
