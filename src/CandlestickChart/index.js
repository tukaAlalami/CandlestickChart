/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React , {useEffect , useState} from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
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
 
 const Section = ({children, title}): Node => {
   const dispatch = useDispatch();
   const data = useSelector((state) => state.apiReducer.data);
   const loading = useSelector((state) => state.apiReducer.loading);

    const [state, setState] = useState({
        fromTimestamp: '1633381200',
        toTimestamp: "1664917199",
        interval: "1d",
    });

    const [candleData, setCandleData] = useState([]);

    const _setState = (_state) => {
        setState({ ...state, ..._state });
    }
 
   useEffect(() => {
     dispatch(getDataApi(`https://query1.finance.yahoo.com/v7/finance/download/SPUS?period1=${state?.fromTimestamp}&period2=${state?.toTimestamp}&interval=${state?.interval}&events=history&crumb=5YTX%2FgVGBmg`));
   }, []);

   useEffect(() => {
    if (!!data) {
        let temp = [];
        let arr = data.split("\n");
        for (let i = 1 ; i < arr.length ; i ++){
            let item = arr[i].split(",");
            let date = item[0].split("-");
            temp.push({
                x: new Date(date[0], date[1], date[2]), 
                open: item[1], 
                high: item[2],
                low: item[3],
                close: item[4],
            })
        }
        setCandleData(temp);
    }
  }, [data]);

   const isDarkMode = useColorScheme() === 'dark';
   console.log('candleData',candleData);
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
   
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Step Oneeeeee">
             Edit <Text style={styles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
           <LearnMoreLinks />
         </View>
       </ScrollView>
  
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
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
 
 export default App;
 