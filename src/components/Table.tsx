import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text } from "react-native";
import {Table, Row, Rows, TableWrapper, Cell} from "react-native-reanimated-table";
import { useEffect, useState } from "react";

interface Props {}

type CastratedChoices = {
    "CASTRADO" : number;
    "NÃO CASTRADO": number;
}

type TableDataType = {
 "CANINO (CACHORRO)": CastratedChoices;
  "FELINO (GATO)": CastratedChoices;
}
    
export const AnimalTable: React.FC<Props> = () => {

    const [count, setCount] = useState(0)

    // Header items for the table;
    const head =[
        "ANIMAL",
        "CASTRADO",
        "NÃO CASTRADO",
    ]

    useEffect(() =>

            console.log(Object.entries(tableData).map(([key, value]) => (`Chave ${key} Valores ${value["CASTRADO"]} ${value["NÃO CASTRADO"]}`)  ))
        
    )

    const [tableData,setTableData] = useState<TableDataType>(
       {
        "CANINO (CACHORRO)": {"CASTRADO": 0, "NÃO CASTRADO":1 },
        "FELINO (GATO)": {"CASTRADO":0, "NÃO CASTRADO": 1}
       }
    )
    const countPets = (key: string) =>{
        setCount(count + 1)
       
    }
   
    const selectElement =  (key: string) => (
        
        <TouchableOpacity style={{justifyContent: 'center', alignSelf: 'center', backgroundColor: "black", padding:10, borderRadius: 10}} onPress={() => countPets(key)}>
            <Text>{count}</Text>
        </TouchableOpacity>
    )

    
    
    return (
        <View style={tableStyles.container}>
            <Table style={{backgroundColor: '#D32F2F',borderRadius:15,elevation: 15, borderWidth: 2}} borderStyle={{borderColor:'#fff'}}>
                {/* Header Row */}
                <Row 
                style={tableStyles.head}
                textStyle={tableStyles.textHead}
                 data={head}
                />
                
                
                
                {Object.entries(tableData).map(([key, value]) =>(
                    <TableWrapper key={key} style={[tableStyles.textData, tableStyles.row]}>
                        <Cell data={key} textStyle={tableStyles.textData}/>
                        <Cell data={selectElement(key)} textStyle={tableStyles.textData} />
                        <Cell data={selectElement(key)} textStyle={tableStyles.textData} />
                    </TableWrapper>
                ))}

              
            
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