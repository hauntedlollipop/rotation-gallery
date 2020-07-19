import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RotationGallery from '../src/index';

const App = () => {
  return (
    <div>
      <RotationGallery 
        name='bosch2'
        source='https://rotationgallery.com/assets/'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
