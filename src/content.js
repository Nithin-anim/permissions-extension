/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import App from "./App";
class Main extends React.Component {
  render() {
    return (
      <Frame id='iframe' head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
        <FrameContextConsumer>
          {
            ({ document, window }) => {
              return <App document={document} window={window} isExt={true} />
            }
          }
        </FrameContextConsumer>
      </Frame>
    )
  }
}

// The app is injected into the body of the webpage and it will be toggled 
// on clciking the extension icon 

const app = document.createElement('div');
app.id = "my-extension-root";
app.style.height = '70%';

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      toggle();
    }
  }
);

/**
 * This function will inject an iframe that will ask permissions in behalf of extension
 */
function injectFrame() {
  const ifr = document.createElement('iframe');
  ifr.setAttribute('allow', 'camera;microphone');
  ifr.style.display = 'none';
  ifr.src = chrome.runtime.getURL('get-access.html');
  document.body.appendChild(ifr);
}

/**
 * Controls display of extension
 */
function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
    injectFrame();
  } else {
    app.style.display = "none";
  }
}
