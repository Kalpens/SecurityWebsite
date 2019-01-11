import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration} from './Configuration';
import {User} from '../models/UserObj';


@Injectable()
export class AuthenticateService {

  private readonly actionUrl: string;

  private config: Configuration = new Configuration();

  constructor(private http: HttpClient) {
    this.actionUrl = this.config.serverWithApiUrl + 'user/authenticate';
  }

  public getAll(): Observable<string[]> {
    return this.http.get<string[]>(this.actionUrl);
  }



  public authentication(user: User): Observable<User> {
    const toAdd = { Username: user.Username, Password: user.Password };

    return this.http.post<User>(this.actionUrl, toAdd);
  }

}
