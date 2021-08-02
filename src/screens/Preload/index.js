import React, { useEffect, useContext, useState } from 'react';
import { Container, LoadingIcon } from './styles';
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import  NetInfo from  "@react-native-community/netinfo" 
import CityLogo from '../../assets/logomarca.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
 
    const navigation = useNavigation();

    const [Cidade, setCidade] = useState('');
    const [Estado, setEstado] = useState('');
    const [Id, setId] = useState('');
    const [Nome, setNome] = useState('');

    useEffect(() => {
      guardaEstado();
    }, [Cidade, Estado, Id, Nome])
    
    useEffect(()=>{
        const checkAuth = async () => {
            let user = await Api.checkToken(Cidade, Estado, setCidade, setEstado, setNome, setId); 
            if(!user) {

                userDispatch({
                    type: 'setCidade',
                    payload:{
                        cidade: '' 
                    }
                });
                userDispatch({
                    type: 'setEstado',
                    payload:{
                        estado: ''
                    }
                });

                navigation.reset({
                    routes:[{name:'SignIn'}]
                });
               
                
                
            } else {
              
                    navigation.reset({
                        routes:[{name:'ServPub'}]
                    });
             
            }
        }
        checkAuth();


    }, []);

    const  guardaEstado =()=>{
        userDispatch({
            type: 'setNome',
            payload:{
                nome: Nome 
            }
        });

        userDispatch({
            type: 'setId',
            payload:{
                id: Id
            }
        });

        userDispatch({
            type: 'setCidade',
            payload:{
                cidade: Cidade 
            }
        });
        
        userDispatch({
            type: 'setEstado',
            payload:{
                estado: Estado
            }
        });
    }


    return (
       
        <Container>
            <CityLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#000000" />
        </Container>
    )

}