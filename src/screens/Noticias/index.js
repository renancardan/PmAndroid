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
 const [Datai, setDatai] = useState("");
 const [Img1, setImg1] = useState("");
 const [Img2, setImg2] = useState("");
 const [Img3, setImg3] = useState("");
 const [Img4, setImg4] = useState("");

 useEffect(() => {
  vernoticia();
 }, [])
 useEffect (() => { 
  YellowBox.ignoreWarnings (['Animated: `useNativeDriver`']); 
}, [])

useEffect (() => { 
  YellowBox.ignoreWarnings ([
    'Warning: componentWillMount has been renamed',
    "Warning: Can't perform a React state update on an unmounted component",
]); 
}, [])

 useEffect(() => {
   {Notica !== {} &&
   tempo(Notica.dataDanoti);
   }
   if(Notica.foto1 === ""){
    setImg1("https://pm.ssp.ma.gov.br/wp-content/uploads/2018/04/logo-policia-militar-site.png");
   } else{
    setImg1(Notica.foto1);
    
   }
   if(Notica.foto2 === ""){
    setImg2("https://pm.ssp.ma.gov.br/wp-content/uploads/2018/04/logo-policia-militar-site.png");
    } else{
    setImg2(Notica.foto2);
   
    }

    if(Notica.foto3 === ""){
      setImg3("https://pm.ssp.ma.gov.br/wp-content/uploads/2018/04/logo-policia-militar-site.png");
      } else{
      setImg3(Notica.foto3);
     
      }

      if(Notica.foto4 === ""){
        setImg4("https://pm.ssp.ma.gov.br/wp-content/uploads/2018/04/logo-policia-militar-site.png");
        } else{
        setImg4(Notica.foto4);
       
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
               uri:Img1
                 
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
              uri:Img2
                
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
              uri:Img3
                
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
              uri:Img4
                
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