import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage';
import MapContainer from './MapContainer';

const vehicles = [
  { id: 1, name: 'V 1', position: [17.4555136, 78.39744] },
  { id: 2, name: 'V 2', position: [17.3606, 78.5477] },
  { id: 3, name: 'V 3', position:  [17.3604, 78.5358] },
  { id: 4, name: 'V 4', position: [17.4375, 78.4482] },  
  { id: 5, name: 'V 4', position: [17.4499, 78.8090] },
  { id: 6, name: 'V 5', position: [17.2358, 78.4293] },
  { id: 7, name: 'V 6', position: [17.4316, 78.4086] },  
];


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/map" element={<MapContainer vehicles={vehicles} />} />
      </Routes>
    </Router>
  );
};

export default App;
