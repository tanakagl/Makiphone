import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import InCallManager from 'react-native-incall-manager';
import JsSIP from 'react-native-jssip';
import {Alert, Platform} from 'react-native';
import {AuthContext} from './AuthContext';

export const CallContext = createContext();

export const CallProvider = ({children}) => {
  const {authData, sendAuth} = useContext(AuthContext);
  const navigation = useNavigation();
  const [session, setSession] = useState(null);
  const [ua, setUa] = useState(null);
  const [incommingCaller, setIncommingCaller] = useState(null);
  const [calle, setCalle] = useState(null);
  const [localMicOn, setLocalMicOn] = useState(true);
  const [localWebcamOn, setLocalWebcamOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnectionRef = useRef(null);
  const [status, setStatus] = useState('disconectado');
  const [statusColor, setStatusColor] = useState('black');
  const [currentAlert, setCurrentAlert] = useState(null);

  JsSIP.debug.enable('JsSIP:*');

  const controlStatus = status => {
    switch (status) {
      case 'registrado':
        return 'green';
      case 'naoRegistrado':
        return 'gray';
      case 'falhaRegistro':
        return 'red';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    console.log(status);
    setStatusColor(controlStatus(status));
  }, [status]);

  useEffect(() => {
    console.log('Verificando authData:', authData);
    if (
      authData.username &&
      authData.endpoint &&
      authData.password &&
      authData.server &&
      authData.protocol
    ) {
      console.log('SetupPhone iniciado');
      setupPhone(authData);
    }
    return () => {
      console.log('Cleanup iniciado');
      cleanup();
    };
  }, [sendAuth]);

  const setupPhone = authData => {
    const {username, endpoint, password, server, port, protocol} = authData;

    const socket = new JsSIP.WebSocketInterface(
      `${protocol}://${server}:${port}/ws`,
    );

    const configuration = {
      uri: `sip:${endpoint}@${server}`,
      password: password,
      sockets: [socket],
      session_timers: false,
      use_preloaded_route: true,
      no_answer_timeout: 180,
      hack_via_tcp: false,
      hack_via_ws: true,
      display_name: username !== null ? username : endpoint,
      user_agent: 'Matheo Bonucia',
      contact_uri: `sip:${endpoint}@${server};transport=${protocol}`,
      pcConfig: {
        iceServers: [
          {urls: 'stun:stun.l.google.com:19302'},
          {urls: 'stun:stun1.l.google.com:19302'},
          {urls: 'stun:stun2.l.google.com:19302'},
          {
            urls: 'turn:relay1.expressturn.com:3478',
            username: 'efBWA92I6LHKOAISP4',
            credential: 'WrVpk6pHeaKzMkAa',
          },
        ],
      },
    };

    const phone = new JsSIP.UA(configuration);

    phone.on('connecting', () => {
      console.log('JsSIP: Conectando ao servidor...');
    });

    phone.on('connected', () => {
      console.log('JsSIP: Conexão estabelecida com sucesso.');
    });

    phone.on('disconnected', data => {
      console.warn('JsSIP: Desconectado do servidor.', data);
    });

    phone.on('newMessage', data => {
      console.log('JsSIP: Nova mensagem recebida.', data);
    });

    phone.on('newRTCSession', data => {
      console.log('JsSIP: Nova sessão RTC estabelecida.', data);
    });

    phone.on('registrationFailed', data => {
      console.error('JsSIP: Falha no registro.', data);
    });

    phone.on('error', data => {
      console.error('JsSIP: Erro ocorrido.', data);
    });

    phone.on('registrationFailed', function (ev) {
      console.log('Registering on SIP server failed with error: ' + ev.cause);
      configuration.uri = null;
      configuration.password = null;
    });

    phone.on('newRTCSession', ev => {
      const newSession = ev.session;
      //Para quando estou criando uma conexao, ou seja, estou realizando uma ligacao
      if (newSession.connection) {
        peerConnectionRef.current = newSession.connection;
        console.log('criou peerConnection', peerConnectionRef.current);
      }
      //Para quando estou recebendo uma conexao
      newSession.on('peerconnection', event => {
        peerConnectionRef.current = event.peerconnection;
        console.log('recebeu o peerConnection', peerConnectionRef.current);
      });
      // RECEBENDO UMA CHAMADA
      if (newSession.direction === 'incoming') {
        navigation.dispatch(StackActions.replace('incomingCall'));
        setIncommingCaller(newSession.remote_identity.uri.user);
        InCallManager.startRingtone('_BUNDLE_', [0, 1000, 500, 1000]);
        // Quando finalizar a chamada
        newSession.on('ended', () => {
          navigation.dispatch(StackActions.replace('Tabs'));
          setSession(null);
          setRemoteStream(null);
          setIncommingCaller(null);
          if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
          }
          // Parar o InCallManager e o ringtone quando a chamada termina
          InCallManager.stop();
          InCallManager.stopRingtone();
        });
        // QUANDO UMA CHAMADA APRESENTAR PROBLEMAS
        newSession.on('failed', () => {
          setRemoteStream(null);
          setSession(null);
          setIncommingCaller(null);
          navigation.dispatch(StackActions.replace('Tabs'));
          if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
          }
          // Parar o InCallManager e o ringtone quando a chamada falha
          InCallManager.stop();
          InCallManager.stopRingtone();
        });
      } else {
        // Quando finalizar a chamada
        newSession.on('ended', () => {
          navigation.dispatch(StackActions.popToTop());
          setRemoteStream(null);
          setSession(null);
          // Parar o InCallManager quando a chamada termina
          InCallManager.stop();
        });
        // QUANDO UMA CHAMADA APRESENTAR PROBLEMAS
        newSession.on('failed', () => {
          navigation.dispatch(StackActions.popToTop());
          setRemoteStream(null);
          setSession(null);
          // Parar o InCallManager quando a chamada falha
          InCallManager.stop();
        });
      }
      newSession.on('confirmed', async () => {
        if (peerConnectionRef.current) {
          captureMidias();
        }
      });
      newSession.on('newDTMF', function (event) {
        console.log('DTMF recebido:', event.dtmf.tone);
      });
      newSession.on('icecandidate', function (event) {
        if (
          event.candidate.type === 'srflx' &&
          event.candidate.relatedAddress !== null &&
          event.candidate.relatedPort !== null
        ) {
          event.ready();
        }
      });
      // Atribuir uma nova sessao assim que estabelcer uma
      setSession(newSession);
    });
    phone.on('registered', function (e) {
      setStatus('registrado');
      if (currentAlert === null) {
        setCurrentAlert('registrado');
        Alert.alert(
          'Ramal registrado!',
          'Seu ramal foi registrado no servidor e está pronto para uso.',
          [
            {
              text: 'Ok',
              onPress: () => setCurrentAlert(null),
            },
          ],
        );
      }
    });

    phone.on('unregistered', function (e) {
      setStatus('naoRegistrado');
      if (currentAlert === null) {
        setCurrentAlert('naoRegistrado');
        Alert.alert('Não foi possível conectar-se ao servidor!', '', [
          {
            text: 'Ok',
            onPress: () => setCurrentAlert(null),
          },
        ]);
      }
    });

    phone.on('registrationFailed', function (e) {
      setStatus('falhaRegistro');
      if (currentAlert === null) {
        setCurrentAlert('falhaRegistro');
        Alert.alert(
          'Erro ao registrar ramal!',
          'Confira suas credenciais de registro e tente novamente.',
          [
            {
              text: 'Ok',
              onPress: () => setCurrentAlert(null),
            },
          ],
        );
      }
    });
    phone.start();
    // Suprimir logs no APK release fora do modo de desenvolvimento
    if (Platform.OS === 'android' && !__DEV__) {
      console.log = () => {};
    }
    setUa(phone);
  };
  const cleanup = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    if (ua) {
      ua.stop();
    }
  };
  const handleAceitarChamada = async () => {
    try {
      if (session) {
        session.answer({
          //Defino ao JsSIP se quero que ele capture as midias de audio e video
          mediaConstraints: {
            audio: true,
            video: true,
          },
        });
        // Parar o ringtone quando a chamada é aceita
        InCallManager.stopRingtone();
        // Iniciar o InCallManager quando uma chamada é aceita
        InCallManager.start({media: 'audio'});
        navigation.dispatch(StackActions.replace('inCall'));
      }
    } catch (error) {
      console.error('Failed to accept call:', error);
    }
  };

  const handleEndCall = async () => {
    if (session) {
      session.terminate();
      setSession(null);
      setIncommingCaller(null);
      InCallManager.stopRingback();
      InCallManager.stopRingtone();
      InCallManager.stop();
      navigation.dispatch(StackActions.replace('Tabs'));
    } else {
      navigation.dispatch(StackActions.replace('Tabs'));
    }
  };
  const handleIniciarChamada = async () => {
    try {
      if (ua && calle) {
        const eventHandlers = {
          progress: () => {
            console.log('Call is in progress');
            // Iniciar o ringback quando a chamada está em progresso
            InCallManager.start({media: 'audio', ringback: '_DTMF_'});
            console.log('CHAMOU INCALL START 3');
          },
          failed: e => {
            console.log('Call failed with cause: ' + e.cause);
            if (peerConnectionRef.current) {
              peerConnectionRef.current.close();
              peerConnectionRef.current = null;
            }
            // Parar o InCallManager e o ringback quando a chamada falha
            InCallManager.stop();
            InCallManager.stopRingback();
          },
          ended: () => {
            console.log('Call ended');
            if (peerConnectionRef.current) {
              peerConnectionRef.current.close();
              peerConnectionRef.current = null;
            }
            // Parar o InCallManager e o ringback quando a chamada termina
            InCallManager.stop();
            InCallManager.stopRingback();
          },
          confirmed: () => {
            console.log('Call confirmed');
            // Parar o ringback quando a chamada é confirmada
            InCallManager.stopRingback();
          },
        };
        const options = {
          eventHandlers: eventHandlers,
          //Defino ao JsSIP se quero que ele capture as midias de audio e video
          mediaConstraints: {
            audio: true,
            video: true,
          },
          rtcOfferContraints: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1,
          },
        };
        console.log(calle);
        const newSession = await ua.call(
          `sip:${calle}@${authData.server}`,
          options,
        );
        setSession(newSession);
      }
    } catch (error) {
      console.error('Erro ao iniciar uma chamada: ', error);
    }
  };
  let isMuted = false;
  const toggleMic = async () => {
    try {
      console.log('Toggling microphone...');
      if (localStream) {
        const audioTrack = await localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        localMicOn ? setLocalMicOn(false) : setLocalMicOn(true);
        isMuted = !isMuted;
      }
    } catch (err) {
      console.error('Erro ao alterar microfone: ', err);
    }
  };

  let isCamOn = true;
  const toggleCamera = async () => {
    try {
      if (localStream) {
        const videoTrack = await localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        localWebcamOn ? setLocalWebcamOn(false) : setLocalWebcamOn(true);
        isCamOn = !isCamOn;
      }
    } catch (err) {
      console.error('Erro inesperado ao desativar camera! ', err);
    }
  };

  const toggleSpeaker = async () => {
    console.log('Toggling speaker sound');
  };
  let isFrontCam = true;
  const switchCamera = async () => {
    try {
      if (localStream) {
        const videoTrack = await localStream.getVideoTracks()[0];
        videoTrack._switchCamera();
        isFrontCam = !isFrontCam;
      }
    } catch (err) {
      console.error('Erro ao inverter camera: ', err);
    }
  };

  const captureMedias = async () => {
    // Obter a local track
    const senders = await peerConnectionRef.current.getSenders();
    const localStream = new MediaStream();
    senders.forEach(sender => {
      if (sender.track) {
        localStream.addTrack(sender.track);
      }
    });
    setLocalStream(localStream);
    // Obter a remote track
    const receivers = await peerConnectionRef.current.getReceivers();
    const remoteStream = new MediaStream();
    receivers.forEach(receiver => {
      if (receiver.track) {
        remoteStream.addTrack(receiver.track);
      }
    });
    setRemoteStream(remoteStream);
    navigation.dispatch(StackActions.replace('inCall'));
    InCallManager.setKeepScreenOn(true);
    InCallManager.setSpeakerphoneOn(true);
  };

  const contextValues = useMemo(
    () => ({
      session,
      incommingCaller,
      setCalle,
      localMicOn,
      setLocalMicOn,
      localWebcamOn,
      setLocalWebcamOn,
      localStream,
      remoteStream,
      handleAceitarChamada,
      handleEndCall,
      handleIniciarChamada,
      statusColor,
      toggleCamera,
      toggleMic,
      toggleSpeaker,
      switchCamera,
      calle,
    }),
    [
      session,
      incommingCaller,
      setCalle,
      localMicOn,
      setLocalMicOn,
      localWebcamOn,
      setLocalWebcamOn,
      localStream,
      remoteStream,
      handleAceitarChamada,
      handleEndCall,
      handleIniciarChamada,
      statusColor,
      calle,
    ],
  );
  return (
    <CallContext.Provider value={contextValues}>
      {children}
    </CallContext.Provider>
  );
};
