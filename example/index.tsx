import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RotationGallery from '../src/index';
import RotationGalleryProvider from '../src/provider';

const App = () => {
  return (
    <div>
      <RotationGalleryProvider source='https://rotation-gallery.s3.eu-central-1.amazonaws.com/'>
        <RotationGallery 
          name='drone'
          options={{img_infix: '-', range_max:{x: 8, y: 1}}}
          
        />
      </RotationGalleryProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
