import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from "expo-barcode-scanner"

 export default class ScanScreen extends  React.Component{
   constructor(){
     super();
       this.state={
         hasCameraPermissions: null, 
          scanned : false,
      scannedBookId : '',
      scannedStudentId : '',
      buttonState : 'normal'
       }
   }

   getCameraPermissions = async (id) =>{
    const {status}  = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions : status === "granted",
      buttonState : id,
      scanned : false
    })
  }

  handleBarCodeScanned  = async ({type, data})=>{
    const { buttonState} = this.state

    if(buttonState === "BookId"){
      this.setState({
        scanned : true,
        scannedBookId : data,
        buttonState : 'normal'
      });
    }
    else if(buttonState === "StudentId"){
      this.setState({
        scanned : true,
        scannedStudentId : data,
        buttonState : 'normal'
      })
    }
  }


  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
        <View style={styles.container}>
        <View>
          <Image
            source = {require("./assets/bs.png")}
            style= {{width:200, height:200}}/>
          
        </View>
        <View style={styles.inputView}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("BookId")
          }}>
          <Text style={styles.buttonText}>Scan QR code</Text>
        </TouchableOpacity>
        </View>
      </View>
      )
    }
  }
}

 


 const styles= StyleSheet.create({
   scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  }, 
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  }  
 })