import React from 'react';
import ReactPlayer from 'react-player';
import StyledVideoWrapper from './styles/StyledVideoWrapper';
import StyledVideo from './styles/StyledVideo';

const Video = ({ active, autoplay, endCallback, progressCallback }) => {
  return (
    <StyledVideo>
      <StyledVideoWrapper>
        <ReactPlayer
          style={{ position: 'absolute', top: '0' }}
          width={'100%'}
          height={'100%'}
          playing={autoplay}
          controls={true}
          url={active.video}
          onEnded={endCallback}
          onProgress={progressCallback}
        />
      </StyledVideoWrapper>
    </StyledVideo>
  );
};

export default Video;
