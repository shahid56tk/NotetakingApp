import React, { useEffect, useState } from "react";
import { getFirestore, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import app from '../../../api/firebase'
import { TextInput, Button, View, StyleSheet, ActivityIndicator } from "react-native";
import { BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK } from "../../../res/drawables";
import { ENTER_TITLE, ENTER_DESCRIPTION, ADD_NOTE } from "../../../res/strings";
//import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";

const CreateNote = (props) =>{
    let {noteTitle, email, descprition} = props.route.params
    const db = getFirestore(app)
    //const auth = getAuth()
    const [title, setTitle] = useState(noteTitle)
    const [descp, setDescp] = useState(descprition)
    const [loading, setLoading] = useState(false)
    //const {email} = auth.currentUser

    const loadData = () =>{
        // try{
        //     if(noteTitle){
        //         const docRef = doc(db, email, noteTitle)
        //         const docSnap = await getDoc(docRef)
        //         if (docSnap.exists()) {
        //             const mydescp = docSnap.data()
        //             setDescp(mydescp.descp)
        //             setTitle(noteTitle)
        //           } else {
        //             console.log("No Data!");
        //           }
                 
        //         let descp = await AsyncStorage.getItem(noteTitle)
        //     }
        // }
        // catch(e){console.log(e)}
    }

    useEffect(()=>{
        // loadData()
    },[])

    const onAddPressed = async () =>{
        setLoading(true)
        //console.log(email)
        if(title!=null && descp !=null){
            try{
                // await setDoc(doc(db,email, title),{
                //     descp: descp,
                // })
                const docRef = await setDoc(doc(db, email, title),{
                    title:title,
                    descp: descp,
                })
                alert('Note Saved Successfully')
                props.navigation.goBack()
                setLoading(false)
                //props.navigation.replace('Main')
                // const docRef = await addDoc(collection(db, "Notes"), {
                //     title: title,
                //     descp: descp,
                //   });
                //   console.log("Document written with ID: ", docRef.id);
    

                // const value = await AsyncStorage.getItem(title)
                // if(value && !noteTitle){
                //     alert('Title already exist!')
                // }
                // else{
                //     await AsyncStorage.setItem(title, descp)
                //     alert('Note Saved Successfully')
                //     props.navigation.replace('Main')
                // }
            }
            catch(e){ alert(e.message)}
        } else { alert('Please Enter Title and Description') }
    }
    return(
        <View style= {styles.container}>
            {loading? <ActivityIndicator
                size={'large'}
                style={styles.act_indicator}
            />: null}
            <View style = {{...styles.card, height:'8%'}}>
                <TextInput style={styles.tinput}
                    placeholder= {ENTER_TITLE}
                    value={title}
                    editable={!noteTitle}
                    onChangeText= {(t)=> {setTitle(t)}}
                />
            </View>

            <View style = {{... styles.card, height:'70%'}}>
            <TextInput style={styles.tinput}
                    placeholder= {ENTER_DESCRIPTION}
                    multiline ={ true}
                    value={descp}
                    onChangeText= {(t) => {setDescp(t)}}
                />
            </View>
            <View style={styles.btn}>
                <Button title={noteTitle? 'Update Note':ADD_NOTE}
                    onPress={()=> {onAddPressed()}}/>
            </View>
            {/* <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                 /> */}
    </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BACKGROUND_COLOR,
    },
    act_indicator:{
        position:'relative',
        width:'100%',
        height:'100%',
        alignSelf:'center',
    },
    card:{
        backgroundColor: COLOR_WHITE,
        borderRadius:20,
        margin:10,
        shadowColor: COLOR_BLACK,
        borderWidth:0.5,
        borderColor:COLOR_BLACK,
        elevation:10
    },
    tinput:{
        marginRight:10,
        marginLeft:10,
        height:'100%',
        textAlignVertical:'top',
        color: COLOR_BLACK,
        paddingTop:10
    },
    btn:{
        margin:130,
        marginTop:10,
    }
})
export default CreateNote