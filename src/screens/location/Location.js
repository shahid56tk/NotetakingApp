import React, { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { Text, View, StyleSheet, Dimensions  } from "react-native";
import { BACKGROUND_COLOR } from "../../../res/drawables";
import { async } from "@firebase/util";
import MapView, {Marker} from "react-native-maps";

const LocationApp = (props) =>{
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
   
    useEffect(() =>{

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied')
              console.log(errorMsg)
              return;
            }
      
            // let location = await Location.getCurrentPositionAsync({})
            // setLocation(location);
            //console.log(location)
            Location.watchPositionAsync({
                enableHighAccuracy:true,
                timeInterval:2000,
            }, (location) => {
                console.log(location)
                setLocation(location)
            })
          })()

    },[])

    

    return(
        <View style = {styles.container}>
            {console.log(location)}
            {location?<MapView
                style= {styles.map}
                showsUserLocation = {true}
                showsMyLocationButton= {true}
                zoomControlEnabled = {true}
                minZoomLevel= {.1}

                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta:0.2,
                    longitudeDelta:0.2,
                }}
            >
                <Marker 
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={'I am Here!'}
                    description = {'This is my current location!'}
                />
                <Marker 
                    coordinate={{
                        latitude: 30.7221,
                        longitude: 72.6446,
                    }}
                    title={'My City!'}
                    description = {'This is my current city'}
                />
            </MapView>:null}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',

    },
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-30,
        marginTop:75,
        marginBottom:110
    }
})

export default LocationApp

