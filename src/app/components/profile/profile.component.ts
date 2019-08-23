import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitService } from '../../service/github.service';
import { Subscription, Observable } from 'rxjs';
import { IUser } from '../../models/user.interface';
import { IUserRepo } from '../../models/user-repo.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<IUser>;
  repo$: Observable<IUserRepo[]>;
  username: string;

  constructor(private route: ActivatedRoute, private rest: GitService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('name');
    });
    this.getUser();
  }

  getUser() {
    // this.rest.getProfileInfo().subscribe(data => {
    //   console.log(data);
    // });
    this.user$ = this.rest.getProfileInfo(this.username);
    this.repo$ = this.rest.getRepoUser(this.username);
    setTimeout(() => {
      console.log(this.user$);
      console.log(this.repo$);
    }, 2000);

  }


}
