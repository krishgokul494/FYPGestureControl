<template>
  <div id="app">
    <h1 id="gesture_name">Start</h1>
    <br>
    <div id="container" style="position: relative;">
      <video id="video" style="position: absolute; top:0; left: 0;"></video>
      <canvas id="canvas" style="position: absolute; top:0; left: 0;"></canvas>
    </div>
    <br>
  </div>
</template>

<script>
require('@tensorflow/tfjs');
require('@tensorflow/tfjs-backend-webgl');

import * as handpose from '@tensorflow-models/handpose'
import * as fp from 'fingerpose';

export default {
  name: 'App',
  components: {
  },
  async mounted() {
    const video = document.getElementById('video');
    video.style.transform = "rotateY(180deg)";
    const canvas = document.getElementById('canvas');
    canvas.style.transform = "rotateY(180deg)";

    var currentGesture = null;
    const gesture_name = document.getElementById('gesture_name');

    await navigator.getUserMedia(
      {
        video: true,
        audio: false
      }, async (stream) => {
        video.srcObject = stream;
        video.play();
      }, (err) => {
        console.log(err);
      })

    const net = await handpose.load();
    console.log('Handpose model loaded');

    const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
    };

    setInterval(async () => {
      gesture_name.textContent = "";
      if(video !== null && video.length !== 0) {

          const videoHeight = video.videoHeight;
          const videoWidth = video.videoWidth;

          video.height = videoHeight;
          video.width = videoWidth;

          canvas.height = videoHeight;
          canvas.width = videoWidth;

          const hand = await net.estimateHands(video);

          if(hand.length > 0) {
          const GE = new fp.GestureEstimator([
              fp.Gestures.VictoryGesture,
              fp.Gestures.ThumbsUpGesture,
              fp.Gestures.OpenHandGesture,
              fp.Gestures.ClosedHandGesture,
              fp.Gestures.IndexUpGesture,
              fp.Gestures.ThumbsLeftGesture,
              fp.Gestures.ThumbsRightGesture,
              fp.Gestures.ThumbsDownGesture
          ])

          const gesture = await GE.estimate(hand[0].landmarks, 8);
          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
              const confidence = gesture.gestures.map(
              (prediction) => prediction.confidence
              );

              const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
              );
              currentGesture = gesture.gestures[maxConfidence].name;

              const xmlRequest = new XMLHttpRequest();
              xmlRequest.open('GET', 'http://localhost:3000/send/' + currentGesture, false);
              xmlRequest.send(null);
              console.log(xmlRequest.responseText);
              console.log(currentGesture);
          }
        }
      }
    }, 300);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>