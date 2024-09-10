import { StyleSheet, View, Image, Text } from "react-native"
import { KeyboardAvoidingView } from "react-native"

export const Header = () => {
    const logo = require('../components/style/cutlogo_1.png')
    return (
        <View style={headerStyle.headerContainer}>
            <Image style={headerStyle.logo} source={logo}></Image>
        <Text style={headerStyle.headerTxt}>Calino</Text>
    </View>
    )
}


const headerStyle = StyleSheet.create({
    logo:{
        resizeMode:"contain",   
        width:150,
        height:150,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    headerTxt:{
        fontSize: 40,
        color: "#fff",
        fontWeight: 'bold',
        alignSelf:'center',
        top: '30%',
        right:'5%'
    },
    headerContainer:{
        backgroundColor: '#003777',
        marginTop: '-3%',
        
        borderRadius: 19,
        marginBottom: '20%',
        zIndex: 2,
        flexBasis: 140
        
       
    
    },
})