let width=800;
let height=600;
let cellSize=20;
let wSize = width/cellSize;
let hSize = height/cellSize;

let grid = new Array(hSize);
for (let i=0;i<hSize;i++){
    grid[i]= new Array(wSize);
}
let cont=0;
function setup() {
    noLoop();
    createCanvas(width,height);
    background(51);

    bStart = createButton('Start');
    bStart.position(width, 0);
    bStart.mousePressed(start);

    bStop = createButton('Stop');
    bStop.position(bStart.x+bStart.width, 0);
    bStop.mousePressed(stop);

    bClean = createButton('Clean');
    bClean.position(bStop.x+bStop.width, 0);
    bClean.mousePressed(clean);

    for (let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            grid[i][j]=new Cell(0,j*cellSize,i*cellSize);
            grid[i][j].show();
        }
    }
}   
function draw() {
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
    cont++;
}

function Cell(is_alive,x,y){
    this.is_alive=is_alive;
    this.x=x;
    this.y=y;
    this.show=function(){
        stroke(255);
        if(this.is_alive){
            fill(255);
        }else{
            fill(0, 0,51);
        }
        rect(this.x,this.y,cellSize,cellSize);
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
    if(j_end>=grid.length)j_end--;
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
    if(x>=0 && x<=width && y>=0 && y<=height){
        grid[int(y/cellSize)][int(x/cellSize)].change();
        grid[int(y/cellSize)][int(x/cellSize)].show();
    }
}

function start(){
    loop();
}

function stop(){
    noLoop();
}

function clean(){
    for(let i=0;i<grid.length;i++){
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].is_alive=false;
            grid[i][j].show();
        }
    }
    noLoop();
}