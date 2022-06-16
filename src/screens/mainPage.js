import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from 'redux'
import * as Action from '../state/Action'
import {BackHandler} from 'react-native';



const color = {
    primary: '#007AFF',
    white: '#ffffff',
    gray: '#C4C4C4',
}

function MainPage({ navigation }) {

    useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        return
    }),
    [navigation]
);



    const dispatch = useDispatch();
    const { deleteMember } = bindActionCreators(Action, dispatch);
    const members = useSelector((state) => state.member);

    const onDeleteItem = (id, name,surname) => Alert.alert(
        "ลบสมาชิก",
        `ต้องการลบ \n${name}  ${surname} `,
        [
            {
                text: "ไม่",
                onPress: () => { },
                style: "cancel"
            },
            { text: "ใช่", onPress: () => deleteMember(id) }
        ]
    );

    const onEditItem = (member) => navigation.push('add', { member })

    const MemberItem = ({ onDeletePressed, onEditPressed, member }) => {
        const { name, surname, userId, phoneNumber } = member
        return (
            <View style={styles.containerMember}>
                <View style={styles.wrapContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>{name}   </Text>
                        <Text style={styles.title}>{surname}</Text>
                    </View>
                    <Text style={styles.label}>{userId}</Text>
                    <Text style={styles.label}>{phoneNumber}</Text>
                </View>
                <View style={styles.wrapIcon}>
                    <TouchableOpacity onPress={onEditPressed}>
                        <MaterialIcons name="edit" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDeletePressed}>
                        <AntDesign name="delete" size={28} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const renderEmptyList = () => {
        return (
            <View style={styles.emptyContainer}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18 }} >คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.push('add')} style={styles.addFirstButton}>
                    <Text style={styles.addFirstButtonText}>เพิ่ม</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderAddButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.push('add')} style={styles.addButton}>
                <Entypo name="plus" size={24} color={color.primary} />
                <Text style={{ color: color.primary, fontSize: 18, fontWeight: 'bold' }}>เพิ่ม</Text>
            </TouchableOpacity>
        )
    }

    const renderList = () => {
        return (
            <View >
                <FlatList
                    data={members}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ item }) =>
                        <MemberItem
                            onDeletePressed={() => onDeleteItem(item.id, item.name,item.surname)}
                            onEditPressed={() => onEditItem(item)}
                            member={item}
                        />}
                />
                {renderAddButton()}
            </View>
        )
    }



    return (
        <View style={{ justifyContent: 'center', }}>
            {members.length > 0 ? renderList() : renderEmptyList()}
        </View>
    )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: '#ffffff'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Dimensions.get('screen').width / 2
    },
    addFirstButton: {
        backgroundColor: '#0080FE',
        padding: 12,
        borderRadius: 4,
        width: 150
    },
    addFirstButtonText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 12,
        borderWidth: 1,
        borderColor: '#0080FE',
    },
    containerMember: {
        width: '94%',
        flexDirection: 'row',
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: color.primary,
        borderRadius: 4,
    },
    wrapContent: {
        flex: 1
    },
    wrapIcon: {
        justifyContent: 'space-between'
    },
    title: {
        color: color.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {
        color: color.white,
        marginTop: 4,
        fontSize: 16
    }

})
