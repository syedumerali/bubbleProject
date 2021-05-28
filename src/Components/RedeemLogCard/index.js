import React from 'react';
import { Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { icons, samplePictures } from '../../assets/images/index';
import Toast from 'react-native-toast';
import TextRegular from '../TextRegular';
import { connect } from 'react-redux';
import TextSemi from '../../Components/TextSemi';
import Alert from '../../Popups/Alert';
import TouchableHOC from '../TouchableHOC';
import { AddtoWishList, AddtoCart, RemovefromCart, RemovefromWishlist } from '../../redux/actions';
import Button from '../Button';
import vh from '../../Units/vh';
import TextMedium from '../TextMedium';


class ProductItem extends React.Component {

    render() {


        return (
            <TouchableHOC
                style={styles.card}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextMedium style={styles.date}>Order # {this.props.item?.order_id}</TextMedium>
                    <TextSemi style={styles.price}>Point: {this.props.item?.points}</TextSemi>
                </View>
                <View style={{ flexDirection: 'row',justifyContent:'space-between',marginTop:1*vh }}>
                    <View>
                        <TextMedium style={styles.date}>Received Date</TextMedium>
                        <TextMedium style={styles.date}>{this.props.item?.receiveddate}</TextMedium>
                    </View>
                    <View>
                        <TextMedium style={styles.date}>Redemption Date</TextMedium>
                        <TextMedium style={styles.date}>{this.props.item?.redemptiondate}</TextMedium>
                    </View>
                </View>
            </TouchableHOC>
        );
    }
}
export default ProductItem