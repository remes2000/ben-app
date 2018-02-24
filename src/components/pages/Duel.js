import React, { Component } from 'react'
import openSocket from 'socket.io-client'

class Duel extends Component{

    componentDidMount(){
        this.socket = openSocket('http://localhost:5000')
    }

    render(){
        return (
            <div>
                <h2>Pojedynkuj się</h2>
            </div>
        )
    }
}

export default Duel