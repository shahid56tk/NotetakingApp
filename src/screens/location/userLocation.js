import React, { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity  } from "react-native";
import { BACKGROUND_COLOR } from "../../../res/drawables";
import { async } from "@firebase/util";
import app from "../../../api/firebase";
import MapView, {Marker} from "react-native-maps";
import { doc, collection, getFirestore, deleteDoc, onSnapshot, query } from "firebase/firestore";
import { LOCATION_DB } from "../../../res/strings";

const UsersLocation = (props) =>{
    const [location, setLocation] = useState(null)
    const db = getFirestore(app)

    //console.log(props.route.params.email)

    const getLoc = async () =>{
        const qry = query(collection(db, LOCATION_DB))
        try{
            onSnapshot(qry, (querySnapshoot) =>{
                let keys = []
                querySnapshoot.forEach((doc) =>{
                    keys.push(doc.data())
                })
                setLocation(keys)
            })
        }catch(e){console.log(e.message)}
    }
   
    useEffect(() =>{
        getLoc()

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
                    latitude: 30.7512,
                        longitude: 72.5863,
                    latitudeDelta:0.2,
                    longitudeDelta:0.2,
                }}
            >
                 {location!= null && location.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                }}
                title = { marker.email }
            >
                {/* <MapView.Callout>
                <View>
                    <Text>{marker.email}</Text>
                    <TouchableOpacity onPress={()=> alert(marker.email)}> 
                        <Text> Shahid</Text>
                    </TouchableOpacity>
                </View>
              </MapView.Callout> */}
            </MapView.Marker>
        ))
 }
                {/* <Marker 
                    coordinate={{
                        latitude: 30.7512,
                        longitude: 72.5863,
                    }}
                    title={'I am Here!'}
                    description = {'This is my current location!'}
                />
                <Marker 
                    coordinate={{
                        latitude: 30.7118,
                        longitude: 72.6545,
                    }}
                    title={'My City!'}
                    description = {'This is my current city'}
                /> */}
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

export default UsersLocation

