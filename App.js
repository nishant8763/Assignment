
import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import rootReducer from './Source/Reducers';
import page1 from './Source/page1';
import page2 from './Source/page2';
import page3 from './Source/page3';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk))
  let persistor = persistStore(store)
  return (
    <View style={{
      flex: 1
    }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator headerMode={'none'} initialRouteName={'page1'} mode='modal'>
              <Stack.Screen name="page1" component={page1} options={{ headerShown: false }} />
              <Stack.Screen name="page2" component={page2} options={{ headerShown: false }} />
              <Stack.Screen name="page3" component={page3} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
