import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import LottieView from "lottie-react-native"
import { paws_animation } from "../components/style/constants"
import { ControlledInput, Input } from "../components/Inputs"
import { useFormContext } from "react-hook-form"
import { Data } from "../navigation/routes/RootStack"
import axios, { Axios } from "axios"
import DropDownPicker from "react-native-dropdown-picker"
import { Button } from "../components/Button"
import { Header } from "../components/Header"


export const Homepage = () =>{

   const {control, handleSubmit, getValues} = useFormContext<Data>();
  
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);
   const [items, setItems] = useState([
    {label:'Bela Vista', value: 'Bela Vista'}
   ]);

   const getCep = async (cep: string) => {
        const cepDigits = cep.replace(/\D/g, '');

        if(cepDigits){
            const regValidCep = /^[0-9]{8}$/
            if(regValidCep.test(cepDigits)){

                axios.get(`https://viacep.com.br/ws/${cepDigits}/json/`)
                    .then(response => {
                        console.log(response.data)
                       
                    })
                    .catch(error => {
                        return console.log(error)
                    }) 
                
            }
        }
        
   }
  


    const pawsAnimationRef = useRef<LottieView>(null)
    useEffect(()=> {
        pawsAnimationRef.current?.play();
        console.log(pawsAnimationRef)
    }, []);

    return(
        
        <KeyboardAvoidingView behavior={Platform.OS ==='ios' ? 'padding' : 'height'} style={style.container}>
            
            <Header/>
            <View style={{flex: 1, backgroundColor: '#003777', flexShrink: 3}}>
               <ControlledInput name="name" maxLength={45} icon={"face-man-profile"} placeholder="Digite o nome completo do tutor" control={control}/>
               <ControlledInput maxLength={9} componentContainer={style.cepContainer} onBlur={() => getCep(getValues('CEP'))} name="CEP" placeholder="CEP?" control={control}/>
               <DropDownPicker  style={{borderColor: "#964b00"}} textStyle={{ fontSize: 16,textAlign: "center",width: "80%",}} containerStyle={style.dropdownContainerStl} open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} searchable={true} placeholder="Escolha um Bairro"></DropDownPicker>
               
                <View style={style.row}>
                        <ControlledInput maxLength={5} componentContainer={style.addrContainer} control={control} name="number" placeholder="Número"></ControlledInput>
                        <ControlledInput maxLength={15} componentContainer={style.addrContainer} control={control} name="complement" placeholder="Complemento"></ControlledInput>
                </View>
                <Button iconColor={'#008000'} title="Enviar" iconName="checkcircle"/>
            </View>
           
        </KeyboardAvoidingView >
        
    )
}


const style = StyleSheet.create({

   

    container:{
        backgroundColor: '#6C85BD', //'#3E3FFF',
        flex: 1,

        
       
    },

    row:{
        flex:1,
        flexDirection: 'row',
        marginLeft: '6.5%',
        
       
    },
    
    
    dropdownContainerStl:{
        margin: "1.4%",
        marginLeft: '7%',
        justifyContent: 'center',
        flexDirection: "row",
        width: '85%'
    },
    cepContainer:{
        borderWidth: 2,
        shadowRadius: 3,
        borderRadius: 10,
        margin: "1.4%",
        marginLeft: '7%',
        borderColor: "#fff",
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: "row",
        width: '35%',
    
    },

    addrContainer:{
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10%',        
        maxWidth: 150
        
        
    },
})