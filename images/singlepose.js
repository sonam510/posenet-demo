let video;
let poseNet;
let pose;
let skeleton;

function setup()
{
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(poses)
{
    console.log(poses);
    if(poses.length>0)
    {
        pose=poses[0].pose;
        skeleton=poses[0].skeleton;
    }
}

function modelLoaded()
{
    console.log('poseNet ready');
}

function draw()
{
    image(video,0,0);
    if(pose)
    {

        for(let i=0;i<pose.keypoints.length;i++)
        {
            let x=pose.keypoints[i].position.x;
            let y=pose.keypoints[i].position.y;
            fill(0,255,0);
            ellipse(x,y,16,16);
        }
        for(let i=0;i<skeleton.length;i++)
        {
            let a=skeleton[i][0];
            let b=skeleton[i][1];
            strokeWeight(5);
            stroke(255);
            line(a.position.x,a.position.y,b.position.x,b.position.y);
        }
    }
}