import React from 'react';
import WbnPlayer from './WbnPlayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';

/* if you are going to deploy the app in a sub folder, then it is important
to set the basename property on Router component to /subfolder */

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WbnPlayer />} />
        <Route path="/:activeVideo" element={<WbnPlayer />} />
      </Routes>
      <GlobalStyle />
    </Router>
  );
};

export default App;
