import { Component, OnInit } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/modules/users/users.service';
import { User } from 'app/modules/users/models/user.model';
import { UserVm } from 'app/modules/users/models/user.model.vm';

@Component({
  selector: 'users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent extends Base implements OnInit {
  user: User;
  userVm: UserVm;

  constructor(private route: ActivatedRoute, private userSvc: UserService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit User');
    this.loadUser();
  }
  
  loadUser() {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');

    this.userSvc.getUser(id)
      .subscribe(result => {
        this.user = result.data;
        this.userVm = {
          name: result.data.name,
          status: result.data.status,
          usergroups: result.data.usergroups.map(x => x.id)
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

}
