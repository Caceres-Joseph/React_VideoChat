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
import ZebraBTPrinter from 'react-native-zebra-bt-printer';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer'

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
    //this._signIn();
    Actions.web();
  }


  /*
    zebraPrint() {
      try {
  
        var userPrintCount = 1;
        var userText1 = "->";
        var userText2 = "Ado wicoy\n";
        var userText3 = "-------------";
  
        //Store your printer serial or mac, ios needs serial, android needs mac
        var printerSerial = 'AC:3F:A4:13:39:E0';
  
        //check if printer is set
        if (printerSerial !== null && printerSerial !== '') {
          ZebraBTPrinter.printLabel(printerSerial, userPrintCount, userText1, userText2, userText3).then((result) => {
            console.log(result);
  
            if (result === false) {
              console.log('Print failed, please check printer connection');
            }
          })
            .catch((err) => console.log(err.message));
        } else {
          console.log('Print failed, no printer setup found');
        }
      } catch (error) {
        // Error retrieving data
        console.log('Async getItem failed');
      }
  
  
    }
    */


  zebraPrint2() {
    //const zpl = "^XA^FX Top section with company logo, name and address.^CF0,60^FO50,50^GB100,100,100^FS^ FO75,75 ^ FR ^ GB100, 100, 100 ^ FS^ FO88, 88 ^ GB50, 50, 50 ^ FS ^XZ";
    //const zpl = "Saludando desde la impresora\n"


    console.log("--- printing ---")
    //for android, device address is mac address
    //for iOS, device address is a long string like 0C347F9F-2881-9CCB-43B0-205976944626
    /*const zpl = '^XA\n'  + 
    '^FO50,50 \n'  +
    '^A0,32,25\n'  + 
    '^FDZEBRA^FS\n'  + 
    '^FO50,150\n'  +
    '^A0,32,25\n'  + 
    '^FDPROGRAMMING^FS\n'  + 
    '^FO50,250\n'  +
    '^A0,32,25^FDLANGUAGE^FS\n'  + 
    '^XZ\n';
    */
   const zpl = "^XA^FX Top section with company logo, name and address.^CF0,60^FO50,50^GB100,100,100^FS^ FO75,75 ^ FR ^ GB100, 100, 100 ^ FS^ FO88, 88 ^ GB50, 50, 50 ^ FS ^XZ";
    RNZebraBluetoothPrinter.print('AC:3F:A4:13:39:E0', zpl).then((res) => {
      //do something with res
      console.log(res);
    }).catch(e => {
      console.log(e)
    })


    return;
    RNZebraBluetoothPrinter.pairedDevices().then((deviceArray) => {
      console.log(deviceArray)
    })


    return;
    RNZebraBluetoothPrinter.scanDevices().then((deviceArray) => {
      //do something with res
      console.log(deviceArray)
      console.log("Coneect device")
      RNZebraBluetoothPrinter.connectDevice('AC:3F:A4:13:39:E0').then((res) => {
        //do something with res
        console.log(res)
        //for android, device address is mac address
        //for iOS, device address is a long string like 0C347F9F-2881-9CCB-43B0-205976944626
      })

    })



  }

  zebraPrint3() {
    RNZebraBluetoothPrinter.isEnabledBluetooth().then((res) => {
      //do something with res 
      if (res) {
        RNZebraBluetoothPrinter.scanDevices().then((deviceArray) => {
          console.log(deviceArray)
        })
      }

    })

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
            <Text style={styles.buttonLabel}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.zebraPrint2()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>Imprimir</Text>
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
