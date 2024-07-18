import {View} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import React, {useContext, useState} from 'react';
import {CallContext} from '../contexts/CallContext';
import IconContainer from '../components/IconContainer/iconContainer';
import MicOn from '../components/MicOn';
import MicOff from '../components/MicOff';
import CallEnd from '../components/CallEnd';
import VideoOn from '../components/VideoOn';
import VideoOff from '../components/VideoOff';
import CameraSwitch from '../components/CameraSwitch';
import DialpadModal from './modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Incall = () => {
  const {
    remoteStream,
    localStream,
    handleEndCall,
    toggleMic,
    toggleCamera,
    switchCamera,
    localWebcamOn,
    localMicOn,
  } = useContext(CallContext);
  const [isDialpadVisible, setDialpadVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      {remoteStream ? (
        <RTCView
          mirror={true}
          objectFit={'cover'}
          style={{
            flex: 1,
            backgroundColor: '#050A0E',
            marginTop: 8,
          }}
          streamURL={remoteStream.toURL()}
        />
      ) : null}
      {localStream ? (
        <RTCView
          mirror={true}
          objectFit={'cover'}
          style={{flex: 1, backgroundColor: '#050A0E'}}
          streamURL={localStream.toURL()}
        />
      ) : null}
      <View
        style={{
          marginVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <IconContainer
          backgroundColor={'red'}
          onPress={handleEndCall}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localMicOn ? '#fff' : 'transparent'}
          onPress={toggleMic}
          Icon={() => {
            return localMicOn ? (
              <MicOn height={24} width={24} fill="#FFF" />
            ) : (
              <MicOff height={28} width={28} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
          onPress={toggleCamera}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOn height={24} width={24} fill="#FFF" />
            ) : (
              <VideoOff height={36} width={36} fill="#1D2939" />
            );
          }}
        />

        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={'transparent'}
          onPress={switchCamera}
          Icon={() => {
            return <CameraSwitch height={24} width={24} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={'transparent'}
          onPress={() => setDialpadVisible(true)}
          Icon={() => {
            return <Icon name={'dialpad'} size={30} color={'white'} />;
          }}
        />
      </View>
      <DialpadModal
        visible={isDialpadVisible}
        onClose={() => setDialpadVisible(false)}
      />
    </View>
  );
};
export default Incall;
