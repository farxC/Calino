import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import LottieView from "lottie-react-native"
import { paws_animation } from "../components/style/constants"
import { ControlledInput, Input, inputStyles } from "../components/Inputs"
import { Controller, FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, UseControllerProps, useFormContext } from "react-hook-form"
import { Data } from "../navigation/routes/RootStack"
import axios, { Axios } from "axios"
import DropDownPicker from "react-native-dropdown-picker"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { AnimalTable } from "../components/Table"

const ControlledDropdown = <FormType extends FieldValues>({
    control,
    name,
    rules,
    }: UseControllerProps<FormType>) => {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
            { label: 'Bela Vista', value: 'Bela Vista' }
        ]);
        return(
            <Controller
             control={control}
             name={name}
             rules={rules}
             render={({field, fieldState: {error}}) => (
                <View style={{marginBottom: '1.5%'}}>
                    <DropDownPicker 
                    listMode="SCROLLVIEW" 
                    theme="DARK" 
                    textStyle={{ fontSize: 16,color:"#fff", fontWeight: 500, textAlign: "center", width: "80%", }}
                    containerStyle={style.dropdownContainerStl}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    searchable={true}
    
                    placeholder="Escolha um Bairro"/>
                     {error &&(
                    <Text style={{ color: 'red',fontWeight: "bold", marginRight: '5%', margin:"-1.5%", left: '9%' }}>{error.message}</Text>
                      )}
                </View>
             )}
            />
        )
    }


export const Homepage = () => {

    const { control, handleSubmit, getValues, formState:{errors} } = useFormContext<Data>();
    const logo = require('../components/style/cutlogo_1.png')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Bela Vista', value: 'Bela Vista' }
    ]);

    const getCep = async (cep: string) => {
        const cepDigits = cep.replace(/\D/g, '');

        if (cepDigits) {
            const regValidCep = /^[0-9]{8}$/
            if (regValidCep.test(cepDigits)) {

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

    const onValidForm: SubmitHandler<Data>= (data) => {
        console.log(data)
    }
    const onInvalid: SubmitErrorHandler<Data> = (errors: FieldErrors<Data>) => {
        console.log(errors.dog)
        return (
            Alert.alert(`Inválido \n ${errors}`)
        )
    }


    const pawsAnimationRef = useRef<LottieView>(null)
    useEffect(() => {
        pawsAnimationRef.current?.play();
        console.log(pawsAnimationRef)
    }, []);

    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.container}>

            <Header />
            <View style={style.horizontalLine}></View>
            <ScrollView style={{ flex: 9, backgroundColor: '#003777', borderBottomEndRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 15, marginHorizontal: '4%' }}>

                <ControlledInput rules={{required: '* Insira o nome do tutor'}} fieldName="Tutor" name="name" maxLength={45} icon={"face-man-profile"} placeholder="Digite o nome completo do tutor" control={control} />
                <ControlledInput icon="map-outline" fieldName="CEP" maxLength={9} onBlur={() => getCep(getValues('CEP'))} name="CEP" placeholder="Digite aqui o CEP (opcional)" control={control} />
                
                <Text style={inputStyles.field}>Bairro</Text>
                <DropDownPicker listMode="SCROLLVIEW" theme="DARK" textStyle={{ fontSize: 16,color:"#fff", fontWeight: 500, textAlign: "center", width: "80%", }} containerStyle={style.dropdownContainerStl} open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} searchable={true} placeholder="Escolha um Bairro"></DropDownPicker>
                <ControlledDropdown control={control} name="district"/>
                <View style={style.row}>
                    <ControlledInput rules={{required: '* Insira o número'}} maxLength={5} fieldName="Número" componentContainer={style.addrContainer} control={control} name="number" placeholder="Nº do Endereço"></ControlledInput>
                    <ControlledInput rules={{required: '*Insira o complemento'}} fieldName="Complemento" maxLength={15} componentContainer={style.addrContainer} control={control} name="complement" placeholder="Casa, Apartamento"></ControlledInput>
                </View>
                <AnimalTable />

                <View style={{ flex: 2, justifyContent: 'center', paddingTop: '3%', bottom: '2.5%'}}>
                    <Button iconColor={'#008000'} title="Enviar" iconName="checkcircle" onPress={handleSubmit(onValidForm,onInvalid)} />
                </View>

            </ScrollView>
          


        </KeyboardAvoidingView >

    )
}


const style = StyleSheet.create({


    container: {
        backgroundColor: '#6C85BD', //'#3E3FFF',
        flex: 1,
    },


    row: {
        marginTop: '2%',
        flexDirection: 'row',
        marginLeft: '7%',
        justifyContent: 'center'
    },

    horizontalLine: {
        borderTopColor: '#fff',
        borderTopWidth: 4,

    },


    dropdownContainerStl: {
        margin: "1.4%",
        marginLeft: '7%',
        justifyContent: 'center',
        flexDirection: "row",
        width: '85%'
    },

    addrContainer: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '15.5%',
        maxWidth: 200
    },
    
})