import React from 'react';
import PlaylistItem from './../PlaylistItem';
import withLink from '../hoc/withLink';
import StyledPlaylistitems from './../styles/StyledPlaylistitems';

const PlaylistItemWithLink = withLink(PlaylistItem);

const PlaylistItems = ({ videos, active }) => {
  return (
    <StyledPlaylistitems>
      {videos.map((video) => {
        return (
          <PlaylistItemWithLink
            key={video.id}
            video={video}
            played={video.played}
            active={video.id === active.id}
          />
        );
      })}
    </StyledPlaylistitems>
  );
};

export default PlaylistItems;
