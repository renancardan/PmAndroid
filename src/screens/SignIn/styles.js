import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FFFFFF;
    flex: 1;
    justify-content: center;
    padding-top: 30px;
    align-items: center;
`;
export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    
    height: 60px;
    background-color:#4169e1;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;
