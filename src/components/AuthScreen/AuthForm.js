import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  userLogin,
  userIsLogging,
  videoCallOpponentsIds,
} from '../../actions/user';
import { Actions } from 'react-native-router-flux';
import UserStatic from '../../services/UserStatic'
import User from '../../services/UserService'

class AuthForm extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
  }

  login() {

    const { name, email, password } = this.state
    var datosUsuario = {
      login: email,
      password: password
    }
    this._signIn();
  }

  _signIn() {
    const { name, email, password } = this.state

    if (!name.trim() && !email.trim()) {
      alert('Warning.\n\nFill the fields to login.')
      return
    }


    User.signin2(this.state)
      .then(user => {
        UserStatic.user = user;
        var credential = {
          id: user.id,
          login: user.login,
          password: password
        }
        Actions.dialogs2();
      })
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))

  }



  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          ref={input => (this.emailInput = input)}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={text => this.setState({ email: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          returnKeyType="done"
          ref={input => (this.passwordInput = input)}
          onChangeText={text => this.setState({ password: text })}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => this.login()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>Iniciar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: user => dispatch(userLogin(user)),
    userIsLogging: isLogging => dispatch(userIsLogging(isLogging)),
    videoCallOpponentsIds: opponentsIds =>
      dispatch(videoCallOpponentsIds(opponentsIds)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#045FB4',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    fontSize: 18,
  },
  buttonContainer: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#045FB4',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700'
  },
});
