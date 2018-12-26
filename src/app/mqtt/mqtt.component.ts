import { Component, OnInit } from '@angular/core';
import {ImageHandlerProvider} from '../shared/models/ImageHandlerProvider.js';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Observable, Subscription} from 'rxjs';
import {text} from '@angular/core/src/render3';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.css']
})


export class MqttComponent implements OnInit {

  private subscription: Subscription;
  private imageHandler: ImageHandlerProvider = new ImageHandlerProvider();
  public message: string;
  title = 1;
  link: '';
  constructor(private mqtt: MqttService) {
    this.subscription = this.mqtt.observe('my/mqtt').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
      const bikeImage = document.getElementById('picture') as HTMLImageElement;
      this.link = this.imageHandler.getImageUrl(this.message);
      console.log(this.link);
      bikeImage.src = this.link;
    });
  }

  stopMQTT() {
    this.subscription.unsubscribe();
    this.mqtt.disconnect(true);
  }
  changeTitle() {
    this.title++;
    const textArea = document.getElementById('textofbase64') as HTMLTextAreaElement;
    console.log(textArea.value);
    this.mqtt.unsafePublish('my/mqtt', textArea.value);
    //  this.subscription.unsubscribe();
  }
  runMe() {
     // this.subscription = this.mqtt.observe('mqtt').subscribe(message => {
     //   console.log(message);
     //   this.title++;
     // });
  }

  ngOnInit() {
  }

}
