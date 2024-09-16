import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text } from "react-native";
import {Table, Row, Rows, TableWrapper, Cell} from "react-native-reanimated-table";
import { useEffect, useState } from "react";

interface Props {}

type CastratedChoices = {
    "CASTRADO"?: number;
    "NÃO CASTRADO"?: number;
}

type Animals = {
 "CANINO (CACHORRO)"?: CastratedChoices;
  "FELINO (GATO)"?: CastratedChoices;
}
    
export const AnimalTable: React.FC<Props> = () => {

    const [count, setCount] = useState(0)



    // Header items for the table;
    const head =[
        "ANIMAL",
        "CASTRADO",
        "NÃO CASTRADO",
    ]


    const [tableData,setTableData] = useState<Animals>(
       {
        "CANINO (CACHORRO)": {"CASTRADO": 0, "NÃO CASTRADO":1 },
        "FELINO (GATO)": {"CASTRADO":2, "NÃO CASTRADO": 3}
       }
    )



    const countPets = (key: Animals, value: CastratedChoices) =>{
        console.log(key)
        setTableData((prevState) => ({
            ...prevState,
            
        }))
        
    }
   
    const selectElement =  (key: Animals, value: CastratedChoices) => (
        
       
            <TouchableOpacity style={{justifyContent: 'center', alignSelf: 'center', backgroundColor: "black", padding:10, borderRadius: 10}} onPress={() => countPets(key, value)}>
                 <Text>oi</Text>
            </TouchableOpacity>
    )


    const tableObject: [keyof Animals, CastratedChoices][]= Object.entries(tableData) as [keyof Animals, CastratedChoices][]
    
    
    return (
        <View style={tableStyles.container}>
            <Table style={{backgroundColor: '#D32F2F',borderRadius:15,elevation: 15, borderWidth: 2}} borderStyle={{borderColor:'#fff'}}>
                {/* Header Row */}
                <Row 
                style={tableStyles.head}
                textStyle={tableStyles.textHead}
                 data={head}
                />
                
                
                
                {tableObject.map(([key, value]) =>(
                    <TableWrapper key={key} style={[tableStyles.textData, tableStyles.row]}>
                        <Cell data={key} textStyle={tableStyles.textData}/>
                        <Cell data={selectElement(key,value)} textStyle={tableStyles.textData} />
                        <Cell data={selectElement(key,value)} textStyle={tableStyles.textData} />  
                    
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