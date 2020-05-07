import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
// import MouseTracker from './components/MouseTracker';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';

interface IShowResult {
  message: string;
  status: string;
}

function App() {
  const position = useMousePosition();
  const [show, setShow] = useState(true);
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show]);
  const dogResult = data as IShowResult;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello message='hello reed' />
        <LikeButton />
        <button onClick={() => {setShow(!show)}}>toggle picture</button>
        <p>X: {position.X}, Y: {position.Y}</p>
        {loading ? <p>读取中。。。</p> : <img src={dogResult && dogResult.message} alt='dog' />}
      </header>
    </div>
  );
}

export default App;
