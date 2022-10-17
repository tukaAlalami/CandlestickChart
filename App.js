/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import { store } from './src/Store';
import CandlestickChart from './src/Components/CandlestickChart';
import ReactNativeBiometrics from 'react-native-biometrics'
import { Text } from 'react-native-ui-lib';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showChart, setShowChart] = useState(false);

  const checkBiometrics = () => {
    const rnBiometrics = new ReactNativeBiometrics()

    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject
        setShowChart(success);
        if (success) {
          console.log('successful biometrics provided')

        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        setShowChart(false);
        console.log('biometrics failed')
      })
  }

  useEffect(() => {
    checkBiometrics();
  }, []);

  return (
    <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {showChart ?
          <CandlestickChart />
          : <View style={styles.container}>
            <Text  center red20 text70>biometrics failed</Text>
          </View>
        }
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
