import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

//Actions & Action Creators
const ADD_PLACE = 'ADD_PLACE'
const REMOVE_PLACE = 'REMOVE_PLACE'

const GET_WEATHERINFO_STARTED = 'GET_WEATHERINFO_STARTED'
const GET_WEATHERINFO_SUCCESS = 'GET_WEATHERINFO_SUCCESS'
const GET_WEATHERINFO_FAILED = 'GET_WEATHERINFO_FAILED'

export function addPlace(place) {
    return {
        type: ADD_PLACE,
        place
    }
}

export function removePlace(place) {
    return {
        type: REMOVE_PLACE,
        place
    }
}

export function getWeatherInfoStarted() {
    return {
        type: GET_WEATHERINFO_STARTED
    }
}

export function getWeatherInfoSuccess(place) {
    console.log('get weatherinfo success called')
    return {
        type: GET_WEATHERINFO_SUCCESS,
        place
    }
}

export function getWeatherInfoFailed(error) {
    return {
        type: GET_WEATHERINFO_FAILED,
        error
    }
}

export function getWeatherInfo(zipCode) {
    console.log('calling api')
    return (dispatch) => {
        dispatch(getWeatherInfoStarted())

        let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=6644e680d2025e3820e93d0f13adb2ff`;

        fetch(url)
            .then(response => response.json())
            .then(weatherInfo => {
                console.log(JSON.stringify(weatherInfo))
                let tempFarnheit = Math.round(9 / 5 * (weatherInfo.main.temp - 273) + 32);
                let place = {
                    area: weatherInfo.name,
                    description: weatherInfo.weather[0].description,
                    temparature: tempFarnheit
                }
                console.log(JSON.stringify(place))
                dispatch(addPlace(place));
            })
            .catch((err) => {
                dispatch(getWeatherInfoFailed(err));
            })

    }
}

//Reducer
const places = (state = [], action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case ADD_PLACE:
            return [
                ...state,
                {
                    id:state.length+1,
                    ...action.place
                }
            ]
        case REMOVE_PLACE:
            return state.map((currentPlace) => {
                return currentPlace.id != action.place.id
            })
        default:
            return state;
    }
}

const weatherInfo = (state = {
    loading: false,
    error: false,
    place: {
        area: '',
        description: '',
        temparature: ''
    }
}, action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case GET_WEATHERINFO_STARTED:
            return {
                loading: true,
                error: false,
                place: {
                    area: '',
                    description: '',
                    temparature: ''
                }
            }
        case GET_WEATHERINFO_SUCCESS:
            return {
                loading: false,
                error: false,
                place: {
                    ...action.place,
                    id:state.length+1
                }
            }
        case GET_WEATHERINFO_FAILED:
            return {
                loading: false,
                error: true,
                place: {
                    area: '',
                    description: '',
                    temparature: ''
                }
            }
        default:
            return state;
    }
}

var rootReducer = combineReducers({ places, weatherInfo });
//Store
export const store = createStore(rootReducer, applyMiddleware(thunk));