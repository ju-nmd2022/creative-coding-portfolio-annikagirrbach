function setup() {

  let container = createDiv();
  container.id('mainContainer');
  container.style('display', 'flex');
  container.style('flex-direction', 'column');
  container.style('align-items', 'center');
  
  let canvas = createCanvas(400, 400);
  canvas.parent('mainContainer');
  
  canvas.style('display', 'block');
  canvas.style('margin', '0');

  let controlContainer = createDiv();
  controlContainer.parent('mainContainer');
  
  createButtonWithText("Sine", "sine").mousePressed(() => selectOscillatorType("sine")).parent(controlContainer);
  createButtonWithText("Square", "square").mousePressed(() => selectOscillatorType("square")).parent(controlContainer);
  createButtonWithText("Sawtooth", "sawtooth").mousePressed(() => selectOscillatorType("sawtooth")).parent(controlContainer);
  createButtonWithText("Triangle", "triangle").mousePressed(() => selectOscillatorType("triangle")).parent(controlContainer);
  
  createLabel("Attack").parent(controlContainer);
  createInputField("attack", "0.5").input(() => synth.envelope.attack = this.value()).parent(controlContainer);
  
  createLabel("Decay").parent(controlContainer);
  createInputField("decay", "0.5").input(() => synth.envelope.decay = this.value()).parent(controlContainer);
  
  createLabel("Sustain").parent(controlContainer);
  createInputField("sustain", "0.5").input(() => synth.envelope.sustain = this.value()).parent(controlContainer);
  
  createLabel("Release").parent(controlContainer);
  createInputField("release", "0.5").input(() => synth.envelope.release = this.value()).parent(controlContainer);
  
  createButtonWithText("C", "buttonC").mousePressed(() => playNoteWithColor("C3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("D", "buttonD").mousePressed(() => playNoteWithColor("D3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("E", "buttonE").mousePressed(() => playNoteWithColor("E3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("F", "buttonF").mousePressed(() => playNoteWithColor("F3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("G", "buttonG").mousePressed(() => playNoteWithColor("G3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("A", "buttonA").mousePressed(() => playNoteWithColor("A3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("B", "buttonB").mousePressed(() => playNoteWithColor("B3")).mouseReleased(stopNote).parent(controlContainer);
  createButtonWithText("C2", "buttonC2").mousePressed(() => playNoteWithColor("C4")).mouseReleased(stopNote).parent(controlContainer);
}

const containerStyle = `
  #mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #mainContainer canvas {
    margin-bottom: 10px; /* Reduce space between canvas and controls */
  }
  #mainContainer button,
  #mainContainer label,
  #mainContainer input {
    margin: 2px; /* Decrease spacing between elements */
  }
`;

function addStyles(css) {
  let style = createElement('style', css);
  document.head.appendChild(style.elt);
}

addStyles(containerStyle);

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
  label.style("display", "block");
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

// Function to select oscillator type
function selectOscillatorType(type) {
  synth.oscillator.type = type;
  console.log("Selected: " + type);
}

function draw () {
  background(30);
  if (isNotePlaying) {
    fill(currentColor[0], currentColor[1], currentColor[2]);
  } else {
    fill(255);
  }

  translate(width / 2, height / 2);

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
}