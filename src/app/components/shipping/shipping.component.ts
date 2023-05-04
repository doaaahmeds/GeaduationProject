import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { Icart } from 'src/app/models/icart';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    productsOfStorage: Icart[] = this.cartService.getProducts();
    totalPrice: number = this.cartService.getTotalPriceOfCart(this.productsOfStorage);

    productsOfITransactionItem: ITransactionItem[] = this.cartService.convertToITransactionItem(this.productsOfStorage);

    productsOfShipping: Icart[] | undefined = undefined;
    public payPalConfig?: IPayPalConfig;
    showCancel: boolean = false;
    showSuccess: boolean = false;
    showError: boolean = false;

    // itemsOfCart: ITransactionItem[] = [
    //     {
    //         name: 'Enterprise Subscription',
    //         quantity: '2',
    //         category: 'PHYSICAL_GOODS',
    //         unit_amount: {
    //             currency_code: 'USD',
    //             value: '100',
    //         }
    //     }, {
    //         name: 'Enterprise Subscription',
    //         quantity: '2',
    //         category: 'PHYSICAL_GOODS',
    //         unit_amount: {
    //             currency_code: 'USD',
    //             value: '100',
    //         }
    //     },

    // ];



    constructor(private router: Router,
        public cartService: CartService,

    ) {

    }



    ngOnInit(): void {
        this.initConfig();
        // this.cartService.convertToIcart().then((data) => {

        //     data.subscribe(data => {
        //         data.forEach(product => {
        //             this.totalPrice += product.totalPrice ?? 0;
        //         })
        //         this.productsOfShipping = data;

        //         this.cartService.getITransactionItem(this.productsOfShipping).then(data => {
        //             data.subscribe(data => {
        //                 this.productsOfITransactionItem = data;
        //             })

        //         });


        //     });
        // });


         this.productsOfShipping = this.cartService.getProducts();
        //      this.cartService.convertToIcart().subscribe(data=>{
        //         console.log(data);

        // this.productsOfShipping = data;
        // data.forEach(product=>{
        //     this.totalPrice+=product.totalPrice??0;
        // })
        //     this.cartService.getITransactionItem( this.productsOfShipping).subscribe(data=>{
        // this.productsOfITransactionItem= data;
        //  })  ;
        //  console.log(  this.productsOfShipping);
        //  console.log(  this.totalPrice);
        //  console.log(  this.productsOfITransactionItem);
        //  });

    }

    GoToCart() {
        this.router.navigate(['Cart'])
    }

    GoToCheckout() {
        this.router.navigate(['Checkout']);
    }


    private initConfig(): void {
        this.payPalConfig = {
            currency: 'USD',
            clientId: environment.clientId,
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: `${this.totalPrice}`,
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: `${this.totalPrice}`,
                                }
                            }
                        },
                        items: [
                            ...this.productsOfITransactionItem ,
                            // {
                            //     name: 'Enterprise Subscription',
                            //     quantity: '2',
                            //     category: 'DIGITAL_GOODS',
                            //     unit_amount: {
                            //         currency_code: 'USD',
                            //         value: '100',

                            //     },
                            // }
                        ]
                    }
                ]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
                localStorage.removeItem('products');
                this.productsOfShipping =[];
                // this.router.navigate(['/']); 
                this.productsOfStorage.forEach((product:Icart) => {
                    this.cartService.addOrder(product).then((response)=>{
                        console.log(response);
                        
                    }).catch((err)=>{
                        console.log(err);
                        
                    })
                })

               
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            },
        };
    }


    editEmail() {
        this.router.navigate(['Checkout']);
    }

    BackToCheckout() {
        this.router.navigate(['Checkout']);
    }
}
