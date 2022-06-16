import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as MemberAction from '../state/Action'
import { TextInput } from 'react-native-paper';


const ERR_MESSAGE_NAME = 'กรุณากรอกชื่อ'
const ERR_MESSAGE_SURNAME = 'กรุณากรอกนามสกุล'
const ERR_MESSAGE_USER_ID = 'กรุณากรอกเลขบัตรประชาชน'
const ERR_MESSAGE_CHECK_USER_ID = 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง'
const ERR_MESSAGE_PHONE = 'กรุณากรอกเบอร์โทรศัพท์'







const color = {
  primary: '#007AFF',
  white: '#ffffff',
  gray: '#C4C4C4',
}

function AddPage({ route, navigation }) {
  const nameInput = useRef();
  const surnameInput = useRef();
  const userIdInput = useRef();
  const phoneInput = useRef();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userId, setUserId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isSurnameEdited, setIsSurnameEdited] = useState(false);
  const [isUserIdEdited, setIsUserIdEdited] = useState(false);
  const [isPhoneIdEdited, setIsPhoneIdEdited] = useState(false);

  const isNameValid = name.length > 0
  const isSurnameValid = surname.length > 0
  const isUserIdValid = userId.length == 0 
  const isUserIdValidCheck = userId.length > 0 && userId.length < 17
  const isPhoneNumberValid = phoneNumber.length == 12

  const canSubmit = isNameValid && isSurnameValid && isUserIdValid && isPhoneNumberValid

  const dispatch = useDispatch();
  const { addMember, editMember } = bindActionCreators(MemberAction, dispatch);



  const errorName = !isNameValid && isNameEdited ? ERR_MESSAGE_NAME : ''
  const errorSurname = !isSurnameValid && isSurnameEdited ? ERR_MESSAGE_SURNAME : ''
  const errorID =  isUserIdValid && isUserIdEdited ?  ERR_MESSAGE_USER_ID : isUserIdValidCheck && isUserIdEdited ? ERR_MESSAGE_CHECK_USER_ID : ''
  const errorPhone = !isPhoneNumberValid && isPhoneIdEdited ? ERR_MESSAGE_PHONE : ''





  useEffect(() => {
    if (route.params) {
      navigation.setOptions({ title: 'แก้ไขสมาชิก' });
      const { member } = route.params;
      setIsEditing(true);
      setName(member.name);
      setSurname(member.surname);
      setUserId(member.userId);
      setPhoneNumber(member.phoneNumber);
    } else {
      navigation.setOptions({ title: 'เพิ่มสมาชิก' });
    }
  }, [])

  const onAddMember = () => {
    addMember({ name, surname, userId, phoneNumber });
    navigation.goBack();
  }

  const onEditMember = () => {
    const { member } = route.params
    editMember({ name, surname, userId, phoneNumber, id: member.id });
    navigation.goBack();
  }

  const onUserIdEditing = (userIdText) => {
    let text = (userIdText).replace(/\D/g, '');
    if (text.length >= 2) text = text.slice(0, 1) + '-' + text.slice(1);
    if (text.length >= 7) text = text.slice(0, 6) + '-' + text.slice(6);
    if (text.length >= 13) text = text.slice(0, 12) + '-' + text.slice(12);
    if (text.length >= 16) text = text.slice(0, 15) + '-' + text.slice(15);
    setUserId(text)
  }

  const onPhoneEditing = (phoneText) => {
    let text = (phoneText).replace(/\D/g, '');
    if (text.length >= 4) text = text.slice(0, 3) + '-' + text.slice(3);
    if (text.length >= 8) text = text.slice(0, 7) + '-' + text.slice(7);
    setPhoneNumber(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={nameInput}
        value={name}
        onChangeText={setName}
        placeholder={'ชื่อ'}
        style={styles.input}
        returnKeyType='next'
        onSubmitEditing={() => surnameInput.current.focus()}
        onEndEditing={() => setIsNameEdited(true)}
        activeUnderlineColor='#C4C4C4'
      />
      <Text style={styles.errMessage}>{errorName}</Text>

      <TextInput
        ref={surnameInput}
        value={surname}
        onChangeText={setSurname}
        placeholder={'นามสกุล'}
        style={styles.input}
        returnKeyType='next'
        onSubmitEditing={() => userIdInput.current.focus()}
        onEndEditing={() => setIsSurnameEdited(true)}
        activeUnderlineColor='#C4C4C4'
      />
      <Text style={styles.errMessage}>{errorSurname}</Text>

      <TextInput
        ref={userIdInput}
        value={userId}
        onChangeText={onUserIdEditing}
        placeholder={'เลขบัตรประชาชน'}
        maxLength={17}
        style={styles.input}
        returnKeyType='next'
        keyboardType='numeric'
        onSubmitEditing={() => phoneInput.current.focus()}
        onEndEditing={() => setIsUserIdEdited(true)}
        activeUnderlineColor='#C4C4C4'
      />
      <Text style={styles.errMessage}>{errorID}</Text>


      <TextInput
        ref={phoneInput}
        value={phoneNumber}
        onChangeText={onPhoneEditing}
        placeholder={'เบอร์โทรศัพท์'}
        maxLength={12}
        style={styles.input}
        keyboardType='phone-pad'
        returnKeyType='done'
        onEndEditing={() => setIsPhoneIdEdited(true)}
        activeUnderlineColor='#C4C4C4'
      />
      <Text style={styles.errMessage}>{errorPhone}</Text>
      <TouchableOpacity disabled={!canSubmit} onPress={isEditing ? onEditMember : onAddMember} style={styles.submitButton(!canSubmit)}>
        <Text style={styles.submitButtonText}>ยืนยัน </Text>
      </TouchableOpacity>
    </View>
  )
}
export default AddPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff"
  },
  input: {
    height: 44,
    padding: 0,
    marginBottom: 10,
    backgroundColor: '#ffffff'
  },
  submitButton: (disable) => {
    return {
      backgroundColor: disable ? color.gray : color.primary,
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    }
  },
  submitButtonText: {
    color: '#ffffff',
  },
  errMessage: {
    fontSize: 14,
    color: 'red',
  }
})
