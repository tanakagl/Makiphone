import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../../styles/incoming';
import {CallContext} from '../contexts/CallContext';
import CallAnswer from '../components/CallAnswer';
import CallEnd from '../components/CallEnd';

const IncomingCallScreen = () => {
  const {handleAceitarChamada, handleEndCall, incommingCaller} =
    useContext(CallContext);

  const onPressAceitarChamada = () => {
    handleAceitarChamada();
  };

  const onPressEndCall = () => {
    handleEndCall();
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.callerText}>
          Recebendo ligação de {incommingCaller}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressAceitarChamada}>
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.callButton}>
            <CallAnswer height={28} fill={'#fff'} style={styles.buttonIcon} />
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressEndCall}>
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.callEndButton}>
            <CallEnd width={50} height={12} style={styles.endButtonIcon} />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomingCallScreen;
