import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { ReactMediaRecorder } from "react-media-recorder";

function App() {

  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearPreview = () => {
    setPreviewUrl('');
    
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

              <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl}) => (
                  <div>
                    <p>{status}</p>
                    <button className="btn btn-primary" onClick={startRecording}>Record Video</button>


                    <button className="btn btn-danger" onClick={stopRecording}>Stop Recording</button>
                    
                    <video src={mediaBlobUrl} controls autoPlay loop />
                  </div>
                )}
              />


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
            {(previewUrl ) && (
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
