import { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../ui/Button';
import Input from './Input';


const { width } = Dimensions.get('window'); // screen width

function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid = {},
  defaultEmail = '',
  defaultPassword = '',
}) {
  const [enteredEmail, setEnteredEmail] = useState(defaultEmail);
  const [enteredPassword, setEnteredPassword] = useState(defaultPassword);

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
  } = credentialsInvalid;

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  return (
     <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
  >
    <ScrollView contentContainerStyle={styles.container} 
    keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false} 
      >
      
      {/* Image Wrapper */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/homepage.png')}
          style={[styles.image, { width: width * 0.9, height: width * 0.8 }]}
        />
      </View>

      {/* Space between image & card */}
      <View style={{ height: 20 }} />
     

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Sales Coupon</Text>
        <Text style={styles.subtitle}>Partner - Login</Text>

        <Input
          label="Employee ID"
          value={enteredEmail}
          onUpdateValue={setEnteredEmail}
          isInvalid={emailIsInvalid}
          placeholder="Enter Username"
        />

        <Input
          label="Password"
          secure
          value={enteredPassword}
          onUpdateValue={setEnteredPassword}
          isInvalid={passwordIsInvalid}
          placeholder="Password"
        />

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </Button>
        </View>
      </View>
     
    </ScrollView>
     </KeyboardAvoidingView>
  );
}

export default AuthForm;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F8',
    paddingBottom: 40,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },

  imageContainer: {
    alignItems: 'center', // center image horizontally
  },

  image: {
    resizeMode: 'contain',
  },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1F2937',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#4B5563',
  },

  buttons: {
    marginTop: 24,
  },
});
