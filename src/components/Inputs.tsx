import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { StyleSheet, Text ,TextInput, TextInputProps, TouchableOpacity, View, ViewStyle, StyleProp } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


interface CustomInputProps extends TextInputProps{
    icon?: string;
    stylesContainer?: StyleProp<ViewStyle>
}

export const Input = ({placeholder, onChangeText, value, icon, onBlur, stylesContainer}: CustomInputProps) => {
    
   
    return(
        <TouchableOpacity style={stylesContainer? stylesContainer : inputStyles.container}>
             { icon && <Icon color={"#ad7402"} name={icon} size={30} style={{alignSelf:"center", paddingVertical: "1%"}}></Icon>}
            <TextInput style={inputStyles.input} onBlur={onBlur} onChangeText={onChangeText} value={value} placeholder={placeholder}></TextInput>
        </TouchableOpacity>
    )
}

export const ControlledInput = <Formtype extends FieldValues>({
    control,
    name,
    rules,
    ...textInputProps}: UseControllerProps<Formtype> & CustomInputProps) => {
    return(
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState:{error}}) =>(
            <View>
                {error &&(
                    <Text style={{ color: 'red', marginLeft: '8%', margin:"-1.5%" }}>{error.message}</Text>
                )}
                <Input onChangeText={field.onChange} value={field.value} {...textInputProps}/>
            </View>
         )}
        />
    )
}


const inputStyles = StyleSheet.create({
    
    container:{
        borderWidth: 2,
        borderRadius: 8,
        margin: "1.4%",
        borderColor: "#964b00",
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        width: '85%',
    },
    input:{
        fontSize: 16,
        fontWeight: "800",
        textAlign: "center",
        width: "80%",
    }
})