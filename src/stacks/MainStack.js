import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import Avisoloc from '../screens/Avisoloc';
import Localizar from '../screens/Localizar';
import ServPub from '../screens/Serpub'
import LiveStack from '../stacks/LiveStack';

const Stack = createStackNavigator();

export default () => (

    <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
        headerShown: false
    }}
    
    >

        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Avisoloc" component={Avisoloc} />
        <Stack.Screen name="Localizar" component={Localizar} />
        <Stack.Screen name="ServPub" component={ServPub} />
        <Stack.Screen name="LiveStack" component={LiveStack} />

    </Stack.Navigator>
    );