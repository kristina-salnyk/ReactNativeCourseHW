import React, {FC, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import Geocoder from 'react-native-geocoding';
import {REACT_APP_GOOGLE_API_KEY, REACT_APP_STORYBOOK_ENABLED} from '@env';

import RootNavigator from './src/navigation/RootNavigator';
import onAppStart from './src/utils/onAppStart';
import {store} from './src/store';
import {theme} from './src/theme';

const App: FC = () => {
  useEffect(() => {
    Geocoder.init(REACT_APP_GOOGLE_API_KEY);

    onAppStart();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar barStyle="light-content" />
      </Provider>
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

console.log('REACT_APP_STORYBOOK_ENABLED', REACT_APP_STORYBOOK_ENABLED);
//
// if (REACT_APP_STORYBOOK_ENABLED === 'true') {
//   AppEntryPoint = require('./.storybook').default;
// }

export default AppEntryPoint;
