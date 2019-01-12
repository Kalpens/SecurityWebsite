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
    notification: boolean;
    htmlToAdd: string;

    pictures: Picture[];
    empty: Boolean;

    constructor(private dataService: PictureService,
      private router: Router, private ref: ChangeDetectorRef, private mqtt: MqttService) {
        this.htmlToAdd = "";
        this.subscription = this.mqtt.observe('my/mqtt').subscribe((message: IMqttMessage) => {
          if(message != null){
            this.notification = true;
            console.log(this.message);
            this.message = message.payload.toString();

            this.htmlToAdd = '<li class="row">'
            +'<div class="col">'
            +'<img src="'+ this.dataService.getPictureUrlByName(this.message) +'" height="270px" width="360px">'
            +'</div>'
            +'<div class="col">'
            +'  <div class="row"><p>Date: '+ moment(moment()).format("YYYY-MM-DD, h:mm:ss a") +'</p></div>'
            +'  <div class="row"><p>Link: <a href="'+ this.dataService.getPictureUrlByName(this.message) +'">Click Here</a></p></div>'
            +'</div>'
            +'</li>' + this.htmlToAdd;
          }
        });


    }

    ngOnInit() {
      this.dataService.getAll(moment(moment()).format("YYYY-MM-DD, h:mm:ss a")).subscribe(lst => {
        this.pictures = lst;
      });
      this.pictures.sort((n1,n2) => {
        if (n1.timestamp > n2.timestamp) {
            return -1;
        }
    
        if (n1.timestamp < n2.timestamp) {
            return 1;
        }
    
        return 0;
    });
      this.notification = false;
      this.empty = false;
    }

    onSubmit(date1: string, date2:string){
      if (date2 == "") {var d = null;}
      else{ d = moment(date2).format("YYYY-MM-DD, h:mm:ss a");}
      this.dataService.getAll(moment(date1).format("YYYY-MM-DD, h:mm:ss a"), d).subscribe(lst => {this.pictures = lst});
      if (this.pictures.length == 0){ this.empty = true;}
    }
  }