import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { TextInput, Button, PaperProvider, ActivityIndicator } from 'react-native-paper'
import { Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoading } from '../../redux/reducers/userReducer'

import { APIPost } from '../../common/apicomm'

import PasswordInput from '../../components/passwordInput'
import ModalShow from '../../components/modal'
import ModalOpt from '../../components/otp'

export default function Login() {
    const dispatch = useDispatch()
    const { userLoading, userData } = useSelector(state => state.userReducer)
    const [userName, setUserName] = useState('')
    const [passWordCrypto, setPassWordCrypto] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loginFailed, setLoginFailed] = useState('')
    const [OTPNumber, setOPTNumber] = useState('')
    const [showModalOTP, setShowModalOTP] = useState(false)

    const login = async () => {
        dispatch(setUserLoading(true))
        try {
            const dataLogin = await APIPost('internal/token', {
                LoginName: userName,
                Password: passWordCrypto
            }, handleLoginSuccess, handleLoginFaile)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginSuccess = (dataUser) => {
        dispatch(setUserLoading(false))
        const { data } = dataUser
        if (data.needOTP === 'True') {
            dispatch(setUser(data))
            console.log(data)
            setShowModalOTP(true)
        } else {

        }
    }

    const hideOTPModal = () => {
        setShowModalOTP(false)
    }
    const handleSetOTP = (value) => {
        setOPTNumber(value)
    }

    const handleLoginFaile = (error) => {
        console.log('fale', error)
        dispatch(setUserLoading(false))
        // setLoginFailed(error.ReasonDesc)
        setShowModal(true)
    }

    const handelSetPassWord = async (password, pw) => {
        setPassWordCrypto(pw)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>

            <PaperProvider>
                <ImageBackground className="w-full  h-full" source={require('../../assets/bg.png')}>
                    {
                        userLoading && (
                            <View className="absolute bg-black/40 h-full w-full flex-1 justify-center items-center z-20">
                                <ActivityIndicator animating={true} color='red' />
                            </View>
                        )
                    }
                    <SafeAreaView >
                        <View className="mx-auto pb-13 pt-9">
                            <Image
                                source={require('../../assets/logo.png')}
                            />
                        </View>
                        <View className="p-4">
                            <View className="bg-white/90 rounded-3xl p-4">
                                <View>
                                    <Text className="font-bold text-xl mb-1">Welcome</Text>
                                    <Text className="text-sm font-normal text-gray-700">Login to access your account</Text>
                                </View>
                                <View className="mt-6">
                                    <TextInput
                                        className="mb-5"
                                        label={'User name'}
                                        mode='outlined' value={userName}
                                        onChangeText={userName => setUserName(userName)}
                                    />

                                    <PasswordInput handelSetPassWord={handelSetPassWord} />
                                    <View className='justify-end flex flex-row mt-2'>
                                        <Pressable onPress={() => console.log('Chuyển qua màn forgot')}><Text className="text-blue-600">Forgot password?</Text></Pressable>
                                    </View>
                                    <View className="mt-6">
                                        <Button onPress={() => login()} className="bg-Primary h-13 flex justify-center rounded-lg" mode='contained'>Login</Button>
                                    </View>
                                    <View className="flex flex-row justify-center mt-5">
                                        <Text className="text-gray-800 font-medium">Don’t have account? </Text>
                                        <Pressable><Text className="text-blue-600 font-medium">Register</Text></Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </SafeAreaView>
                    {
                        showModal && (
                            <ModalShow showModal={showModal} hideModal={hideModal} Failed={loginFailed} />
                        )
                    }

                    {
                        showModalOTP && (
                            <ModalOpt
                                OTPNumber={OTPNumber}
                                handleSetOTP={handleSetOTP}
                                showModalOTP={showModalOTP}
                                hideOTPModal={hideOTPModal}
                                phoneNo={userData.phoneNo}
                                expiredLifeTime={userData.ExpiredLifeTime}
                            />
                        )
                    }

                </ImageBackground>
            </PaperProvider>
        </>
    )
}

const styles = StyleSheet.create({})