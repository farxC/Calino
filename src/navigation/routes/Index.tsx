import { NavigationContainer } from "@react-navigation/native";

import { RootStack } from "./RootStack";

export default function Navigator(){
    return(
        <NavigationContainer>
           <RootStack/>
        </NavigationContainer>
    )
}