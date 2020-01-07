import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppRoot from './src/components/Root';
import { YellowBox } from 'react-native';

export default class App extends React.Component {
  render() {

    YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
    console.disableYellowBox = true;
    console.reportErrorsAsExceptions = false;
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    );
  }
}
