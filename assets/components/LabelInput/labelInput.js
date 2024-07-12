import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';
const LabelInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.containerLabel}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {borderBottomWidth: isFocused ? 3 : 0},
          {borderColor: isFocused ? '#5A54CE' : 'transparent'},
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};
export default LabelInput;
