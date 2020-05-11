import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

interface IShowResult {
  message: string;
  status: string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <code>const A = '1234'</code>
        <Button
          autoFocus
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
          disabled={false}
        >
          Large Primary
        </Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
          disabled={false}
        >
          Small Danger
        </Button>
        <Button
          btnType={ButtonType.Default}
          disabled={false}
        >
          Default
        </Button>
        <Button
          btnType={ButtonType.Primary}
          disabled={true}
        >
          disabled Primary
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          disabled={true}
          href="http://www.zhiheng.space"
        >
          Large disabled Link
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
          disabled={false}
          target="_blank"
          href="http://www.zhiheng.space"
        >
          Small Link
        </Button>
      </header>
    </div>
  );
}

export default App;
