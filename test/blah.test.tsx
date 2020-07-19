import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RotationGallery } from '../src/RotationGallery';


function App() {
  return (
    <div className="App">
      <RotationGallery 
        name={'red_shoe'}
        title='Bosch' 
        source={'http://rotationgallery.com/assets/'}
        options={{startY: 3}}
      />
    </div>
  );
}

export default App;

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
