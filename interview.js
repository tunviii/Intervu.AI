import React, { useRef, useState } from "react";

function Interview() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera or microphone permission denied");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Mock Interview Test Mode</h2>

      <button onClick={startCamera} style={{ padding: "10px 20px" }}>
        Start Interview
      </button>

      <div style={{ marginTop: "20px" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="500"
          style={{
            borderRadius: "10px",
            border: "2px solid black",
          }}
        />
      </div>

      {streaming && <p>🎥 Camera is live</p>}
    </div>
  );
}

export default Interview;