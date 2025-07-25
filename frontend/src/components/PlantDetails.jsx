import React, { useState, useEffect } from 'react';
import ThreeDModelViewer from './ThreeDModelViewer';

const Plant3DView = ({ plant }) => {
  const commonName = plant.commonNames[0];
  const modelFileName = `${commonName.replace(/\s+/g, '_')}.glb`;
  const modelPath = `/Hacthon(JFS)/3D/${modelFileName}`;

  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
      <ThreeDModelViewer
        url={modelPath}
        fallback={
          <div className="text-center p-4">
            <p className="text-gray-500">3D model not available for {commonName}</p>
            <p className="text-sm text-gray-400 mt-2">File: {modelFileName}</p>
          </div>
        }
      />
    </div>
  );
};

const PlantDetails = ({ plant, onBookmark, isBookmarked, onShare }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    if (plant?.id) {
      const saved = localStorage.getItem(`note_${plant.id}`);
      setNote(saved || '');
    }
  }, [plant]);

  const saveNote = () => {
    localStorage.setItem(`note_${plant.id}`, note);
  };

  if (!plant) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 3D Model Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          3D Model
        </h3>
        <Plant3DView plant={plant} />
      </div>

      <h2 className="text-2xl font-bold mb-2">{plant.botanicalName}</h2>
      <div className="mb-2 text-gray-600">{plant.commonNames?.join(', ')}</div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onBookmark(plant)}
          className={`px-4 py-1 rounded ${isBookmarked ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'} hover:opacity-90`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button onClick={() => onShare(plant)} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
          Share
        </button>
      </div>

      {/* Video Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-xl mb-4">Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Tulsi', url: 'https://youtu.be/Ln3W9k9GVIE?si=tlrBb0gaQ2NhPSJg' },
            { name: 'Ashwagandha', url: 'https://youtube.com/shorts/_2oW-Y3I8WA?si=MwGmLWZwQ9ZwtAkS' },
            { name: 'Turmeric', url: 'https://youtube.com/shorts/wHURcl8Y3m8?si=0m4Z8rOuj-l1LNWt' },
            { name: 'Cinnamon', url: 'https://youtube.com/shorts/fz_S-SOqolY?si=qZmeTRFtEc-RPFsj' },
            { name: 'Cardamom', url: 'https://youtube.com/shorts/_3HhE2JRjpk?si=oKNHe1NftQLe_myW' },
            { name: 'Clove', url: 'https://youtube.com/shorts/9X9yMb1zkNw?si=YPXLfUSjT5Ze_CIC' },
          ]
            .filter(video => plant.commonNames?.some(name =>
              name.toLowerCase().includes(video.name.toLowerCase())))
            .map((video, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">{video.name} Video</h4>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-48 rounded"
                    src={`https://www.youtube.com/embed/${video.url.split('youtu.be/')[1]?.split('?')[0] || video.url.split('youtube.com/shorts/')[1]?.split('?')[0]}`}
                    title={`${video.name} Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Description and Details */}
      <div className="mt-6">
        <h3 className="font-semibold">Description:</h3>
        <p>{plant.description}</p>

        <h3 className="font-semibold mt-2">Habitat:</h3>
        <p>{plant.habitat}</p>

        {plant.commonNames?.[0] && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Audio Guide:</h3>
            <audio
              controls
              src={`/Hacthon(JFS)/${plant.commonNames[0].replace(/\s+/g, '_')}.mp3`}
              onError={(e) => {
                if (e.target.src.endsWith('.mp3')) {
                  e.target.src = `/Hacthon(JFS)/${plant.commonNames[0].replace(/\s+/g, '_')}.wav`;
                } else {
                  e.target.style.display = 'none';
                }
              }}
              className="w-full max-w-md"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <h3 className="font-semibold mt-2">Medicinal Uses:</h3>
        <ul className="list-disc ml-6">
          {plant.medicinalUses?.map((use, i) => <li key={i}>{use}</li>)}
        </ul>

        <h3 className="font-semibold mt-2">Cultivation Details:</h3>
        <p>{plant.cultivationDetails}</p>

        <h3 className="font-semibold mt-2">Region:</h3>
        <p>{plant.region}</p>

        <h3 className="font-semibold mt-2">Type:</h3>
        <p>{plant.plantType}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {plant.uses?.map(tag => (
            <span key={tag} className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        

        {/* Notes Section */}
        <div className="my-4 p-4 bg-gray-50 rounded shadow">
          <h4 className="font-semibold mb-2">Your Notes</h4>
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={4}
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={saveNote}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
