var database
var drawing=[];
var currentPath = [];
var isDrawing =false
var path
var pen
var name

function setup() {
  canvas=createCanvas(displayWidth-20,displayHeight-60);
  database = firebase.database(); 
  canvas.mousePressed(startPath);
 canvas.mouseReleased(endPath);
 

  input = createInput('Name');
 button = createButton('Play');
pen = createButton('Save');
pen.mousePressed(saveDrawing)
}
function startPath(){
  isDrawing = true
  currentPath = [];
  drawing.push(currentPath);
}
function endPath(){
  isDrawing = false
  
}
function draw() {
  background("purple"); 
  fill("red");
  textSize(50);
  strokeWeight(15)
  text("My Painting Workshop ;)",displayWidth/2-320,displayHeight/2-300)
  input.position(displayWidth/2-300,displayHeight/2+200);
  button.position(displayWidth/2-100,displayHeight/2+250);
  button.mousePressed(()=>{
  input.hide();
  button.hide();
  });

  if(isDrawing){
  var point = {
    x : mouseX,
    y : mouseY
  }
    currentPath.push(point)
  }
 
  stroke("white")
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++){
    path = drawing[i];
    beginShape();
  
  for(var j = 0; j< path.length; j++){
   vertex(path[j].x,path[j].y)
  }
  endShape();
}
}
function saveDrawing(){
  var ref = database.ref('drawings');
  var data = {
    name : name,
    drawing: drawing
  }
  var result = ref.push(data)
}