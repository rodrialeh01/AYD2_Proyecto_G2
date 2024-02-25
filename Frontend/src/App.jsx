import React, { useState } from 'react';
import Sidebar from './Navigation/Sidebar';
import Product from './pages/client/Product';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <Product />
      </div>
    </>
  )
}

export default App;
