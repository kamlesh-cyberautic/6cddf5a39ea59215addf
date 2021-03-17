import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableHighlight, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ApiUtils from '../utils/ApiUtils'
import NetInfo from '@react-native-community/netinfo';

export default class AstroidInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asteroidId: 0,
            isEnable: false,
            randomModal: false,
            randomAstroid: '',
            isLoader: false
        };
    }

    onPressSubmit = () => {
        Actions.astroidList({ asteroidId: this.state.asteroidId })
    }

    onPressRandomButton = async () => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected == true) {
                this.setState({ isLoader: true })
                let url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=BG719MOYUhKMbrkVJ1CqtlMnt5BBMw9pml95oiab"
                let response = await ApiUtils.get(url)
                console.log("response :: ", response)
                if (response != null && response != undefined) {
                    this.setState({ randomAstroid: response.near_earth_objects, randomModal: true, isLoader: false })
                }
            } else {
                alert("No internet connection");
            }
        });
    }

    renderModelItem = ({ item, index }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => {
                    this.setState({
                        randomModal: false
                    })
                    Actions.astroidList({ asteroidId: item.id })
                }}
                style={{ width: "100%", flexDirection: 'row', padding: 10, marginTop: 10 }} >

                <Text style={{ width: "100%", marginLeft: 5, fontSize: 14, }} >{item.name}</Text>
            </TouchableHighlight>
        )
    }

    render() {
        const { isEnable, randomAstroid, randomModal, isLoader } = this.state
        return (
            <View style={styles.container}>
                <View style={{ padding: 18, height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                    <TextInput
                        style={styles.inputStyle}
                        paddingLeft={15}
                        underlineColorAndroid={'transparent'}
                        placeholder={"Enter Asteroid ID"}
                        keyboardType={'number-pad'}
                        onChangeText={(asteroidId) => {
                            if (asteroidId.length > 0) {
                                this.setState({ isEnable: true, asteroidId: asteroidId })
                            } else {
                                this.setState({ isEnable: false, asteroidId: 0 })
                            }
                        }} />
                    <TouchableHighlight
                        disabled={!isEnable}
                        underlayColor={'transparent'}
                        style={[styles.buttonStyle, { opacity: isEnable ? 1 : 0.6 }]}
                        onPress={() => this.onPressSubmit()}>
                        <Text style={styles.buttonTextStyle} >{"Submit"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        style={styles.buttonStyle}
                        onPress={() => this.onPressRandomButton()}>
                        <Text style={styles.buttonTextStyle} >{"Random Asteroid"}</Text>
                    </TouchableHighlight>
                </View>


                <Modal
                    animationType="none"
                    transparent={true}
                    visible={randomModal} >
                    <View style={styles.modalContainer}>
                        <View style={{ flex: 1, position: 'absolute', backgroundColor: 'black', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.7 }} />
                        <View style={styles.modalView} >
                            <FlatList
                                style={{}}
                                data={randomAstroid}
                                extraData={this.state}
                                renderItem={this.renderModelItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>
                {isLoader &&
                    <View style={{ height: "100%", width: "100%", position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }} >
                        <ActivityIndicator size={'large'} animating={isLoader} color={'white'} />
                    </View>}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        height: 50,
        width: "100%",
        borderRadius: 8,
        borderWidth: 1,
        borderBottomColor: 'gray'
    },
    buttonStyle: {
        height: 50,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000A0',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonTextStyle: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '800',
        color: 'white'
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
})
