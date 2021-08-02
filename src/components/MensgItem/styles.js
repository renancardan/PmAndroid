import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #999999;
    padding: 10px;
    align-self: baseline;
    max-width:80%;
    border-radius: 5px;
`;

export const TextFrase = styled.Text`
    font-size: 16px;
`;

export const TextDate = styled.Text`
    margin-top:5px;
    font-size: 10px;
    text-align: right;
`;

export const Titulo = styled.Text`
    font-size: 10px;
    font-weight: bold;
`;


export const AdioArea = styled.View`
   
    height: 50px;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-items: center;

`;
export const Btnplay  = styled.TouchableOpacity`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2e64e5;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;

export const BtnFechar  = styled.TouchableOpacity`
    display: flex;
    width: 80px;
    height: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const BtnX = styled.View`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const TextFechar = styled.Text`
    font-size: 10px;
    color: #000;
`;

export const BtnVideo  = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
