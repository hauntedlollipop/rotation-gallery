import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RotationGallery from '../src/index';
import RotationGalleryProvider from '../src/provider';

const App = () => {
  return (
    <div>
      <RotationGalleryProvider source='https://rotationgallery.com/assets/'>
        <RotationGallery 
          name='sculpture'
        />
      </RotationGalleryProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
