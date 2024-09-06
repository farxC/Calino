import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef } from "react"
import LottieView from "lottie-react-native"
import { paws_animation } from "../components/style/constants"

export const Homepage = () =>{
    const pawsAnimationRef = useRef<LottieView>(null)
    useEffect(()=> {
        pawsAnimationRef.current?.play();
        console.log(pawsAnimationRef)
    }, []);

    return(
        <SafeAreaView>
            <View style={style.header}>
                <Text style={style.headerTxt} >Calino</Text>
            </View>
            <View>
                <TextInput placeholder="Insira seu nome"></TextInput>

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