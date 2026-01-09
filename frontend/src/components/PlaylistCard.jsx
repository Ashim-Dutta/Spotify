import React, { useState } from 'react';
import './PlaylistCard.css';

const PlaylistCard = ({ title, artist, musics = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`playlist-card ${isExpanded ? 'active' : ''}`}>
            <div className="playlist-header" onClick={toggleExpand}>
                <div className="playlist-info">
                    <h3 className="playlist-title">{title}</h3>
                    <p className="playlist-meta">{artist} • {musics.length} Songs</p>
                </div>
                <button className="expand-button" aria-expanded={isExpanded}>
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>

            {isExpanded && (
                <div className="playlist-tracks">
                    {musics.length > 0 ? (
                        <ul className="track-list">
                            {musics.map((music, index) => (
                                <li key={index} className="track-item">
                                    <span className="track-number">{index + 1}</span>
                                    <span className="track-name">{music.title}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-tracks">No songs in this playlist.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlaylistCard;
