import React, { useEffect, useState } from "react";
import { TextInput,TouchableOpacity, Button, View, StyleSheet, Image, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../../api/firebase";
import { addDoc, setDoc, collection, doc, getFirestore } from "firebase/firestore";
import  "react-native-gesture-handler";
import { BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK } from "../../../res/drawables";
import { ENTER_EMAIL, ENTER_PASSWORD, ADD_NOTE, INVALID_EMAIL_PASSWORD } from "../../../res/strings";
import ImageButton from "../../components/ImageButton";
import { async } from "@firebase/util";

const Signup = (props) =>{

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const db = getFirestore(app)

    const onSignupPressed = async () =>{
        const auth = getAuth();
        if(email && email.includes('@') && password){
            try{
                const docRef = await setDoc(doc(db, email, `Welcome ${email}`),{
                    title:`Welcome ${email}`,
                    descp: "Welcome to Note Taking App! \n This is your First Note",
                })
                // await setDoc(doc(db,email, `Welcome ${email}`),{
                // //await addDoc(collection(db, email),{
                //     descp: "Welcome to Note Taking App! \n This is your First Note"
                // })
                let res = await createUserWithEmailAndPassword(auth, email, password)
                alert('User Created Successfully')
                props.navigation.goBack()
            }
            catch(e){
                alert(`{There is an error: ${e}}`)
            }
        } else{alert(INVALID_EMAIL_PASSWORD)}
        
    }
    const onAlreadyhaveAccountPressed = () =>{
        props.navigation.goBack()
    }

    useEffect(()=>{
       
    },[])
    
    return(
        <View style= {styles.container}>

            <Image source= {require('../../../assets/erozgaar.png')} 
             style={styles.logo}
            />
            <View style = {{...styles.card, height:'8%'}}>
                <TextInput style={styles.tinput}
                    placeholder= {ENTER_EMAIL}
                    value={email}
                    onChangeText= {(t)=> {setEmail(t.toLowerCase())}}
                />
            </View>

            <View style = {{... styles.card, height:'8%'}}>
            <TextInput style={styles.tinput}
                    placeholder= {ENTER_PASSWORD}
                    secureTextEntry={true}
                    onChangeText= {(t) => {setPassword(t)}}
                />
            </View>
            <View style={styles.btn}>
                <Button title={"Signup"}
                value={password}
                    onPress={()=> {onSignupPressed()}}/>
            </View>

            <TouchableOpacity onPress={()=> {onAlreadyhaveAccountPressed()}}>
                <Text
                    style = {styles.txt}
                > Already Have an Account</Text>
            </TouchableOpacity>
            
           
    </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BACKGROUND_COLOR,
        justifyContent:'center'

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
        textAlignVertical:'center',
        textAlign:'center',
        color: COLOR_BLACK,
    },
    btn:{
        margin:5,
        marginTop:10,
        width:'40%',
        alignSelf:'center',
        fontSize:'lower',
    },
    logo:{
        height:140,
        width:200,
        alignSelf:'center',
        marginBottom:30,
    },
    txt:{
        textAlign:"center",
        marginTop:10,
        color:'blue'
    }
})
export default Signup