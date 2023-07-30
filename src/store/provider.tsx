'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from '@/store/index';

export function ReduxProvider({children}: {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                { children }
            </PersistGate>
        </Provider>
    )
}

