 function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode (DEGREES);
}

const selectedElement = document.getElementById("selected");
const sineButton = document.getElementById("sine");
const squareButton = document.getElementById("square");
const sawButton = document.getElementById("sawtooth");
const triangleButton = document.getElementById("triangle");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const attackInput = document.getElementById("attack");
const decayInput = document.getElementById("decay");
const sustainInput = document.getElementById("sustain");
const releaseInput = document.getElementById("release");
const buttonC = document.getElementById("buttonC");
const buttonD = document.getElementById("buttonD");
const buttonE = document.getElementById("buttonE");
const buttonF = document.getElementById("buttonF");
const buttonG = document.getElementById("buttonG");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC2 = document.getElementById("buttonC2");
let synth;
let isNotePlaying = false;
let currentColor = [255, 255, 255];
let defaultAmplitude = 50;
let currentAmplitude = defaultAmplitude;

const noteColors = {
  "C3": [255, 0, 0],     // Red
  "D3": [0, 255, 0],     // Green
  "E3": [0, 0, 255],     // Blue
  "F3": [255, 255, 0],   // Yellow
  "G3": [0, 255, 255],   // Cyan
  "A3": [255, 0, 255],   // Magenta
  "B3": [255, 165, 0],   // Orange
  "C4": [128, 0, 128],   // Purple
};

const noteAmplitudes = {
  "C3": 50,   
  "D3": 75,   
  "E3": 100, 
  "F3": 125, 
  "G3": 150,  
  "A3": 175, 
  "B3": 200, 
  "C4": 100, 
};

function playNoteWithColor(note) {
  synth.triggerAttack(note);
  currentColor = noteColors[note];
  currentAmplitude = noteAmplitudes[note];
  isNotePlaying = true;
}

function stopNote() {
  synth.triggerRelease();
  isNotePlaying = false;
  currentAmplitude = defaultAmplitude;
}

window.addEventListener("load", () => {
  synth = new Tone.MonoSynth().toDestination();
});

sineButton.addEventListener("click", () => {
  synth.oscillator.type = "sine";
  selectedElement.innerText = "Selected: Sine";
});

squareButton.addEventListener("click", () => {
  synth.oscillator.type = "square";
  selectedElement.innerText = "Selected: Square";
});

sawButton.addEventListener("click", () => {
  synth.oscillator.type = "sawtooth";
  selectedElement.innerText = "Selected: SawTooth";
});

triangleButton.addEventListener("click", () => {
  synth.oscillator.type = "triangle";
  selectedElement.innerText = "Selected: Triangle";
});

attackInput.addEventListener("change", () => {
  synth.envelope.attack = attackInput.value;
});

decayInput.addEventListener("change", () => {
  synth.envelope.decay = decayInput.value;
});

sustainInput.addEventListener("change", () => {
  synth.envelope.sustain = sustainInput.value;
});

releaseInput.addEventListener("change", () => {
  synth.envelope.release = releaseInput.value;
});

buttonC.addEventListener("mousedown", () => playNoteWithColor("C3"));
buttonC.addEventListener("mouseup", stopNote);

buttonD.addEventListener("mousedown", () => playNoteWithColor("D3"));
buttonD.addEventListener("mouseup", stopNote);

buttonE.addEventListener("mousedown", () => playNoteWithColor("E3"));
buttonE.addEventListener("mouseup", stopNote);

buttonF.addEventListener("mousedown", () => playNoteWithColor("F3"));
buttonF.addEventListener("mouseup", stopNote);

buttonG.addEventListener("mousedown", () => playNoteWithColor("G3"));
buttonG.addEventListener("mouseup", stopNote);

buttonA.addEventListener("mousedown", () => playNoteWithColor("A3"));
buttonA.addEventListener("mouseup", stopNote);

buttonB.addEventListener("mousedown", () => playNoteWithColor("B3"));
buttonB.addEventListener("mouseup", stopNote);

buttonC2.addEventListener("mousedown", () => playNoteWithColor("C4"));
buttonC2.addEventListener("mouseup", stopNote);

window.addEventListener("click", () => {
  Tone.start();
});


function draw () {
  background (30);
  if (isNotePlaying) {
    fill(currentColor[0], currentColor[1], currentColor[2]);
  } else {
    fill(255);
  }

  translate (width/2, height/2);

  beginShape();
  for (let i = 0; i < 359; i++) {

    let r1Min = map(sin(frameCount), -1, 1, currentAmplitude, currentAmplitude + 50);
    let r1Max = map(sin(frameCount * 3), -1, 1, currentAmplitude + 50, currentAmplitude);
    
    let r2Min = map(sin(frameCount * 5), -1, 1, currentAmplitude + 50, currentAmplitude);
    let r2Max = map(sin(frameCount / 3), -1, 1, currentAmplitude, currentAmplitude + 50);
    
    let r1 = map(sin(i * 5 + 40), -1, 1, r1Min, r1Max);
    let r2 = map(sin(i * 3 + 80), -1, 1, r2Min, r2Max);
    let r = r1 + r2;
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape (CLOSE);
}
