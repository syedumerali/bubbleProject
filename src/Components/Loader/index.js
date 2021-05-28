import React, { Component }  from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import styles from '../Loader/styles';
import { connect } from 'react-redux';
import { loaderOff } from '../../redux/actions';
import CircularBook from '../CircularBook';
import {
  loaderColor
} from '../../../config.json';

class Loader extends Component {

    componentDidMount() {
       
        this.props.loaderOff();
      }

   
    render () {


        return (

            <Modal   animationType="slide"
            transparent={true}
            visible={this.props.loading}
            >
            <View style={styles.centeredView}>
    
                    <View style={styles.modalView}>
                         
                         <ActivityIndicator color={loaderColor}
                                            animating={true}
                                            size="small"/>
                           <CircularBook >Please Wait</CircularBook>
                    </View>
    
            </View>
    
            </Modal>
    
        )
    }
    
}


const mapStates = state => {


    return {
  
      loading: state.category.loading
      
    };
  }

export default connect(mapStates,{loaderOff})(Loader);