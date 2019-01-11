import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/services/AuthenticateService';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../shared/models/UserObj';

@Component({
  selector: 'app-defaulthome',
  templateUrl: './defaulthome.component.html',
  styleUrls: ['./defaulthome.component.css'],
  providers: [AuthenticateService]
})

export class DefaulthomeComponent implements OnInit {

  private values: string[];
  private returnedUser: User;

  userForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  })

  constructor(private dataService: AuthenticateService,
              private router: Router) {
  }

  login() {
    // this.dataService.getAll()
    //  .subscribe((data: string[]) => this.values = data);
    // console.log(this.values);
    const user = this.userForm.value;
    this.dataService.authentication(user).subscribe((data: User) => {if (data.Token != null) { console.log(data); }});
    // this.userForm.reset();
    // this.router.navigateByUrl('/mqtt');
  }

  ngOnInit() {
  }


}


