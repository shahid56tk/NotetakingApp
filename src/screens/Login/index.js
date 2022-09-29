import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { TextInput,TouchableOpacity, Button, View, StyleSheet, AsyncStorage, Image, Text } from "react-native";
import  "react-native-gesture-handler";
import { async } from "@firebase/util";
import { BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK } from "../../../res/drawables";
import { ENTER_TITLE, ENTER_DESCRIPTION, ADD_NOTE } from "../../../res/strings";
import ImageButton from "../../components/ImageButton";



const Login = (props) =>{

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    const onLoginPressed = () => {
        const auth = getAuth()
        if(email && email.includes('@') && password){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //alert(`You are Signed In as ${email}`)
                setPassword(null)
                props.navigation.navigate('Main')
                //console.log(userCredential)   // user information object
            })
            .catch((e) => {
                alert(e.message)
            })
        }
        else{alert('Please enter your valid Email & Password')}
    }

    const onSignupPressed = () =>{
        props.navigation.navigate('Create Account')
    }
    const onForgetPressed = () =>{
        const auth = getAuth();
        if(email){
            sendPasswordResetEmail(auth, email)
            .then((user) => {
                alert('password reset email sent!')
            })
            .catch((e) => {
                alert(e.message)
            })
        }
        else{alert('Please enter a valid Email Address')}
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
                    placeholder= {"Enter Email"}
                    value={email}
                    onChangeText= {(t)=> {setEmail(t)}}
                />
            </View>

            <View style = {{... styles.card, height:'8%'}}>
            <TextInput style={styles.tinput}
                    placeholder= {"Enter Password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText= {(t) => {setPassword(t)}}
                />
            </View>
            <View style={styles.btn}>
                <Button title={"Login"}
                    onPress={()=> {onLoginPressed()}}/>
            </View>

            <TouchableOpacity onPress={()=> {onSignupPressed()}}>
                <Text
                    style={styles.txt}>
                     Create an Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {onForgetPressed()}}>
                <Text
                    style = {styles.txt}
                > Forget Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {props.navigation.navigate('weather')}}>
                <Text
                    style = {styles.txt}
                > Weather</Text>
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
    },
    txt:{
        textAlign:"center",
        marginTop:10,
        color:'blue'
    }
})
export default Login