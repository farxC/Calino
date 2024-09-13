import { StyleSheet, View, Image, Text } from "react-native"
import { KeyboardAvoidingView } from "react-native"

export const Header = () => {
    const logo = require('../components/style/cutlogo_1.png')
    return (
    <View style={headerStyle.headerContainer}>
            <Image style={headerStyle.logo} source={logo}></Image>
            <Text style={headerStyle.headerTxt}>CENSO PET</Text>

    </View>
    )
}


const headerStyle = StyleSheet.create({
    headerTxt:{
        fontSize: 40,
        color: "#fff",
        fontWeight: 'bold',
        alignSelf:'center',
        top: '50%',
       
    },
    headerContainer:{
        backgroundColor: '#003777',
        marginTop: '-15%',
        borderRadius: 19,
        marginBottom: '7.5%',
        zIndex: 2,
        flexBasis: 130,
        flexDirection: 'column',
        
    },
    logo: {
        resizeMode: "contain",
        width: 100,
        height: 100,
        position: 'absolute',
        top: '30%',
    },
})