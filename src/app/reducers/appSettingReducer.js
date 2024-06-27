import { createSlice } from "@reduxjs/toolkit";

export const appSetting = createSlice({
    name: 'setting',
    initialState: {
        location: {
            country: '',
            timezone: '',
            regionName: '',
            countryCode: ''
        },
        background: {
            style1: {
                BodyImageUrl: 'https://images.pexels.com/photos/421788/pexels-photo-421788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            style2: {
                BodyImageUrl: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style3: {
                BodyImageUrl: 'https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style4: {
                BodyImageUrl: 'https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
        },
        selectedBackgroundImageStyleName: 'style3'
    },
    reducers: {
        setLocation: (state, actions) => {
            state.location.country = actions.payload.country
            state.location.timezone = actions.payload.timezone
            state.location.regionName = actions.payload.regionName
            state.location.countryCode = actions.payload.countryCode
        },
        changeSelectedBackgroundImageStyleName: (state, actions) => {
            state.selectedBackgroundImageStyleName = actions.payload
        }
    }
})

export const { setLocation, changeSelectedBackgroundImageStyleName } = appSetting.actions;

export default appSetting.reducer;