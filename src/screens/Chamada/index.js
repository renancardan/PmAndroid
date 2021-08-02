import React, { useState, useEffect,  useContext, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    SendArea,
    Input,
    SendButton,
    ImgMsg,
    FotoText,
    BtnFoto,
    TextBtn,
    AreaBtn,
    BtnArquivo,
    BtnForma,
    TextForma,
    AreaGravar,
    LoadingIcon,
    TextLoading,
    BtnModal, 
} from './styles';
import { Text, FlatList, StyleSheet, Image, Modal, View} from 'react-native';
import FotosG from '../../assets/fotosBranca.svg';
import TiraFotos from '../../assets/fotosTira.svg';
import GravarVideo from '../../assets/cameraVideo.svg';
import FecharQ from '../../assets/fechar.svg';
import Envi from '../../assets/enviando.svg';
import Play from '../../assets/play.svg';
import GravarAudio from '../../assets/gravando.svg';
import PararAudio from '../../assets/stop.svg';
import Microfone from '../../assets/microfone.svg';
import VideoG from '../../assets/galeriaVideo.svg';
import Enviar from '../../assets/enviar.svg';
import Arquivo from '../../assets/grampo.svg';
import MensagemItem from '../../components/MensgItem/MensagemItem';
import Gravador from '../../components/Audio'
import Api from '../../Api';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Video from 'react-native-video';
import PushNotification from "react-native-push-notification";




let rec = '';

