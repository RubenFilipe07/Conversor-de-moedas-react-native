import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import axios from 'axios';
import { Provider as PaperProvider, Button, TextInput, Text, Snackbar, Appbar, Menu,  DefaultTheme } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

export default function App() {

const [entrada, setEntrada] = useState('');
const [saida, setSaida] = useState('R$ 0,00');
const [dolar, setDolar] = useState(0);
const [euro, setEuro] = useState(0);
const [libra, setLibra] = useState(0);
const [iene, setIene] = useState(0);
const [dolarAustraliano, setDolarAustraliano] = useState(0);
const [francoSuico, setFrancoSuico] = useState(0);
const [dolarCanadense, setDolarCanadense] = useState(0);
const [yuan, setYuan] = useState(0);
const [pesoArgentino, setPesoArgentino] = useState(0);

const [showDropDown, setShowDropDown] = useState(false);
const [moeda, setMoeda] = useState("");

const [mensagemErroVisivel, setMensagemErroVisivel] = useState(false);
const [mensagemErro, setMensagemErro] = useState('');


const [showAbout, setShowAbout] = useState(false);
const [showHome, setShowHome] = useState(true);

const currencyList = [
  { label: "Dólar", value: "usd" },
  { label: "Euro", value: "eur" },
  { label: "Libra", value: "gbp" },
  { label: "Iene", value: "jpy" },
  { label: "Dólar Australiano", value: "aud" },
  { label: "Franco Suiço", value: "chf" },
  { label: "Dólar Canadense", value: "cad" },
  { label: "Yuan", value: "cny" },
  { label: "Peso Argentino", value: "ars" },
];


const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  dark: false, 
  colors: {
    ...DefaultTheme.colors,
    primary: '#009688',
  },
};


const getMonetary = () => {
  axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,ARS-BRL')
    .then(res => {
      handlerMonetary(res.data);
    }).catch(err => {
      console.log(err)
    });
}

useEffect(() => {
  getMonetary();
}, []);


const handlerMonetary = (data) => {
  setDolar(data.USDBRL.bid);
  setEuro(data.EURBRL.bid);
  setLibra(data.GBPBRL.bid);
  setIene(data.JPYBRL.bid);
  setDolarAustraliano(data.AUDBRL.bid);
  setFrancoSuico(data.CHFBRL.bid);
  setDolarCanadense(data.CADBRL.bid);
  setYuan(data.CNYBRL.bid);
  setPesoArgentino(data.ARSBRL.bid);
}

const calcular = () => {
  
  if(entrada === '' && moeda === ''){
    setMensagemErro('Digite um valor e selecione uma moeda');
    return;
  }
  else if (entrada === '') {
    setMensagemErroVisivel(true);
    setMensagemErro('Digite um valor');
    return;
  }
  else if(moeda === ''){
    setMensagemErro('Selecione uma moeda');
    return;
  } 
  else if(entrada<1){
    setMensagemErroVisivel(true);
    setMensagemErro('Digite um valor maior que zero');
    return;
  }

  switch(moeda){
    case 'usd':
      setSaida(`$${entrada} = R$ ${(entrada * dolar).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'eur':
      setSaida(`€${entrada} = R$ ${(entrada * euro).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'gbp':
      setSaida(`£${entrada} = R$ ${(entrada * libra).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'jpy':
      setSaida(`¥${entrada} = R$ ${(entrada * iene).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'aud':
      setSaida(`A$${entrada} = R$ ${(entrada * dolarAustraliano).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'chf':
      setSaida(`₣${entrada} = R$ ${(entrada * francoSuico).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'cad':
      setSaida(`C$${entrada} = R$ ${(entrada * dolarCanadense).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'cny':
      setSaida(`¥${entrada} = R$ ${(entrada * yuan).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    case 'ars':
      setSaida(`$${entrada} = R$ ${(entrada * pesoArgentino).toFixed(2).replace('.', ',')}`);
      setMensagemErroVisivel(false);
      break;
    default:
      setSaida('R$ 0,00');
      setMensagemErroVisivel(true);
  }
}


const [menuVisible, setMenuVisible] = useState(false);

  return (
    <PaperProvider theme={theme}>
    <Appbar.Header>
        <Appbar.Content title="Conversor de Moedas" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Appbar.Action icon="menu" onPress={() => setMenuVisible(true)}/>}>
          <Menu.Item  title="Conversor" onPress={() => setShowHome(true) & setShowAbout(false)} icon={'calculator'} />
          <Menu.Item  title="Sobre"   onPress={() => setShowAbout(true) & setShowHome(false)} icon={'information-outline'}/>
          <Menu.Item  title="Avalie" onPress={() => Linking.openURL("market://details?id=com.rubenfilipe07.currency_converter") } icon={'star'}/>
        </Menu>
      </Appbar.Header>
     
    
        {showHome && (
           <View style={styles.container}>
 <TextInput onChangeText={setEntrada} style={styles.inputs} value={entrada.toString()}   keyboardType="numeric" label={"Valor em reais"}></TextInput>
      
 <View style={styles.inputs}>
 <DropDown
         label={"Moeda"}
         visible={showDropDown}
         showDropDown={() => setShowDropDown(true)}
         onDismiss={() => setShowDropDown(false)}
         value={moeda}
         setValue={setMoeda}
         list={currencyList}
       />
 </View>

 <Text style={styles.saida}>{saida}</Text>
 <Button onPress={calcular} mode="contained" style={styles.button}>CALCULAR</Button>
 <Text style={styles.footer}>Desenvolvido por Rúben Filipe</Text>
 </View>
        )}
        {showAbout && (
          <View style={styles.container}>
            <Text style={styles.about}>Conversor de moedas</Text>
            <Text style={styles.about}>Feito com React Native</Text>
            <Text style={styles.about}>Desenvolvido por Rúben Filipe</Text>
            <Text style={styles.about}>Provedor de informações: AwesomeApi</Text>
            <Button onPress={() => Linking.openURL("https://docs.awesomeapi.com.br/api-de-moedas")} mode="contained" style={styles.button} color="#36b93f" icon={'api'}>AwesomeApi</Button>
            <Button onPress={() => Linking.openURL("https://github.com/RubenFilipe07/Android-currency-converter-app")} mode="contained" style={styles.button} color="#f5f5f5" icon={'github'}>Github Repo</Button>
            <Button onPress={() => setShowHome(true) & setShowAbout(false)} mode="contained" style={styles.button} icon={'arrow-left'}>Voltar</Button>
          </View>
        )}
   
      
        <Snackbar
          visible={mensagemErroVisivel}
          onDismiss={() => setMensagemErroVisivel(false)}
          action={{
            label: 'Ok',
          }}>
          {mensagemErro}
        </Snackbar>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#212121',
    alignItems: 'center',
   paddingTop: 50,
  },
  saida: {
   // color: '#fff',
    fontSize: 35,
    margin: 15,
  },
  inputs: {
    width: '90%',
    height: 64,
    marginBottom: 20,
  },
  button: {
    width: '90%',
    marginTop: 20, 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    color: '#8c9494',
    left: 'auto',
    right: 'auto',
  },
  about: {
    //color: '#fff',
    fontSize: 20,
    margin: 15,
  }
});
