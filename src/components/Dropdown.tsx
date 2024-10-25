import { useState } from "react";
import { FieldValues, UseControllerProps, Controller, ControllerRenderProps, Path } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, StyleSheet } from "react-native";

type DropdownProps = {
    value: string
}

export const ControlledDropdown = <FormType extends FieldValues>({
    control,
    name,
    rules,
    ...props
    }: UseControllerProps<FormType>) => {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null)
        const [items, setItems] = useState([
            { label: 'Jardim Progresso', value: 'Jardim Progresso' }
        ]);
        return(
            <Controller
             control={control}
             name={name}
            
             rules={rules}
             render={({field, fieldState: {error}}) => (
                <View style={{marginBottom: '1.5%'}}>
                    <DropDownPicker 
                   
                    listMode="SCROLLVIEW" 
                    theme="DARK" 
                    textStyle={{ fontSize: 16,color:"#fff", fontWeight: 500, textAlign: "center", width: "80%", }}
                    containerStyle={style.dropdownContainerStl}
                    open={open}
                    value={value || field.value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue || field.onChange}
                    setItems={setItems}
                    searchable={true}
    
                    placeholder="Escolha um Bairro"/>
                     {error &&(
                    <Text style={{ color: 'red',fontWeight: "bold", marginRight: '5%', margin:"-1.5%", left: '9%' }}>{error.message}</Text>
                      )}
                </View>
             )}
            />
        )
    }


const style = StyleSheet.create({
    dropdownContainerStl: {
        margin: "1.4%",
        marginLeft: '7%',
        justifyContent: 'center',
        flexDirection: "row",
        width: '85%'
    },

})