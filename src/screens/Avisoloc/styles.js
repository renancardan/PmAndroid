import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FFF;
    flex: 1;
    padding-top: 30px;
    align-items: center;
`;
export const TextoInfo = styled.Text`
    textAlign: 'auto';    
    font-size: 18px;
    color: #000;
    width: 320px;
    textAlign: justify;
`;

export const Titulo = styled.Text`
    margin-top: 30px;    
    font-size: 30px;
    color: #000;
    font-weight: bold;
`;
export const Passos = styled.Text`
    margin-top: 30px;    
    font-size: 20px;
    color: #000;
    font-weight: bold;
`;
export const AvisoArea = styled.View`
    display: flex; 
    justify-content: center;
    align-items: center;
    
`;
export const CustomButton = styled.TouchableOpacity`
    width: 200px;
    height: 60px;
    background-color:#4169e1;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 30px; 
    
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;
