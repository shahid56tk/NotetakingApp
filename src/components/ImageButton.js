import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const ImageButton = (props) =>{
   return(
    <TouchableOpacity onPress={props.onPress}>
        <Image
            style ={{...styles.addImg, ...props.style}}
            source={props.source}
        />
    </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
    addImg:{
        //backgroundColor:'pink',
        //borderRadius:37.5
    }

})

export default ImageButton
