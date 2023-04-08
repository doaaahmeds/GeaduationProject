import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where ,orderBy, getDocs, startAt, endAt} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from 'src/app/models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnInit {

  private textOfSearch: BehaviorSubject<string>;

  constructor(private db: Firestore) {
    this.textOfSearch = new BehaviorSubject<string>('');
  }
  ngOnInit() {
    console.log(this.textOfSearch);

  }


  get valueOfSearch(): string {
    return this.textOfSearch.getValue();
  }

  setvalueOfSearch(value: string): void {
    this.textOfSearch.next(value);
  }



//   GetDataOfSearch(): Observable<Iproduct[]> {
//   let productesRef = collection(this.db, 'product');
//   const q = query(productesRef, where("name", "in",
//   [this.textOfSearch.getValue()]));
//   return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>
// }

//   GetDataOfSearch(): Observable<Iproduct[]> {
//   let productesRef = collection(this.db, 'product')

//   const q = query(productesRef, where("name", "array-contains",
//     [this.textOfSearch.getValue()]));
//   return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>
// }




}

