import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BACKGROUND_COLOR } from "../../../res/drawables";
import { async } from "@firebase/util";

const Weather = (props) =>{
    const [text, setText] = useState('weather')
    const getWeather = async () =>{
        let w = await axios.get('http://api.weatherapi.com/v1/current.json?key=d8f02502f7304ab98bb05420222009&q=Kamalia&aqi=no')
        console.log("Current Temprature " +w.data.current.temp_c)
        console.log("Humidity " +w.data.current.humidity)
        console.log("Wind Speed " +w.data.current.wind_kph)
        setText(w.data.current.temp_c)
    }

    useEffect(() =>{
        getWeather()
    },[])
    return(
        <View style = {styles.container}>
            <Text> Current temprature is:  {text} C  </Text>

            <TouchableOpacity onPress={()=>{ props.navigation.navigate('location')}}
                style={styles.touchAble}
            >
                <Text style= {{color:'blue'}}>Location</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',

    },
    touchAble:{
        color:'blue',
        marginTop:50,
    }
})

export default Weather

