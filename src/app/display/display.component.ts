import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../shared/models/UserObj';
import { PictureService } from '../shared/services/PictureService';
import * as moment from 'moment';
import { Picture } from '../shared/models/PictureObj';


@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
    providers: [PictureService]
  })

  export class DisplayComponent implements OnInit 
  {
    pictures: Picture[];
    constructor(private dataService: PictureService,
      private router: Router) {
    }

    ngOnInit() {
      this.getImages();
    }

    getImages() {
      this.dataService.getAll(moment(moment()).format("YYYY-MM-DD, h:mm:ss a")).subscribe(lst => {
        this.pictures = lst;
      });
     
    }
  }