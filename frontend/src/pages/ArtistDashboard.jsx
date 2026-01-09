import React from 'react';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import './ArtistDashboard.css';
import axios from 'axios';
import { useEffect } from 'react';


const DUMMY_MUSIC = [
    {
        title: 'Midnight Echoes',
        artist: 'Luna Horizon',
        coverImageUrl: 'https://placehold.co/300x300/1DB954/FFFFFF?text=Midnight',
        musicUrl: ''
    },
    {
        title: 'Neon Dreams',
        artist: 'Luna Horizon',
        coverImageUrl: 'https://placehold.co/300x300/121212/FFFFFF?text=Neon',
        musicUrl: ''
    },
    {
        title: 'Solar Flare',
        artist: 'Luna Horizon',
        coverImageUrl: 'https://placehold.co/300x300/535353/FFFFFF?text=Solar',
        musicUrl: ''
    },
    {
        title: 'Velvet Sky',
        artist: 'Luna Horizon',
        coverImageUrl: 'https://placehold.co/300x300/282828/FFFFFF?text=Velvet',
        musicUrl: ''
    }
];

const DUMMY_PLAYLISTS = [
    {
        title: 'Best of Luna',
        artist: 'Luna Horizon',
        musics: [
            { title: 'Midnight Echoes' },
            { title: 'Neon Dreams' },
            { title: 'Velocity' }
        ]
    },
    {
        title: 'Chill Vibes',
        artist: 'Luna Horizon',
        musics: [
            { title: 'Velvet Sky' },
            { title: 'Quiet Storm' }
        ]
    },
    {
        title: 'High Energy',
        artist: 'Luna Horizon',
        musics: [
            { title: 'Solar Flare' },
            { title: 'Ignite' },
            { title: 'Rush' },
            { title: 'Power Up' }
        ]
    }
];

const ArtistDashboard = () => {
    return (
        <div className="artist-dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Artist Dashboard</h1>
                <p className="dashboard-subtitle">Manage your music and playlists</p>
            </header>

            <section className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">My Music</h2>
                    <button className="add-btn">+ Upload Track</button>
                </div>
                <div className="music-grid">
                    {DUMMY_MUSIC.map((music, index) => (
                        <MusicCard
                            key={index}
                            {...music}
                        />
                    ))}
                </div>
            </section>

            <section className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">My Playlists</h2>
                    <button className="add-btn">+ Create Playlist</button>
                </div>
                <div className="playlist-grid">
                    {DUMMY_PLAYLISTS.map((playlist, index) => (
                        <PlaylistCard
                            key={index}
                            {...playlist}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArtistDashboard;
