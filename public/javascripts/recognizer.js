const handpose = require('@tensorflow-models/handpose');

async function main() {
    const net = handpose.load();

    var getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

    if (getUserMedia) {
        getUserMedia = getUserMedia.bind(navigator);
    }

    getUserMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            console.log(stream);
        }
    )
}

main();