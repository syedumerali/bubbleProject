import React from 'react';
import {
    View,
    LayoutAnimation,
    RefreshControl,
    Image
} from 'react-native';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextSemi from '../../Components/TextSemi';
import TextLight from '../../Components/TextLight';
import TextRegular from '../../Components/TextRegular';
import TouchableHOC from '../../Components/TouchableHOC';
import Button from '../../Components/Button'
import moment from 'moment';
import { getRedeemLogs } from '../../redux/actions';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DatePicker from '../../Popups/DatePickerModal'
import GradientBg from '../../Components/GradientBg';
import { connect } from 'react-redux';
import { icons, samplePictures } from '../../assets/images';
import RedeemLogCard from '../../Components/RedeemLogCard'
import {
    loaderColor
} from '../../../config.json';

class Points extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: 'From',
            to: 'To',
            flag:true,
            redeem: []
        }
    }
    renderItem = ({ item, index }) => {

        return (
            <RedeemLogCard item={item} />
        );
    };
    setDate = (fromdate) => {
        this.setState({
            from: moment(fromdate).format('DD MMM YYYY')
        },()=> this.sort())
    }
    setDateTo = (fromdate) => {
        this.setState({
            to:   moment(fromdate).format('DD MMM YYYY')
        },()=> this.sort())
    }
    getLogs=()=>{
        this.props.getRedeemLogs(this.props.userId,pass=>{
           this.setState({
               redeem:pass,
               flag:false
           })
        })
    }
    clear = () => {
        this.setState({
          redeem: [],
         
        });
      };
      empty = () => {
          if(this.state.flag==false){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,marginTop:10*vh}}>
                    <TextRegular >No Logs found</TextRegular>
                </View>
            )
          }
          else{
              return null
          }
      
    }
    sort=()=>{
        if(this.state.to!=='To'&& this.state.from!=='From'){
            this.setState({
                flag:true,
                redeem:[]
            })
            let sortingdate={
                datefromredemtion:moment(this.state.from).format('YYYY-MM-DD'),
                datetoredemtion:moment(this.state.to).format('YYYY-MM-DD')
            }
            this.props.getRedeemLogs(this.props.userId,pass=>{
                this.setState({
                    redeem:pass,
                    flag:false
                })
             },sortingdate)
        }
    }
    componentDidMount() {
        this.props.navigation.addListener('focus', this.getLogs);
        this.props.navigation.addListener('blur', this.clear);
      }
    render() {

        return (
            <GradientBg
                style={{ flex: 1, }}>
                <DatePicker ref={(r) => this.opendate = r}
                    onSuccess={this.setDate} />
                <DatePicker ref={(r) => this.opendateTo = r}
                    onSuccess={this.setDateTo} />
                  
                <TextSemi style={styles.sort}>Sort By:</TextSemi>
                <View style={{ alignItems: 'center', marginTop: 1 * vh }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 90 * vw }}>
                        <TouchableHOC style={styles.box}
                            onPress={() => this.opendate.show()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 * vw }}
                            >
                                <TextLight style={styles.from}>{this.state.from}</TextLight>
                                <Image source={icons.calendar}
                                    style={styles.calendar} />
                            </View>

                        </TouchableHOC>
                        <TouchableHOC style={styles.box}
                            onPress={() => this.opendateTo.show()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 * vw }}>
                                <TextLight style={styles.from}>{this.state.to}</TextLight>
                                <Image source={icons.calendar}
                                    style={styles.calendar} />
                            </View>

                        </TouchableHOC>
                    </View>
                </View>


                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.redeem}
                    style={{ marginTop: vh * 3, }}
                    ListEmptyComponent={this.empty}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.flag}
                          tintColor={loaderColor}
                          colors={[loaderColor]}
                          onRefresh={this.getLogs} />
                      }
                    contentContainerStyle={{ alignItems: 'center' }}
                    renderItem={this.renderItem}
                />


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
export default connect(mapStates, { getRedeemLogs })(Points);
