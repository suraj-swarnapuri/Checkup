import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { StyleSheet, Text, Dimensions } from 'react-native';
import PatientDetailScreen from './screens/PatientDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PatientListScreen from './screens/PatientListScreen';
import ChatScreen from './screens/ChatScreen';

function Link(props: any) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />;
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PatientList"
            component={PatientListScreen}
            options={{ title: 'Patients' }}
          />
          <Stack.Screen
            name='PatientDetail'
            component={PatientDetailScreen}
            options={{ title: "Patient Detail" }} />
          <Stack.Screen
            name='Chat'
            component={ChatScreen}
            options={{ title: "Chat" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    padding: 20
  },
  title: {
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
  link: {
    color: '#1B95E0'
  },
  code: {
    fontFamily: 'monospace, monospace'
  }
});
export default App;
