import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
} from './styles';
import { UserContext } from '../../contexts/UserContext';
import { StyleSheet, ImageBackground  } from 'react-native';
import CityLogo from '../../assets/logomarca.svg';
import SignInput from '../../components/SignInput';
import PersonIcon from '../../assets/person.svg';





export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);

    

    const [Nome, setNome] = useState("");
    const navigation = useNavigation(); 
    
     


    const handleMessageButtonClick = () => {
        if(Nome != '' ) {

            userDispatch({
                type: 'setNome',
                payload:{
                    nome: Nome 
                }
            });

            userDispatch({
                type: 'setCidade',
                payload:{
                    cidade: 'Bacabal' 
                }
            });
            
            userDispatch({
                type: 'setEstado',
                payload:{
                    estado: 'Maranhão'
                }
            });

        navigation.reset({
            routes: [{name: 'Avisoloc'}]
        });
    }  else {
        alert("Preencha seu Nome!");
    }

    }
    return (
        <Container>
            <ImageBackground source={require("../../assets/logoopaca.png")} 
          resizeMode='cover' 
          style={styles.image} >
           <CityLogo width="100%" height="160" />   
        <InputArea>
        <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu Nome" 
                    value={Nome}
                    onChangeText={t=>setNome(t)}
                    autoCapitalize="none"
                    keyboardType={null}
                />
           <CustomButton onPress={handleMessageButtonClick} >
                    <CustomButtonText>Proximo...</CustomButtonText>
            </CustomButton>

        </InputArea>
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