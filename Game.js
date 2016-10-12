function init() {
    let moveSpeed = 4;
    let chickSpeedX = 2;
    let chickSpeedY = 2;
    let dirX = true;
    let dirY = true;
    let marioImg = document.getElementById('mario');
    let chickImg = document.getElementById('chick');
    let princessImg = document.getElementById('princess');
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '24px arial';

    let mario = {img:marioImg, x:400 , y:300,direction:true};
    let chick = {img:chickImg, x:0 , y:0};
    let keysDown = {};
    window.addEventListener('keydown',kbdHandler);
    window.addEventListener('keyup',kbdHandler);


    function kbdHandler() {
        if(event.type == 'keydown')
            keysDown[event.code] = true;
        else if (event.type=='keyup')
            delete keysDown[event.code];

    }
    function drawObj(obj) {
        ctx.save();
        ctx.drawImage(obj.img,obj.x,obj.y);
        ctx.restore();
    }

    function draw() {
        ctx.fillRect(0,0,800,600);
        drawObj(mario);
        drawObj(chick);
        ctx.drawImage(princessImg,100,200);
    }
    function update() {
        if(keysDown["ArrowLeft"]){
            mario.x -= moveSpeed;
            mario.direction = false;
        }
        if(keysDown["ArrowRight"]){
            mario.x += moveSpeed;
            mario.direction = true;
        }
        if(keysDown["ArrowUp"]){
            mario.y -= moveSpeed;
        }
        if(keysDown["ArrowDown"]){
            mario.y += moveSpeed;
        }
        moveChick();
        let x = (mario.x + 30) - (chick.x+22);
        let y = (mario.y + 37) - (chick.y+36);
        let distance = Math.sqrt(x*x + y*y);
        if (distance<50){
            reset();
        }
    }
    function moveChick() {
        if(dirX){
            chick.x += chickSpeedX;
            if(chick.x >= 770){
                dirX = false;
            }
        }
        else{
            chick.x -= chickSpeedX;
            if(chick.x <= 30){
                dirX = true;
            }
        }
        if(dirY){
            chick.y += chickSpeedY;
            if(chick.y >= 570){
                dirY = false;
            }
        }
        else{
            chick.y -= chickSpeedY;
            if(chick.y <= 30){
                dirY = true;
            }
        }

        let x = (mario.x + 30) - (chick.x+22);
        let y = (mario.y + 37) - (chick.y+36);
        let distance = Math.sqrt(x*x + y*y);
        //trying to make the ckick escape
        if(chick.x < mario.x && distance <200){
            chickSpeedX-= distance*0.0001;
        }
        else chickSpeedX += 0.025;
        if(chick.x > mario.x && distance <200){
            chickSpeedX += distance*0.0001;
        }
        else chickSpeedX -= 0.025;
        if(chick.y < mario.x && distance <200){
            chickSpeedY -= distance*0.0001;
        }
        else chickSpeedY += 0.025;
        if(chick.y > mario.x && distance <200){
            chickSpeedY += distance*0.0001;//
        }
        else chickSpeedY -= 0.025;
    }
    function reset() {
        chick.x = Math.round((Math.random()*700));
        chick.y = Math.round((Math.random()*500));
    }
    function main() {
        update();
        draw();
        requestAnimationFrame(main);
    }
    main();
    reset();
}

init();
