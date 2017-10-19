var size = 80;
var grid = new Array(size);
for (var i=0;i<size;i++){
    grid[i]= new Array(size);
}
var cont=0;
function setup() {
    //frameRate(20);
    createCanvas(800,800);
    background(51);
    for (i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            grid[i][j]=new Cell(Math.round(Math.random(0,1)),i*10,j*10);
        }
    }
}   
function draw() {
    var updates=[];
    for (i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            grid[i][j].show();
            test(grid,i,j,updates);
        }
    }
    for(i=0;i<updates.length;i++){
        grid[updates[i][0]][updates[i][1]].change();
    }
    updates=[];
    cont++;
    if(cont>50000){
        noLoop();
    }
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
            fill(51);
        }
        rect(this.x,this.y,10,10);
    };
    this.change=function(){
        this.is_alive=!this.is_alive;
    }
}
function test(grid,i,j,updates){
    var surrounding=0;
    var i_init=i-1;
    var j_init=j-1;
    var i_end=i+1;
    var j_end=j+1;
    if(i==0)i_init++;
    if(j==0)j_init++;
    if(i==grid.length-1)i_end--;
    if(j==grid.length-1)j_end--;
    for(x=i_init;x<=i_end;x++){
        for(y=j_init;y<=j_end;y++){
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
    
    
    
    
    
    
    
    
    