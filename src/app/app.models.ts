import { BehaviorSubject } from "rxjs";

export class LocalDataModel {
    productData = new BehaviorSubject<any[]>([]);
    // gigSearchResultList = new BehaviorSubject<any[]>([]);
}