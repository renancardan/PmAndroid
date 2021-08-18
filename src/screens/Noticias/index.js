import React, { useRef, useState, useEffect, useContext, Component } from "react";
import {View, Text, Image, ScrollView, StyleSheet, ImageBackground,} from 'react-native';
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

export default class Pager extends Component {
 
  onClickSomething() {
   
    this.carousel.goToPage(2);
  }

  render() {
    
    
    return (
      <Container>
         <ScrollView >
           <TextAreaTop>
           <CityLogo width="80" height="80" />
       <TextAreaTi
        style={{
          borderLeftWidth: 7,
          borderLeftColor:"#4169e1",
          borderLeftStyle: "solid",
          
        }}
       ><TextForma>Assidente de transito na rua Av joão alberto</TextForma>
       </TextAreaTi> 
      
       </TextAreaTop>
       <TextAreaData
       >
          <TextData>Data: 11/02/2021 as 15:00</TextData>
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
          <View key={'page0'}  style={{}}>
          <ImagedCarouselCard
            height={250}
            width={250}
            text={""}
            shadowColor="#051934"
            overlayBackgroundColor=""
            source={{
              uri:
                "https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"
            }}
          />
           
          </View>
          <View key={'page1'}>
          <ImagedCarouselCard
            height={250}
            width={250}
            text={""}
            shadowColor="#051934"
            overlayBackgroundColor=""
            source={{
              uri:
                "https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"
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
              uri:
                "https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"
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
              uri:
                "https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"
            }}
          />
          </View>
        </CarouselPager>
      </View>
      
      <TextAreaCont>
        
        <TextConte>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercício ullamco laboris nisi ut aliquip ex ea commodo consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </TextConte>
      
        </TextAreaCont>
        <TextAreaRodape
       >
          <TextRodape>Escritor:   Sgt. André</TextRodape>
       </TextAreaRodape> 
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
     flex: 1 ,
     alignItems:"center"
  },
 
});