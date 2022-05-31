const canvasH = 512;
const canvasW = 512;

const canvas_back = document.getElementById("canvas1");
const ctx = canvas_back.getContext("2d", {alpha: false});
canvas_back.style.width = canvasW+"px";
canvas_back.style.height = canvasH+"px";
canvas_back.style.backgroundColor = "#ffffff";
document.body.appendChild(canvas_back);

const canvas_front = document.getElementById("canvas2");
const ctx2 = canvas_front.getContext("2d", {alpha: true});
canvas_front.style.width = canvasW+"px";
canvas_front.style.height = canvasH+"px";
document.body.appendChild(canvas_front);

async function delay(milliseconds){
    return await new Promise (resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const map = [
    [
        './untitled folder/bg/00.png',
        './untitled folder/bg/01.png',
        './untitled folder/bg/02.png',
    ],
    [
        './untitled folder/bg/00.png',
        './untitled folder/bg/01.png',
        './untitled folder/bg/02.png',
    ],
    [
        './untitled folder/bg/00.png',
        './untitled folder/bg/01.png',
        './untitled folder/bg/01.png',
    ],
    [
        './untitled folder/bg/cave-00.png',
        './untitled folder/bg/cave-00.png',
        './untitled folder/bg/cave-00.png',
    ],
]

let counter = 0;

const caveBg = './untitled folder/bg/cave-00.png';

let direction = "right";
let flag = false;
let changesFlag = true;

let bgRow = 2;
let bgColumn = 2;

let bgReady = false;
let bgImage = new Image();
bgImage.onload = () => {bgReady = true};
bgImage.src = map[bgRow][bgColumn];

let heroReady = false;
let heroImage = new Image();
heroImage.onload = () => {heroReady = true};
heroImage.src = './untitled folder/frodo-right.png';

let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = () => {monsterReady = true};
monsterImage.src = './untitled folder/monster.png';

let heartReady = false;
let heartImage = new Image();
heartImage.onload = () => {heartReady = true};
heartImage.src = './untitled folder/heart.png';


let obstaclesReady = false;
let obstaclesImages = new Array();

const fillObstaclesArray = () => {
    obstaclesImages.push({
        source: './untitled folder/obstacles/cave-entrance.png',
        x: canvasW - 196,
        y: -32,
        width: 128,
        height: 113,
        bgRow: 2,
        bgColumn: 2,
        visible: true,
        obstacle: false,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/cave-exit.png',
        x: -48,
        y: -48,
        width: 128,
        height: 113,
        bgRow: 3,
        bgColumn: 0,
        visible: true,
        obstacle: false,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/hero.png',
        x: 380,
        y: 132,
        width: 32,
        height: 32,
        bgRow: 2,
        bgColumn: 2,
        visible: true,
        obstacle: true,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/river.png',
        x:-50,
        y: 250,
        width: 0,
        height: 0,
        bgRow: 2,
        bgColumn: 0,
        visible: true,
        obstacle: true,
    });
    /*
    for(let i = 0; i < 3; i++){
        let randomRow = Math.floor(Math.random() * 2 + 1);
        let randomCol = Math.floor(Math.random() * 2 + 1);
        obstaclesImages.push({
            source: './untitled folder/obstacles/rocks.png',
            x: Math.floor(Math.random() * (canvasW-64) + 64),
            y: Math.floor(Math.random() * (canvasH-64) + 64),
            width: 64,
            height: 32,
            bgRow: randomRow,
            bgColumn: randomCol,
            visible: true,
            obstacle: true,
        });
    }
    */
    obstaclesImages.push({
        source: './untitled folder/obstacles/fence-vertical.png',
        x: canvasW - (29/2),
        y: -32,
        width: 29,
        height: 256,
        bgRow: 1,
        bgColumn: 1,
        visible: true,
        obstacle: true,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/fence-vertical.png',
        x: canvasW - (29/2),
        y: ((canvasH / 2) - (Math.floor(113 / 2))) + 113,
        width: 29,
        height: 256,
        bgRow: 1,
        bgColumn: 1,
        visible: true,
        obstacle: true,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/fence-vertical.png',
        x: 0 - (29/2),
        y: -32,
        width: 29,
        height: 256,
        bgRow: 1,
        bgColumn: 2,
        visible: true,
        obstacle: true,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/fence-vertical.png',
        x: 0 - (29/2),
        y: ((canvasH / 2) - (Math.floor(113 / 2))) + 113,
        width: 29,
        height: 256,
        bgRow: 1,
        bgColumn: 2,
        visible: true,
        obstacle: true,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/bridge.png',
        x: canvasW - (128/2),
        y: (canvasH / 2) - (Math.floor(113 / 2)),
        width: 128,
        height: 113,
        bgRow: 1,
        bgColumn: 1,
        visible: true,
        obstacle: false,
    });
    obstaclesImages.push({
        source: './untitled folder/obstacles/bridge.png',
        x: 0 - (128/2),
        y: (canvasH / 2) - (Math.floor(113 / 2)),
        width: 128,
        height: 113,
        bgRow: 1,
        bgColumn: 2,
        visible: true,
        obstacle: false,
    });
    for(let i = 0; i<13; i++){
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 92,
            y: 32 * i,
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<13; i++){
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 46 * 6,
            y: (32 * i) + (32 * 2),
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<13; i++){
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 46 * 9,
            y: (32 * i) + (32 * 2),
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<13; i++){
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 46 * 10,
            y: (32 * i) + (32 * 2),
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<14; i++){
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 0,
            y: (32 * i) + (32 * 2),
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 1,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<11; i++){
        if(i !== 7 && i !== 8)
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 46 * i,
            y: canvasH - 32,
            width: 46,
            height: 32,
            bgRow: 0,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    for(let i = 0; i<11; i++){
        if(i !== 7 && i !== 8)
        obstaclesImages.push({
            source: './untitled folder/obstacles/bush.png',
            x: 46 * i,
            y: 0,
            width: 46,
            height: 32,
            bgRow: 1,
            bgColumn: 0,
            visible: true,
            obstacle: true,
        });
    }
    // number of cave backgrounds
    for(let i = 0; i < map[3].length; i++){
        //number of torches per background
        for(let j = 0; j < 3; j++){
            obstaclesImages.push({
                source: './untitled folder/obstacles/torch.png',
                x: Math.floor(Math.random() * (canvasW - 32) + 32),
                y: Math.floor(Math.random() * (canvasH - 64) + 32),
                width: 32,
                height: 8,
                bgRow: 3,
                bgColumn: i,
                visible: true,
                obstacle: false,
            });
        }
    }
}

fillObstaclesArray();

obstaclesImages.onload = () => { obstaclesReady = true };

const renderObstacles = () => {
    obstaclesImages.map((item) => {
        if(item.bgRow === bgRow && item.bgColumn === bgColumn){
            let tempImageReady = false;
            let tempImage = new Image();
            tempImage.onload = () => { tempImageReady = true }
            tempImage.src = item.source;
            tempImage.style.boxShadow = "0px 0px 50px #fff"
            if(item.source === './untitled folder/obstacles/torch.png'){      
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = 'rgba(225, 255, 0,0.7)';
                ctx.fillRect(item.x - 5, item.y + 20 ,40,40);
                ctx.globalAlpha = 1.0;
            }
            ctx.drawImage(tempImage, item.x, item.y);
        }
    })
    obstaclesReady = true;
    counter += 1;
}

let monsters = [
    {
        x: 20,
        y: 20,
        bgRow: 1,
        bgColumn: 1,
    },
    {
        x: 20,
        y: 20,
        bgRow: 2,
        bgColumn: 2,
    },
]

let fireballReady = false;
let fireballVis = false;
let fireballImage = new Image();
fireballImage.onload = () => {fireballReady = true};
fireballImage.src = './untitled folder/fireball-right.png';

let hero = {
    speed: 256,
    x: 16,
    y: 16,
}

let monster = {
    x: 0,
    y: 0,
    lives: 3,
}

let fireball= {
    x: hero.x+32,
    y: hero.y,
}

let monstersCaught = 0;

let keysDown = {};

addEventListener("keydown", (e) => {
    keysDown[e.key] = true;
}, false);

addEventListener("keyup", (e) => {
    delete keysDown[e.key];
}, false);

let reset = () =>  {
    monster.lives -= 1;
    if(monster.lives === 0){
        monster.x = 32 + (Math.random() * (canvasW - 64));
        monster.y = 32 + (Math.random() * (canvasH - 64));
        monster.lives = 3;
    }else{
        if(hero.x > monster.x){
            for(let i=0; i<20; i++){
                monster.x -= 1;
            }
        }else{
            for(let i=0; i<20; i++){
                monster.x += 1;
            }
        }
    }
}

function checkTouchingObstacles(dir, mod){
    obstaclesImages.map((item) => {
        if(bgColumn === item.bgColumn &&
            bgRow === item.bgRow){
        const overlapX = (
            (hero.x <= item.x+item.width)
            &&
            (hero.x +32 >= item.x)
        );
        const overlapY = (
            (hero.y <= item.y+item.height)
            &&
            (hero.y + 32 >= item.y)
        );
        if(
            (overlapX && overlapY && item.obstacle)                        
            &&
            (bgColumn === item.bgColumn &&
            bgRow === item.bgRow)
        )
        {
            switch(dir){
                case "up":
                    hero.y += hero.speed * mod*2;
                case "down":
                    hero.y -= hero.speed * mod;
                case "left":
                    hero.x += hero.speed * mod*2;
                case "right":
                    hero.x -= hero.speed * mod;
                default: return
            }
        }
        }
    })
    if(
        bgColumn === 2 &&
        bgRow === 2 &&
        (hero.x > 420 && hero.x < 460) &&
        (hero.y > 100 && hero.y < 140)
    ){
        handleCaveTransition(true);
    }else if(
        bgColumn === 0 &&
        bgRow === 3 &&
        (hero.x > 20 && hero.x < 60) &&
        (hero.y > 95 && hero.y < 135)
    ){
        handleCaveTransition(false);
    }
    
}

const handleCaveTransition = (enter) => {
    if(enter){
        bgRow = 3;
        bgColumn = 0;
        hero.x = 90;
        hero.y = 186;
        heroImage.src = './untitled folder/frodo-right.png';
    }else{
        bgRow = 2;
        bgColumn = 2;
        hero.x = 385;
        hero.y = 200;
        heroImage.src = './untitled folder/frodo-left.png';
    }
    bgImage.src = map[bgRow][bgColumn];
    counter = 0;
    renderFristLayer();
}

let changeBackground = (direction) => {
    counter = 0;
    flag = true;
    if(direction === "right"){
        bgColumn+=1;
    }
    else if(direction === "left"){
        bgColumn-=1;
    }
    else if(direction === "down"){
        bgRow+=1;
    }
    else if(direction === "up"){
        bgRow-=1;
    }
    bgImage.src = map[bgRow][bgColumn];
    renderFristLayer();
}

let shootFireball = async function(mod){
    flag = false;
    fireballVis = true;
    fireball.y=hero.y;
    let i=1;
    let fireballMoveValue = 0;
    if(direction === "left"){
        fireballMoveValue = -1;
        fireballImage.src = './untitled folder/fireball-left.png';
        fireball.x= hero.x-32;
    }else{
        fireballImage.src = './untitled folder/fireball-right.png';
        fireballMoveValue = 1;
        fireball.x= hero.x+32;
    }
    fireballVis = true;
    while(fireball.x >= 0 && fireball.x <= canvasW && fireballVis && !flag){
        await delay(10);
        if(fireballMoveValue < 0){
            fireball.x -= 256*mod * 2;
        }else{
            fireball.x += 256*mod * 2;
        }
        i++;
        if(flag){
            fireballVis = false;
            break;
        }
    }
    flag = false;
    fireballVis = false;
    //render();
}

let update = (mod) => {
    if(hero.x > canvasW-32 && bgColumn !== 2){
        hero.x = 64;
        changeBackground("right");
    }else if(hero.x < 0 && bgColumn !== 0){
        hero.x = canvasW - 64;
        changeBackground("left");
    }
    if(hero.y > canvasH-32 && bgRow !== 2 && bgRow < 3){
        hero.y = 64;
        changeBackground("down");
    }else if(hero.y < 0 && bgRow !== 0 && bgRow < 3){
        hero.y = canvasH - 64;
        changeBackground("up");
    }


    if("ArrowUp" in keysDown && hero.y > 0){
        hero.y -= hero.speed * mod;
        checkTouchingObstacles("up", mod);
    }
    if("ArrowDown" in keysDown && hero.y < canvasH-32){
        hero.y += hero.speed * mod;
        checkTouchingObstacles("down", mod);
    }
    if("ArrowLeft" in keysDown && hero.x>0){
        hero.x -= hero.speed * mod;
        heroImage.src = './untitled folder/frodo-left.png';
        direction = "left";
        checkTouchingObstacles("left", mod);
    }
    if(
        "ArrowRight" in keysDown && hero.x< canvasW-32
    ){
        hero.x += hero.speed * mod;
        heroImage.src = './untitled folder/frodo-right.png';
        direction = "right";
        checkTouchingObstacles("right", mod);
    }
    if(" " in keysDown && !fireballVis){
        flag = false;
        shootFireball(mod);
        delete keysDown[" "];
    }

    if(hero.x > monster.x){
        monster.x += 0.2;
    }else{
        monster.x -= 0.2;
    }
    if(hero.y > monster.y){
        monster.y += 0.2;
    }else{
        monster.y -= 0.2;
    }


    if(
        hero.x <= (monster.x + 32) &&
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.y <= (hero.y + 32)
    ){
        monstersCaught += 1;
        reset();
    }
    if(
        fireball.x <= (monster.x + 32) &&
        monster.x <= (fireball.x + 32) &&
        fireball.y <= (monster.y + 32) &&
        monster.y <= (fireball.y + 32) &&
        !flag
    ){
        //monsterImage.src = './untitled folder/monster-red.png';
        flag = true;
        monstersCaught += 1;
        reset();
    }
}

function handlePositionLabel(){
    ctx2.fillStyle = "rgb(250, 250, 250)";
	ctx2.font = "16px Helvetica";
	ctx2.textAlign = "left";
	ctx2.textBaseline = "top";
	ctx2.fillText("x: "+Math.floor(hero.x)+", y:"+ Math.floor(hero.y), 32, 32);
	ctx2.fillText("row: "+bgRow+", col:"+ bgColumn, 32, 64);
}

let render = () => {
    ctx2.clearRect(0, 0, canvasW, canvasH);
    if(heroReady){
        ctx2.drawImage(heroImage, hero.x, hero.y);
    }
    if(counter < 100){
        renderFristLayer();
    }
    /*
    if(monsterReady && heartReady){
        //monsterImage.src = './untitled folder/monster.png';
        ctx.drawImage(monsterImage, monster.x, monster.y);
        let xMargin = -30;
        for(let i=0; i<monster.lives; i++){
            xMargin += 20;
            ctx.drawImage(heartImage, monster.x+xMargin, monster.y-20);
        }
    }
    */
    if(monsterReady && heartReady){
        monsters.map((item) => {
            if(item.bgColumn === bgColumn && bgRow === item.bgRow)
            {
                let tempImage = new Image();
                tempImage.onload = () => { tempImageReady = true }
                tempImage.src = './untitled folder/monster.png';
                ctx2.drawImage(tempImage, item.x, item.y);
            }
        })
    }
    if(fireballReady && fireballVis){
        ctx2.drawImage(fireballImage, fireball.x, fireball.y);
    }
    handlePositionLabel();
}

let renderFristLayer = () => {
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0);
        changesFlag = false;
    }
    renderObstacles();
}

let main = () => {
    let now = Date.now();
    let delta = now - then;
    render();
    update(delta / 1000);
    then = now;
    requestAnimationFrame(main);
}

const w = window;
requestAnimationFrame = w.requestAnimationFrame;

let then = Date.now();
let startingTime = then;
reset();
main();