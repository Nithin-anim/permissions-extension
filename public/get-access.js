/* eslint-disable func-names */
/* eslint-disable no-console */
/**
 * Gets cam and mic permissions from user using getUserMedia
 */
function getAccess() {
    console.log('Get permission');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function (stream) {
            console.log('Permissions Granted', stream);
            stream.getTracks().forEach(function (track) {
                track.stop();
            });
        })
        .catch(function (error) {
            console.log('Permissions Denied', error);
        });
}

getAccess();