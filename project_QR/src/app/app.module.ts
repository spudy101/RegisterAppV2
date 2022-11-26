import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// firebase
import { AngularFireModule } from '@angular/fire/compat'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

// diseño
import { NotificacionComponent } from './notificacion/notificacion.component';
import { LibreriasModule } from './librerias/librerias.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//qr
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  declarations: [
    AppComponent,
    NotificacionComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    LibreriasModule,
    BrowserAnimationsModule,
    ],
  providers: [
    BarcodeScanner,
    {provide: 
    RouteReuseStrategy, 
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
