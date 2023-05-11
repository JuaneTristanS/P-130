song1 = "";
song2 = "";

lw_x = 0;
lw_y = 0;

rw_x = 0;
rw_y = 0;

rw_score = 0;
lw_score = 0;

stat1 = "";
stat2 = "";

function preload() {
    song1 = loadSound("l_theme.mp3");
    song2 = loadSound("lights_theme.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(300, 160)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotResults);
}


function modelLoaded() {
    console.log("Model has been initialised")
}

function gotResults(results) {

    if (results.length > 0) {
        console.log(results);

        lw_score = results[0].pose.keypoints[9].score;
        rw_score = results[0].pose.keypoints[10].score;

        lw_x = results[0].pose.leftWrist.x;
        lw_y = results[0].pose.leftWrist.y;

        rw_x = results[0].pose.rightWrist.x;
        rw_y = results[0].pose.rightWrist.y;

        console.log("left wrist x = " + lw_x + " left wrist y = " + lw_y + " right wrist x = " + rw_x + "right wrist y = " + rw_y);
    }

}

function draw() {

    image(video, 0, 0, 600, 500);
    stat1 = song1.isPlaying();

    fill("red");
    stroke("black");

    if (lw_score > 0.2) {
        circle(lw_x, lw_y, 20);
        song2.stop();

        if (stat1 == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song 1 is playing"
        }
    }

    stat2 = song1.isPlaying();

    if (rw_score > 0.2) {
        circle(rw_x, rw_y, 20);
        song1.stop();

        if (stat2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song 2 is playing"
        }
    }



}
