import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  default_text_color,
  default_section_Color
} from '../../../config.json'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 2,
    paddingHorizontal: vw * 5,
  },
  headerInner: {flexDirection: 'row', alignItems: 'center'},
  sort: {height: vh * 2, width: vw * 5, marginRight: vw * 1},
  sortText: {color: default_text_color, fontSize: vh * 1.5},
  flatlist: {
    backgroundColor: default_section_Color,
    paddingHorizontal: vw * 2,
    paddingVertical: vh * 2,
    alignItems:'center',
    marginHorizontal:2.7*vw,
    marginTop:vh
  },
});
