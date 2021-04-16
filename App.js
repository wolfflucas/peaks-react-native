import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import generatedPeaks from './peaks.json';

const peaks = generatedPeaks.data.map((peak, index) => ({ index, peak }));

export default class App extends React.Component {
  state = {
    progress: new Animated.Value(0.1),
  };

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 14000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const width = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });
    return (
      <View>
        <View style={styles.backgroundChart}>
          <VictoryChart>
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: 'none' },
                grid: { stroke: 'none' },
              }}
              tickFormat={() => ``}
            />
            <VictoryAxis
              crossAxis
              tickFormat={() => ``}
              style={{
                axis: { stroke: 'none' },
                grid: { stroke: 'none' },
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#bbb' } }}
              data={peaks}
              x="index"
              y="peak"
            />
          </VictoryChart>
        </View>
        <Animated.View style={[styles.foregroundChart, { width }]}>
          <VictoryChart>
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: 'none' },
                grid: { stroke: 'none' },
              }}
              tickFormat={() => ``}
            />
            <VictoryAxis
              crossAxis
              tickFormat={() => ``}
              style={{
                axis: { stroke: 'none' },
                grid: { stroke: 'none' },
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#000' } }}
              data={peaks}
              x="index"
              y="peak"
            />
          </VictoryChart>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundChart: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: 0,
  },
  foregroundChart: {
    overflow: 'hidden',
    zIndex: 9999,
    position: 'absolute',
    top: 0,
  },
});
