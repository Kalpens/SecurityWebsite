import { Component, OnInit, SystemJsNgModuleLoader, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../shared/models/UserObj';
import { PictureService } from '../shared/services/PictureService';
import * as moment from 'moment';
import { Picture } from '../shared/models/PictureObj';
import { Subscription } from 'rxjs';
import { MqttService, IMqttMessage } from 'ngx-mqtt';


@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
    providers: [PictureService]
  })

  export class DisplayComponent implements OnInit 
  {

    private subscription: Subscription;
    public message: string;
    link: '';

    pictures: Picture[];
    constructor(private dataService: PictureService,
      private router: Router, private ref: ChangeDetectorRef, private mqtt: MqttService) {
        this.subscription = this.mqtt.observe('my/mqtt').subscribe((message: IMqttMessage) => {
          /*this.message = message.payload.toString();
          console.log(this.message);
          const bikeImage = document.getElementById('picture') as HTMLImageElement;
        
          this.link = new Picture(0, "empty", );
          console.log(this.link);
          bikeImage.src = this.link;*/
        });
    }

    ngOnInit() {
      this.dataService.getAll(moment(moment()).format("YYYY-MM-DD, h:mm:ss a")).subscribe(lst => {
        this.pictures = lst;
      });
    }

    onSubmit(date1: string, date2:string){
      if (date2 == "") {var d = null;}
      else{ d = moment(date2).format("YYYY-MM-DD, h:mm:ss a");}
      this.pictures = null;
      this.dataService.getAll(moment(date1).format("YYYY-MM-DD, h:mm:ss a"), d).subscribe(lst => {this.pictures = lst});
      this.ref.markForCheck();
    }

    onMqtt(){

    }
  }