import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from "expo-barcode-scanner"
import ScanScreen from './ScanScreen'
import {createAppContainer} from 'react-navigation'

 export default class App extends  React.Component{
   render(){
     return(
      <ScanScreen/>
     )
   }
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }   
 })