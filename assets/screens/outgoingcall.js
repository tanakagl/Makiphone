import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useContext} from 'react';
import CallEnd from '../components/CallEnd';
import {CallContext} from '../contexts/CallContext';
const OutgoingCallScreen = () => {
  const {handleEndCall, calle} = useContext(CallContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(9, 10, 32, 1)',
      }}>
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#D0D4DD',
          }}>
          Ligando para ...
        </Text>

        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: '#ffff',
            letterSpacing: 6,
          }}>
          {calle}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={handleEndCall}
          style={{
            backgroundColor: '#FF5D5D',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CallEnd width={50} height={12} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(OutgoingCallScreen);
