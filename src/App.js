import React, { Component } from 'react';

class App extends Component {

  /**
   * Get stream from getUserMedia and play the stream via video player
   */
  onClick() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log("Stream Success", stream);
        const iframeRoot = document.getElementById('iframe');
        const video = iframeRoot.contentWindow.document.getElementById('video');
        video.srcObject = stream;
      })
      .catch(error => {
        console.log('Stream Error', error);
      });
  }

  render() {
    return (
      <div>
        <h4>Video wont start unless cam and mic permissions is given from context of website</h4>
        <button onClick={this.onClick}>Get Video</button>
        <br></br>
        <video controls autoPlay id='video' width='300' height='200'></video>
      </div>
    );
  }
}

export default App;
