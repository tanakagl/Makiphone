import {View, SafeAreaView, Text} from 'react-native';
import LabelInput from '../components/LabelInput/labelInput';
import styles from '../../styles/config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';
import {useContext} from 'react';

const Settings = () => {
  const {authData, handleInputChange, handleSubmit} = useContext(AuthContext);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>User Settings</Text>
        </View>
        <LabelInput
          label={'Username'}
          value={authData.username || ''}
          onChangeText={value => handleInputChange('username', value)}
          placeholder={'Username'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Endpoint'}
          value={authData.endpoint || ''}
          onChangeText={value => handleInputChange('endpoint', value)}
          placeholder={'Input your endpoint'}
          secureTextEntry={false}
          keyboardType={'number-pad'}
        />
        <LabelInput
          label={'Password'}
          value={authData.password || ''}
          onChangeText={value => handleInputChange('password', value)}
          placeholder={'Input you password'}
          secureTextEntry={true}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Server'}
          value={authData.server || ''}
          onChangeText={value => handleInputChange('server', value)}
          placeholder={'Input server to connect'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Port'}
          value={authData.port || ''}
          onChangeText={value => handleInputChange('port', value)}
          placeholder={'Input port of server to connect'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Protocol'}
          value={authData.protocol || ''}
          onChangeText={value => handleInputChange('protocol', value)}
          placeholder={'Input wss or ws'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 16}}>
              Connect
            </Text>
            <Icon
              name="log-in-outline"
              size={35}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Settings;
