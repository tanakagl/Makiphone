import React from 'react';
import {Animated, TouchableOpacity, View, StyleSheet} from 'react-native';
const AnimatedButton = ({onPress, children}) => {
  const animatedValue = useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyle = {
    backgroundColor: '#FF5D5D',
    borderRadius: 30,
    opacity: animatedValue,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.button}>
      <Animated.View style={animatedStyle} />
      {children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
export default AnimatedButton;
