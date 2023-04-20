import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { LocalstorageeService } from 'src/app/services/localstoragee.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products: Iproduct[] = [];
  productsOfSearch: Iproduct[] = [];
  wordOfSearch:string = '';
  lang:string='';

  constructor(private searchService: SearchService,
    private prodSer : ProductsAPIService,    private localstorage:LocalstorageeService, ) { }

  ngOnInit(): void {
    this.prodSer.getAllProductes().subscribe((data)=>{
      this.products=data
    })
    this.getDataOfSearch(this.searchService.valueOfSearch)
  }


  // getDataOfSearch(valueOfSearch: string) {
  //   this.wordOfSearch=valueOfSearch
  //   this.searchService.setvalueOfSearch(valueOfSearch)
  //   this.searchService.GetDataOfSearch().subscribe(
  //     (data => {
  //       console.log(data);
  //       this.productsOfSearch = data
  //     })
  //   )
  // }

  getDataOfSearch(valueOfSearch: string) {
    this.wordOfSearch=valueOfSearch
    this.lang=this.localstorage.getStatus();
    if(this.lang=='en'){
    this.productsOfSearch=this.products.filter(product => product.name.toLowerCase().includes(valueOfSearch.toLowerCase()))
    } else if(this.lang=='ar'){
      this.productsOfSearch=this.products.filter(product => product.name_ar
        .toLowerCase().includes(valueOfSearch.toLowerCase()))
    }

   
  }


}
