import {View, SafeAreaView, Text} from 'react-native';
import LabelInput from '../components/LabelInput/labelInput';
import styles from '../../styles/config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Configuracoes = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuracoes de usuario</Text>
        </View>
        <LabelInput
          label={'Username'}
          value={''}
          onChangeText={value => handleInputChange('name', value)}
          placeholder={'Username'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Extension'}
          value={''}
          onChangeText={value => handleInputChange('extension', value)}
          placeholder={'Input your extension'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Password'}
          value={''}
          onChangeText={value => handleInputChange('password', value)}
          placeholder={'Input you password'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Server'}
          value={''}
          onChangeText={value => handleInputChange('server', value)}
          placeholder={'Input server to connect'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Port'}
          value={''}
          onChangeText={value => handleInputChange('server', value)}
          placeholder={'Input port of server to connect'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
        <LabelInput
          label={'Protocol'}
          value={''}
          onChangeText={value => handleInputChange('server', value)}
          placeholder={'Input wss or ws'}
          secureTextEntry={false}
          keyboardType={'default'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Configuracoes;
