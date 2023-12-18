import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import "react-native-gesture-handler"
import AppNavigation from './navigation/appNavigation';



import { Provider } from 'react-redux'
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>

  );
}


