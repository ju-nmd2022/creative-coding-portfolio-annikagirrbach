let controlHeight = 200; // Height reserved for the UI elements at the top

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  
  let yOffset = 10; // Starting Y offset for the controls
  
  createButtonWithText("Sine", "sine").mousePressed(() => selectOscillatorType("sine")).position(10, yOffset);
  createButtonWithText("Square", "square").mousePressed(() => selectOscillatorType("square")).position(60, yOffset);
  createButtonWithText("Sawtooth", "sawtooth").mousePressed(() => selectOscillatorType("sawtooth")).position(120, yOffset);
  createButtonWithText("Triangle", "triangle").mousePressed(() => selectOscillatorType("triangle")).position(190, yOffset);
  
  yOffset += 30; // Move down for the next row of controls
  
  createLabel("Attack").position(10, yOffset);
  createInputField("attack", "0.5").input(function() { synth.envelope.attack = this.value(); }).position(70, yOffset);

  createLabel("Decay").position(150, yOffset);
  createInputField("decay", "0.5").input(function() { synth.envelope.decay = this.value(); }).position(210, yOffset);

  yOffset += 30; // Move down for the next row

  createLabel("Sustain").position(10, yOffset);
  createInputField("sustain", "0.5").input(function() { synth.envelope.sustain = this.value(); }).position(70, yOffset);

  createLabel("Release").position(150, yOffset);
  createInputField("release", "0.5").input(function() { synth.envelope.release = this.value(); }).position(210, yOffset);
  
  yOffset += 40; // Move down for the next row

  createButtonWithText("C", "buttonC").mousePressed(() => playNoteWithColor("C3")).mouseReleased(stopNote).position(10, yOffset);
  createButtonWithText("D", "buttonD").mousePressed(() => playNoteWithColor("D3")).mouseReleased(stopNote).position(60, yOffset);
  createButtonWithText("E", "buttonE").mousePressed(() => playNoteWithColor("E3")).mouseReleased(stopNote).position(110, yOffset);
  createButtonWithText("F", "buttonF").mousePressed(() => playNoteWithColor("F3")).mouseReleased(stopNote).position(160, yOffset);
  createButtonWithText("G", "buttonG").mousePressed(() => playNoteWithColor("G3")).mouseReleased(stopNote).position(210, yOffset);
  createButtonWithText("A", "buttonA").mousePressed(() => playNoteWithColor("A3")).mouseReleased(stopNote).position(260, yOffset);
  createButtonWithText("B", "buttonB").mousePressed(() => playNoteWithColor("B3")).mouseReleased(stopNote).position(310, yOffset);
  createButtonWithText("C2", "buttonC2").mousePressed(() => playNoteWithColor("C4")).mouseReleased(stopNote).position(360, yOffset);
}

// Helper function to create a button with text
function createButtonWithText(text, id) {
  let btn = createButton(text);
  btn.id(id);
  btn.style("margin", "5px");
  return btn;
}

// Helper function to create input fields
function createInputField(id, defaultValue) {
  let input = createInput(defaultValue);
  input.id(id);
  input.style("margin", "5px");
  return input;
}

// Helper function to create label
function createLabel(text) {
  let label = createElement('label', text);
  label.style("display", "inline-block");
}

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

function selectOscillatorType(type) {
  synth.oscillator.type = type;
  console.log("Selected: " + type);
}

function draw () {
  background(30);

  push();
  translate(width / 2, height / 2 + controlHeight / 2);

  if (isNotePlaying) {
    fill(currentColor[0], currentColor[1], currentColor[2]);
  } else {
    fill(255);
  }

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
  endShape(CLOSE);

  pop();
}