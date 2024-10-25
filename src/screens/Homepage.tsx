import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import { ControlledInput, Input, inputStyles } from "../components/Inputs"
import { Controller, FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, UseControllerProps, useFormContext } from "react-hook-form"
import { Data } from "../navigation/routes/RootStack"
import axios, { Axios } from "axios"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { AnimalTable } from "../components/Table"
import { ControlledDropdown } from "../components/Dropdown"
import { cepMask } from "../components/utils/cepMask"



export const Homepage = () => {

    const { control, handleSubmit, getValues,watch,setValue, formState:{errors} } = useFormContext<Data>();
    const logo = require('../components/style/cutlogo_1.png')

    //In future this future 'll be removed..
    //It's a quick fix to CEP mask issue
    const cepValue = watch("CEP")
    
    useEffect(() => {
        setValue("CEP",cepMask(cepValue))
    }, [cepValue])

    const getCep = async (cep: string) => {
        
        const cepDigits = cep.replace(/\D/g, '');
        

        if (cepDigits) {
            const regValidCep = /^[0-9]{8}$/
            if (regValidCep.test(cepDigits)) {
                console.log('True')
                axios.get(`https://viacep.com.br/ws/${cepDigits}/json/`)
                    .then(response => {
                        setValue("street", response.data["logradouro"])
                        setValue("district",response.data["bairro"])
                    })
                    .catch(error => {
                        return console.log(error)
                    })

            }
        }

    }

    

    const onValidForm: SubmitHandler<Data>= (data) => {
       
        
    }
    const onInvalid: SubmitErrorHandler<Data> = (errors: FieldErrors<Data>) => {
        console.log(errors)
        if(errors.dog && errors.cat){
          return Alert.alert("Nenhum animal contabilizado")
        }
    }


   
    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.container}>

            <Header />
            <View style={style.horizontalLine}></View>
            <ScrollView style={{ flex: 9, backgroundColor: '#003777', borderBottomEndRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 15, marginHorizontal: '4%' }}>

                <ControlledInput rules={{required: '* Insira o nome do tutor'}} fieldName="Tutor" name="name" maxLength={45} icon={"face-man-profile"} placeholder="Digite o nome completo do tutor" control={control} />
                <ControlledInput icon="map-outline" fieldName="CEP" maxLength={9} onBlur={() => getCep(getValues('CEP'))} name="CEP" placeholder="Digite aqui o CEP (opcional)" control={control} />
                <Text style={inputStyles.field}>Bairro</Text>
              
                <ControlledDropdown rules={{required: "*Insira um bairro"}} control={control} name="district"/>
                <ControlledInput rules={{required: "*Insira uma rua"}} icon="garage-variant" name="street" control={control} fieldName="Rua" placeholder="Nome da Rua" maxLength={60}/>
                <View style={style.row}>
                    <ControlledInput rules={{required: '* Insira o número'}} maxLength={5} fieldName="Número" componentContainer={style.addrContainer} control={control} name="number" placeholder="Nº do Endereço"></ControlledInput>
                    <ControlledInput rules={{required: '*Insira o complemento'}} fieldName="Complemento" maxLength={15} componentContainer={style.addrContainer} control={control} name="complement" placeholder="Casa, Apartamento"></ControlledInput>
                </View>
                {/* TO DO: Insert animal table in form */}
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