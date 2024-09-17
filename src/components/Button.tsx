import { Dimensions, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ColorValue } from "react-native";
import { ButtonProps, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


interface CustomButtonProps extends ButtonProps{
    iconName: string ;
    iconColor?: ColorValue | number ;
    containerStyle?: StyleProp<ViewStyle>;
}

export const Button = ({title, iconName,iconColor, onPress, containerStyle}: CustomButtonProps) => {

    return (
        <TouchableOpacity style={btnStl.container} onPress={onPress}>
           <Icon color={iconColor} size={28} name={iconName}/>
           {title && (
                <Text style={{fontSize: 15, color: '#000', fontWeight: 'bold'}}>{title}</Text>
           )}
        </TouchableOpacity>
    )
}


const btnStl = StyleSheet.create({
    container:{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height ),
        width: Dimensions.get('window').width * 0.33,
        height: Dimensions.get('window').width * 0.13,
        backgroundColor: '#fff7f7',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#c4c4c4',
        alignSelf: 'center',
        elevation: 10
        
        
    }
})