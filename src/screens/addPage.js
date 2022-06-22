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
const ERR_MESSAGE_CHECK_PHONE = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'




const color = {
  primary: '#673ab7',
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

  const isName = name.length > 0
  const isSurname = surname.length > 0
  const isUserId = userId.length == 0
  const isUserIdCheck = userId.length > 0 && userId.length < 13
  const pattPassword = /1{13}|2{13}|3{13}|4{13}|5{13}|6{13}|7{13}|8{13}|9{13}|0{13}/
  const isPattPassword = pattPassword.test(userId);
  const isPhoneNumber = phoneNumber.length == 0
  const isPhoneNumberCheck = phoneNumber.length > 0 && phoneNumber.length < 10
  const pattPhoneNumber = /1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10}|0{10}/
  const isPattPhoneNumber = pattPhoneNumber.test(phoneNumber);
  console.log(isPattPhoneNumber);


  const canSubmit = isName && isSurname && !isUserId && !isPhoneNumber && !isUserIdCheck && !isPhoneNumberCheck && !isPattPassword && !isPattPhoneNumber



  const dispatch = useDispatch();
  const { addMember, editMember } = bindActionCreators(MemberAction, dispatch);



  const errorName = !isName && isNameEdited ? ERR_MESSAGE_NAME : ''
  const errorSurname = !isSurname && isSurnameEdited ? ERR_MESSAGE_SURNAME : ''
  const errorID = isUserId && isUserIdEdited ? ERR_MESSAGE_USER_ID : isUserIdCheck && isUserIdEdited ? ERR_MESSAGE_CHECK_USER_ID : isPattPassword && isUserIdEdited ? ERR_MESSAGE_CHECK_USER_ID : ''
  const errorPhone = isPhoneNumber && isPhoneIdEdited ? ERR_MESSAGE_PHONE : isPhoneNumberCheck && isPhoneIdEdited ? ERR_MESSAGE_CHECK_PHONE : isPattPhoneNumber && isPhoneIdEdited ? ERR_MESSAGE_CHECK_PHONE : ''


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
    let text = (userIdText);

    setUserId(text)
  }

  const onPhoneEditing = (phoneText) => {
    let text = (phoneText);

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
        maxLength={13}
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
        maxLength={10}
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
