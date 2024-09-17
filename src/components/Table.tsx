import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text } from "react-native";
import {Table, Row, Rows, TableWrapper, Cell} from "react-native-reanimated-table";
import { useEffect, useState } from "react";
import RNPickerSelect, { Item } from 'react-native-picker-select'

interface Props {}

type castrationStatus = {
    "CASTRADO"?: number;
    "NÃO CASTRADO"?: number;
}

type Animals = {
 "CANINO (CACHORRO)"?: castrationStatus;
  "FELINO (GATO)"?: castrationStatus;
}

const listValues = (int: number) =>{
    let valuesArr = []
    for(let i = 0; i <= int; i++){
        valuesArr.push(
            {label: i.toString(), value: i.toString()}
        )
    }
    return valuesArr
}
    
export const AnimalTable: React.FC<Props> = () => {


    const items = listValues(25)
    useEffect(() =>{
       console.log(tableData)
    })

    // Header items for the table;
    const head =[
        "ANIMAL",
        "CASTRADO",
        "NÃO CASTRADO",
    ]


    const [tableData,setTableData] = useState<Animals>(
       {
        "CANINO (CACHORRO)": {"CASTRADO": 0, "NÃO CASTRADO":0 },
        "FELINO (GATO)": {"CASTRADO":0, "NÃO CASTRADO": 0}
       }
    )


    const updateCounterPets = (animalType: keyof Animals, castrationStatus: keyof castrationStatus, value: string) => {

        setTableData(prevData => ({
            ...prevData,
            [animalType]:{
                ...prevData[animalType],
                [castrationStatus]: Number(value)
            }
        }))
    }


    


    const DropdownValues =  (animalType: keyof Animals, castrationStatus: keyof castrationStatus) => {
           
            return(
                <RNPickerSelect
                    onValueChange={(value) => updateCounterPets(animalType, castrationStatus, value)}
                    items={items}
                />
            )
           
    }


   let globalIndex = 0
    
    return (
        <View style={tableStyles.container}>
            <Table style={{backgroundColor: '#D32F2F',borderRadius:15,elevation: 15, borderWidth: 2}} borderStyle={{borderColor:'#fff'}}>
                {/* Header Row */}
                <Row 
                style={tableStyles.head}
                textStyle={tableStyles.textHead}
                 data={head}
                />
                
                
                {Object.entries(tableData).map(([key, value]) =>{
                    return(
                        <TableWrapper key={key} style={[tableStyles.textData, tableStyles.row]}>
                            <Cell data={key} textStyle={tableStyles.textData}/>
                           
                            {/* CASTRADO */}
                            <Cell data={DropdownValues(key as keyof Animals, "CASTRADO")} textStyle={tableStyles.textData} />
                            
                            {/* NÃO CASTRADO */}
                            <Cell data={DropdownValues(key as keyof Animals, "NÃO CASTRADO")} textStyle={tableStyles.textData} />  
                    
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