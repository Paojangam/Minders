import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "../styles/MindfulnessMusic.css";

function MindfulnessMusic() {
  const tracks = [
    {
      title: "🌧 Rainfall",
      description: "Gentle rain tapping on leaves.",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "🌊 Ocean Waves",
      description: "The soothing rhythm of the sea.",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "🌲 Forest Birds",
      description: "Birdsong and rustling trees.",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      title: "🔥 Cozy Campfire",
      description: "Crackling flames under the night sky.",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (track) => {
    if (currentTrack && currentTrack.title === track.title && isPlaying) {
      document.getElementById("audio-player").pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setTimeout(() => {
        document.getElementById("audio-player").play();
        setIsPlaying(true);
      }, 100);
    }
  };

  return (
    <div className="music-container">
      <div className="music-guide">
        <h1>Mindfulness Sounds 🎶</h1>
        <p>
          Close your eyes. Breathe slowly.  
          Choose a soundscape and let it carry your thoughts  
          to a place of peace and serenity.
        </p>
      </div>

      <div className="music-grid">
        {tracks.map((track, i) => (
          <div key={i} className="music-card">
            <h2>{track.title}</h2>
            <p>{track.description}</p>
            <button
              className="music-btn"
              onClick={() => togglePlay(track)}
            >
              {currentTrack && currentTrack.title === track.title && isPlaying ? (
                <><FaPause /> Pause</>
              ) : (
                <><FaPlay /> Play</>
              )}
            </button>
          </div>
        ))}
      </div>

      {currentTrack && (
        <audio id="audio-player" src={currentTrack.src} onEnded={() => setIsPlaying(false)} />
      )}
    </div>
  );
}

export default MindfulnessMusic;
