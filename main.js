var canvas="";
var model="";
var status="";
var objects=[];
var video="";
var r,g,b;
var song="";
function preload(){
song=loadSound("krishna_flute.mp3");
}
function setup(){
canvas= createCanvas(600,390);
canvas.center();

video=createCapture(VIDEO);
video.hide();

model= ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="If the person is not there then alaram will be played";
}
function modelloaded(){
    console.log("Model has been loaded");
    status=true;
    
}
function gotResults(error,results){
 if(error){
    console.log(error);
 }
 else{
    console.log(results);
    objects=results;
   }
}
function draw(){
 image(video,0,0,640,420);
 
 
 if(status !=" "){
   r= random(255);
   g= random(255);
   b= random(255);
   model.detect(video,gotResults);

   for(var j = 0;j<objects.length;j++){
      document.getElementById("status").innerHTML="If the person is not there then alaram will be played";
      var percent= floor(objects[j].confidence*100);
      fill(r,g,b);
      text(objects[j].label+" "+percent+"%",objects[j].x+15,objects[j].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[j].x,objects[j].y,objects[j].width,objects[j].height);
      if(objects[j].label=="person"){
         document.getElementById("Number_of_objects").innerHTML="Baby detected";
         song.stop();
      }
      else{
         document.getElementById("Number_of_objects").innerHTML="Baby not detected";
         song.play();
       }
   }
 }
 
}