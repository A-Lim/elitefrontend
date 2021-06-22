import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Base } from '../base.component';
import { takeUntil, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends Base implements OnInit, OnDestroy {
  public menuIsOpened: boolean = false;
  public isHoverOver: boolean = false;
  
  sideMenuWorkflow$: Observable<Workflow[]>;

  constructor(private renderer: Renderer2,
    private workflowSvc: WorkflowService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.workflowSvc.getWorkflowsForSideMenu()
      .subscribe();
      
    this.updateSideMenuState();
    this.sideMenuWorkflow$ = this.workflowSvc.sideMenuWorkflow$;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  toggleMenu() {
    this.menuIsOpened = !this.menuIsOpened;

    this.updateSideMenuState();
  }

  onMouseEnter() {
    if (this.menuIsOpened)
      return;
    
    this.isHoverOver = true;
  }

  onMouseLeave() {
    if (this.menuIsOpened)
      return;
    this.isHoverOver = false;
  }

  updateSideMenuState() {
    if (this.menuIsOpened) {
      this.renderer.removeClass(document.body, 'menu-collapsed');
      this.renderer.addClass(document.body, 'menu-expanded');
    } else {
      this.renderer.removeClass(document.body, 'menu-expanded');
      this.renderer.addClass(document.body, 'menu-collapsed');
    }
  }

  routeTo(path:string, id?: number) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([path, id]);
  }
}
