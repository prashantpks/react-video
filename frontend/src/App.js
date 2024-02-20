import React, { useState, useRef } from 'react';
import './App.css';
import RecordRTC from 'recordrtc';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  let recordRTC;

  const startRecording = () => {
    setIsRecording(true);
    setPreviewUrl('');
  
    // Ensure that the webcamRef is initialized
    if (webcamRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          // Access the webcam and set the stream to the webcamRef
          webcamRef.current.srcObject = stream;
          recordRTC = RecordRTC(stream, { type: 'video' });
          recordRTC.startRecording();
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
        });
    } else {
      console.error('Webcam reference is not initialized.');
    }
  };
  

  const stopRecording = () => {
    setIsRecording(false);
    if (recordRTC) {
      recordRTC.stopRecording(() => {
        const videoBlob = recordRTC.getBlob();
  
        // Create a file from the recorded video blob
        const videoFile = new File([videoBlob], 'recorded_video.webm', {
          type: 'video/webm',
        });
  
        setRecordedVideoBlob(videoBlob);
        setPreviewUrl(URL.createObjectURL(videoFile));
      });
    } else {
      console.warn('recordRTC is not initialized.');
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearPreview = () => {
    setPreviewUrl('');
    setRecordedVideoBlob(null);
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submitted!');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Video Gallery App</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6 mx-auto">
            <div className="text-center mt-5">
              {!isRecording ? (
                <>
                  <label htmlFor="upload-video" className="btn btn-primary mr-3">
                    Upload Video
                    <input
                      id="upload-video"
                      type="file"
                      accept="video/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <button className="btn btn-primary" onClick={startRecording}>Record Video</button>
                  
                </>
              ) : (
                <><Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
                width={640}
                height={360}
                screenshotQuality={1}
              /> <button className="btn btn-danger" onClick={stopRecording}>Stop Recording</button></>
                
              )}
              {previewUrl && (
                <button className="btn btn-danger ml-3" onClick={clearPreview}>Clear Preview</button>
                
              )}
            </div>
            {previewUrl && (
              <div className="mt-3">
                <video
                  controls
                  src={previewUrl}
                  style={{ maxWidth: '100%', width: '300px', height: 'auto' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {(previewUrl && !isRecording) && (
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="text-center">
              <h2>Uploaded Videos</h2>
            </div>
            <div className="row">
              {recordedVideoBlob && (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                  <video
                    controls
                    className="mt-3"
                    src={URL.createObjectURL(recordedVideoBlob)}
                    style={{ maxWidth: '100%' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {selectedFile && (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                  <video
                    controls
                    className="mt-3"
                    src={previewUrl}
                    style={{ maxWidth: '100%' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
