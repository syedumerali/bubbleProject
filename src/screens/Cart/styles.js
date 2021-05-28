import { StyleSheet } from 'react-native'
import vh from '../../Units/vh'
import vw from '../../Units/vw'
import {
    default_text_color,
    default_section_Color
} from '../../../config.json';

export default StyleSheet.create({
    detailCont: { backgroundColor: default_section_Color, width: "100%", paddingHorizontal: vw * 5, paddingVertical: vh * 2, borderRadius: vw * 1 },
    detailItem: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        borderBottomWidth: vw * .05, borderBottomColor: "#727C8E", paddingBottom: vh * 1, marginBottom: vh * 1
    },
    detailTxt: { color: default_text_color, fontSize: vh * 1.5 },
    cartempty: { color: default_text_color, fontSize: vh * 2, textAlign: 'center' }

})