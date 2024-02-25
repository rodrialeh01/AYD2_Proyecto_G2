import React, { useState } from 'react';
import Sidebar from './Navigation/Sidebar';
import Home from './pages/client/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <Home />
      </div>
    </>
  )
}

export default App;
