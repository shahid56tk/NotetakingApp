import React, { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { Dimensions  } from "react-native"
//import { async } from "@firebase/util";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../../api/firebase";
import { LOCATION_DB } from "../../res/strings";

export const setUserLocation = async( email)=>{
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const db = getFirestore(app)

    useEffect(() =>{
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied')
              console.log(errorMsg)
              return;
            }
      
            Location.watchPositionAsync({
                enableHighAccuracy:true,
                timeInterval:1000,
            }, (location) => {
                setLocation(location)
            })
            
        })()
        
    },[])

    //location? console.log(location.coords.latitude):null
    if(location && email){

        console.log(location.coords.latitude)
        console.log(location.coords.longitude)
        const docRef = await setDoc(doc(db, LOCATION_DB, email),{
            email: email,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        console.log("location updated!")
    }

    //console.log(location.coords.latitude)
    // console.log(location.coords.longitude)

}