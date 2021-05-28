import { StyleSheet } from 'react-native'
import vw from '../../Units/vw'
import vh from '../../Units/vh'
import { Fonts } from '../../assets/fonts'
import {
    default_font_Color
} from '../../../config.json'
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10000
    },

    mainBox: {
        flex: 1,
        minHeight: 100 * vh,
        // paddingTop: 10 * vh,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headingTxt: {
        color: '#fff',
        fontSize: 10 * vw,
        fontFamily: Fonts.MB,
        paddingTop: 0 * vh,
        textAlign: 'center',
    },
    mainTxt: {
        color: '#fff',
        fontSize: 4 * vw,
        fontFamily: Fonts.KM,
        paddingVertical: 1 * vh,
        paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    pointsMain: {
        marginVertical: 5 * vh,
        justifyContent: 'center',
    },
    earndTxt: {
        color: '#FEBE10',
        fontSize: 4 * vw,
        fontFamily: Fonts.BM,
        // paddingVertical: 1 * vh,
        // paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    pointsCircle: {
        width: 18 * vw,
        height: 18 * vw,
        backgroundColor: '#fff',
        borderRadius: 9 * vw,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointsTxt: {
        color: '#30EE6F',
        fontSize: 5 * vh,
        fontFamily: Fonts.KMs,
        // paddingVertical: 1 * vh,
        // paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    pointsTxt2: {
        color: default_font_Color,
        fontSize: 3.5 * vw,
        fontFamily: Fonts.KS,
        marginTop: -2 * vh,
        // paddingVertical: 1 * vh,
        // paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    totalPntTxt: {
        color: '#fff',
        fontSize: 5 * vw,
        fontFamily: Fonts.BM,
        // paddingVertical: 1 * vh,
        // paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    totalPntTxt2: {
        color: '#fff',
        fontSize: 7 * vw,
        fontFamily: Fonts.BS,
        // paddingVertical: 1 * vh,
        // paddingHorizontal: 5 * vw,
        textAlign: 'center',
    },
    topBtnMain: {
        backgroundColor: '#EE3060',
        paddingVertical: 1 * vh,
        borderRadius: 7 * vw,
        marginTop: 2 * vh,
        height: 7 * vh,
        flexDirection: 'row',
        alignItems: 'center',
        width: 50 * vw,
        justifyContent: 'center',
        elevation: 3,
        alignSelf: 'center',
    },

    topBtnMaintxt: {
        color: '#fff',
        fontSize: 5 * vw,
        fontFamily: Fonts.BS,
    },

})