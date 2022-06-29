import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../services/LocalDataService/local-data-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userId: any;
  userName: string;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  profileDetailService: any;
  profileDetails: any;
  profileImgDetailService: any;

  isSideBarOpen: boolean;
  constructor(
    private localDataService: LocalDataService
    ) { }

  ngOnInit() {
    this.toggleSideBarChange();
  }

  isSideBarToggled() {
    this.localDataService.sidebarOnChange(!this.isSideBarOpen);
  }
  toggleSideBarChange() {
    this.localDataService.isSideBarOpen.subscribe((isOpen => {
      this.isSideBarOpen = isOpen;
    }));
  }


  ngOnDestroy(): void {

    if (this.profileImgDetailService) {
      this.profileImgDetailService.unsubscribe();
    }
    if (this.profileDetailService) {
      this.profileDetailService.unsubscribe();
    }
  }
}
