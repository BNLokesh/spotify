import React, { useEffect, useState } from 'react';
import './index.css'; // Import the CSS file

function SongList({ songs, onSongSelect }) {
  return (
    <ul className='list-container'>
      {songs.map((song) => (
        <SongItem 
          key={song.id}
          song={song}
          onSongSelect={onSongSelect}
        />
      ))}
    </ul>
  );
}

function SongItem({ song, onSongSelect }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    getAudioDuration(song.url).then((duration) => {
      setDuration(duration);
    }).catch((error) => {
      console.error("Failed to load audio:", error);
    });
  }, [song.url]);

  return (
    <li
      className={`list-item ${song.selected ? 'selected' : ''}`}
      onClick={() => onSongSelect(song)}
    >
      <img src={song.coverUrl} alt={song.name} className='album-art' />
      <div className='song-details'>
        <div className='song-name'>{song.name}</div>
        <div className='artist-name'>{song.artist}</div>
      </div>
      <div className='song-duration'>
        {duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : 'Loading...'}
      </div>
    </li>
  );
}

function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);

    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });

    audio.addEventListener('error', (e) => {
      reject(e);
    });
  });
}

export default SongList;
