import styled from 'styled-components';

const StyledPlaylist = styled.div`
  flex: 1 1 450px;
  overflow: hidden;
  color: white;
  /* height: 0;
  padding-top:50px;
  padding-bottom: 36%; */

  @media screen and (max-width: 1400px) {
    width: 100%;
    display: block;
  }
`;

export default StyledPlaylist;
