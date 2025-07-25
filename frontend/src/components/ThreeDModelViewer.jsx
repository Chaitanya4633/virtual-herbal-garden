// ThreeDModelViewer.jsx
import React, { useEffect, useRef } from 'react';

const ThreeDModelViewer = ({ url, alt = '3D model' }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    // Load the model-viewer script if not already loaded
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js';
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!url) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No 3D model available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <model-viewer
        ref={viewerRef}
        src={url}
        alt={alt}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
};

export default ThreeDModelViewer;