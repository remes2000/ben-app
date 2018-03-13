import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import _ from 'lodash'
import {Card, CardMedia, CardTitle } from 'material-ui/Card';

import duelAchievement from '../../svg/duelAchievement.svg'
import pointsAchievement from '../../svg/pointsAchivement.svg'

class Achievements extends Component{

    getAchievementTitle = achievement => {
        switch(achievement.restrictionField){
            case 'wonDuels':
                return `Wygrana ${achievement.than} ${achievement.than === 1?'pojedynku':'pojedynków'}.`
            case 'points':
                return `Zdobycie ${achievement.than} punktów.`
            default:
                return ''
        }
    }

    getAchievementSvg = achievement => {
        switch(achievement.restrictionField){
            case 'wonDuels':
                return duelAchievement
            case 'points':
                return pointsAchievement
            default: 
                return null
        }
    }

    componentDidMount(){
        this.props.getAvaliableAchievements()
        this.props.getUserById(this.props.match.params.id)
    }

    renderAchievement = achievement => {

        let userAchievements
        if(this.props.currentUserProfile && this.props.currentUserProfile.achievements)
            userAchievements=this.props.currentUserProfile.achievements
        
        return (
            <li key={achievement._id} style={{ margin: '1rem', width: '16rem', textAlign: 'center'}}> 
                <Card style={ userAchievements && userAchievements.includes(achievement._id)?styles.achievementGet:styles.achievementCard }>
                    <CardMedia>
                        <img src={this.getAchievementSvg(achievement)} alt="achievementPicture"/>
                    </CardMedia>
                    <CardTitle title={this.getAchievementTitle(achievement)} />
                </Card>
            </li>
        )
    }

    render(){

        const { avaliableAchievements, currentUserProfile } = this.props

        return (
            <div>
                { _.isEmpty(avaliableAchievements) &&
                    <p>Loading...</p>
                }
                { !_.isEmpty(avaliableAchievements) &&
                    <div>
                        <h2 style={{ textAlign: 'center', fontSize: '3rem'}}>{currentUserProfile.username}</h2>
                    <ul style={styles.achievementsList}>
                        { avaliableAchievements.map( achievement => this.renderAchievement(achievement) ) }    
                    </ul>
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    achievementsList: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    achievementCard: {
        opacity: '0.2',
        padding: '1rem'
    },
    achievementGet: {
        padding: '1rem',
        opacity: 1
    }
}

function mapStateToProps(state){
    return {
        avaliableAchievements: state.avaliableAchievements,
        currentUserProfile: state.currentUserProfile
    }
}

export default connect(mapStateToProps, actions)(Achievements)