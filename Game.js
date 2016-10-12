function init() {
    let moveSpeed = 1.5;
    let chickSpeedX = 2;
    let chickSpeedY = 2;
    let score = 0;
    let marioImg = document.getElementById('mario');
    let chickImg = document.getElementById('chick');
    let princessImg = document.getElementById('princess');
    let portImg = document.getElementById('port');
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '24px arial';

    let mario = {img:marioImg, x:400 , y:300,direction:true};
    let chick = {img:chickImg, x:0 , y:0,dirX:true,dirY:true};
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
        ctx.clearRect(0,0,800,600);
        ctx.drawImage(portImg,30,30);
        ctx.drawImage(portImg,30,540);
        ctx.drawImage(portImg,740,30);
        ctx.drawImage(portImg,740,540);
        drawObj(mario);
        drawObj(chick);
        ctx.drawImage(princessImg,100,200);

        ctx.fillText(`Chicks caught:${score}`,10,30);
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


        //port
        if(((mario.x + 30) <70 && (mario.x + 30)>30) && ((mario.y + 37) <70 && (mario.y + 37)>30)){
            let port = Math.round(Math.random()*4);
            if(port != 1)
                teleport(port);
        }
        if(((mario.x + 30) <770 && (mario.x + 30)>730) && ((mario.y + 37) <70 && (mario.y + 37)>30)){
            let port = Math.round(Math.random()*4);
            if(port !=2)
                teleport(port);
        }
        if(((mario.x + 30) <770 && (mario.x + 30)>730) && ((mario.y + 37) <570 && (mario.y + 37)>530)){
            let port = Math.round(Math.random()*4);
            if(port !=3)
                teleport(port);
        }
        if(((mario.x + 30) <70 && (mario.x + 30)>30) && ((mario.y + 37) <570 && (mario.y + 37)>530)){
            let port = Math.round(Math.random()*4);
            if(port !=4)
                teleport(port);
        }

        moveChick();
        let x = (mario.x + 30) - (chick.x+22);
        let y = (mario.y + 37) - (chick.y+36);
        let distance = Math.sqrt(x*x + y*y);
        if (distance<50){
            score++;
            reset();
        }

    }
    function teleport(port) {
        if(port ==1){
            mario.x = 80;
            mario.y = 70;
        }
        if(port == 2){
            mario.x = 680;
            mario.y = 70;
        }
        else if(port==3){
            mario.x = 680;
            mario.y = 450;
        }
        else if(port==4){
            mario.x = 80;
            mario.y = 450;
        }
    }
    function moveChick() {
        if(chick.dirX){
            chick.x += chickSpeedX;
            if(chick.x >= 760){
                chick.dirX = false;
            }
        }
        else{
            chick.x -= chickSpeedX;
            if(chick.x <= 1){
                chick.dirX = true;
            }
        }
        if(chick.dirY){
            chick.y += chickSpeedY;
            if(chick.y >= 550){
                chick.dirY = false;
            }
        }
        else{
            chick.y -= chickSpeedY;
            if(chick.y <= 1){
                chick.dirY = true;
            }
        }

        let x = (mario.x + 30) - (chick.x+22);
        let y = (mario.y + 37) - (chick.y+36);
        let distance = Math.sqrt(x*x + y*y);
        //trying to make the ckick escape
        if(chick.x < mario.x && distance <200 && chick.dirX){
            chickSpeedX-= (200-distance)*0.0001;
        }
        if(chick.x < mario.x && distance <200 && !chick.dirX){
            chickSpeedX += (200-distance)*0.0001;
        }
        if(chick.x > mario.x && distance <200 && chick.dirX){
            chickSpeedX += (200-distance)*0.0001;
        }
        if(chick.x > mario.x && distance <200 && !chick.dirX){
            chickSpeedX -= (200-distance)*0.0001;
        }

        if(chick.y < mario.y && distance <200 && chick.dirY){
            chickSpeedX-= (200-distance)*0.0001;
        }
        if(chick.y < mario.y && distance <200 && !chick.dirY){
            chickSpeedX += (200-distance)*0.0001;
        }
        if(chick.y > mario.y && distance <200 && chick.dirY){
            chickSpeedX -= (200-distance)*0.0001;
        }
        if(chick.y > mario.y && distance <200 && !chick.dirY){
            chickSpeedX += (200-distance)*0.0001;
        }
        //if it goes out of screen
        if(chick.x<0 || chick.x > 800 || chick.y <0 || chick.y >600 ){
            chick.x = Math.round((Math.random()*700));
            chick.y = Math.round((Math.random()*500));
            chickSpeedX = 2;
            chickSpeedY = 2;

        }
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
