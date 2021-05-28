import React from 'react'
import {
    Text,
    View
} from 'react-native'
import TextMedium from '../TextMedium'
import styles from './styles'
import TouchableHOC from '../../Components/TouchableHOC'


export default Button = (props) => {
    return(
        <TouchableHOC style={[styles.container,props.btnContainer]} onPress={props.onPress}>
                  <TextMedium style={[styles.label,props.labelStyle]}>{props.title}</TextMedium>
              </TouchableHOC>
    )
}