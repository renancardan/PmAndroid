import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;


export const SendArea = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    flex-direction: row;

`;

export const AreaBtn = styled.View`
    height: 100px;
    width: 100%;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

`;

export const AreaGravar = styled.View`
    height: 600px;
    width: 100%;
    background-color: #EEEEEE;
    display: flex;

`;
export const BtnArquivo  = styled.TouchableOpacity`
    display: flex;
    width: 80px;
    height: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const BtnForma = styled.View`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const TextForma = styled.Text`
    font-size: 10px;
    color: #000;
`;



export const Input = styled.TextInput`
    height: 50px;
    flex: 1;
    
`;

export const SendButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

export const ImgMsg = styled.View`
    height: 100%;
    background-color: #DDDDDD;
    display: flex; 
    align-items: center;
    flex-direction: column;
    
`;

export const FotoText = styled.Text`
    font-size: 18px;
    color: #000;
    margin-top: 10px;
`;

export const TextBtn = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const TextLoading = styled.Text`
    font-size: 16px;
    color: #000;
`;

export const BtnFoto = styled.TouchableOpacity`
    width: 150px;
    height: 40px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #282A36;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;

export const BtnModal = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between; 
    width: 80px;
    height: 30px;
    margin:20px;
    border-radius:10px;
    

`;