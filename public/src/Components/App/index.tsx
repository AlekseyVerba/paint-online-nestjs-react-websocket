import React, { useEffect } from 'react';
import "../../styles/app.scss"
import MainPage from '../../Pages/Main';
import { Route, Routes, Navigate, } from 'react-router-dom';
import { v4 } from "uuid"

function App() {





  return (
    <div className="App">
      <Routes>
        <Route path='/:id' element={<MainPage />} />
        <Route
          path="*"
          element={<Navigate to={`/${v4()}`} />}
        />
      </Routes>
    </div>
  );
}

export default App;
