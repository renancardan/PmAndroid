import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Noticias from '../screens/Noticias';


const Stack = createStackNavigator();

export default ({route: {params}}) => (
 
    <Stack.Navigator
    initialRouteName="Noticias"
    
    >
        <Stack.Screen 
        options={{
            title: 'Notícias da Polícia Militar',
            headerStyle: {
              backgroundColor: '#4169e1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        name="Noticias" component={Noticias}  initialParams={params} />
       
       
    </Stack.Navigator>
 
    );