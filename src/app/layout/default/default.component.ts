import { Component, NgZone, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { LocalDataService } from 'src/app/shared/services/LocalDataService/local-data-service.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  isSideBarOpen: any;
  localData: any;

  constructor(
    private router: Router,
    public zone: NgZone,
    private localDataService: LocalDataService,
  ) {
  }

  ngOnInit() {
    this.isSideBarToggled();
  }

  isSideBarToggled() {
    this.localData = this.localDataService.isSideBarOpen.subscribe((isOpen => {
      this.isSideBarOpen = isOpen;
    }));
  }

  ngOnDestroy(): void {
    if (this.localData) {
      this.localData.unsubscribe();
    }
  }
}
