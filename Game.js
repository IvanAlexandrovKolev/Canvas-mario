function init() {
    let moveSpeed = 10;
    let chickSpeed = 2;
    let dirX = true;
    let dirY = true;
    let marioImg = document.getElementById('mario');
    let chickImg = document.getElementById('chick');
    let princessImg = document.getElementById('princess');
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '24px arial';

    let mario = {img:marioImg, x:400 , y:300};
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
    function moveChick() {
        if(dirX){
            chick.x += chickSpeed;
            if(chick.x >= 770){
                dirX = false;
            }
        }
        else{
            chick.x -= chickSpeed;
            if(chick.x <= 30){
                dirX = true;
            }
        }
        if(dirY){
            chick.y += chickSpeed;
            if(chick.y >= 570){
                dirY = false;
            }
        }
        else{
            chick.y -= chickSpeed;
            if(chick.y <= 30){
                dirY = true;
            }
        }
    }
    function draw() {
        ctx.clearRect(0,0,800,600);
        ctx.drawImage(marioImg,mario.x,mario.y);
        ctx.drawImage(chickImg,chick.x,chick.y);
        ctx.drawImage(princessImg,100,200);
    }
    function update() {
        if(keysDown["ArrowLeft"]){
            mario.x -= moveSpeed;
        }
        if(keysDown["ArrowRight"]){
            mario.x += moveSpeed;
        }
        if(keysDown["ArrowUp"]){
            mario.y -= moveSpeed;
        }
        if(keysDown["ArrowDown"]){
            mario.y += moveSpeed;
        }
        moveChick();
        if (
            mario.x <= (chick.x + 32)
            && chick.x <= (mario.x + 32)
            && mario.y <= (chick.y + 32)
            && chick.y <= (mario.y + 32)
        ) {
            reset();
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
