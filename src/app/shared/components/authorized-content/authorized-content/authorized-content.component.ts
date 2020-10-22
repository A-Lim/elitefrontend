import { Component, OnInit, Input } from '@angular/core';
import { Ability } from '@casl/ability';

@Component({
  selector: 'shared-authorized-content',
  templateUrl: './authorized-content.component.html',
  styleUrls: ['./authorized-content.component.css']
})
export class AuthorizedContentComponent implements OnInit {

  @Input()
  permissions: string[];

  // condition logic checking for permissions
  @Input()
  condition: 'and' | 'or' = 'and';

  // hide = hide content
  // inform = show forbidden
  @Input()
  type: 'hide' | 'inform' = 'inform';

  isAuthorized: boolean;
  
  constructor(private ability: Ability) {
  }

  ngOnInit() {
    const canArray: boolean[] = [];
    for (let i = 0; i < this.permissions.length; i++) {
      const permission = this.permissions[i].split('.');
      const action = permission[0];
      const module = permission[1];

      canArray.push(this.ability.can(action, module));
    }

    // and - if contains false (not authorized)
    // or - if contains true (authorized)
    if (this.condition === 'and')
      this.isAuthorized = !canArray.includes(false);
    else 
      this.isAuthorized = canArray.includes(true);
  }

}
