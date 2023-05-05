import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor( private toast : ToastrService) { }
  ngOnInit(){

  }
  showToaster(message : string){
    this.toast.success(message)
}
showToasterFail(message : string){
  this.toast.error(message)
}
}
