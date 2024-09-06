import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { TextInputProps, View } from "react-native"


interface customInputProps extends TextInputProps{

}

export const Input = <Formtype extends FieldValues>({
    control,
    name,
    rules,
    ...textInputProps}: UseControllerProps<Formtype> & customInputProps) => {
    return(
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState:{error}}) =>(
            <View>

            </View>
         )}
        />
    )
}