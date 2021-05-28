import React from 'react';
import {
    View,
    LayoutAnimation,
    RefreshControl,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Alert from '../../Popups/Alert'
import TextSemi from '../../Components/TextSemi';
import TextMedium from '../../Components/TextMedium';
import TextRegular from '../../Components/TextRegular';
import TouchableHOC from '../../Components/TouchableHOC';
import Button from '../../Components/Button'
import { connect } from 'react-redux';
import moment from 'moment';
import { redeempoints, redeem } from '../../redux/actions';
import GradientBg from '../../Components/GradientBg';
import { icons, samplePictures } from '../../assets/images';
import PointsCard from '../../Components/PointsCard'
import {
    default_section_Color,
    loaderColor
} from '../../../config.json';


class Points extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            totalpoints: '',
            _redeempoints: 0,
            flag: true
        }
    }
    renderItem = ({ item, index }) => {

        return (
            <PointsCard item={item}
                checkredeem={item.redeemed}
                redeem={() => {
                    if (item.redeemed == 0) {
                        this.props.redeem(item.id, pass => {
                            this.setState({
                                _redeempoints: item.points
                            })

                            this.redeempoints.show()

                        })
                    }

                }} />
        );
    }

    getpoints = () => {
        this.props.redeempoints(this.props.userId, pass => {
            if (pass) {
                if (pass.all_points.length>0) {
                    this.setState({
                        totalpoints: pass.total_points,
                        points: pass.all_points,
                        flag: false
                    })
                }
                else {
                    this.setState({

                        flag: false
                    })
                }
            }
        })
    }
    clear = () => {
        this.setState({
            points: [],
            totalpoints: '',
            flag:true
        });
    };
    //   componentWillUnmount() {
    //     this.props.navigation.removeListener('focus');
    //     this.props.navigation.removeListener('blur');
    //   }
    componentDidMount() {
        this.props.navigation.addListener('focus', this.getpoints);
        this.props.navigation.addListener('blur', this.clear);
    }
    empty = () => {

        if(this.state.flag==false){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 * vh }}>
                    <TextRegular >No Points found</TextRegular>
                </View>
            )
        }
        else{
            return null
        }
       
    }
    render() {
        console.log('flag', this.state.flag);
        return (
            <GradientBg
                style={{ flex: 1, }}>
 <Alert ref={(r) => this.redeempoints = r}
                        redeemSuccess={() => this.getpoints()}
                        onSuccess
                        btntxt='Got IT'
                        text={`Thank You!\nYou have redeem ${this.state._redeempoints} points.\nAdmin will contact you shortly`} />
              
                   <ScrollView  refreshControl={
                                <RefreshControl
                                    refreshing={this.state.flag}
                                    tintColor={loaderColor}
                                    
                                    colors={[loaderColor]}
                                    onRefresh={this.getpoints}
                                   
                                />
                            } >
                    {this.state.totalpoints !== '' && <View style={{ alignItems: 'center', marginTop: 4 * vh }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 85 * vw }}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={icons.drawer10}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </View>
                            <View>
                                <TextSemi style={styles.price}>Available Points</TextSemi>
                                <TextRegular style={styles.points}>{this.state.totalpoints}</TextRegular>
                            </View>
                            <Button title='Redeem Log'
                                labelStyle={{ color: default_section_Color, fontSize: 2.2 * vh }}
                                onPress={() => this.props.navigation.navigate('RedeemLog')}
                                btnContainer={styles.butcon} />

                        </View>
                    </View>
                    }

                    <View style={{ alignItems: 'center', marginTop: vh }}>
                        {this.state.flag == false && <FlatList
                            showsVerticalScrollIndicator={false}
                           
                            data={this.state.points}
                            style={{ }}
                            ListEmptyComponent={this.empty}
                            renderItem={this.renderItem}


                        />
                        }
                    </View>
                </ScrollView>
            </GradientBg>
        );
    }
}


const mapStates = state => {

    console.log('s', state)
    return {


        userId: state.user.userid

    };
}
export default connect(mapStates, { redeempoints, redeem })(Points);
