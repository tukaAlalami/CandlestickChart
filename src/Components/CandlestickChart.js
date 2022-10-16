/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useDispatch, useSelector} from 'react-redux';
import getDataApi from '../Api/ApiController';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryLabel
} from 'victory-native';
import DateRange from './DateRange';
import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const CandlestickChart = ({children, title}): Node => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const loading = useSelector(state => state.apiReducer.loading);
  const addWeekToDate = (dateObj) => {
    dateObj.setDate(dateObj.getDate() - 7);
    return dateObj.getTime();
  }
  
  const addMonthToDate = (dateObj) => {
    dateObj.setMonth(dateObj.getMonth() - 1);
    return dateObj.getTime();
  }
  const [state, setState] = useState({
    fromTimestamp: '1633381200',//new Date().getTime().toString(),
    toTimestamp: '1664917199',//addMonthToDate(new Date()).toString(),
    interval: '1d',
  });

  const [candleData, setCandleData] = useState([]);

  const _setState = _state => {
    setState({...state, ..._state});
  };

  useEffect(() => {
    dispatch(
      getDataApi(
        `https://query1.finance.yahoo.com/v7/finance/download/SPUS?&period1=${state?.fromTimestamp}&period2=${state?.toTimestamp}&interval=${state?.interval}&events=history&crumb=5YTX%2FgVGBmg`,
      ),
    );
  }, []);

  useEffect(() => {
    if (!!data) {
      let temp = [];
      let arr = data.split('\n');
      for (let i = 1; i < arr.length; i++) {
        let item = arr[i].split(',');
        let date = item[0].split('-');
        temp.push({
          x: new Date(date[0], date[1], date[2]),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        });
      }
      setCandleData(temp);
    }
  }, [data]);

  const isDarkMode = useColorScheme() === 'dark';
  console.log('candleData', candleData);

 



  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      horizontal
      contentContainerStyle={styles.container}>
      {candleData?.length > 0 ? (
        <View>
          <View style={{zIndex : 1000}}>
          <DateRange />
          </View>
          
        <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 25 }}
        scale={{ x: 'time' }}
        width={width}
        
      >
        <VictoryAxis
          scale='time'
          tickCount={9}
          tickFormat={(t) => `${t.toISOString().slice(5, 10)}`}
          fixLabelOverlap
          style={{ tickLabels: { fontSize: 8 } }}
         
        />
       
        <VictoryCandlestick
          candleColors={{ positive: 'green', negative: 'red' }}
          candleRatio={1}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          data={candleData}
        />
      </VictoryChart>
     
      </View>
      

    //     <VictoryChart
    //     theme={VictoryTheme.material}
    //     //domainPadding={{ x: 25 }}
    //     scale={{ x: 'time' }}
    //     width={800}
    //   >
    //   <VictoryAxis tickCount={50} tickFormat={t =>  `${t.toISOString().slice(5, 10)}`}/>
    
    //     <VictoryCandlestick
    //     scale={{ x: 'time' }}
    //       candleColors={{ positive: '#336d16', negative: '#ff0000' }}
    //       candleRatio={1}
    //      // domainPadding={{x: [-10, 10]}}
    //       data={candleData}
    //     />
    //   </VictoryChart>
        // <VictoryChart
        //   theme={VictoryTheme.material}
        //   //domainPadding={{x: 25}}
        //   scale={{x: 'time'}}>
        //   <VictoryAxis tickFormat={t =>  `${t.toISOString().slice(5, 10)}`}/>
        //   <VictoryCandlestick
        //     candleColors={{positive: '#5f5c5b', negative: '#c43a31'}}
        //     data={candleData}
        //   />
        // </VictoryChart>
      )
     :
     <ActivityIndicator size="large" />
     }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CandlestickChart;
