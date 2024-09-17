import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { StyleSheet, Text ,TextInput, TextInputProps, TouchableOpacity, View, ViewStyle, StyleProp } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


interface CustomInputProps extends TextInputProps{
    icon?: string;
    componentContainer?: StyleProp<ViewStyle>;
    fieldName: string;
}

export const Input = ({placeholder, fieldName, onChangeText, value, icon,maxLength, onBlur, componentContainer}: CustomInputProps) => {
    
   
    return(
        <View >
            <Text style={inputStyles.field}>{fieldName}</Text>
            <TouchableOpacity style={componentContainer? componentContainer : inputStyles.container}>
                { icon && <Icon color={"#fff"} name={icon} size={30} style={{alignSelf:"center", paddingVertical: "1%", margin: 10}}></Icon>}
                <TextInput multiline={false} maxLength={maxLength} placeholderTextColor={'white'} style={inputStyles.input} onBlur={onBlur} onChangeText={onChangeText} value={value} placeholder={placeholder}></TextInput>
            </TouchableOpacity>
        </View>
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
            <View style={{marginBottom:'1.5%'}}>
              
                <Input onChangeText={field.onChange} value={field.value} {...textInputProps}/>
                {error &&(
                    <Text style={{ color: 'red',fontWeight: "bold", marginRight: '5%', margin:"-1.5%", left: '9%' }}>{error.message}</Text>
                )}
            </View>
         )}
        />
    )
}


export const inputStyles = StyleSheet.create({
    
    container:{
        borderWidth: 2,
        borderRadius: 8,
        margin: "1.4%",
        borderColor: "#fff",
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        width: '85%',
    },
    input:{
        fontSize: 13,
        fontFamily: 'BebasNeue-Regular',
        width: '85%',
        color: '#fff',
        flexGrow: 1,
        opacity: 2   
    },

    field:{
        fontSize: 16,
        color: '#fff',
        marginLeft: '9%',
        fontWeight: 'bold'
    }   
})