import React, { Component } from 'react'

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';

import Zipcode from '../components/Zipcode';
//import Places from '../components/Places'
import PlacesFlatlist from '../components/PlacesFlatlist'

class WeatherNow extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Weather Now</Text>
                </View>
                <View style={styles.zipCodeView}>
                    <Zipcode/>
                </View>
                <View style={styles.placesView}>
                    <PlacesFlatlist/>
                </View>
            </SafeAreaView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: "#EA4C89",
        width: "100%"
    },
    titleView:{
        flex:0.5,
        marginTop:30,
        marginBottom:10,
        alignItems:"center"
    },
    titleText:{
        fontSize:40,
        color:"white",
        fontWeight:"bold"
    },  
    zipCodeView:{
        flex:2
    },
    progressView:{
        flex:0.5
    },
    placesView:{
        flex:7
    }
})

export default WeatherNow;