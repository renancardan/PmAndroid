import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    TextoInfo,
    Titulo,
    AvisoArea,
    Passos,
    CustomButton,
    CustomButtonText,
    LoadingIcon,
} from './styles';
import { UserContext } from '../../contexts/UserContext';
import CityLogo from '../../assets/logomarca.svg';
import { StyleSheet, ImageBackground  } from 'react-native';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation(); 
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  const [Nome, setNome] = useState(userState.nome);
  const [Cidade, setCidade] = useState(userState.cidade);
  const [Estado, setEstado] = useState(userState.estado);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [])

 
  




    const Proximo = async () => {
      await setLoading(true);
      if (Cidade !='' && Estado !='') {
      
  
    const res = await Api.signIn(Nome, Cidade, Estado);
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
  }
}


  return (
    <Container>
       <ImageBackground source={require("../../assets/logoopaca.png")} 
          resizeMode='cover' 
          style={styles.image} >
      <CityLogo width="100%" height="160" />
      <AvisoArea>
       
           {loading ?
                    <LoadingIcon size="large" color="#000000" />
                    :
                    <>
                    <Titulo>AVISO IMPORTANTE!</Titulo>
                    <TextoInfo>Olá {Nome}, o aplicativo 15º BPM precisa indentificar sua localização, para prestar um bom serviço ao usuario do aplicativo, pois quando você acionar esse serviço 
                       sua localização será repassada para central, onde o atendimento será instantaneamente.
                       </TextoInfo>
                    <CustomButton onPress={Proximo} >
                    <CustomButtonText>Proximo....</CustomButtonText>
              </CustomButton>
              </>
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