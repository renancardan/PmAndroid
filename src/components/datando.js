import React, { useState, useEffect} from "react";
import styled from 'styled-components/native';
import  {  TextInputMask  }  from  'react-native-masked-text';
import { StyleSheet, Text } from 'react-native';
//52 -criando o os inputs padronizados para usar em varios lugares


export default ({data}) => {
  
   const [Verdat, setVerdat] = useState("")
   useEffect(() => {
     tempo(data);
   }, [])

    const tempo = (data)=>{
        let currentDate = '';
        let now =new Date(data);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setVerdat(currentDate);
    }

    return (
     <>
     <Text>Data:{Verdat}</Text>
     </>
    );
}