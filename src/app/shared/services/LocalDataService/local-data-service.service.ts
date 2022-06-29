import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalDataModel } from 'src/app/app.models';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  id: any = 0;
  isSideBarOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  localDataArray = [];

  private localData =  new BehaviorSubject<LocalDataModel>(
    new LocalDataModel()
  );

  public getLocalData(): Observable<LocalDataModel> {
    return this.localData.asObservable();
  }

  public setProductData(data: any[]): void {
    this.localData.value.productData.next(data);
  }

  public sidebarOnChange(data: boolean) {
    this.isSideBarOpen.next(data);
  }
  // public setSearchResultData(data: any[]): void {
  //   this.localData.value.gigSearchResultList.next(data);
  // }

  constructor() { }
}
