import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    Alert.alert("Account created successfully. Please proceed to login");
    setLoading(false);
    router.push("/(auth)");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Header */}
            <View className="items-center mb-10">
              <Text className="text-3xl font-bold text-slate-900">
                Create Account
              </Text>

              <Text className="text-slate-500 text-center mt-2">
                Join us and get started today
              </Text>
            </View>

            {/* Form */}
            <View className="gap-4">
              <View>
                <Text className="text-slate-700 font-medium mb-2">
                  Full Name
                </Text>

                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={setFullName}
                  className="bg-white border border-slate-200 rounded-2xl px-4 py-4 text-slate-900"
                />
              </View>

              <View>
                <Text className="text-slate-700 font-medium mb-2">Email</Text>

                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  className="bg-white border border-slate-200 rounded-2xl px-4 py-4 text-slate-900"
                />
              </View>

              <View>
                <Text className="text-slate-700 font-medium mb-2">
                  Password
                </Text>

                <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4">
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={secure}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 py-4 text-slate-900"
                  />

                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Text className="text-blue-600 font-semibold">
                      {secure ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSignUp}
                className="bg-blue-600 rounded-2xl py-4 items-center mt-2"
                disabled={loading}
              >
                <Text className="text-white font-bold text-base">
                  {loading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            {/* <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-slate-200" />
              <Text className="mx-4 text-slate-400">OR</Text>
              <View className="flex-1 h-px bg-slate-200" />
            </View> */}

            {/* Google Signup */}
            {/* <TouchableOpacity className="bg-white border border-slate-200 rounded-2xl py-4 items-center">
              <Text className="font-medium text-slate-700">
                Continue with Google
              </Text>
            </TouchableOpacity> */}

            {/* Footer */}
            <View className="flex-row justify-center mt-10">
              <Text className="text-slate-500">Already have an account?</Text>

              <TouchableOpacity onPress={() => router.push("/(auth)")}>
                <Text className="text-blue-600 font-semibold ml-1">Login</Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text className="text-center text-slate-400 text-xs mt-6 leading-5">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpPage;
