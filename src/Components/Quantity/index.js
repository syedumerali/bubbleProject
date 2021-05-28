import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import CircularBook from '../CircularBook'
import { icons } from '../../assets/images/index';
import TouchableHOC from '../TouchableHOC';
import { connect } from 'react-redux';
import { UpdatetoCart } from '../../redux/actions';


class CategoryDraopdown extends React.Component {
  constructor(props) {
    super(props);
    this.btn = {}

    this.state = { initial_quantity: this.props.quantity ?? 1 }
    this.icon = {}
    if (props.size) {
      this.btn = { height: props.size, width: props.size, borderRadius: props.size / 2 }
      this.icon = { width: props.size - vh * 1, height: props.size - vh * 1 }
      this.text = { fontSize: props.size }
    }
  }

  plus = () => {
    this.setState({

      initial_quantity: this.state.initial_quantity + 1

    })

    if (this.props.quantity) {
      this.props.update(this.props.id, this.props.quantity + 1);
    }

  }

  getquantity = () => {
    return this.state.initial_quantity
  }
  minus = () => {

    if (this.state.initial_quantity >= 2) {
      this.setState(
        {
          initial_quantity: this.state.initial_quantity - 1

        }
      )

      if (this.props.quantity) {
        this.props.update(this.props.id, this.props.quantity - 1);
      }
    }

    //this.props.update(this.props.id,this.props.quantity - 1)
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHOC style={[styles.btn, this.btn]} onPress={this.minus}>
          <Image source={icons.minus} style={[styles.icon, this.icon]} resizeMode="contain" />
        </TouchableHOC>
        <CircularBook style={[styles.text, this.text]}>{this.state.initial_quantity >= 1 ? this.state.initial_quantity
          : 1}</CircularBook>
        <TouchableHOC style={[styles.btn, this.btn]} onPress={this.plus}>
          <Image source={icons.plus} style={[styles.icon, this.icon]} resizeMode="contain" />
        </TouchableHOC>
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    update: (id, quantiy) => dispatch(UpdatetoCart(id, quantiy))
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(CategoryDraopdown);