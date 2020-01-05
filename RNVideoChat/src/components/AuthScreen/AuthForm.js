import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  userLogin,
  userIsLogging,
  videoCallOpponentsIds,
} from '../../actions/user';
import UserService from '../../services/UserService';
import ChatService from '../../services/ChatService';
import { users } from '../../config';
import { Actions } from 'react-native-router-flux';
import UserStatic from '../../services/UserStatic'

import User from '../../services/UserService'

class AuthForm extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
  }


  loginUser1() {
    this._signIn(users[0]);
    this.props.videoCallOpponentsIds([users[1].id]);
  }

  loginUser2() {
    this._signIn(users[1]);
    this.props.videoCallOpponentsIds([users[0].id]);
  }

  login() {

    const { name, email, password } = this.state
    var datosUsuario = {
      login: email,
      password: password
    }

    this._signIn3();


  }

  login2() {
    const { name, email, password } = this.state
    var datosUsuario = {
      login: email,
      password: password
    }

    if (!name.trim() && !email.trim()) {
      alert('Warning.\n\nFill the fields to login.')
      return
    }

    User.signin(datosUsuario);



    //User.signin2(this.state)
    //	.then(this.props.userLogin)
    //  .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))


    console.log("##login");
    console.log(this.props.user.user);
    console.log("#/login");
    /*
    var nuevo_usuario={
      id:this.props.user.user.id,
      login: this.props.user.user.login,
      password: password

    }
    */

    /*
    Metodo para realizar una llamada 
    
    this._signIn(nuevo_usuario);
    this.props.videoCallOpponentsIds([nuevo_usuario.id]);
    */

    //Actions.test(); 
  }


  _signIn3() {
    const { name, email } = this.state

    if (!name.trim() && !email.trim()) {
      alert('Warning.\n\nFill the fields to login.')
      return
    }


    User.signin2(this.state)
      .then(user => {
        //this.props.userLogin;
        //User.user2 = user;
        UserStatic.user = user;
        this.props.userLogin(user);
        Actions.test();
      })
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))



  }

  _signIn2(userCredentials) {

    UserService.signin(userCredentials)
      .then(user => {
        console.log("##singIn2")
        console.log(user)
        console.log("#/singIn2")

        UserService.set_user(user);
        Actions.test();
      })
      .catch(e => {
        alert(`Error.\n\n${JSON.stringify(e)}`)
      });
  }

  _signIn(userCredentials) {
    this.props.userIsLogging(true);

    UserService.signin(userCredentials)
      .then(user => {
        ChatService.connect(userCredentials)
          .then(contacts => {
            this.props.userLogin(user);
            this.props.userIsLogging(false);
            Actions.videochat();
          })
          .catch(e => {
            this.props.userIsLogging(false);
            alert(`Error.\n\n${JSON.stringify(e)}`);
          });
      })
      .catch(e => {
        this.props.userIsLogging(false);
        alert(`Error.\n\n${JSON.stringify(e)}`);
      });
  }


  /**
        <TouchableOpacity onPress={() => this.loginUser1()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>Log in as Alice</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.loginUser2()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>Log in as Bob</Text>
          </View>
        </TouchableOpacity>
   */
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
    backgroundColor: '#00e3cf',
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
    backgroundColor: '#00e3cf',
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
