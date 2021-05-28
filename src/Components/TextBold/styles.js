import { StyleSheet } from "react-native";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import {Fonts} from '../../assets/fonts'
import {
    defaultColor
} from '../../../config.json'
export default style = StyleSheet.create({
    text:{
        fontSize:2.5*vh,
        fontFamily:Fonts.BB,
        color:defaultColor
    }
})