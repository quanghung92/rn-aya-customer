import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Pressable } from 'react-native'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [showPass, setShowPass] = useState(false)

    const login = () => {
        console.log('login');
    }
    return (
        <ImageBackground className="w-full  h-full" source={require('../assets/bg.png')}>
            <SafeAreaView >

                <View className="mx-auto pb-13 pt-9">
                    <Image
                        source={require('../assets/logo.png')}
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

                            <TextInput
                                label={'PassWord'}
                                mode='outlined' value={passWord}
                                onChangeText={password => setPassWord(password)}
                                secureTextEntry={!showPass}
                                right={<TextInput.Icon onPress={() => setShowPass(!showPass)} icon={showPass ? "eye-off" : "eye"} />}
                            />
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})