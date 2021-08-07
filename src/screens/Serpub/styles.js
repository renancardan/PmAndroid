import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #4169e1;
    flex: 1; 
    padding-top: 30px;
    align-items: center;
   
`;
export const CaixaTotal = styled.View`
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
`;

export const CaixaDados = styled.View`
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
`;

export const CaixaNews = styled.TouchableOpacity`
        display: flex; 
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 350px;
        height: 130px;
        background-color: #fff;
        border-radius:10px;
        margin-top:20px;
`;

export const CaixaDasat = styled.View`
    background-color: #0800FF;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:20px;
    padding: 10px;
    border-radius:10px;
`;

export const CaixaNewsImg = styled.View`
    width: 100px;
    height: 100px;
    display: flex;
    margin:5px;
    border-radius:5px;
`;
export const CaixaNewsInfor = styled.View`
    width: 200px;
    height: 100px;
    display: flex;
    margin:5px;
    justify-content: space-between;
    
    flex-direction: column;
`;

export const CaixaDasNot =  styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between; 
    width: 350px;
    border-radius:10px;
`;

export const CaixaArea = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between; 
    width: 130px;
    height: 130px;
    background-color: #fff;
    margin:20px;
    border-radius:10px;
`;

export const BotaoAtualizar = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between; 
    width: 130px;
    height: 40px;
    background-color: #fff;
    margin:20px;
    border-radius:10px;
    

`;
export const TextTitulo = styled.Text`
    font-size: 20px;
    color: #000;
    margin-left: 10px;
`;

export const TextTituloNews = styled.Text`
    font-size: 15px;
    color: #000;
    margin-left: 10px;
`;
export const TextDataNews = styled.Text`
    font-size: 12px;
    color: #000;
    margin-left: 10px;
`;
export const TextAviso = styled.Text`
    font-size: 20px;
    color: red;
    margin: 20px;
`;

export const Textnome = styled.Text`
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;
`;

export const TextNoticia = styled.Text`
    font-size: 20px;
    color: #fff;
`;

export const TextInfo = styled.Text`
    font-size: 14px;
    color: #000;
`;
export const TextDesat = styled.Text`
    font-size: 16px;
    color: #fff;
    margin-bottom: 5px;
`;
export const CaixaAti = styled.View`
    background-color: #014EE5;
    width: 130px;
    height: 30px;
    border-radius:10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CaixaTitulo = styled.View`  
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #FFF;
`;
export const TextAti = styled.Text`
    font-size: 13px;
    color: #fff;
    margin-bottom: 5px;
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
export const CaixaInfo = styled.View`  
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: red;
    margin-top: -15px;
    border-radius:15px;
`;

export const TextNum = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const CaixaTop = styled.View`  
    width: 100px;
    height: 20px;
    display: flex;
    flex-direction: row;  
`;

export const TituAviso = styled.Text`
    font-size: 20px;
    color: #F9F500;
    font-weight: bold;
`;

export const CaixaAtu = styled.TouchableOpacity`
    background-color: #00FF28;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:20px;
    padding: 10px;
    border-radius:10px;
`;

export const TextAtu = styled.Text`
    font-size: 16px;
    color: #000;
    margin-bottom: 5px;
`;
