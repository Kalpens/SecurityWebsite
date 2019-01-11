import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MqttComponent} from './mqtt/mqtt.component';
import {DefaulthomeComponent} from './defaulthome/defaulthome.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  { path: 'display', component: DisplayComponent},
  { path: 'mqtt', component: MqttComponent },
  { path: '', component: DefaulthomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
