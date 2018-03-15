import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import HighscoresTable from '../tables/HighscoresTable'

class Profile extends Component{

    componentDidMount(){
        this.props.getUserById(this.props.match.params.id)
    }

    render(){

        const { currentUserProfile } = this.props

        return (
            <div>
                {   _.isEmpty(currentUserProfile) &&
                    <p>Trwa ładowanie. Proszę czekać...</p>
                }
                {   !_.isEmpty(currentUserProfile) &&
                    <div>
                        <h2 style={styles.headerStyle}>{currentUserProfile.username}</h2>
                        <p style={styles.informationsContainer}>
                            <span style={{ fontSize: '2rem', margin: '0 1rem 0 0'}}>{currentUserProfile.points}</span>
                            punktów w 
                            <span style={{ fontSize: '2rem', margin: '0 1rem 0 1rem'}}>{currentUserProfile.numberOfGames}</span>
                            grach
                        </p>
                        <p style={styles.informationsContainer}>
                            <span style={{ fontSize: '2rem', margin: '0 1rem 0 0'}}>{currentUserProfile.wonDuels}</span>
                            wygranych w
                            <span style={{ fontSize: '2rem', margin: '0 1rem 0 1rem'}}>{currentUserProfile.numberOfDuels}</span>
                            pojedynkach
                        </p>
                        <section>
                            <h2 style={styles.sectionHeader}>Najlepsze wyniki</h2>
                            <HighscoresTable highscores={currentUserProfile.highscores}/>
                        </section>
                        <section>
                            <Link to={`/achievements/${currentUserProfile._id}`} style={{textDecoration: 'none'}}>
                                <h2 style={styles.sectionHeader}>Achievementy</h2>
                            </Link>
                        </section>
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    headerStyle: {
        textAlign: 'center',
        margin: '4rem 0 0 0',
        fontSize: '4rem'
    },
    informationsContainer: {
        textAlign: 'center',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '0.2rem'
    },
    sectionHeader: {
        textAlign: 'center'
    }
}

function mapStateToProps(state){
    return {
        currentUserProfile: state.currentUserProfile
    }
}

export default connect(mapStateToProps, actions)(Profile)