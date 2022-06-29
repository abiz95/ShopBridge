import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { commons } from 'src/app/app.constants';
import { LocalDataService } from '../../services/LocalDataService/local-data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe : EventEmitter<any> = new EventEmitter();
  appName: string = commons.appName
  isSideBarOpen: boolean;
  constructor(
    // private adminAuth: AuthSharedService, 
    private router: Router,
    private localDataService: LocalDataService,
    ) { }

  ngOnInit() {
    this.toggleSideBarChange();
  }

  toggleSideBar() {
    // this.toggleSideBarForMe.emit();
    // setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 300);
    this.localDataService.sidebarOnChange(!this.isSideBarOpen);
  }
  toggleSideBarChange() {
    this.localDataService.isSideBarOpen.subscribe((isOpen => {
      this.isSideBarOpen = isOpen;
    }));
  }
  

  profileLink() {
    this.router.navigate(['admin/profile'])
  }
}
