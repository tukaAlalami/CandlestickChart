import React, { useState } from 'react';
import { View, Text } from 'react-native-ui-lib';
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";

const DateRange = ({state , setDates, onClosePicker}) => {
 
    return (
        <DateRangePicker
            onChange={setDates}
            endDate={state?.endDate}
            startDate={state?.startDate}
            displayedDate={state?.displayedDate}
            onClosePicker={() => {
                console.log('state?.startDate',state?.startDate);
                console.log('state?.startDate',moment(state?.startDate).unix());
                onClosePicker(moment(state?.startDate).unix() , moment(state?.endDate).unix());
            }}
            range
        >
            <View padding-20>
                <Text blue10 text80>Choose date range:</Text>
                <View row marginV-10>
                    <View row>
                        <Text balck text80>From : </Text>
                        <Text balck text80>{!!state?.startDate && moment(state?.startDate).format('DD/MM/YYYY')} </Text>
                    </View>
                    <View row marginH-20>
                        <Text balck text80>to : </Text>
                        <Text balck text80>{!!state?.endDate && moment(state?.endDate).format('DD/MM/YYYY')} </Text>
                    </View>
                </View>
            </View>
        </DateRangePicker>

    );
};

export default DateRange;
