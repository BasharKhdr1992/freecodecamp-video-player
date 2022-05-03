import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Video from '../Video';
import Playlist from '../containers/Playlist';
import StyledWbnPlayer from './../styles/StyledWbnPlayer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const theme = {
  bgcolor: '#353535',
  bgcolorItem: '#414141',
  bgcolorItemActive: '#405c63',
  bgcolorPlayed: '#526d4e',
  border: 'none',
  borderPlayer: 'none',
  color: '#fff',
};

const themeLight = {
  bgcolor: '#fff',
  bgcolorItem: '#fff',
  bgcolorItemActive: '#80a7b1',
  bgcolorPlayed: '#7d9979',
  border: '1px solid #353535',
  borderPlayed: 'none',
  color: '#353535',
};

const WbnPlayer = () => {
  const videos = JSON.parse(document.querySelector('[name="videos"]').value);
  const savedState = JSON.parse(localStorage.getItem(videos.playlistId));

  const initialState = {
    videos: videos.playlist,
    activeVideo: videos.playlist[0],
    nightMode: true,
    playlistId: videos.playlistId,
    autoplay: false,
  };

  const { activeVideo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState(savedState ? savedState : initialState);

  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`, JSON.stringify({ ...state }));
  }, [state]);

  useEffect(() => {
    console.log(location.state);

    if (activeVideo !== undefined) {
      const newActiveVideo = state.videos.findIndex(
        (video) => video.id === activeVideo
      );
      setState((prev) => ({
        ...prev,
        activeVideo: prev.videos[newActiveVideo],
        autoplay: location.state.autoplay,
      }));
    } else {
      navigate(`/${state.activeVideo.id}`, { state: { autoplay: false } });
    }
  }, [
    activeVideo,
    location.state,
    navigate,
    state.activeVideo.id,
    state.videos,
  ]);

  const nightModeCallback = () => {
    setState((prev) => ({
      ...prev,
      nightMode: !state.nightMode,
    }));
  };
  const endCallback = () => {
    const currentVideoIndex = state.videos.findIndex(
      (video) => video.id === activeVideo
    );
    const newxVideo =
      currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;
    navigate(`/${state.videos[newxVideo].id}`, { state: { autoplay: false } });
  };
  const progressCallback = (e) => {
    if (e.playedSeconds > 10 && e.playedSeconds < 11) {
      setState((prev) => ({
        ...prev,
        videos: prev.videos.map((video) => {
          if (video.id === prev.activeVideo.id) {
            return { ...video, played: true };
          } else {
            return video;
          }
        }),
      }));
    }
  };

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.videos !== null ? (
        <StyledWbnPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
            endCallback={endCallback}
            progressCallback={progressCallback}
          />
          <Playlist
            videos={state.videos}
            active={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
          />
        </StyledWbnPlayer>
      ) : null}
    </ThemeProvider>
  );
};

export default WbnPlayer;
