import * as React from 'react';

interface RotationGalleryProviderProps {
    children: React.ReactNode
    source: string
}

export const RTContext = React.createContext({source: ''});

const RotationGalleryProvider: React.FC<RotationGalleryProviderProps> = ({children, source}) => <RTContext.Provider value={{source}}>{children}</RTContext.Provider>;

export default RotationGalleryProvider;