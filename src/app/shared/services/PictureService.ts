import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration} from './Configuration';
import {User} from '../models/UserObj';
import { Picture } from '../models/PictureObj';


@Injectable()
export class PictureService {

  private readonly actionUrl: string;

  private config: Configuration = new Configuration();

  constructor(private http: HttpClient) {
    this.actionUrl = this.config.serverWithApiUrl + '/service';
  }

  public getAll(date1: string, date2?: string): Observable<Picture[]> {
    //redo
    if (date2 == null){
      return this.http.get<Picture[]>(this.actionUrl + "?stringDate=" + date1)
    }
    return this.http.post<Picture[]>(this.actionUrl + "?stringDate1=" + date1 + "&stringDate2=" + date2, null);
    
  }

}