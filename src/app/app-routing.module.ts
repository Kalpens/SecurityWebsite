import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MqttComponent} from './mqtt/mqtt.component';
import {DefaulthomeComponent} from './defaulthome/defaulthome.component';

const routes: Routes = [
  { path: 'mqtt', component: MqttComponent },
  { path: '', component: DefaulthomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
