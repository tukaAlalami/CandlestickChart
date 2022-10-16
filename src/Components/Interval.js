import React from 'react';
import { View, Button, Colors } from 'react-native-ui-lib';
import INTERVAL from '../Constans.js';

const IntervalItem = ({ label, selected, onPress }) => {
    return (
        <Button
            label={label}
            outlineColor={Colors.red10}
            backgroundColor={selected ? Colors.red10 : 'white'}
            color={selected ? 'white' : Colors.red10}
            onPress={onPress}
        />
    );
}
const Interval = ({ interval, setInterval }) => {
    return (
        <View row spread marginH-20>
            <IntervalItem
                label="1 Day"
                selected={interval === INTERVAL.DAY}
                onPress={() => setInterval(INTERVAL.DAY)}
            />
            <IntervalItem
                label="1 Week"
                selected={interval === INTERVAL.WEEK}
                onPress={() => setInterval(INTERVAL.WEEK)}
            />
            <IntervalItem
                label="1 Month"
                selected={interval === INTERVAL.MONTH}
                onPress={() => setInterval(INTERVAL.MONTH)}
            />
        </View>
    );
};

export default Interval;
