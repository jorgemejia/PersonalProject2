import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { RmData } from '../../providers/rm-data';
import  { NetworkProvider } from '../../providers/network';
import * as moment from 'moment';

declare var StatusBarNotification : any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  today             : String = new Date().toISOString();
  tomorrow          : String = moment( this.today ).add(1, 'day').toISOString();
  roomsAlertOptions : { title:string, subTitle:string };
  hotelRooms        : {};
  hotelList         : any;
  testRadioOpen     : boolean;
  hotelSelected;

  constructor(public navCtrl: NavController, public HmData : RmData, public alertCtrl: AlertController, private network:NetworkProvider, private platform: Platform) {

      this.platform.ready().then(()=>{
          this.network.listenNetworkDisconnect();
      });

    this.roomsAlertOptions ={
      title    : 'Select your room',
      subTitle : ''
    };

    //Get hotels list
        this.hotelList = [{
            idHotel:1,
            nombre:"blablabla"
        }];

        let alert = this.alertCtrl.create({
            enableBackdropDismiss : false,
            title                 : 'Please select your hotel'
        });

        for( let item in this.hotelList){
            let checked = false;
            ( parseInt(item) <= 0 ) ? checked = true : checked = false;

            alert.addInput({
              type    : 'radio',
              label   : this.hotelList[item].nombre,
              value   : this.hotelList[item].idHotel,
              checked : checked
            })
        }

        alert.addButton({
            text    : 'Ok',
            handler : selected =>{
                console.log('Selected data: ', selected);
                this.testRadioOpen = false;
                this.hotelSelected = selected;
                localStorage.setItem('hotel', selected);
    //Get hotel rooms

                    this.hotelRooms = [{
                        idHabitacion : 1,
                        nombre : 'A-01'
                    }];
            }
        });

        alert.present().then(()=>{
            this.testRadioOpen = true;
        });

  }

  public checkinForm = {
    timeStart: this.today,
    timeEnds:  this.tomorrow, //this.today.getDate() + 1,
    room : "",
    name : "",
    firstName : "",
    secondName : "",
    adults : "",
    kids : "",
  }


  stpSelect() {
    console.log('STP selected');
  }

  saveChecin(data){
      console.log( this.hotelList );

  }

  TestAlert(){

     console.log('Hola');
     alert('Hola');
  }

  TestNotification(){

      console.log('Notification');
      StatusBarNotification.showNotification([{message:'Network error connection', large:false}], (msg)=>{ console.log(msg); return; });
  }

}
