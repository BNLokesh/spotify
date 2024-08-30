import React, { useRef, useState, useEffect } from 'react';
import './index.css'; // Import the CSS file
import { FaPlay, FaPause ,FaVolumeUp} from 'react-icons/fa'; // Import play and pause icons

function Player({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <div className='player-container'>
      <div>
        <div className='song-title'>{currentSong.name}</div>
        <div className='artist-name'>{currentSong.artist}</div>
      </div>
      <img src={currentSong.coverUrl} alt={currentSong.name} className='album-art' />
      <div className='controls'>
        <button className='button' onClick={togglePlayPause}>
          {isPlaying ? <FaPause className='icon' /> : <FaPlay className='icon' />}
        </button>
        <div className='progress-bar'>
          <div className='progress' style={{ width: `${progress}%` }} />
        </div>
        <button className='button'>
        <FaVolumeUp className='icon' />
        </button>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
}

export default Player;
