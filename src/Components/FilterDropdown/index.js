import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {icons} from '../../assets/images/index';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  default_section_Color
} from '../../../config.json';


class CategoryDraopdown extends React.Component {
  state = {
    country: '',
  };
  render() {

    return (
      <DropDownPicker
        zIndex={99999999}
        items={this.props.items}
        // activeItemStyle={{backgroundColor: "#00AF41",color:"white"}}
        // activeLabelStyle={{color: 'white'}}
        // defaultValue={this.state.country}
        containerStyle={[styles.containerStyle, this.props.containerStyle]}
        style={[styles.PickerStyle]}
        customArrowUp={() => (
          <Image
            source={icons.arrowDown}
            style={[styles.picker]}
            resizeMode="contain"
          />
        )}
        customArrowDown={() => (
          <Image
            source={icons.arrowDown}
            style={[styles.picker]}
            resizeMode="contain"
          />
        )}
        dropDownStyle={styles.dropDownStyle}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        ///onchange ={ this.state.country}
        onChangeItem={(item) =>
         { 
           
          this.setState({
            country: item.value,
          },this.props.onchange(item.value,item.label))
          
                
        }
        }
        placeholder={this.props.placeholder ? this.props.placeholder : 'Latest'}
        placeholderStyle={styles.placeholder}
      />
    );
  }
}


export default CategoryDraopdown;