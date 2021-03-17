import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ApiUtils from '../utils/ApiUtils'
import NetInfo from '@react-native-community/netinfo';

export default class AstroidList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asteroidDertails: '',
        };
    }

    async componentDidMount() {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected == true) {
                let asteroidId = this.props.asteroidId
                let url = "https://api.nasa.gov/neo/rest/v1/neo/" + asteroidId + "?api_key=BG719MOYUhKMbrkVJ1CqtlMnt5BBMw9pml95oiab"
                let response = await ApiUtils.get(url)
                console.log("response :: ", response)
                if (response != null && response != undefined) {
                    this.setState({ asteroidDertails: response })
                } else {
                    alert('No data found')
                }
            } else {
                alert("No internet connection");
            }
        });
    }

    render() {
        const { asteroidDertails, isLoader } = this.state
        return (
            <View style={styles.container}>
                <View style={{ height: 64, padding: 10, width: "100%", justifyContent: 'center', marginTop: Platform.OS === 'ios' ? 30 : 0, }} >
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => {
                            this.setState({ asteroidDertails: "" })
                            Actions.pop()
                        }} >
                        <Image
                            source={require('../assets/image/back.png')}
                            style={{ height: 32, width: 32, resizeMode: 'contain' }}
                        />
                    </TouchableHighlight>
                </View>
                {asteroidDertails != "" &&
                    <View style={styles.textViewStyle} >
                        <Text style={styles.textStyle} >{"Name  :  " + asteroidDertails.name}</Text>
                        <Text style={styles.textStyle} >{"Nasa JPL Url  :  " + asteroidDertails.nasa_jpl_url}</Text>
                        <Text style={styles.textStyle} >{"Potentially hazardous asteroid  :  " + asteroidDertails.is_potentially_hazardous_asteroid}</Text>
                    </View>
                }
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    textViewStyle: {
        width: "100%",
        padding: 16
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '800',
    }
})
