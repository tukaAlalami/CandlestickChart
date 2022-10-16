import React, { useState } from 'react';
import { View, Text } from 'react-native-ui-lib';
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";

const DateRange = () => {
    const [state, setState] = useState({
        startDate: moment(),
        endDate: moment().add(1, 'M'),
        displayedDate: moment(),
    });

    const _setState = _state => {
        setState({ ...state, ..._state });
    };

    const setDates = (dates) => {
        _setState({
            ...dates,
        });
    };

    return (
        <DateRangePicker
            onChange={setDates}
            endDate={state?.endDate}
            startDate={state?.startDate}
            displayedDate={state?.displayedDate}
            range
        >
            <View padding-20>
                <Text blue20 text80>Choose date range:</Text>
                <View row marginV-10>
                    <View row>
                        <Text balck text80>From : </Text>
                        <Text balck text80>{moment(state?.startDate).format('DD/MM/YYYY')} </Text>
                    </View>
                    <View row marginH-20>
                        <Text balck text80>to : </Text>
                        <Text balck text80>{moment(state?.endDate).format('DD/MM/YYYY')} </Text>
                    </View>
                </View>
            </View>
        </DateRangePicker>

    );
};

export default DateRange;
