import { Injectable ,Inject} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const Language_STORAGE_KEY = 'Language';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageeService {
  private storageStatus = new Subject<string>();
  constructor (
  @Inject(LOCAL_STORAGE)
  private storage: StorageService)
{
  
}

watchStorage(): Observable<any> {
  return this.storageStatus.asObservable();
}


public setStatus(status: string) {
  this.storage.set(Language_STORAGE_KEY, status);
  this.storageStatus.next('changed'); 
}


public getStatus() {
  return this.storage.get(Language_STORAGE_KEY);
}
}
