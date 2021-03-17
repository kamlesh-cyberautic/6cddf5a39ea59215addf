import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { AstroidInput, AstroidList } from '../container'


export default class Route extends Component {

    render() {
        return (
            <Router >
                <Scene
                    key="root"
                    hideNavBar="hideNavBar"
                    hideTabBar="hideTabBar"
                    panHandlers={null} // for disable swiping back in IOS
                    duration={0} // to avoid sliding animation on IOS
                    animationEnabled={true}>
                    <Scene key="astroidInput" hideNavBar="hideNavBar" component={AstroidInput} initial={true} />
                    <Scene key="astroidList" hideNavBar="hideNavBar" component={AstroidList} />
                </Scene>
            </Router>
        );
    }
}


