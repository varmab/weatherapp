import React, { Component } from 'react'

import {
    FlatList,
    StyleSheet
} from 'react-native';

import WeatherCard from './WeatherCard'

import { store } from '../redux_weather'

class PlacesFlatlist extends Component{
    constructor(props){
        super(props);
        this.state={
            places:[]
        }

        store.subscribe(()=>{
            var state=store.getState();
            this.setState({
                places:state.places
            })
        })
    }

    render(){
        return(
            <FlatList
                data={this.state.places}
                extraData={this.state}
                renderItem={(item)=>{
                    return <WeatherCard place={item}/>
                }}
                keyExtractor={(item) => {
                    return item.id.toString();
                }}
            />
        )
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
    }
})

export default PlacesFlatlist;