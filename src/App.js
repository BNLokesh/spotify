import React, { Component } from 'react';
import './App.css'; // Import the CSS file
import Player from './Components/Player';
import SongList from './Components/SongList';
import SearchBar from './Components/Searchbar.js';

class App extends Component {
  state = {
    songs: [],
    selectedSong: null,
    searchQuery: '',
    backgroundGradient: '#121212', // State to hold the background gradient
  };

  componentDidMount() {
    fetch('https://cms.samespace.com/items/songs')
      .then((response) => response.json())
      .then((data) => {
        const songsWithCoverUrl = data.data.map((song) => ({
          ...song,
          coverUrl: `https://cms.samespace.com/assets/${song.cover}`,
        }));
        this.setState({ songs: songsWithCoverUrl });
      })
      .catch((error) => console.error('Error fetching songs:', error));
  }

  handleSongSelect = (song) => {
    this.setState({
      selectedSong: song,
      backgroundGradient: `linear-gradient(135deg, ${song.accent}, #000000)`, // Update the gradient
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { songs, selectedSong, searchQuery, backgroundGradient } = this.state;

    // Filter songs based on search query
    const filteredSongs = songs.filter((song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <>
        <div className='app-container' style={{ background: backgroundGradient }}>
          <div className='left-panel'>
            <div className='logo'>
              <img src='/Logo.png' alt='logo' />
            </div>
            <div className='profile-image'>
              <img src='/Profile.png' alt='profile' />
            </div>
          </div>
          <div className='center-panel'>
            <div className='tab-menu'>
              <div className="active">For You</div>
              <div>Top Tracks</div>
            </div>
            <SearchBar onSearch={this.handleSearch} />
            <SongList
              songs={filteredSongs}
              onSongSelect={this.handleSongSelect}
            />
          </div>
          <div className='right-panel'>
            {selectedSong && <Player currentSong={selectedSong} />}
          </div>
        </div>
      </>
    );
  }
}

export default App;


