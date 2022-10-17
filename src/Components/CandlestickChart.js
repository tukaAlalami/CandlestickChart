import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import getDataApi from '../Api/ApiController';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick
} from 'victory-native';
import DateRange from './DateRange';
import Interval from './Interval';
import { Dimensions } from 'react-native';
import INTERVAL from '../Constans.js';
import moment from 'moment';

const { width } = Dimensions.get('window');

const CandlestickChart = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(({ apiReducer }) => ({
    data: apiReducer.data,
    loading: apiReducer.loading,
    error: apiReducer.error,
  }));

  const [candleData, setCandleData] = useState([]);

  const [state, setState] = useState({
    fromTimestamp: moment().subtract(1, 'Y').unix(),//'1633381200',
    toTimestamp: moment().unix(),//'1664917199',
    interval: INTERVAL.DAY,
  });

  const _setState = _state => {
    setState({ ...state, ..._state });
  };
  const [rangeState, setRangeState] = useState({
    startDate: moment().subtract(1, 'Y'),
    endDate: moment(),
    displayedDate: moment(),
  });

  const _setRangeState = _rangeState => {
    setRangeState({ ...rangeState, ..._rangeState });
  };

  const setDates = (dates) => {
    _setRangeState({
      ...dates,
    });
  };

  useEffect(() => {
    sendApi();
  }, []);

  useEffect(() => {
    let temp = [];
    if (!!data) {
      let arr = data.split('\n');
      for (let i = 1; i < arr.length; i++) {
        let item = arr[i].split(',');
        let date = item[0].split('-');
        temp.push({
          x: new Date(item[0]),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        });
      }
    }
    setCandleData(temp);
  }, [data]);

  const sendApi = () => {
    console.log('sendApi', state);
    dispatch(
      getDataApi(
        `https://query1.finance.yahoo.com/v7/finance/download/SPUS?&period1=${state?.fromTimestamp}&period2=${state?.toTimestamp}&interval=${state?.interval}&events=history&crumb=5YTX%2FgVGBmg`,
      ),
    );
  }

  useMemo(() => {
    sendApi();
  }, [state]);


  const setPeriods = (fromTimestamp, toTimestamp) => {
    _setState({ fromTimestamp, toTimestamp });
  }

  const setInterval = (interval) => {
    _setState({ interval });
  }

  return (
    <View
      style={styles.container}>
      {loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View> :
        <View>
          <View style={{ zIndex: 1000 }}>
            <DateRange state={rangeState} setDates={setDates} onClosePicker={setPeriods} />
          </View>
          <Interval interval={state?.interval} setInterval={setInterval} />
          {!!error ?
            <View style={styles.errorView}>
              <Text center red20 text70>{error ?? ''}</Text>
            </View>
            :
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: 'time' }}
              width={width}
            >
              <VictoryAxis
                scale='time'
                tickFormat={(t) => `${t.toISOString().slice(0, 10)}`}
                fixLabelOverlap
                style={{ tickLabels: { fontSize: 8 } }}

              />
              <VictoryCandlestick
                candleColors={{ positive: 'green', negative: 'red' }}
                candleRatio={1}
                data={candleData}
              />
            </VictoryChart>
          }
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  errorView: {
    width: width - 40,
    margin: 20
  }
});

export default CandlestickChart;
