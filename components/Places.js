import React, { Component } from 'react'

import {
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';

import WeatherCard from './WeatherCard'

const { height }=Dimensions.get("window")

class Places extends Component{
    constructor(props){
        super(props);
        this.state={
            places:props.places,
            screenHeight:0
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            places:newProps.places
        })
    }

    onContentSizeChange=(contentWidth,contentHeight)=>{
        this.setState({ screenHeight: contentHeight });
    }

    render(){
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <ScrollView 
                onContentSizeChange={this.onContentSizeChange} 
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                {
                    this.state.places.map((place,index)=>{
                        return <WeatherCard key={index} place={place}/>
                    })
                }
            </ScrollView>
        )
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
    }
})

export default Places;