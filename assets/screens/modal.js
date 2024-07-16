import React, {useContext} from 'react';
import {Modal, View, Text, TouchableOpacity, Alert} from 'react-native';
import {CallContext} from '../contexts/CallContext';
import styles from '../../styles/modal';
const DialpadModal = ({visible, onClose}) => {
  const {session} = useContext(CallContext);
  const sendDTMF = tone => {
    if (session) {
      session.sendDTMF(tone);
      console.log(`DTMF tone ${tone} sent`);
    } else {
      Alert.alert('Erro', 'Nenhuma sessão ativa para enviar DTMF');
    }
  };
  const renderButton = number => (
    <TouchableOpacity
      key={number}
      style={styles.button}
      onPress={() => sendDTMF(number)}>
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity>
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.dialpad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
            renderButton,
          )}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default DialpadModal;
