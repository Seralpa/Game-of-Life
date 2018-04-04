const width=800;    //Width of canvas
const height=600;   //Height of canvas
const cellSize=20;  //Size of side of each cell
const space=5;      //Spacing between buttons

const wSize = Math.floor(width/cellSize);
const hSize = Math.floor(height/cellSize);

let bStart_stop,bClean,bRand,frameSlider;
let active=false;
let grid = new Array(hSize);
for (let i=0;i<hSize;i++){
    grid[i]= new Array(wSize);
}

function setup() {
    createCanvas(width,height);
    
    bStart_stop = createButton('Start/Stop');
    bStart_stop.position(width, 0);
    bStart_stop.mousePressed(start_stop);

    bClean = createButton('Clean');
    bClean.position(width, bStart_stop.y+bStart_stop.height+space);
    bClean.mousePressed(clean);

    bRand = createButton('Random');
    bRand.position(width, bClean.y+bClean.height+space);
    bRand.mousePressed(rand);

    frameSlider = createSlider(1, 60, 60);
    frameSlider.position(width, bRand.y+bRand.height+space);

    t1 = createElement('p', 'Speed');
    t1.position(frameSlider.x+frameSlider.width+space, frameSlider.y-13);

    for (let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            grid[i][j]=new Cell(0,j*cellSize,i*cellSize);
        }
    }
    noLoop();
}

function draw() {
    let fr=frameSlider.value();
    frameRate(fr);
    if(!active){
        for (let i=0;i<grid.length;i++){
            for(let j=0;j<grid[i].length;j++){
                grid[i][j].show();
            }
        }
    }
    else{
        let updates=[];
        for (let i=0;i<grid.length;i++){
            for(let j=0;j<grid[i].length;j++){
                grid[i][j].show();
                test(grid,i,j,updates);
            }
        }
        for(let i=0;i<updates.length;i++){
            grid[updates[i][0]][updates[i][1]].change();
        }
        updates=[];
    }
}

function Cell(is_alive,x,y){
    this.is_alive=is_alive;
    this.x=x;
    this.y=y;
    this.show=function(){
        push();
        stroke(255);
        if(this.is_alive){
            fill(255);
        }else{
            fill(0,0,51);
        }
        rect(this.x,this.y,cellSize,cellSize);
        pop();
    }
    this.change=function(){
        this.is_alive=!this.is_alive;
    }
}

function test(grid,i,j,updates){
    let surrounding=0;
    let i_init=i-1;
    let j_init=j-1;
    let i_end=i+1;
    let j_end=j+1;
    if(i==0)i_init++;
    if(j==0)j_init++;
    if(i_end>=grid.length)i_end--;
    if(j_end>=grid[i].length)j_end--;
    for(let x=i_init;x<=i_end;x++){
        for(let y=j_init;y<=j_end;y++){
            if(x!=i || y!=j){
                if(grid[x][y].is_alive)surrounding++;
            }
        }
    }
    if(grid[i][j].is_alive){
        if(surrounding<2 || surrounding>3){
            updates.push([i,j]);
        }
    }
    else{
        if(surrounding==3){
            updates.push([i,j]);
        }
    }
}
function mouseClicked(){
    let x=mouseX;
    let y=mouseY;
    if(x>=0 && x<wSize*cellSize && y>=0 && y<hSize*cellSize){
        grid[int(y/cellSize)][int(x/cellSize)].change();
        redraw();
    }
}

function start_stop(){
    if(active) noLoop();
    else loop();
    active=!active;
}

function clean(){
    for(let i=0;i<grid.length;i++){
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].is_alive=false;
            grid[i][j].show();
        }
    }
    noLoop();
    active=false;
}

function rand(){
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].is_alive=Math.round(Math.random(0,1));                  
        }
    }
    redraw();
}
