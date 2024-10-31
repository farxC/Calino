import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text, Keyboard } from "react-native";
import {Table, Row, Rows, TableWrapper, Cell} from "react-native-reanimated-table";
import { useEffect, useState } from "react";
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { Controller, FieldValues, Path, UseControllerProps } from "react-hook-form";


type castrationStatus = {
    "CASTRADO"?: number;
    "NÃO CASTRADO"?: number;
}

type Animals = {
 "CANINO (CACHORRO)"?: castrationStatus;
  "FELINO (GATO)"?: castrationStatus;
}


export const AnimalTable =<FormType extends FieldValues> ({
        control,
        name,
        rules,
    }: UseControllerProps<FormType>) => {
    
    const listValues = (int: number) =>{
        let valuesArr = []
        for(let i = 1; i <= int; i++){
            valuesArr.push(
                {label: i.toString(), value: i.toString()}
            )
        }
        return valuesArr
    }
        
    // Header items for the table;
    const head =[
        "ANIMAL",
        "CASTRADO",
        "NÃO CASTRADO",
    ]


    const tableData = {
        "CANINHO (CACHORRO)": '.dog',
        "FELINO (GATO)": '.cat'
    }
 


    const DropdownValues =<FormType extends FieldValues>({
        control,
        rules,
        name,
    }: UseControllerProps<FormType>) => {
            const items = listValues(25)

            return(
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({field, fieldState:{error}}) => (
                        <RNPickerSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        items={items}
                        />
                    )}
                />
                
            )
           
    }

    
    return (
        <View style={tableStyles.container}>
            <Table style={{backgroundColor: '#D32F2F',borderRadius:15,elevation: 15, borderWidth: 2}} borderStyle={{borderColor:'#fff'}}>
                {/* Header Row */}
                <Row 
                style={tableStyles.head}
                textStyle={tableStyles.textHead}
                 data={head}
                />
                
                {Object.entries(tableData).map(([key, value]) => {
                    return(
                        <TableWrapper key={key} style={[tableStyles.textData, tableStyles.row]} >
                            <Cell data={key} textStyle={tableStyles.textData}/>

                            {/* Castrado */}
                            <Cell data={DropdownValues({control, name:`${name+value}.castrated` as Path<FormType>})} textStyle={tableStyles.textData}/>
                            
                            {/* Não Castrado */}
                            <Cell data={DropdownValues({control, name: `${name+value}.nonCastrated` as Path<FormType>})} textStyle={tableStyles.textData}/>
                        </TableWrapper>
                    )
                })}
                
               

             </Table>
        </View>
        
    )
}


const tableStyles = StyleSheet.create({
    
    container:{
        flex: 1,
        padding:'3%',
        marginBottom: '4%',
        paddingTop:"4.5%",
        justifyContent: 'center',
        
        
    },
    head: {
        height: 60,
    },
    textHead:{
        margin: 6,
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textData:{
        margin: 8,
        color: "#fff",
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 800
    },
    row:{
        flexDirection: 'row',
        padding: 4
    }
})