import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Homepage } from "../../screens/Homepage";
import { Data } from "../../screens/Data";
import { ScreenProps } from "react-native-screens";
import { FormProvider, useForm } from "react-hook-form";

type DataAnimalStatus = {
    castrated?: number;
    nonCastrated?: number;
}

export type DataAnimals = {cat: DataAnimalStatus} | {dog: DataAnimalStatus};

export interface Data {
    name: string;
    district: string;
    number: string;
    CEP: string;
    complement: string;
    street: string;
    DataAnimals: DataAnimals
}

type AppStackParamList = {
    Homepage: undefined
    Data: undefined
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

const configs = {
    headerShown: false,
}

//Before creating the form and inform the due context please read this: https://levelup.gitconnected.com/react-native-next-level-form-handling-25847b05191e




export const RootStack = () => {

    const methods = useForm<Data>({
        defaultValues:{
            name: '',
            number: '',
            CEP: '',
            DataAnimals:{
                cat:{
                    castrated: undefined,
                    nonCastrated: undefined,
                },
                dog:{
                    castrated: undefined,
                    nonCastrated: undefined,
                },
            },
            district: ''

        }
    })
    

    return(
        <FormProvider {...methods}>
            <AppStack.Navigator screenOptions={configs} initialRouteName="Homepage">
                <AppStack.Screen name="Homepage" component={Homepage}/>
                <AppStack.Screen name="Data" component={Data}></AppStack.Screen>
            </AppStack.Navigator>
        </FormProvider>
    )
   
}