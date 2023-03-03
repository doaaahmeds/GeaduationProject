import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';
import { Iproduct } from '../models/iproduct';
import { IsubCategory } from '../models/isub-category';


@Injectable({
  providedIn: 'root'
})
export class ProductsAPIService {

  constructor(private db: Firestore) { }

  // All products of offers
  getProductsOfOffers(): Observable<Iproduct[]> {
    let productesRef = collection(this.db, 'product');
    const q = query(productesRef, where("offer", "==", true));
    return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>
  }


  //  All Categories shose & bags
  getAllCategories(): Observable<ICategory[]> {
    let catRef = collection(this.db, 'category');
    // return collectionData(catRef, { idField: 'id' }) as Observable<ICategory[]>
    return collectionData(catRef, { idField: 'id' }) as Observable<ICategory[]>
  }

  // all sub categories of Bags
  getAllsubCatOfBags(): Observable<IsubCategory[]> {
    let subBagsRef = collection(this.db, 'subcategory');
    const q = query(subBagsRef, where("catid", "==", "vBEYRuSj9Us4ZPPUbg13"));
    return collectionData(q, { idField: 'id' }) as Observable<IsubCategory[]>
  }

  /* get Details Of SubCategory*/
  getDetailsOfSubCategory(subCategoryId: string): Observable<IsubCategory>{
    let subCatRef = doc(this.db, 'subcategory/' + subCategoryId);
    return docData(subCatRef, { idField: 'id' }) as Observable<IsubCategory>
  }


  // all sub categories of shose
  getAllsubCatOfshose(): Observable<IsubCategory[]> {
    let subshoseRef = collection(this.db, 'subcategory');
    const q = query(subshoseRef, where("catid", "==", "cgCpnqSfoejbeTYqAxQE"));
    return collectionData(q, { idField: 'id' }) as Observable<IsubCategory[]>
  }


  // get all products of sub category
  // getProductesOfSub(): Observable<Iproduct[]> {
  //   let productes = collection(this.db, 'product');
  //   const q = query(productes, where("subid", "==", "Mp7jz79bKhJXW0TsHjw8"));
  //   return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>
  // }

  getProductesOfSub(subId:string): Observable<Iproduct[]> {
    let productes = collection(this.db, 'product');
    const q = query(productes, where("subid", "==", subId));
    return collectionData(q, { idField: 'id' }) as Observable<Iproduct[]>
  }


  // get all products
  getAllProductes(): Observable<Iproduct[]> {
    let productes = collection(this.db, 'product');
    return collectionData(productes, { idField: 'id' }) as Observable<Iproduct[]>

  }


}
