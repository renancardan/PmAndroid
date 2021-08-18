import React, { useRef, useState, useEffect, useContext, Component } from "react";
import {View, Text, Image, ScrollView, StyleSheet, ImageBackground, YellowBox } from 'react-native';
import CarouselPager from 'react-native-carousel-pager';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import {
  Container,
  TextForma,
  TextAreaTi,
  TextConte,
  TextAreaCont,
  TextAreaTop,
  TextAreaData,
  TextData,
  TextAreaRodape,
  TextRodape
 
} from './styles';
import CityLogo from '../../assets/logomarca.svg';
import Api from "../../Api";
import Datand from '../../components/datando';

export default ({route}) => {
 
 const [Notica, setNotica] = useState({})
 const [IdNot, setIdNot] = useState(route.params.screen)
 const [Datai, setDatai] = useState("")

 useEffect(() => {
  vernoticia();
 }, [])
 useEffect (() => { 
  YellowBox.ignoreWarnings (['Animated: `useNativeDriver`']); 
}, [])

useEffect (() => { 
  YellowBox.ignoreWarnings ([
    'Warning: componentWillMount has been renamed',
]); 
}, [])

 useEffect(() => {
   {Notica !== {} &&
   tempo(Notica.dataDanoti);
   }

 }, [Notica])


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
  setDatai(currentDate);
}

  onClickSomething = ()=> {
   
    this.carousel.goToPage(2);
  }
      const vernoticia = ()=>{
        Api.ListNoticia(IdNot, setNotica);
      }

     
    
  
    return (
      <Container>
        
        {Notica !== {} &&
        <>
        
        
      
           <ScrollView >
           <TextAreaTop>
           <CityLogo width="80" height="80" />
       <TextAreaTi
        style={{
          borderLeftWidth: 7,
          borderLeftColor:"#4169e1",
          borderLeftStyle: "solid",
          
        }}
       ><TextForma>{Notica.Titulo}</TextForma>
       </TextAreaTi> 
      
       </TextAreaTop>
       <TextAreaData>
          <TextData> 
            
          {Datai}
               
          </TextData>
       </TextAreaData> 
      <View style={{flex: 1, backgroundColor:"#4169e1" }} >
        <CarouselPager 
        ref={ref => this.carousel = ref} 
        initialPage={2}
        deltaDelay={10}
        initialPage={0}
        blurredOpacity={0.5}
        animationDuration={150}
        containerPadding={70}	
        pageSpacing={1}
        pageStyle={{
          height: 250,
          display: "flex",
          marginTop:20,
          marginBottom:20,
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          {/* {Notica.foto1 !== "" && */}
           <View key={'page0'}  style={{}}>
           <ImagedCarouselCard
             height={250}
             width={250}
             text={""}
             shadowColor="#051934"
             overlayBackgroundColor=""
             source={{
               uri:Notica.foto1
                 
             }}
           />
            
           </View>

          
         {/* {Notica.foto2 !== "" && */}
          <View key={'page1'}>
          <ImagedCarouselCard
            height={250}
            width={250}
            text={""}
            shadowColor="#051934"
            overlayBackgroundColor=""
            source={{
              uri:Notica.foto2
                
            }}
          />

          </View>
          
         
          <View key={'page2'}>
          <ImagedCarouselCard
            height={250}
            width={250}
            text={""}
            shadowColor="#051934"
            overlayBackgroundColor=""
            source={{
              uri:Notica.foto3 
                
            }}
          />
          </View>
          
          
           
          <View key={'page3'}>
          <ImagedCarouselCard
            height={250}
            width={250}
            text={""}
            shadowColor="#051934"
            overlayBackgroundColor=""
            source={{
              uri:Notica.foto4
                
            }}
          />
          </View>

        </CarouselPager>
      </View>
      
      <TextAreaCont>
        
        <TextConte>
            {Notica.body}
        </TextConte>
      
        </TextAreaCont>
        <TextAreaRodape
       >
          <TextRodape></TextRodape>
       </TextAreaRodape> 
        </ScrollView>

       
        </>

        }
         
         
      </Container>
    );
  }


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
     flex: 1 ,
     alignItems:"center"
  },
 
});