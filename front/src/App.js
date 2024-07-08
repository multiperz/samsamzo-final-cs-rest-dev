import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CSSelect from './component/CSSelect';
import CSSelectDetail from './component/CSSelectDetail';
import CSInsert from './component/CSInsert';
import CSUpdate from './component/CSUpdate';
import CSDelete from './component/CSDelete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CSSelect />} />
        <Route path="/CSSelectDetail/:csNumber" element={<CSSelectDetail />} />
		<Route path="/CSInsert" element={<CSInsert />} />
		<Route path="/CSUpdate/:csNumber" element={<CSUpdate />} />
		<Route path="/CSDelete/:csNumber" element={<CSDelete />} /> 
      </Routes>
    </Router>
  );
}

export default App;