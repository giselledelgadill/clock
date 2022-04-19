function setup(){
    canvas=createCanvas(300,300);
    canvas.position(750,350);
    background("orange");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function clear_canvas(){
    background("orange");
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('answer').innerHTML='your drawing: '+ results[0].label;
    document.getElementById('accuracy').innerHTML='accuracy: '+ Math.round(results[0].confidence*100)+'%';
    utter=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utter);
}