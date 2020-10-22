import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Base } from 'app/shared/components/base.component';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent extends Base implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Verify Email');

    this.verifyEmail();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  verifyEmail() {
    this.route.queryParams
      .subscribe(params => {
      const url = params['url'];
      // if url param is not found
      if (url == null) {
        this.swalAlert('Error', 'Invalid Url', 'error')
          .subscribe(_ => this.router.navigate(['register']));
        return;
      }
      
      // call api to verify email
      this.http.get<ResponseResult<void>>(url)
        .subscribe(response => {
          this.swalAlert('Success', response.message, 'success')
            .subscribe(_ => this.router.navigate(['login']));
        }, error => {
          this.swalAlert('Error', error.error.message, 'error')
          .subscribe(_ => this.router.navigate(['register']));
        });
        
    });
  }
}
