import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    CaixaArea,
    CaixaTotal,
    TextTitulo,
    Textnome,
    CaixaDasat,
    TextDesat,
    CaixaAti,
    TextAti,
    LoadingIcon,
    TextAviso,
    BotaoAtualizar,
    BtnModal,
    CaixaTitulo,
    CaixaDados,
    TextInfo,
    CaixaInfo,
    TextNum,
    CaixaTop,
    TituAviso,
    CaixaAtu, 
    TextAtu,
    CaixaNews,
    CaixaDasNot,
    TextNoticia,
    CaixaNewsImg,
    CaixaNewsInfor,
    TextDataNews,
    TextTituloNews
} from './styles';
import  NetInfo from  "@react-native-community/netinfo" ;
import Atemdimento from '../../assets/atendimento.svg';
import Chat from '../../assets/web-chat.svg';
import Ambulancia from '../../assets/ambulancia.svg';
import Prefeitura from '../../assets/prefeitura.svg';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { Text, Linking, Modal, StyleSheet, View, ImageBackground, ScrollView , FlatList, Image } from 'react-native';
import CityLogo from '../../assets/logomarca.svg';
import PushNotification from "react-native-push-notification";


import Api from '../../Api';


export default () => {
    const navigation = useNavigation(); 
    const { state: userState } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);
    const [phoneNumber, setphoneNumber] = useState('');
    const [Net, setNet] = useState("")
    const [loading, setLoading] = useState(true);
    const [User, setUser] = useState(userState.id)
    const [estado, setEstado] = useState(userState.estado);
    const [cidade, setCidade] = useState(userState.cidade);
    const [Nome, setNome] = useState(userState.nome);
    const [Log, setLog] = useState('nada');
    const [Lat, setLat] = useState('nada');
    const [PolVer, setPolVer] = useState(false);
    const [modalVer, setmodalVer] = useState(false);
    const [QuantMsgT, setQuantMsgT] = useState('');
    const [QuantMsgV, setQuantMsgV] = useState('');
    const [TmpMsg, setTmpMsg] = useState(null);
    const [Ocorre, setOcorre] = useState("nada");
    const [TemUlt, setTemUlt] = useState('');
    const [Ent, setEnt] = useState(false);
    const [Varia, setVaria] = useState('');
    const [MsgQuant, setMsgQuant] = useState(0);
    const [AviMsg, setAviMsg] = useState('');
    const [TemAvi, setTemAvi] = useState(false);
    const [Version, setVersion] = useState(1);
    const [Atu, setAtu] = useState({});
    const [ListNot, setListNot] = useState([
      {id:1, titulo:"Casa Arrombada", data:"11/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:2, titulo:"Roubo de Carro", data:"16/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:3, titulo:"Roubo de casa", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:4, titulo:"Assalto de lojas", data:"16/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:5, titulo:"Assalto com armas", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:6, titulo:"Assalto com Faca", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:7, titulo:"Assalto com Moto", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:8, titulo:"Assalto com Luz", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
      {id:9, titulo:"Assalto com  marte", data:"15/08/2021", img:"https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/acidente%2520BR%2520470%2520quatro%2520mortes_7%5B1%5D_2.jpg?Oe8PUUnOe0ur2tvKsbDlvMFKSrYNrm15&itok=IJ_uwc1K&width=750"},
    ])
    


                        
                          useEffect( ()=>{                     
                            inicial();                              
                          }, []);

                          useEffect( ()=>{  
                          console.log(QuantMsgT); 
                          console.log("Vizual + " + QuantMsgV);
                          let dif = QuantMsgT - QuantMsgV;
                          setMsgQuant(dif);                        
                          }, [QuantMsgT, QuantMsgV]);

                          useEffect( ()=>{ 
                            if(Lat !== 'nada' && Log !== 'nada'){
                              pesquisar(); 
                            }                  
                            }, [Log, Lat]);

                          useEffect(() => {
                            TelefoneApp();
                            pegarDados(); 
                            LevarTemp(); 
                          }, [])

                          useEffect(() => {
                            Avisando(); 
                            Atualizando(); 
                          }, [])

                          useEffect(() => {
                            if(Atu !== {}){
                              console.log(Atu.versao)
                            }
                             
                          }, [Atu])



                        
                        useEffect( ()=>{
                         if(QuantMsgV) {
                          if(QuantMsgV !== QuantMsgT) {
                            if(TmpMsg[TmpMsg.length-1].autor !== User) {
                              console.log("entrou no noti");
                              testPush(); 
                            }
                          
                        }
                         }
                                      
                        }, [QuantMsgT, QuantMsgV]);

                        useEffect( ()=>{

                         GuardaIdoc();
                                       
                        }, [Ocorre]);

                        useEffect( ()=>{
                          GuardaVari();              
                         }, [Varia]);

                         const Atualizando = ()=>{
                           Api.Atualiza(cidade, setAtu);
                         }

                         const Avisando = ()=>{
                           Api.AvisoAppCli(cidade, estado, setAviMsg, setTemAvi);
                         }

                       
                        const GuardaIdoc = ()=>{
                          console.log("Ent " + Ocorre);
                          userDispatch({
                            type: 'setIdoc',
                            payload:{
                              variTemp: Varia, 
                            }
                        });
                        }

                        const GuardaVari = ()=>{
                          userDispatch({
                            type: 'setVari',
                            payload:{
                              variTemp: Varia, 
                            }
                        });
                        }

                        const LevarTemp = async ()=>{
                          await Api.VariacaoTemp();
                          await Api.VarTempPegar(Nome, setVaria);
                         }

                        const testPush = ()=>{
                          PushNotification.localNotification({
                            channelId: "not1",
                            autoCancel: true,
                            largeIcon:"icon",
                            bigText:
                              'This is local notification demo in React Native app. Only shown, when expanded.',
                            subText: 'Mensagens do 15° BPM',
                            title: 'Chegou mensagem pra vc',
                            message: '',
                            vibrate: true,
                            vibration: 1000,
                            playSound: true,
                            soundName: 'default',
                           
                          })
                        }
                        
                          const pegarDados = ()=>{
                            Api.DadosConversas(cidade, estado, setQuantMsgT, setOcorre, setQuantMsgV, setTmpMsg);
                           
                          }

                          const inicial = ()=>{
                            Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
                            handleLocationFinder();

                          }


                          const FecharModal = ()=>{
                            setmodalVer(false);
                          }

                          const TelefoneApp = ()=>{
                            Api.pegarTelefone(cidade, estado, setphoneNumber)
                          }

                          const Entrando = async ()=>{
                            

                            Linking.openURL(`tel:${phoneNumber}`);
                            const res = await Api.AnaliseEntrada(cidade, estado);
                            if(res == 0) {
                              await Api.EnviandoEntrada(Log, Lat, cidade, estado, Nome, setOcorre, Varia );
                            }
                           
                          }
                          
                          const Entrachat = async()=>{
                            await setLoading(true)
                            const res = await Api.AnaliseEntrada(cidade, estado);

                            if(res == 0) {
                            
                              setmodalVer(true);
                              await setLoading(false);

                            } else {
                              await setLoading(false);
                              navigation.navigate('LiveStack');
                              Api.VizualiCon(Ocorre, QuantMsgT);
                            }

                            
                          }

                          const IniciarChat = async ()=>{
                            await setmodalVer(false);
                            await setLoading(true);
                            await Api.EnviandoEntradaChat(Log, Lat, cidade, estado, Nome, setLoading, setOcorre, setEnt, Varia );
                            await navigation.navigate('LiveStack');
                            
                            
                          }

                          const VerNoticia = async (id)=>{
                            navigation.navigate('NotStack', {
                              screen: id,
                            });
                            
                          }

                          


                        const handleLocationFinder = async () => {
                            
                        let result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                            { 
                                title: "Permisão Localização!",
                                message: "Você deve permitir a localização para  funcionamento do APP",
                                buttonPositive:"Ok",
                                buttonNegative:"Permiti depois",
                                buttonNeutral: "Cancelar",
                            }
                            
                        );
                     
                        if(result == 'granted') {
                            
                            Geolocation.watchPosition( async (info)=>{ 
                            
                                  setLat(info.coords.latitude);
                                  setLog(info.coords.longitude);  
                                
                            },{
                                enableHighAccuracy:true,
                                timeout:10000,
                                maximumAge:3000
                            });
                
                            } else {
                              setLat('vazio');
                              setLog('vazio');
                            }
                        

                        }  
                        
                        const Atual = ()=>{
                          Linking.openURL(Atu.link);
                        }


                      

                        const pesquisar = ()=> {
                           setLoading(true);                               
                            Api.PesquisandoServPub(cidade, estado, setPolVer, setLoading);
                                    
                                
                            }





    return ( 
        <Container>
          <ImageBackground source={require("../../assets/logoopaca.png")} 
          resizeMode='cover' 
          style={styles.image} >
          <Modal
           animationType="slide"
           visible={modalVer}
          >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Deseja iniciar uma conversa por mensagem
          com a Polícia Militar, caso queira fazer uma denuncia ou chamar uma viatura click em sim?</Text>
          <BtnModal onPress={()=>{IniciarChat()}}>
          <Text style={styles.modalText2}>Sim</Text>
          </BtnModal>
          <BtnModal onPress={()=>{FecharModal()}} >
          <Text style={styles.modalText1}>Não</Text>
          </BtnModal>
          </View>
          </View>
          </Modal>
          <CaixaTitulo>
          <CityLogo width="80" height="80" />
          <CaixaDados>
          <TextTitulo>15º Batalhão de Polícia Militar</TextTitulo>
          <TextInfo>Cidade: {cidade}</TextInfo>
          <TextInfo>Estado: {estado}</TextInfo>
          </CaixaDados>
          
          </CaixaTitulo>
           
            
            {loading ?
                    <LoadingIcon size="large" color="#FFFFFF" />
                    :
                    <CaixaTotal>


                        {TemAvi === true &&
                        <CaixaDasat>
                        <TituAviso>Aviso</TituAviso>
                      <TextDesat>{AviMsg}</TextDesat>
                      </CaixaDasat>

                        }
                        {Atu !== {} &&
                        <>
                        {Atu.versao !== Version &&
                          <CaixaAtu onPress={Atual}>
                          <TituAviso>Aviso</TituAviso>
                          <TextAtu>{Atu.body}</TextAtu>
                          </CaixaAtu>
                        }
                        </>
                        }
                        
                        
                         
                        
                        
                        <CaixaArea onPress={Entrando} >
                        <CaixaTop></CaixaTop> 
                        <Atemdimento width="80px" height="80px" />
                        <Textnome>Ligar</Textnome>
                        </CaixaArea>
                        <CaixaArea onPress={Entrachat} > 
                        <CaixaTop>
                          {MsgQuant !== 0 &&
                            <CaixaInfo><TextNum>{MsgQuant}</TextNum></CaixaInfo>
                          }
                         </CaixaTop>  
                        <Chat width="80px" height="80px" />
                        <Textnome>Chat</Textnome>
                        </CaixaArea>
                        <TextNoticia>Notícias Policiais</TextNoticia>

                      
                          <CaixaDasNot>
                         <FlatList 
                         data={ListNot}
                         keyExtractor={item => item.id.toString()}
                         renderItem={({ item }) => 
                         <CaixaNews onPress={()=>VerNoticia(item.id)} >
                         <CaixaNewsImg>
                         <Image  source={{uri:item.img}} style={styles.ImageVer } />
                         </CaixaNewsImg>
                         <CaixaNewsInfor>
                             <TextTituloNews>
                               {item.titulo}
                             </TextTituloNews>
                             <TextDataNews>
                               {item.data}
                             </TextDataNews>
   
                         </CaixaNewsInfor>
                          </CaixaNews>
                        
                        }
                         />
                      
                          </CaixaDasNot>
 
                </CaixaTotal>
                }
       
       </ImageBackground> 
        </Container>

    )
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#4169e1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  image: {
    width: '100%',
    height: '100%',
     flex: 1 ,
     alignItems:"center"
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
  },
  ImageVer:{
    width:100,
    height:100,
    borderRadius:10,
  },
});

