import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {secondaryColor, loaderColor, default_text_color, default_section_Color} from '../../../config.json';

export default StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    width: vw * 90,
    paddingHorizontal: vw * 4,
    height: vh * 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: loaderColor,
    borderWidth: vw * 0.5,
    borderRadius: vh * 3.5,
    alignSelf: 'center',
    backgroundColor: default_section_Color,
    marginTop: vh * 2,
  },
  input: {
    color: default_text_color,
    fontSize: vh * 2.2,
    padding: 0,
    flex: 1,
    alignSelf: 'stretch',
  },
  search: {width: vw * 4, height: vh * 5, tintColor: secondaryColor},
  flatlist: {paddingHorizontal: vw * 1, marginTop: vh * 2},
});
