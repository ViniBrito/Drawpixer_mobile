import React from 'react';
import Main from './main';
import { StyleSheet, View } from 'react-native';

export default function App() {
    return(
      <View style={styles.basic}>
        <Main/>
      </View>
    );
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});