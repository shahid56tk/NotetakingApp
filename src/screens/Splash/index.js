import { useLinkProps } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Image } from "react-native"
import { BACKGROUND_COLOR } from '../../../res/drawables'


const Splash = (props) => {
    setTimeout(() =>{
        props.navigation.replace('Login')
    },3000)
    return(
        <View style= {styles.container}>
            <Image source= {require('../../../assets/erozgaar.png')} 
            style={styles.logo}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
    },
    logo:{
        height:180,
        width:240,
    }
})
export default Splash 