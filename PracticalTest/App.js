import React, { Component } from 'react';
import { Platform, View, StatusBar, SafeAreaView } from 'react-native';
import Router from './src/router';

export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
          <StatusBar
            translucent
            backgroundColor={'white'}
            barStyle="dark-content" />
        </View>
        <Router />
      </View >
    );
  }
}
