import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default {
    checkToken: async (Cidade, Estado, setCidade, setEstado, setNome, setId) => {
        const user =  await auth().currentUser;
        if(!user) {
         console.log("não esta logado");
        } else {
     
        const id =  user.uid;
        const dados = await firestore().collection('users').doc(id).get();
            setCidade(dados._data.cidade);
            setEstado(dados._data.estado);
            setId(id);
            setNome(dados._data.nome);
           }
      return user; 
    },
    signIn: async (Nome, Cidade, Estado) => {

     return await auth().signInAnonymously()
      .then( async() => {
        const autenticado =  await auth().currentUser;
        const id =  await autenticado.uid;
        let now = new Date()
        await firestore().collection('users')
        .doc(id)
        .set({
          nome: Nome,
          cidade: Cidade,
          estado: Estado,
          Cadastro:now,        
        }).then(()=>{
          firestore().collection("movimentacao").add({
            id: id,
            cidade: Cidade,
            estado: Estado,
            acao:"criar",
            setor:"Cadastro conta App",
            data: firestore.FieldValue.serverTimestamp(),
              
          })
  
        });
       return id;

        }).catch((error) => {
           
               alert('Ocorreu um erro, Tente mais tarde!' + error);      
  
        });

       
    },
    signUp: async (nameField, emailField, passwordField,nameComp, Telefone, dataNasc) => {
        
        await auth()
        .createUserWithEmailAndPassword(emailField, passwordField)
        .then( async () => {
         const user =  await auth().currentUser;
         
         await user.sendEmailVerification();
         const id = user.uid;
         const verificar = user.emailVerified;
         await AsyncStorage.setItem('uid', id);
         await firestore().collection('users').doc(id).set({nome: nameField, nomeCompleto: nameComp, telefone: Telefone, dataNascimento:dataNasc });
    

        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
                alert('Esse endereço de email já esta em uso!');
          }
      
          if (error.code === 'auth/invalid-email') {
            alert('Esse endereço de e-mail é inválido!');
          }

          if (error.code === 'auth/operation-not-allowed') {
            alert('Tente novamente mais tarde!');
          }

          if (error.code === 'auth/weak-password') {
            alert('Digite uma senha melhor!');
          }
      
       
        });

        const uid = await AsyncStorage.getItem('uid');
        await AsyncStorage.setItem('uid', '0');
       if(uid == 0) {
          return null;
        } else {
          return uid;
        }

    },
    
    PesquisandoServPub: async (cidade, estado, setPolVer, setLoading) => {
      await firestore().collection("users")
      .where("estado", "==", estado)
      .where("cidade", "==", cidade)
      .where("instituicao", "==", "Polícia Militar")
      .where("conta.serv.desbloqueado", "==", true)
        .onSnapshot(async(querySnapshot) => {
          console.log("entrando"+querySnapshot.size);
        if(querySnapshot.size !== 0) {
          await setPolVer(true);
          await setLoading(false);   
        } 
         
        });
        
        
  },

  EnviandoEntrada: async (Log, Lat, cidade, estado, Nome, setOcorre, Varia) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);

    await firestore().collection("users")
    .where("estado", "==", estado)
    .where("cidade", "==", cidade)
    .where("instituicao", "==", "Polícia Militar")
    .where("conta.serv.desbloqueado", "==", true)
    .where("conta.serv.ativo", "==", true)
    .onSnapshot(async(querySnapshot) => {
      var res = []; 
      await querySnapshot.forEach((doc) => {
          res.push({
            id: doc.id,
            nome: doc.data().nome,
          });               
      });
          res.push({
            id: id,
            nome: Nome,
          });
     await firestore().collection("ocorrencia")
    .add({
      ativo:true,
      cidade: cidade,
      estado: estado,
      instituicao:"Polícia Militar",
      nomevitima: Nome,
      idvitima: id,
      localizacao:{lat: Lat, lng: Log},
      userChat:res,
      condicionais:[],
      mensagem:[{
        autor:id,
        nome: Nome,
        body:"Estou ligando via telefone",
        date: now,
        type:"text"
      }],     
      dataInicio:firestore.FieldValue.serverTimestamp(),
      ultimaMsg:{id:id, nome: Nome, data:now, msg:"Estou ligando via telefone"},
      DigiS:false,
      DigiV:false,
      vizualS:0,
      vizualV:1,
      vtr: "",
      atendenteCopom: "",
      componentesVtr: "",
      periodo: "",
      rua: "",
      numero: "",
      bairro: "",
      conduzidos:"",
      vitimas:"",
      objetosApre:"",
      grupoOcrr:"",
      Ocorr:"",
      resultado: "",
      relato:"",
      providencias:"",
      }).then(async (doc)=>{
        console.log("id da ocorrencia da Api  " + doc.id);
        await  setOcorre(doc.id);
       
      });

          

    });
    
  },

  pegarTelefone: async (cidade, estado, setphoneNumber) => { 
    await firestore().collection("telefone")
    .where("estado", "==", estado)
    .where("cidade", "==", cidade)
    .where("instituicao", "==", "Polícia Militar")
    .onSnapshot(async(querySnapshot) => {
      await querySnapshot.forEach((doc) => {
        setphoneNumber(doc.data().numero);         
      });
    });
          
  },

  enviandoMsg: async (Msg, Nome, Ocorre, Varia) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);
    console.log("DAta real "+ now);
    firestore().collection("ocorrencia")
    .doc(Ocorre).update({
      mensagem: firestore.FieldValue.arrayUnion ({
        autor:id,
        nome: Nome,
        body: Msg,
        date: now,
        type:"text"
      }),
      'ultimaMsg':{id:id, nome: Nome, data:now, msg:Msg} 
  });

    var Add = firestore().collection("ocorrencia").doc(Ocorre);
    return firestore().runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(Add).then((sfDoc) => {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add one person to the city population.
          // Note: this could be done without a transaction
          //       by updating the population using FieldValue.increment()
          var Vizual = sfDoc.data().vizualV + 1;
          transaction.update(Add, {vizualV : Vizual });
      });
  }).then(() => {
   
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });

         

      
        
  },

  PegarConversas: async (cidade, estado, setTmpMsg, setOcorre, setTemUlt, setCont, setDig, setVizuS) => {

          const user =  await auth().currentUser;
          const id = user.uid;
          await firestore().collection("ocorrencia")
          .where("idvitima", "==", id)
          .where("ativo", "==", true)
          .where("estado", "==", estado)
          .where("cidade", "==", cidade)
          .onSnapshot((querySnapshot) => {
            var res = []; 
            querySnapshot.forEach((doc) => {
              setOcorre(doc.id);
              setTmpMsg(doc.data().mensagem);
              setCont(doc.data().mensagem.length);
              setTemUlt(doc.data().ultimaMsg.data.seconds)
              setDig(doc.data().DigiS);
              setVizuS(doc.data().vizualS);
                });      
            });

            
            
    
           
  },

  DadosConversas: async (cidade, estado, setQuantMsgT, setOcorre, setQuantMsgV, setTmpMsg) => {
   
          const user =  await auth().currentUser;
          const id = user.uid;
          await firestore().collection("ocorrencia")
          .where("idvitima", "==", id)
          .where("ativo", "==", true)
          .where("estado", "==", estado)
          .where("cidade", "==", cidade)
          .onSnapshot((querySnapshot) => {
            var res = []; 
            querySnapshot.forEach(async (doc) => {
              await setTmpMsg(doc.data().mensagem);
              await setOcorre(doc.id);
              await setQuantMsgT(doc.data().mensagem.length);
              await setQuantMsgV(doc.data().vizualV);
              
                });      
            });
            
    
           
  },

  VizualiCon: async (Ocorre, QuantMsgT) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    await firestore().collection("ocorrencia")
    .doc(Ocorre)
    .update({
     vizualV: QuantMsgT,
  });
},

  VizualVit: async (Ocorre, Cont) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    await firestore().collection("ocorrencia")
    .doc(Ocorre)
    .update({
     vizualV: Cont,
  });
      

     
},

  VerAtivo: async (Ocorre, setAtivo ) => {
    const user =  await auth().currentUser;
    const id = user.uid;

    
          await firestore().collection("ocorrencia")
          .doc(Ocorre) 
          .onSnapshot((doc) => {
           
              if(doc.data().ativo === true){
                setAtivo(false);
              } else {
                setAtivo(true);
              }
          
           
            });
    

              
                     
           
      
  
            
    
           
  },
  EnviarImage: async (ImgTmp, Nome, setMstImage, setQuadro2, setCarreg, Ocorre, Varia ) => {
    
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);
    const uploadUri = ImgTmp;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
          await firestore().collection("ocorrencia")
          .doc(Ocorre).update({
            mensagem: firestore.FieldValue.arrayUnion ({
              autor:id,
              nome: Nome,
              body: url,
              date: now,
              type:"image"
            }),
            'ultimaMsg':{id:id, nome:Nome, data:now, msg:"Imagem enviada"} 
        });

        var Add = firestore().collection("ocorrencia").doc(Ocorre);
        return firestore().runTransaction((transaction) => {
          return transaction.get(Add).then((sfDoc) => {
              if (!sfDoc.exists) {
                  throw "Document does not exist!";
              }
      
              var Vizual = sfDoc.data().vizualV + 1;
              transaction.update(Add, {vizualV : Vizual });
          });
      }).then(() => {
         setCarreg(false);  
         setMstImage(false);
          setQuadro2(false);
      }).catch((error) => {
          console.log("Transaction failed: ", error);
      });

   
  },

  EnviarVideo: async (VideoTmp, Nome, setMsgVideo , setQuadro3, setCarreg, Ocorre, Varia) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);
    const uploadUri = VideoTmp;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`video/${filename}`);
    const task = await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
          await firestore().collection("ocorrencia")
          .doc(Ocorre).update({
            mensagem: firestore.FieldValue.arrayUnion ({
              autor:id,
              nome: Nome,
              body: url,
              date: now,
              type:"video"
            }),
            'ultimaMsg':{id:id, nome:Nome, data:now, msg:"Video enviado"}  
        });
        var Add = firestore().collection("ocorrencia").doc(Ocorre);
        return firestore().runTransaction((transaction) => {
          return transaction.get(Add).then((sfDoc) => {
              if (!sfDoc.exists) {
                  throw "Document does not exist!";
              }
      
              var Vizual = sfDoc.data().vizualV + 1;
              transaction.update(Add, {vizualV : Vizual });
          });
      }).then(() => {
        setCarreg(false);
        setMsgVideo(false);
        setQuadro3(false);
      }).catch((error) => {
          console.log("Transaction failed: ", error);
      });


        
      
     
  },

  EnviarAudio: async (AudTmp, Nome, setQuadro4, setQuadro5, setQuadroG , setQuadro3, setQuadro1, setCarreg, Ocorre, Varia) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);
    const uploadUri = AudTmp;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`audio/${filename}`);
    const task = await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
          await firestore().collection("ocorrencia")
          .doc(Ocorre).update({
            mensagem: firestore.FieldValue.arrayUnion ({
              autor:id,
              nome: Nome,
              body: url,
              date: now,
              type:"audio"
            }),
            'ultimaMsg':{id:id, nome:Nome, data:now, msg:"Audio enviado"} 
        });
        var Add = firestore().collection("ocorrencia").doc(Ocorre);
        return firestore().runTransaction((transaction) => {
          return transaction.get(Add).then((sfDoc) => {
              if (!sfDoc.exists) {
                  throw "Document does not exist!";
              }
      
              var Vizual = sfDoc.data().vizualV + 1;
              transaction.update(Add, {vizualV : Vizual });
          });
      }).then(() => {

        setCarreg(false);
        setQuadro4(false);
        setQuadro5(false);
        setQuadroG(false);
        setQuadro3(false);
        setQuadro1(false);
       
      }).catch((error) => {
          console.log("Transaction failed: ", error);
      });
        
        
   
  },

  AnaliseEntrada: async (cidade, estado) => {
    const user =  await auth().currentUser;
    const id = user.uid;
   return await firestore().collection("ocorrencia")  
    .where("idvitima", "==", id)
    .where("ativo", "==", true)
    .where("cidade", "==", cidade)
    .where("estado", "==", estado)
    .get()
    .then(async (querySnapshot) => {
       return  querySnapshot.size;
    });
  },

  EnviandoEntradaChat: async (Log, Lat, cidade, estado, Nome, setLoading, setOcorre, setEnt, Varia) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    let temp = new Date().getTime();
    let now = temp + (Varia*1000);
    await firestore().collection("users")
    .where("estado", "==", estado)
    .where("cidade", "==", cidade)
    .where("instituicao", "==", "Polícia Militar")
    .where("conta.serv.desbloqueado", "==", true)
    .where("conta.serv.ativo", "==", true)
    .onSnapshot(async(querySnapshot) => {
      var res = []; 
      await querySnapshot.forEach((doc) => {
          res.push({
            id: doc.id,
            nome: doc.data().nome,
          });               
      });
          res.push({
            id: id,
            nome: Nome,
          });
     await firestore().collection("ocorrencia")
    .add({
      ativo:true,
      cidade: cidade,
      estado: estado,
      instituicao:"Polícia Militar",
      nomevitima: Nome,
      idvitima: id,
      condicionais:[],
      localizacao:{lat: Lat,  lng: Log},
      userChat:res,
      mensagem:[{
        autor:id,
        nome: Nome,
        body:"Chat está sendo Iniciado",
        date: now,
        type:"text"
      }],     
      dataInicio:firestore.FieldValue.serverTimestamp(),
      ultimaMsg:{id:id, nome: Nome, data:now, msg:"Chat está sendo Iniciado"},
      DigiS:false,
      DigiV:false,
      vizualS:0,
      vizualV:1,
      vtr: "",
      atendenteCopom: "",
      componentesVtr: "",
      periodo: "",
      rua: "",
      numero: "",
      bairro: "",
      conduzidos:"",
      vitimas:"",
      objetosApre:"",
      grupoOcrr:"",
      Ocorr:"",
      resultado: "",
      relato:"",
      providencias:"",
      }).then(async (doc)=>{
        console.log("id da ocorrencia da Api  " + doc.id);
        await setEnt(true);
        await  setOcorre(doc.id);
       
      });

          

    });
    await setLoading(false);
    
  },

  VariacaoTemp: async()=> {
    const user =  await auth().currentUser;
    const id = user.uid;

        let now = new Date()
       
        const dados = await firestore().collection('TempVariacao').doc(id)
        .set({
          Servidor:firestore.FieldValue.serverTimestamp(),
          Sitema: now,
      })
  
   
  },

  VarTempPegar: async(Nome, setVaria)=> {
   
    const user =  await auth().currentUser;
    const id = user.uid;
       
        const dados = await firestore().collection('TempVariacao')
        .doc(id).onSnapshot((doc) => {
          if(doc.data().Servidor){
            let Vari = doc.data().Servidor.seconds - doc.data().Sitema.seconds;
            setVaria(Vari);
          }
         
      });
    
   
  },

  AvisoAppCli: async(cidade, estado, setAviMsg, setTemAvi)=> {
   console.log("Estado "+estado);
   console.log("Cidade  "+cidade);
    const user =  await auth().currentUser;
    const id = user.uid;

    await firestore().collection("avisoAppVit")
    .where("estado", "==", estado)
    .where("cidade", "==", cidade)
    .where("instituicao", "==", "Polícia Militar")
    .onSnapshot((querySnapshot) => {
      var cities = [];
      querySnapshot.forEach((doc) => {
          setAviMsg(doc.data().body);
          setTemAvi(doc.data().ativo);    
      });
    });
   
      
    
   
  },

  Atualiza: async (cidade, setAtu) => {
    const user =  await auth().currentUser;
    const id = user.uid;
    await firestore().collection("Atualizar")
    .doc("QmW0nqtpYp95db2KqnYe")
    .onSnapshot((doc) => {
      setAtu(doc.data());
  });
  },

    logout: async () => {
      await auth().signOut().then(() => console.log('Saiu da conta!'));
    },

};