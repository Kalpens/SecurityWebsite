import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DefaulthomeComponent } from './defaulthome/defaulthome.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions =  {
  hostname: 'm20.cloudmqtt.com',
  protocol: 'wss',
  port: 31233,
  username: 'bbutcued',
  password: 'aFm5G2Rqk101',
};

@NgModule({
  declarations: [
    AppComponent,
    MqttComponent,
    NavbarComponent,
    DefaulthomeComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
