import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = 0;
let ss = 0;
let mm = 0;
let hh = 0;
export default function App(){
  const [numero, setNumero] = useState('00:00:00');
  const [botao, setBotao] = useState('INICIAR');
  const [ultimo, setUltimo] = useState('00:00:00');

  function vai(){
    if (timer !== 0){
      //Aqui vai parar o time r
      clearInterval(timer);
      timer = 0;
      setBotao('INICIAR');
    }else{
      setBotao('PARAR');
      timer =  setInterval(()=>{
        ss++;
        if(ss == 60){
          ss = 0;
          mm++;
        }
        if (mm == 60){
          mm = 0;
          hh++;
        }
        let format = 
        (hh < 10 ? '0' + hh : hh) + ':' + (mm <10 ? '0' +  mm : mm) + ':' + (ss <10 ? '0' + ss : ss)
        setNumero(format);
      }, 1000)
    }
  }
  
  function limpar(){
    if (timer !== null){
      clearInterval(timer);
      timer = 0;
    }
    setUltimo(numero);
    setNumero('00:00:00');
    setBotao('INICIAR');
    ss = 0;
    mm = 0
    hh = 0;
  }

  return(
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}> {numero} </Text>

      <View style = {styles.btnArea}>
        <TouchableOpacity style={styles.button} onPress={vai}>
          <Text style={styles.btnText}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={limpar}>
          <Text style={styles.btnText}>LIMPAR</Text>
        </TouchableOpacity>
       </View>
       <View style={{marginTop:40}}>
        <Text style={styles.textoCorrida}>
          {ultimo? 'Ultimo parada: ' + ultimo : ''}
        </Text>
       </View>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent: 'center',
    backgroundColor: '#00aaf8'
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aaf8'
  },
  button:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 17,
    height: 40,
    borderRadius: 9
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height:40
  },
  textoCorrida:{
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic'
  }
});