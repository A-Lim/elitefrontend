import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';
import { SystemSettingService } from 'app/modules/systemsettings/systemsettings.service';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { Subject, Observable, concat, of } from 'rxjs';
import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'systemsettings-auth-tab',
  templateUrl: './systemsettings-auth-tab.component.html',
  styleUrls: ['./systemsettings-auth-tab.component.css']
})
export class SystemSettingsAuthTabComponent extends Base implements OnInit, OnDestroy {

  @Input() 
  submitted: boolean;

  @Input()
  isLoading: boolean;

  @Input()
  systemSettingVm: SystemSettingVm;

  userGroupsReqLoading: boolean;
  userGroupInput$ = new Subject<string>();
  userGroups$: Observable<UserGroup[]>;

  constructor(private userGroupSvc: UserGroupService, private systemSettingSvc: SystemSettingService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadUserGroup();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
  }

  loadUserGroup() {
    this.userGroupsReqLoading = false;

    this.userGroups$ = concat(
      this.getUserGroupsFn$(null, this.systemSettingVm.default_usergroups), // default items
      this.userGroupInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.userGroupsReqLoading = true),
        switchMap(searchStr => this.getUserGroupsFn$(searchStr))
      )
    );
  }

  trackByFn(userGroup: UserGroup) {
    return userGroup.id;
  }

  private getUserGroupsFn$(searchStr?: string ,ids?: number[]) {
    let params: any = { limit: 10, page: 1, type: 'formcontrol' };

    if (searchStr != null && searchStr != '')
     params.name = `contains:${searchStr}`;

    if (ids && ids.length > 0) {
      ids.forEach(function (id, index) {
        params['id[' + index + ']'] = id;
      });
      // if ids count > 10, override limit 
      params.limit = ids.length > 10 ? ids.length : 10;
    }

    return this.userGroupSvc.getUserGroups(params).pipe(
      tap(_ => this.userGroupsReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}
