function setup () {
    createCanvas (windowWidth, windowHeight);
    angleMode (DEGREES);
}

function draw () {
    background (135, 206, 255);
    //stroke (255);
    //strokeWeight (5);
    noStroke ();
    fill (25, 25, 112);
    //noFill ();

    translate (width/2, height/2);

    beginShape ();
    for (let i = 0; i<359; i++) {

        let r1Min = map (sin(frameCount), -1, 1, 50, 100);
        let r1Max = map (sin(frameCount * 3), -1, 1, 100, 0);

        let r2Min = map (sin(frameCount * 5), -1, 1, 100, 50);
        let r2Max = map (sin(frameCount / 3), -1, 1, 0, 100);

        let r1 = map (sin(i * 5 + 40), -1, 1, r1Min, r1Max);
        let r2 = map (sin(i * 3 + 80), -1, 1, r2Min, r2Max);
        let r = r1 + r2;
        let x = r * cos(i);
        let y = r * sin(i);
        vertex (x, y);
    }
    endShape (CLOSE);

    fill (70, 130, 180, 90);
    beginShape ();
    for (let i = 0; i<359; i++) {

        let r1Min = map (sin(frameCount), -1, 1, 30, 80);
        let r1Max = map (sin(frameCount * 5), -1, 1, 80, 0);

        let r2Min = map (sin(frameCount * 5), -1, 1, 80, 30);
        let r2Max = map (sin(frameCount / 2), -1, 1, 0, 80);

        let r1 = map (sin(i * 5 + 40), -1, 1, r1Min, r1Max);
        let r2 = map (sin(i * 3 + 80), -1, 1, r2Min, r2Max);
        let r = r1 + r2;
        let x = r * cos(i);
        let y = r * sin(i);
        vertex (x, y);
    }
    endShape (CLOSE);
}