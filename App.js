import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './src/contexts/UserContext';
import  MainStack from './src/stacks/MainStack';
import { AppState} from "react-native";

export default () => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

  //       useEffect(() => {
  //         AppState.addEventListener("change", _handleAppStateChange);

  //         return () => {
  //         AppState.removeEventListener("change", _handleAppStateChange);
  //         };
  //     }, []);

  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
     
  //       appState.current = nextAppState;
  //       setAppStateVisible(appState.current);
  //       console.log("AppState", appState.current);
  //   } else {
  //       appState.current = nextAppState;
  //       setAppStateVisible(appState.current);
  //       console.log("AppState", appState.current);
  //   }

    
  // };
  return (
    <UserContextProvider>

          <NavigationContainer>
      
              <MainStack />

          </NavigationContainer>  

    </UserContextProvider>
     

  );
}