import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    products = this.cartService.getProducts();
    totalPrice: number = this.cartService.getTotalPrice();


    public payPalConfig?: IPayPalConfig;
    showCancel: boolean = false;
    showSuccess: boolean = false;
    showError: boolean = false;

    itemsOfCart: ITransactionItem[] = [
        {
            name: 'Enterprise Subscription',
            quantity: '2',
            category: 'PHYSICAL_GOODS',
            unit_amount: {
                currency_code: 'USD',
                value: '100',
            }
        },{
            name: 'Enterprise Subscription',
            quantity: '2',
            category: 'PHYSICAL_GOODS',
            unit_amount: {
                currency_code: 'USD',
                value: '100',
            }
        },

    ];
    constructor(private router: Router, public cartService: CartService) { }


    ngOnInit(): void {
        console.log(this.products);
        this.initConfig();
    }

    // getItemOfCart(): ITransactionItem {

    //     return item= this.itemsOfCart.map((prod) => {
    //         return {
    //             name: 'Enterprise Subscription',
    //             quantity: '2',
    //             category: 'PHYSICAL_GOODS',
    //             unit_amount: {
    //                 currency_code: 'USD',
    //                 value: '100',
    //             },
    //         }
    //     })

    // }
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
                        items: [... this.itemsOfCart,
                            {
                                name: 'Enterprise Subscription',
                                quantity: '2',
                                category: 'DIGITAL_GOODS',
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '100',

                                },
                            }
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