export default () => {

    const navigation = useNavigation(); 
    const body = useRef();
    const { state: userState } = useContext(UserContext);
    const [InfoAudi, setInfoAudi] = useState('');
    const [ImgTmp, setImgTmp] = useState('');
    const [AudTmp, setAudTmp] = useState('');
    const [estado, setEstado] = useState(userState.estado);
    const [cidade, setCidade] = useState(userState.cidade);
    const [Msg, setMsg] = useState('');
    const [Nome, setNome] = useState(userState.nome);
    const [Ocorre, setOcorre] = useState("nada");
    const [TmpMsg, setTmpMsg] = useState(null);
    const [MstImage, setMstImage] = useState(false);
    const [MsgVideo, setMsgVideo] = useState(false);
    const [Quadro1, setQuadro1] = useState(false);
    const [Quadro2, setQuadro2] = useState(false);
    const [Quadro3, setQuadro3] = useState(false);
    const [Quadro4, setQuadro4] = useState(false);
    const [QuadroG, setQuadroG] = useState(false);
    const [VideoTmp, setVideoTmp] = useState('');
    const [Quadro5, setQuadro5] = useState(false);
    const [Mudar, setMudar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ModalImg, setModalImg] = useState(false);
    const [Bady, setBady] = useState('');
    const [Carreg, setCarreg] = useState(false);
    const [AparCamera, setAparCamera] = useState(false)
    const [Ativo, setAtivo] = useState(false);
    const [TemUlt, setTemUlt] = useState('');
    const [idOc, setidOc] = useState(userState.idoc);
    const [Cont, setCont] = useState('');
    const [Dig, setDig] = useState(false);
    const [VizuS, setVizuS] = useState(0);
    const [Varia, setVaria] = useState(userState.variTemp)


    

    useEffect( ()=>{ 
      if(Ocorre !== 'nada'){
      VizualT();  
      }              
      }, [TmpMsg, Cont, Ocorre]);

     

      useEffect( ()=>{ 
       
        pegarMsg();
                           
      }, []);

      useEffect( ()=>{ 
        console.log("Tempo variante "+Varia); 
                           
      }, [Varia]);

     

      useEffect( ()=>{  
        if(Ocorre !== 'nada'){
          Desativando();
        }                   
      }, [TmpMsg]);


      

      const Desativando = ()=>{
          Api.VerAtivo(Ocorre, setAtivo )
      }
      

        const Enviando = async ()=>{
          if(Msg !== ''){
            await setMsg('');
            await  Api.enviandoMsg(Msg, Nome, Ocorre, Varia);
            
          }
          
           
        }

      
    

        const PegandoImg = async ()=>{
          let result = await request(PERMISSIONS.ANDROID.CAMERA,
              { 
                title: "Permisão Localização!",
                message: "Você deve permitir a localização para  funcionamento do APP",
                buttonPositive:"Ok",
                buttonNegative:"Permiti depois",
                buttonNeutral: "Cancelar",
              }
              
          );

          if(result == 'granted') {
            
             await launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 1,
                maxWidth: 600,
                maxHeight:600

              } 
              , imagePickerCallback )

        }
        
        
          
       }

       const imagePickerCallback = async (data)=>{
        if(data.assets[0].uri){
        await setImgTmp(data.assets[0].uri)
        await setMstImage(true);
        }
      
       

    }

       const TrandoFoto = async ()=>{
        let result = await request(PERMISSIONS.ANDROID.CAMERA,
            { 
              title: "Permisão Localização!",
              message: "Você deve permitir a localização para  funcionamento do APP",
              buttonPositive:"Ok",
              buttonNegative:"Permiti depois",
              buttonNeutral: "Cancelar",
            }
            
        );

        if(result == 'granted') {
          
           await launchCamera(
            {
              mediaType: 'photo',
              quality: 1,
              cameraType:'back',
            } 
            , imageTiraCallback )

      }
      
      
        
     }

     const imageTiraCallback = async (data)=>{
      if(data.assets[0].uri){
      await setImgTmp(data.assets[0].uri)
      await setMstImage(true);
      await setQuadro2(true);
      }
    
     

  }

  const PegandoVideo = async ()=>{
    let result = await request(PERMISSIONS.ANDROID.CAMERA,
        { 
          title: "Permisão Localização!",
          message: "Você deve permitir a localização para  funcionamento do APP",
          buttonPositive:"Ok",
          buttonNegative:"Permiti depois",
          buttonNeutral: "Cancelar",
        }
        
    );

    if(result == 'granted') {
      
       await launchImageLibrary(
        {
          mediaType: 'video',
          videoQuality: 'low',
        } 
        , VideoPegarCallback )

      }
  
  
    
      }

      const VideoPegarCallback = async (data)=>{
        if(data.assets[0].uri){
        await setVideoTmp(data.assets[0].uri)
        await setMsgVideo(true);
        await setQuadro3(true);
        }
      }

      const CameraGravarVideo = async ()=>{



        let result = await request(PERMISSIONS.ANDROID.CAMERA,
            { 
              title: "Permisão Localização!",
              message: "Você deve permitir a localização para  funcionamento do APP",
              buttonPositive:"Ok",
              buttonNegative:"Permiti depois",
              buttonNeutral: "Cancelar",
            }
            
        );
    
        if(result == 'granted') {
          
           await launchCamera(
            {
              mediaType: 'video',
              videoQuality: 'low',
              durationLimit: 60,
            } 
            , VideoGravarCallback )
    
          }
      
      
        
          }

          const VideoGravarCallback = async (data)=>{
            if(data.assets[0].uri){
            await setVideoTmp(data.assets[0].uri)
            await setMsgVideo(true);
            await setQuadro3(false);
            }
          }



      const EnviandoVideo = async ()=>{
        if( VideoTmp == null ) {
          return null;
        }
        setCarreg(true);
        Api.EnviarVideo(VideoTmp, Nome, setMsgVideo , setQuadro3, setCarreg, Ocorre, Varia);

      }

       const EnviandoImg = async ()=>{
        if( ImgTmp == null ) {
          return null;
        }
        setCarreg(true);
        Api.EnviarImage(ImgTmp, Nome, setMstImage , setQuadro2, setCarreg, Ocorre, Varia);

      }

        const AbrirQuadro = ()=>{
          setQuadro1(true);
        }

        const FecharQuadro = ()=>{
          setQuadro1(false);
          setQuadro4(false);
          setQuadro5(false);
        }


         const FecharFoto = async ()=>{
          await setMstImage(false);
          await setMsgVideo(false);
         }

        const pegarMsg = ()=>{
            Api.PegarConversas(cidade, estado, setTmpMsg, setOcorre, setTemUlt, setCont, setDig, setVizuS);
        }

        const VizualT = ()=>{
          Api.VizualVit(Ocorre, Cont);
        }

        const renderItem = (item, index)=>{
        
        
            return(
                <MensagemItem
                 data={item} 
                 user={userState.id} 
                 InfoAudi={InfoAudi} 
                 setInfoAudi={setInfoAudi}
                 Mudar={Mudar}
                 setMudar={setMudar}
                 setModalVisible={setModalVisible}
                 modalVisible={modalVisible}
                 setBady={setBady}
                 Bady={Bady}
                 ModalImg={ModalImg}
                 setModalImg={setModalImg}
                   />
            );
        }

        const PegarAudio = async ()=>{
          let result = await request( PERMISSIONS.ANDROID.RECORD_AUDIO,
            { 
              title: "Permisão Localização!",
              message: "Você deve permitir a localização para  funcionamento do APP",
              buttonPositive:"Ok",
              buttonNegative:"Permiti depois",
              buttonNeutral: "Cancelar",
            }
            
        );

          if(result == 'granted') {
            setQuadro1(true);
            setQuadro4(true); 
        
        } 

        
      }


      const iniciarEscuta = ()=>{
          setQuadroG(true);
         
          rec = new Recorder("filename.mp4", 
          {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
          }).prepare((err, fsPath)=>{
            setAudTmp(fsPath);
          });
    
            rec.record();
    
        
       }

       const finalEscuta = ()=>{
        setQuadroG(false);
        
        rec.stop((err) => {
            setQuadro5(true);
            
        });
        
      }

      const ouvir = ()=>{
        new Player(`${AudTmp}`)
        .play()
        .on('ended', () => {
          
         
        });
      }

      const EnviandoAudio  = ()=>{
        setCarreg(true);
          Api.EnviarAudio(AudTmp, Nome, setQuadro4, setQuadro5, setQuadroG, setQuadro3, setQuadro1, setCarreg, Ocorre, Varia);
      }
      const FecharModal = ()=>{
        setModalVisible(false);
        setModalImg(false);
           setBady('');
      }
      const Abrirloading = ()=>{
        setCarreg(true);
      }
      
      const Fecharloading = ()=>{
        setCarreg(false);
      }
      
      const Iniciar = ()=>{
        navigation.goBack();
      }

     

    return ( 
        <Container>
           <Modal
           animationType="slide"
           visible={Ativo}
          >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Sua ocorrencia foi finalizar com sucesso!</Text>
          <BtnModal onPress={()=>{Iniciar()}}>
          <Text style={styles.modalText2}>Ok</Text>
          </BtnModal>
          </View>
          </View>
          </Modal>
           <Modal
            animationType="slide"
            visible={modalVisible}
            >
             {Carreg === true &&
                  <>
                   <TextLoading>Espere, seu Vídeo está sendo carregado, ...</TextLoading>
                   <LoadingIcon size="large" color="#000000" />  
                   </>   
               }
                <Video 
                  onLoadStart={()=>{Abrirloading()}}
                  onLoad={()=>{Fecharloading()}}
                  controls={true}
                  source={{uri:`${Bady}`}} 
                  style={{flex: 1,width:300, height:100, margin:20,}}
                    />
           
             <BtnArquivo onPress={()=>FecharModal()}>
              <BtnForma style={{backgroundColor: '#F34343' }}>
              <FecharQ width="30" height="30" backgroundColor="#000" />
              </BtnForma>
                <TextForma>Fechar</TextForma>
            </BtnArquivo>
          </Modal>

          <Modal
            animationType="slide"
            visible={ModalImg}
            >
            <Image  source={{uri:`${Bady}`}} style={styles.ImageVer } />

             <BtnArquivo onPress={()=>FecharModal()}>
              <BtnForma style={{backgroundColor: '#F34343' }}>
              <FecharQ width="30" height="30" backgroundColor="#000" />
              </BtnForma>
                <TextForma>Fechar</TextForma>
            </BtnArquivo>
          </Modal>
            {TmpMsg &&
                 <FlatList
                 ref={ (ref) => { this.chatArea = ref } }
                 onContentSizeChange={()=>{this.chatArea.scrollToEnd({animated:true}) }}
                 onLayout={ ()=>{this.chatArea.scrollToEnd({animated:true}) } }
                 style={styles.chatArea }
                 data={TmpMsg}
                 renderItem={(item)=>renderItem(item)}
                 keyExtractor={(item, index) => index.toString()}
                 />
            }

            {MstImage === true &&
            <>
            {Quadro2 === true ?
               <ImgMsg>
               <FotoText>Foto</FotoText>
               {Carreg === true ?
                  <>
                   <TextForma>Espere, sua foto está sendo enviada...</TextForma>
                   <LoadingIcon size="large" color="#000000" />
                   
                   </>
                   :
                   <>
                   <Image  source={{uri:`${ImgTmp}`}} style={styles.ImageVer } />
              
               <BtnFoto onPress={EnviandoImg} ><TextBtn>Enviar Foto</TextBtn></BtnFoto>
               <BtnFoto onPress={TrandoFoto} ><TextBtn>Trocar Foto</TextBtn></BtnFoto>
               <BtnFoto onPress={FecharFoto} ><TextBtn>Fechar</TextBtn></BtnFoto>
               </>
              }
               </ImgMsg>
            :
              <ImgMsg>
              <FotoText>Foto</FotoText>
              {Carreg === true ?
                  <>
                  <TextForma>Espere, sua foto está sendo enviada...</TextForma>
                   <LoadingIcon size="large" color="#000000" /> 
                   </>
                   :
                   <>
                   <Image  source={{uri:`${ImgTmp}`}} style={styles.ImageVer } />
               
                  <BtnFoto onPress={EnviandoImg} ><TextBtn>Enviar Foto</TextBtn></BtnFoto>
                  <BtnFoto onPress={PegandoImg} ><TextBtn>Trocar Foto</TextBtn></BtnFoto>
                  <BtnFoto onPress={FecharFoto} ><TextBtn>Fechar</TextBtn></BtnFoto>
                </>
              }
              </ImgMsg>

            }
            </>
            }

          {MsgVideo === true &&
            <>
            {Quadro3 === true ?
               <ImgMsg>
               <FotoText>Video</FotoText>
               {Carreg === true ?
                  <>
                  <TextForma>Espere, seu video está sendo enviado...</TextForma>
                   <LoadingIcon size="large" color="#000000" /> 
                   </>
                   :
                   <>
                   <Video 
                   controls
                   source={{uri:`${VideoTmp}`}} style={{flex: 1,width:300, height:300, margin:20,}} />
                  <BtnFoto onPress={EnviandoVideo} ><TextBtn>Enviar Vídeo</TextBtn></BtnFoto>
                  <BtnFoto onPress={PegandoVideo} ><TextBtn>Trocar Vídeo</TextBtn></BtnFoto>
                  <BtnFoto onPress={FecharFoto} ><TextBtn>Fechar</TextBtn></BtnFoto>
                </>
                }
               </ImgMsg>
              :
              <ImgMsg>
              <FotoText>Vìdeo</FotoText>
              {Carreg === true ?
                  <>
                  <TextForma>Espere, seu video está sendo enviado...</TextForma>
                   <LoadingIcon size="large" color="#000000" /> 
                   </>
                   :
                   <>
                   <Video 
                   controls
                   source={{uri:`${VideoTmp}`}} style={{flex: 1,width:300, height:300, margin:20,}} />
                   
               
              <BtnFoto onPress={EnviandoVideo} ><TextBtn>Enviar Vídeo</TextBtn></BtnFoto>
              <BtnFoto onPress={GravarVideo} ><TextBtn>Trocar Vídeo</TextBtn></BtnFoto>
              <BtnFoto onPress={FecharFoto} ><TextBtn>Fechar</TextBtn></BtnFoto>
              </>
              }
              </ImgMsg>

            }
            
             </>
            }





         {MsgVideo === false  &&
            <>
          {MstImage === false &&
            <>
           {Quadro1 === true ?
            <>
            {Quadro4 === true ?
 
            <AreaBtn>  
            {QuadroG === false ?
             <BtnArquivo onPress={iniciarEscuta} >
             <BtnForma style={{backgroundColor: '#9b59b6' }} >
               <GravarAudio width="30" height="30" backgroundColor="#000" />
             </BtnForma>
               <TextForma>Gravar</TextForma>
             </BtnArquivo>
            :
              <>
            <BtnArquivo  onPress={finalEscuta}>
              <BtnForma  style={{backgroundColor: '#3498db' }} >
              <PararAudio width="30" height="30" backgroundColor="#000" />
              </BtnForma>
              <TextForma>Stop</TextForma>
            </BtnArquivo>

              
              </>
            } 

            {Quadro5 === true &&
              <>
            <BtnArquivo onPress={ouvir}>
            <BtnForma style={{backgroundColor:'#2e64e5'  }}>
            <Play width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Ouvir</TextForma>
            </BtnArquivo> 

            <BtnArquivo onPress={EnviandoAudio}>
              {Carreg === false ?
              <>
               <BtnForma style={{backgroundColor:'#1abc9c'  }}>
                <Envi width="30" height="30" backgroundColor="#000" />
              </BtnForma>
              <TextForma>Enviar</TextForma>
              </>
              :
              <>
               <LoadingIcon size="large" color="#000000" /> 
               <TextForma>Enviando...</TextForma>
              </>
             
              }
           
            </BtnArquivo>  
              </>
            }
            

           
                 
            <BtnArquivo onPress={FecharQuadro}>
            <BtnForma style={{backgroundColor: '#F34343' }}>
            <FecharQ width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Fechar</TextForma>
            </BtnArquivo>
            </AreaBtn>
            :
            <AreaBtn> 
            <BtnArquivo onPress={PegandoImg} >
            <BtnForma style={{backgroundColor: '#9b59b6' }} >
              <FotosG width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Galeria Fotos</TextForma>
            </BtnArquivo>
            <BtnArquivo  onPress={PegandoVideo}>
              <BtnForma  style={{backgroundColor: '#3498db' }} >
              <VideoG width="30" height="30" backgroundColor="#000" />
              </BtnForma>
              <TextForma>Galeria Vídeos</TextForma>
            </BtnArquivo>
            <BtnArquivo onPress={TrandoFoto}>
            <BtnForma style={{backgroundColor: '#2e64e5' }}>
            <TiraFotos width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Tirar Foto</TextForma>
            </BtnArquivo>
            <BtnArquivo onPress={CameraGravarVideo}>
            <BtnForma style={{backgroundColor: '#1abc9c' }}>
            <GravarVideo width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Gravar Vídeo</TextForma>
            </BtnArquivo>
            <BtnArquivo onPress={FecharQuadro}>
            <BtnForma style={{backgroundColor: '#F34343' }}>
            <FecharQ width="30" height="30" backgroundColor="#000" />
            </BtnForma>
              <TextForma>Fechar</TextForma>
            </BtnArquivo>
            </AreaBtn>

            }

            </>
           :
           <>
           {VizuS === Cont &&
              <TextForma>Mensagem Vizualizada Pela Policia Militar</TextForma>
           }   
           {Dig === true &&
              <TextForma>Policia Militar Vizualizou e Está Digitando uma Mensagem...</TextForma>
           }

           
          
           <SendArea>
            <SendButton onPress={AbrirQuadro} >
            <Arquivo width="40" height="40" backgroundColor="#000"/>
            </SendButton>
            <SendButton onPress={PegarAudio} >
            <Microfone width="40" height="40" backgroundColor="#000"/>
            </SendButton>
            
            <Input
             placeholder="Digite uma mensagem..." 
             value={Msg}
             onChangeText={t=>setMsg(t)}
            />
            <SendButton onPress={Enviando} >
            <Enviar width="40" height="40" backgroundColor="#000"/>
            </SendButton>
            
         
            </SendArea>
            </>
           }             
            </>
            }

            </>
            }
           
           
           
        </Container>

    )

    
}

const styles = StyleSheet.create({
    chatArea:{
      flex:1,
      backgroundColor: '#FFF'  
    },
    ImageVer:{
        width:300,
        height:300,
        marginTop: 10,
        marginBottom: 20,
      },
      centeredView: {
        backgroundColor: "#4169e1",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: "center"
      },
      modalText1: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: "center",
        color:"red"
      },
      modalText2: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: "center",
        color:"blue"
      }
});

