import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {default_text_color, default_section_Color} from '../../../config.json';

export default StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: vh * 2,
    borderColor: default_section_Color,
    fontSize: 20 * vw,
  },
  txtArea: {
    width: '100%',
    height: vh * 15,
    borderRadius: vw * 3,
    alignItems: 'flex-start',
    paddingTop: vh * 1,
    marginBottom: vh * 4,
    borderColor: '#fff',
  },
  contactTxt: {
    color: default_text_color,
    fontSize: vh * 2.8,
    marginTop: vh * 4,
  },
  contactRow: {flexDirection: 'row', alignItems: 'center', marginTop: vh * 1.5},
  contacticon: {width: vw * 3, height: vh * 2, marginRight: vw * 2},
  contact: {color: default_text_color, fontSize: vh * 2},
});
