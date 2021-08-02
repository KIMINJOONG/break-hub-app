import React, {useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {screenHeight} from '../utils/constants';
import {useColorScheme} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FastImage from 'react-native-fast-image';
import Prev from '../../assets/images/icons/Prev.svg';

interface IProps {
  navigation: StackNavigationProp<any, 'Login'>;
}

const Join = ({}: IProps) => {
  const colorScheme = useColorScheme();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const getText = useCallback(() => {
    if (step === 1) {
      return '이메일 주소를 입력해주세요.';
    } else if (step === 2) {
      return '비밀번호를 입력해주세요.';
    } else if (step === 3) {
      return '비밀번호를 한번 더 입력해주세요.';
    }
  }, [step]);

  const getTextInputText = useCallback(() => {
    if (step === 1) {
      return '이메일 주소';
    } else if (step === 2) {
      return '비밀번호';
    } else if (step === 3) {
      return '비밀번호 확인';
    }
  }, [step]);

  const nextStep = useCallback(() => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('done');
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const getValue = useCallback(() => {
    if (step === 1) {
      return email;
    } else if (step === 2) {
      return password;
    } else if (step === 3) {
      return passwordConfirm;
    }
  }, [email, password, passwordConfirm, step]);

  const onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (step === 1) {
        setEmail(e.nativeEvent.text);
      } else if (step === 2) {
        setPassword(e.nativeEvent.text);
      } else if (step === 3) {
        setPasswordConfirm(e.nativeEvent.text);
      }
    },
    [step],
  );

  const getBorderColor = useCallback(() => {
    if (step === 1 && email) {
      return '#34C759';
    } else if (step === 2 && password) {
      return '#34C759';
    } else if (step === 3 && passwordConfirm) {
      if (password !== passwordConfirm) {
        return '#FF2D55';
      } else {
        return '#34C759';
      }
    }
    return '#fff';
  }, [email, password, passwordConfirm, step]);
  return (
    <View style={{flex: 1}}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: getStatusBarHeight(),
            backgroundColor: colorScheme === 'dark' ? 'black' : '#fff',
          }}></View>
      )}
      <View style={{paddingLeft: 10, paddingTop: 10}}>
        <TouchableOpacity onPress={prevStep}>
          <Prev width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{flex: 1, paddingLeft: 30, paddingRight: 30, paddingTop: 30}}>
        <View style={{paddingBottom: 10}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>회원가입</Text>
        </View>
        <View style={{paddingBottom: 24}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 13,
              color: 'rgba(60, 60, 67, 0.6)',
            }}>
            {getText()}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingLeft: 16,
            paddingRight: 16,
            height: 56,
            marginBottom: 8,
            justifyContent: 'center',
            alignContent: 'center',
            borderWidth: 1,
            borderColor: getBorderColor(),
          }}>
          <Text style={{fontSize: 13, fontWeight: '400', paddingTop: 11}}>
            {getTextInputText()}
          </Text>
          <TextInput
            style={{
              paddingTop: 4,
              paddingBottom: 12,
              paddingLeft: 0,
              paddingRight: 0,
              paddingVertical: 0,
              fontSize: 16,
              fontWeight: '400',
            }}
            placeholder={getTextInputText()}
            value={getValue()}
            onChange={onChange}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#32EAB9',
          height: 53,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={nextStep}>
        <Text style={{fontWeight: '600', fontSize: 16, color: '#fff'}}>
          다음
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Join;
