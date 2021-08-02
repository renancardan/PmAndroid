import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
    Container,
    TextoInfo,
    Titulo,
    AvisoArea,
    CustomButton,
    CustomButtonText,
    LoadingIcon,
  
} from './styles';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';
import CityLogo from '../../assets/logomarca.svg';
import { StyleSheet, ImageBackground  } from 'react-native';

export default () => {

  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext); 


    const [loading, setLoading] = useState(false);
    const [Lat, setLat] = useState(0);
    const [Log, setLog] = useState(0);
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [Nome, setNome] = useState('');

                          useEffect( ()=>{
                            setLoading(true);
                              Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
                              handleLocationFinder();
                                  
                          }, []);

                          useEffect(() => {
                            ColocarNome();
                           }, [])
                         
              const ColocarNome = async ()=>{
                const nome =  await AsyncStorage.getItem('nome');
                setNome(nome);
              }

                        
  
          const handleLocationFinder = async () => {
                 
                  let result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                      { 
                        title: "Permisão Localização!",
                        message: "Você deve permitir a localização para  funcionamento do APP",
                        buttonPositive:"Ok",
                        buttonNegative:"Permiti depois",
                        buttonNeutral: "Cancelar",
                      }
                      
                  );

                  console.log(result);

                  if(result == 'granted') {
                    
                    Geolocation.watchPosition( async (info)=>{ 
                        await setLat(info.coords.latitude);
                        await setLog(info.coords.longitude);
                        const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);
                        console.log(geo.results[0].address_components[2].long_name);
                        await setCidade(geo.results[0].address_components[2].long_name);
                        await setEstado(geo.results[0].address_components[3].long_name);
                        await setLoading(false);

                    },{
                        enableHighAccuracy:true,
                        timeout:10000,
                        maximumAge:3000
                    });
        
                } else {
                  await setCidade("Bacabal");
                  await setEstado("Maranhão");
                  await setLoading(false);
                }
                
  
          }

      


    





 

  const Proximo = async () => {
    await setLoading(true);
    if (cidade !='' && estado !='') {
      userDispatch({
        type: 'setNome',
        payload:{
            nome: Nome 
        }
    });
      userDispatch({
        type: 'setCidade',
        payload:{
            cidade: cidade 
        }
    });
    userDispatch({
        type: 'setEstado',
        payload:{
            estado: estado 
        }
    });

    userDispatch({
      type: 'setStatus',
      payload:{
          status: 1 
      }
  });

  userDispatch({
    type: 'setLat',
    payload:{
        lat: Lat 
    }
});
  userDispatch({
    type: 'setLog',
    payload:{
        log: Log 
    }
  });

  const res = await Api.signIn(Nome, cidade, estado);
  console.log("loc" + res);
  if(res){

    userDispatch({
      type: 'setId',
      payload:{
          id: res
      }
  });
    await setLoading(false);
    await  navigation.reset({
      routes: [{name: 'ServPub'}]
  });

  }
  
   
    } else {
      alert("Infelizmente você não poderar se cadastrar pois, o APP não conseguiu sua localização");
    }
    
}

  return (
    <Container>
      <ImageBackground source={require("../../assets/logoopaca.png")} 
          resizeMode='cover' 
          style={styles.image} >
      <CityLogo width="100%" height="160" />
      <AvisoArea>
        <Titulo>Localizar</Titulo>
         
            <TextoInfo>Nome: {Nome}</TextoInfo>
            <TextoInfo>Cidade: {cidade}</TextoInfo>
            <TextoInfo>Estado: {estado}</TextoInfo>
            {loading ?
                    <LoadingIcon size="large" color="#000000" />
                    :
                    <CustomButton onPress={Proximo} >
                    <CustomButtonText>Proximo....</CustomButtonText>
              </CustomButton>
                }
           
            
      </AvisoArea>
      </ImageBackground>
    </Container>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
     flex: 1 ,
     alignItems:"center",
     justifyContent: "center",
  },
});