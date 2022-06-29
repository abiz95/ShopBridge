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
  // private store = new LocalDataModel();
  constructor(
    // private userInfoService: UserInfoService, 
    // private authSharedService: AuthSharedService, 
    private localDataService: LocalDataService
    ) { }

  ngOnInit() {
    // this.userId = this.authSharedService.getSessionUserId();
    // this.profileImgDetailService = this.userInfoService.getProfilePicture(this.userId).subscribe(
    //   // res => {
    //   // this.retrieveResonse = res;
    //   // this.base64Data = this.retrieveResonse;
    //   // this.retrievedImage = 'data:image/jpeg;base64,' + this.retrieveResonse;

    //   // const reader = new FileReader();
    //   // reader.onload = (e) => this.retrieveResonse = e.target.result;
    //   // reader.readAsDataURL(new Blob([res]));
    //   // console.log('img res: ', JSON.stringify(reader));
    //   // this.retrievedImage = reader;

    //   // let objectURL = 'data:image/jpeg;base64,' + res;
    //   // this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //   // }
    //   image => this.createImage(image),
    //   err => this.handleImageRetrievalError(err)
    // );
    this.getProfileDetails();
    this.getBehdata();

    this.toggleSideBarChange();
  }

  // isSideBarToggled() {
  //   console.log('isSideBarOpen ',this.localDataService.isSideBarOpen)
  //   this.localDataService.sidebarOnChange(true);
  // }

  isSideBarToggled() {
    // this.toggleSideBarForMe.emit();
    // setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 300);
    console.log('header toggleSideBar',this.isSideBarOpen);
    this.localDataService.sidebarOnChange(!this.isSideBarOpen);
  }
  toggleSideBarChange() {
    this.localDataService.isSideBarOpen.subscribe((isOpen => {
      this.isSideBarOpen = isOpen;
    }));
  }

  private handleImageRetrievalError(err: Error) {
    console.error(err);
    // this.showSpinner = false;
    // this.alertService.error("Problem retrieving profile photo.");
  }

  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.retrievedImage = reader.result;
        // this.showSpinner = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      // this.showSpinner = false;
    }
  }

  private getProfileDetails() {
    // this.profileDetailService = this.userInfoService.getProfilePictureInfo(this.userId).subscribe(
    //   res => {
    //     this.profileDetails = res;
    //     this.userName = this.profileDetails.firstName + ' ' + this.profileDetails.lastName;
    //     console.log('profile resp: ', this.profileDetails);
    //     console.log('first name: ', this.profileDetails.firstName);
    //     this.localDataService.setProfileBasicInfo(this.profileDetails);
    //   }
    // );
  }

  getBehdata() {
    // this.localDataService.getLocalData().subscribe(
    //     (update) => {
    //       this.store = update;
    //       console.log('localDataService: ', update);
    //     }
    // );
  }

  ngOnDestroy(): void {

    if (this.profileImgDetailService) {
      // console.log("unsubscribe")
      this.profileImgDetailService.unsubscribe();
    }
    if (this.profileDetailService) {
      // console.log("unsubscribe")
      this.profileDetailService.unsubscribe();
    }
  }
}
