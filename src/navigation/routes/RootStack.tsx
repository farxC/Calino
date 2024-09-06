import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Homepage } from "../../screens/Homepage";
import { Data } from "../../screens/Data";
import { ScreenProps } from "react-native-screens";

type AppStackParamList = {
    Homepage: undefined
    Data: undefined
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

const configs = {
    headerShown: true,
}

//Before creating the form and inform the due context please read this: https://levelup.gitconnected.com/react-native-next-level-form-handling-25847b05191e

export const RootStack = () => (
    <AppStack.Navigator screenOptions={configs} initialRouteName="Homepage">
        <AppStack.Screen name="Homepage" component={Homepage}/>
        <AppStack.Screen name="Data" component={Data}></AppStack.Screen>
    </AppStack.Navigator>
)