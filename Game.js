function init() {
    let moveSpeed = 2;
    let chickSpeedX = 2;
    let chickSpeedY = 2;
    let score = 0;
    let level = 1 ;
    let marioImg = document.getElementById('mario');
    let chickImg = document.getElementById('chick');
    let policeImg = document.getElementById('police');
    let portImg = document.getElementById('port');
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '18px arial';

    let mario = {img:marioImg, x:400 , y:300,direction:true};
    let chicks = [];
    let chick = {img:chickImg, x:0 , y:0,dirX:true,dirY:true};

    let keysDown = {};
    window.addEventListener('keydown',kbdHandler);
    window.addEventListener('keyup',kbdHandler);
    

    function kbdHandler() {
        if(event.type == 'keydown')
            keysDown[event.code] = true;
        else if (event.type=='keyup')
            delete keysDown[event.code];
        // if(event.type='spacedown'){
        //     moveSpeed=10;
        // }
    }
    function addChick() {
        let x =Math.round((Math.random()*700));
        let y = Math.round((Math.random()*500));
        let randomness =  Math.round((Math.random()*5));
        if(randomness == 1) {
            var dirx = true;
            var diry = true;
        }
        if(randomness == 2) {
            dirx = false
            diry = true;
        }
        if(randomness == 3) {
            dirx = false;
            diry = false;
        }
        if(randomness == 4) {
            dirx = true;
            diry = false;
        }
        chicks.push({img:chickImg, x:x , y:y,dirX:dirx,dirY:diry});
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
        for(let i =0;i< chicks.length ; i++) {
            drawObj(chicks[i]);
        }
        ctx.drawImage(princessImg,100,200);
        drawObj(chick);
        ctx.drawImage(policeImg,100,200);

        ctx.fillText(`LEVEL:${level}`,300,25);
        ctx.fillText(`CHICKS CAUGHT:${score}`,300,50);
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
            let port = Math.round(Math.random()*5);
            if(port != 1)
                teleport(port);
        }
        if(((mario.x + 30) <770 && (mario.x + 30)>730) && ((mario.y + 37) <70 && (mario.y + 37)>30)){
            let port = Math.round(Math.random()*5);
            if(port !=2)
                teleport(port);
        }
        if(((mario.x + 30) <770 && (mario.x + 30)>730) && ((mario.y + 37) <570 && (mario.y + 37)>530)){
            let port = Math.round(Math.random()*5);
            if(port !=3)
                teleport(port);
        }
        if(((mario.x + 30) <70 && (mario.x + 30)>30) && ((mario.y + 37) <570 && (mario.y + 37)>530)){
            let port = Math.round(Math.random()*5);
            if(port !=4)
                teleport(port);
        }

        for(let i =0;i< chicks.length ; i++){
            moveChick(chicks[i]);
            let x = (mario.x + 30) - (chicks[i].x+22);
            let y = (mario.y + 37) - (chicks[i].y+36);
            let distance = Math.sqrt(x*x + y*y);
            if (distance<50){
                reset(i);
            }
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
    function moveChick(chick) {
        if(chick.dirX){
            chick.x += chickSpeedX;
            if(chick.x >= 760){
                chick.dirX = false;
                chick.x = 760;
            }
        }
        else{
            chick.x -= chickSpeedX;
            if(chick.x <= 1){
                chick.dirX = true;
                chick.x = 1;
            }
        }
        if(chick.dirY){
            chick.y += chickSpeedY;
            if(chick.y >= 550){
                chick.dirY = false;
                chick.y = 550;
            }
        }
        else{
            chick.y -= chickSpeedY;
            if(chick.y <= 1){
                chick.dirY = true;
                chick.y = 1;
            }
        }

        let x = (mario.x + 30) - (chick.x+22);
        let y = (mario.y + 37) - (chick.y+36);
        let distance = Math.sqrt(x*x + y*y);


        //trying to make the chick escape
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
    }
    function reset(number) {
        chicks.splice(number,1);
        score++;
        if(score==4){
            score=0;
            level++;
            //moveSpeed -= 0.2;
        }
        if(chicks.length==0){
            for (let i = 0; i< level ; i++){
                addChick();
            }
        }
    }
    function main() {
        update();
        draw();
        requestAnimationFrame(main);
    }
    addChick();
    main();
}

init();
