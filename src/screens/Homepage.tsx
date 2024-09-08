import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import LottieView from "lottie-react-native"
import { paws_animation } from "../components/style/constants"
import { ControlledInput, Input } from "../components/Inputs"
import { useFormContext } from "react-hook-form"
import { Data } from "../navigation/routes/RootStack"
import axios, { Axios } from "axios"
import DropDownPicker from "react-native-dropdown-picker"

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
        <SafeAreaView style={{backgroundColor: '#fff8dc'}}>
            <View style={style.header}>
                <Text style={style.headerTxt} >Calino</Text>
            </View>
            <View>
               <ControlledInput name="name" icon={"face-man-profile"} placeholder="Digite o nome completo do tutor" control={control}/>
               <ControlledInput stylesContainer={{
                borderWidth: 2,
                borderRadius: 8,
                margin: "1.4%",
                marginLeft: '7%',
                borderColor: "#964b00",
                alignSelf: 'flex-start',
                justifyContent: 'center',
                flexDirection: "row",
                width: '35%'
               }} onBlur={() => getCep(getValues('CEP'))} name="CEP" placeholder="CEP?" control={control}/>
                
                <View>
                    <DropDownPicker style={{borderColor: "#964b00", backgroundColor:"#fff8dc" }} containerStyle={{backgroundColor: "#fff8dc"}} textStyle={{ fontSize: 16,textAlign: "center",width: "80%",}} containerStyle={{

                        
                        
                        margin: "1.4%",
                        marginLeft: '7%',
                      
                        justifyContent: 'center',
                        flexDirection: "row",
                        width: '85%'
                    }} open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} searchable={true} placeholder="Escolha um Bairro"></DropDownPicker>
                    <ControlledInput control={control} name="number" placeholder="Número"></ControlledInput>
                    <ControlledInput control={control} name="complement" placeholder="Complemento"></ControlledInput>
                </View>
               
               

            </View>
            {/* <LottieView
                ref={pawsAnimationRef}
                source={{uri: "https://lottie.host/26f37956-e8a3-41d1-8edb-2af308d080b3/4houcCNfOH.json"}}
                autoPlay
                loop
                style={{height: '100%'}}
            /> */}
           
        </SafeAreaView>
    )
}


const style = StyleSheet.create({

    header:{
        alignItems: 'center',
        
    },
    headerTxt:{
        fontSize: 35,
        fontFamily: 'Cochin',
        color: "#ad7402",
        fontWeight: 'bold'
    }
})