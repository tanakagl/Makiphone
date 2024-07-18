import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/home';
import {useContext, useState, useEffect} from 'react';
import {CallContext} from '../contexts/CallContext';
import {AuthContext} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {authData} = useContext(AuthContext);
  const [number, setNumber] = useState('');
  const [callInitiated, setCallInitiated] = useState(false);
  const {setCalle, handleIniciarChamada, statusColor} = useContext(CallContext);

  const handleCall = async () => {
    if (!number) {
      Alert.alert('Por favor, insira o ramal para realizar a ligação.');
      return;
    }
    setCalle(number);
    setCallInitiated(true);
  };

  // Efeito para monitorar quando a chamada deve ser iniciada
  useEffect(() => {
    if (callInitiated) {
      handleIniciarChamada();
      navigation.navigate('outgoingCall');
      setCallInitiated(false);
    }
  }, [callInitiated]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MAKI</Text>
        <Text style={styles.headerText2}>PHONE</Text>
      </View>
      <View style={styles.bodyUser}>
        <View style={styles.bodyUserContent}>
          <View style={styles.userInterface}>
            <Icon name={'person-circle-outline'} size={30} />
            <Text style={styles.userInterfaceText}>User caller ID</Text>
          </View>
          <View style={styles.boxCaller}>
            <View style={styles.boxStatus}>
              <Icon
                name={'radio-button-on'}
                color={statusColor}
                size={14}
                style={{marginHorizontal: 4}}
              />
              <Text>{authData.username}</Text>
            </View>
            <Text style={styles.boxCallerText}>{authData.endpoint}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyCall}>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            numberOfLines={1}
            keyboardType="number-pad"
            placeholder="Input ID to Call"
            placeholderTextColor={'rgba(255, 255, 255, 0.1)'}
          />
          <TouchableOpacity onPress={handleCall}>
            <Icon name="call-outline" size={35} style={styles.button} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View>
        <Text style={styles.footerText}>Developed by Matheo Bonucia</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
