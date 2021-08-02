import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';

import EventosIcon from '../assets/eventos.svg';
import ChatIcon from '../assets/chat.svg';
import SerpIcon from '../assets/serpublico.svg';



const TabArea = styled.View`
    height: 60px;
    background-color: #5D0BF7;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 90px;
    height: 90px;
    justify-content: center;
    align-items: center;
    background-color:#FFF;
    border-radius: 45px;
    border: 1px solid #FFF;
    margin-top: -40px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;
//79-todosos botões da tab
export default ({ state, navigation }) => {
    //83-vai puxar qual usuario está logado vai pegaro avatar.
    const { state:user } = useContext(UserContext);
//81-criando a função de click nas tabs 
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        //82 - criando a opacidade ,tamanbho e cor das tabs 
        <TabArea>
            <TabItem onPress={()=>goTo('Serpub')}>
                <SerpIcon style={{opacity: state.index===2? 1 : 0.5}} width="50" height="50" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Eventos')}>
                <EventosIcon style={{opacity: state.index===0? 1 : 0.5}} width="32" height="32" fill="#4EADBE" />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Chat')}>
                <ChatIcon style={{opacity: state.index===1? 1 : 0.5}} width="50" height="50" fill="#FFFFFF" />
            </TabItem>
        </TabArea>
    );
}