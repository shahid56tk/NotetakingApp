import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { ADD_BUTTON_IMG, NOTE_IMG ,BACKGROUND_COLOR, DELL_IMG } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";
import { doc, collection, getFirestore, deleteDoc, onSnapshot, query } from "firebase/firestore";
// import {  TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import app from "../../../api/firebase";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { setUserLocation } from "../../components/getLocation";

const navigation = navigation
export default function Main(props) {
    const [noteData, setNoteData] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const db = getFirestore(app)
    const auth = getAuth()
    const email = auth.currentUser.email
    let unsubscribe = null

    setUserLocation(email)


    //useEffect is a Hook which consist two Parameters A function and an array
    // the function will run when the value in the array parameter changes
    // if the array parameter is empty the functio will run every time when any state changes

    const getNotes = async() =>{
        const qry = query(collection(db, email))
        try{
        setLoading(true)
            unsubscribe = onSnapshot(qry, (querySnapshoot) =>{
                let keys = []
                querySnapshoot.forEach((doc) =>{
                    keys.push(doc.data())
                })
                setNoteData(keys)
                setLoading(false)
                //console.log(keys)
                //unsub()
            })
        }
        catch(e){
            alert(e.message)
        }
        // try{
        //     const querySnapshot = await getDocs(collection(db, email));
        //     let key = []
        //     querySnapshot.forEach((doc) => {
        //         key.push(doc.data())
                
        //     })
        //     setNoteData(key)
        //     setLoading(false)
        //     console.log(key)
        // }
        // catch(e){
        //     alert(e.message)
        // }
    }


    useEffect(()=>{
        // loadAllKeyFromAsyncStorage()
        getNotes()
     },[])
   
     
    // const loadAllKeyFromAsyncStorage = async () =>{
    //     try{
    //         let keys = await AsyncStorage.getAllKeys()
    //         setNoteData(keys)
    //         console.log(noteData)
    //     }
    //     catch(e){console.log(e)}
    // }


    // implementation of delete Note 
    const DeleteNote  = (note) =>{
        Alert.alert(
            "Alert!",
            "Do you Want to delete Note?",
            [
              {
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Yes", onPress: async () => {
                setDeleting(true)
                try{
                    await deleteDoc(doc(db, email, note));
                    // AsyncStorage.removeItem(i)
                    alert('Note Deleted!')
                    setDeleting(false)
                    //props.navigation.replace('Main')
                }
                catch(e){
                    console.log(e)
                }
    
              } }
            ]
        )
    }

    // Buttons on Navigation screen for logout and onlineUsers
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style= {{flexDirection:'row'}}>

                <TouchableOpacity onPress={() => props.navigation.navigate("userLocation",{email: email} )}>
                    <Text style= {{color:'blue', marginRight:20}}> Online Users</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onLogoutPressed()}>
                    <Text style= {{color:'blue'}}> Logout</Text>
                </TouchableOpacity>

                </View>
                
                
            ),
            // headerLeft: () => (
            //     <Button onPress={() => onLogoutPressed()} title="Logout" />
                
            // ),
        });
    }, [navigation]);

    const onLogoutPressed = ()=>{
        Alert.alert(
            " ",
            "Do you realy Want to Logout?",
            [{
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
                {   text: "Yes", onPress: () => {
                    unsubscribe()
                    props.navigation.goBack()   }
                }
            ]
        )
    }

    return(
        <View style={styles.container}>
            {loading? 
                <ActivityIndicator
                    size={'large'}
                    style={styles.act}/>: null}
            {deleting? 
                <ActivityIndicator
                    size={'large'}
                    style={styles.act}/>: null}
                
            <View style = {styles.list}>
                <FlatList
                    data = {noteData}
                    numColumns={3}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={() => {props.navigation.navigate('create',{noteTitle:item.title, descprition: item.descp, email: email})}}
                            >
                                <View style={styles.notContiner}>
                                    <Image
                                        style={styles.noteImg}
                                        source={NOTE_IMG}
                                    />
                                    <Text style={styles.noteTxt}>  {item.title}  </Text> 
                                    <TouchableOpacity onPress={() => {DeleteNote(item.title)}}>
                                        <Image
                                            source={DELL_IMG}
                                            style = {styles.delImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor ={(item) => item}
                />
            </View>
            {loading?null:
            <ImageButton
            style ={styles.btn}
            source ={ADD_BUTTON_IMG}
            onPress={()=> {
                //push or replace can be used to detroy current screen
                props.navigation.navigate('create',{    
                    noteTitle:null, email: email})
                }
            }
        />}
            {/* <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} /> */}
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor: BACKGROUND_COLOR,
    },
    btn:{
        position:'absolute',
        bottom:8,
        right:10,
        width:75,
        height:75,
    },
    act:{
        position:'relative',
        width:'100%',
        height:'100%',
        alignSelf:'center',
         backgroundColor:'transparent'
        },
    list:{
        width:'92%',
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center'
    },

    notContiner:{
        marginTop:10,
        backgroundColor:'skyblue',
        borderWidth:1,
        borderRadius:20,
        margin:2,
        width:"90%"
    },
    noteImg:{
        height:90,
        width:90,
        alignSelf:'center',
    },
    noteTxt:{
        alignSelf:'center',
        fontWeight:'bold',
        textAlign:"center",
        width:115,
        height:35,
        color:'blue'

    },
    delImg:{
        width:35,
        height:35,
        alignSelf:'flex-end',
    }
})