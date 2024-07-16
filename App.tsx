import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Photos from './Screens/Photos';
import SinglePhoto from './Screens/SinglePhoto';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Photos" component={Photos} />
        <Stack.Screen name="Photo" component={SinglePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
