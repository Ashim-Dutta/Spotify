import React from 'react';
import './MusicCard.css';

const MusicCard = ({ title, artist, coverImageUrl, musicUrl }) => {
    return (
        <div className="music-card">
            <div className="music-card-image-container">
                <img src={coverImageUrl} alt={title} className="music-card-image" />
                <div className="music-card-overlay">
                    <button className="play-button" onClick={() => console.log(`Playing ${title}`)}>
                        ▶
                    </button>
                </div>
            </div>
            <div className="music-card-info">
                <h3 className="music-card-title">{title}</h3>
                <p className="music-card-artist">{artist}</p>
            </div>
            {/* Basic audio element as requested */}
            <audio controls src={musicUrl} className="music-card-audio">
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicCard;
