import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, Modal } from 'react-native';
import {
 Container,
 TextFrase,
 TextDate,
 Titulo,
 AdioArea,
 Btnplay,
 LoadingIcon,
 BtnFechar,
 BtnX, 
 TextFechar,
 BtnVideo
} from './styles';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Play from '../../assets/play.svg';
import PararAudio from '../../assets/stop.svg';
import AbrirVideo from '../../assets/video.svg';
import FecharQ from '../../assets/fechar.svg';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';

let rever = '';

export default ({data, user,  setInfoAudi, InfoAudi, Mudar, setMudar, modalVisible, setModalVisible, Bady,  setBady, ModalImg, setModalImg}) => {
    
    const [time, setTime] = useState();
    const [Loading, setLoading] = useState(false);
    
    
  
    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.item.date);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        console.log(Ano);
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setTime(currentDate);
    }
    
    useEffect(()=>{
        tempo();
    }, []);

 
        
    const ouvirAudi = async (data, key)=>{
     
      

        await setLoading(true);
        await setInfoAudi(key);
         rever = await new Player(data, 
            {
                autoDestroy : true,
            }).play(()=>{
              
                setLoading(false);
                setMudar(true);
             }).on('ended', () => {
                setInfoAudi('');
                setMudar(false); 
             });
            
    }
    const AbrirModalImg = (data)=>{
        setBady(data);
        setModalImg(true);
    }

   
       const AbrirModal = (data)=>{
           setModalVisible(true);
           setBady(data);
       }

    const parar = ()=>{

        rever.stop((err) => {
           setInfoAudi('');
           setMudar(false); 
        });
    }
    return (
        <Container style={{backgroundColor: data.item.autor === user ?"#98ABE1":"#A9CFE1", alignSelf: data.item.autor === user ?"flex-end":"flex-start", textAlign: data.item.autor === user ? "right":"left"}} >
           
            { data.item.autor !== user &&
                <Titulo style={{color: data.item.autor === user ?"#FFF":"green"}}>{data.item.nome}</Titulo>
            }
            {data.item.type === "text" &&
                <TextFrase  style={{textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</TextFrase>
            }

            {data.item.type === "image" &&
             <BtnVideo onPress={()=>{AbrirModalImg(data.item.body)}}>
                <Image  source={{uri:`${data.item.body}`}} style={styles.ImageVer } />
             </BtnVideo>
            }

            {data.item.type === "video" &&
                <>
                <BtnVideo onPress={()=>{AbrirModal(data.item.body)}}>
                <Titulo>Vídeo</Titulo>
                <AbrirVideo width="50" height="50" backgroundColor="#000" />
                </BtnVideo>
               
               </>
            }

            {data.item.type === "audio" &&
            <AdioArea>
                {Loading === true ?
               <LoadingIcon size="large" color="#FFFFFF" />
               :
               <>
               {Mudar === false  ?
                <Btnplay  onPress={()=>{ouvirAudi(data.item.body, data.index)}}>
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <>
                {data.index !== InfoAudi ?
                <Btnplay  >
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <Btnplay  onPress={()=>{parar()}}>
                    <PararAudio width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                }
                </>
               }
              
                {data.index === InfoAudi &&
                    <Image 
                    source={require('../../assets/sonora.gif')}  
                    style={{width: 200, height: 50 }}
                    />
                    }
                </>
                }
               

            </AdioArea>
                
            }       
            
            {time &&
             <TextDate>{time}</TextDate>
            }
            
        </Container>
        
    )
}

const styles = StyleSheet.create({
    ImageVer:{
        width:100,
        height:100,
        margin: 5,
      },
});