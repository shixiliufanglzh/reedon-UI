import React from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

interface IShowResult {
  message: string;
  status: string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => {alert(index)}} mode='vertical'>
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <SubMenu title={'dropdown'}>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>link 3</MenuItem>
        </Menu>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <code>const A = '1234'</code>
        {/* <Button
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
        </Button> */}
      </header>
    </div>
  );
}

export default App;
