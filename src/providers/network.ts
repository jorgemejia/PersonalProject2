import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

declare var StatusBarNotification : any;

/*
  Generated class for the Network provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkProvider {


  disconnectSubscription    : any;
  connectSubscription       : any;

  constructor(private network: Network) {
    //console.log('Hello Network Provider');
  }

  listenNetworkDisconnect(){
    this.network.onDisconnect().subscribe(() =>{
        StatusBarNotification.showLargeNotification('Network error connection', true);
        console.log('Network disconnected...');
    });
  }

  listenNetworkConnection(){
      this.network.onConnect().subscribe(() => {
          console.log('network connected!');
          // We just got a connection but we need to wait briefly
          // before we determine the connection type.  Might need to wait 
          // prior to doing any api requests as well.
          setTimeout(() => {
              if (this.network.type === 'wifi') {
                  console.log('we got a wifi connection, woohoo!');
                  StatusBarNotification.stopNotification();
              }
          }, 3000);
      });
  }

}
