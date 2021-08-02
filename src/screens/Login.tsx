import React, {useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import {
  View,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {screenHeight} from '../utils/constants';
import BHubLogo from '../../assets/images/logo/Logo.svg';
import KakaoIcon from '../../assets/images/icons/KakaoIcon.svg';
import NaverIcon from '../../assets/images/icons/NaverIcon.svg';
import AppleIcon from '../../assets/images/icons/AppleIcon.svg';
import {useDispatch} from 'react-redux';
import {loginAction} from '../features/Login/slice';
import {LoginRequest} from '../types';

interface IProps {
  navigation: StackNavigationProp<any, 'Login'>;
}

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: #e5e5e5;
`;

const Login = ({navigation}: IProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const {login, googleLogin, fbLogin} = useContext(AuthContext);

  const changeEmail = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setEmail(e.nativeEvent.text);
    },
    [],
  );

  const changePassword = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPassword(e.nativeEvent.text);
    },
    [],
  );

  const submitLogin = useCallback(() => {
    const data: LoginRequest = {
      email,
      password,
    };
    dispatch(loginAction.loginRequest(data));
  }, [dispatch, email, password]);

  return (
    <Container>
      <SafeAreaView />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '25%',
          height: screenHeight - 483,
        }}>
        <BHubLogo />
      </View>
      <View style={{paddingBottom: 77}}>
        <View
          style={{
            marginLeft: '13.5%',
            marginRight: '13.5%',
            marginBottom: 44,
          }}>
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
            }}>
            <Text style={{fontSize: 13, fontWeight: '400', paddingTop: 11}}>
              이메일 주소
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
              placeholder={'이메일'}
              value={email}
              onChange={changeEmail}
            />
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
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingVertical: 0,
                fontSize: 16,
                fontWeight: '400',
              }}
              placeholder={'비밀번호'}
              secureTextEntry={true}
              value={password}
              onChange={changePassword}
            />
          </View>
          <TouchableOpacity
            style={{
              display: 'flex',
              backgroundColor: '#32EAB9',
              borderRadius: 16,
              paddingLeft: 16,
              paddingRight: 16,
              height: 53,
              justifyContent: 'center',
            }}
            onPress={submitLogin}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '600'}}>
                로그인
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 183,
              marginBottom: 24,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                width: 45,
                height: 45,
              }}>
              <View>
                <KakaoIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                width: 45,
                height: 45,
              }}>
              <View>
                <NaverIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                width: 45,
                height: 45,
              }}>
              <View>
                <AppleIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 60,
              height: 35,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: 'rgba(68, 68, 68, 0.4)',
                marginBottom: 8,
              }}>
              or
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#32EAB9',
                textDecorationColor: '#32EAB9',
                textDecorationLine: 'underline',
              }}
              onPress={() => navigation.navigate('Join')}>
              회원가입
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;
