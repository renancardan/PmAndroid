import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chamada from '../screens/Chamada';


const Stack = createStackNavigator();

export default () => (

    <Stack.Navigator
    initialRouteName="Chamada"
    
    >
        <Stack.Screen 
        options={{
            title: 'Polícia Militar Chat',
            headerStyle: {
              backgroundColor: '#4169e1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        name="Chamada" component={Chamada} />
       
       
    </Stack.Navigator>
    );