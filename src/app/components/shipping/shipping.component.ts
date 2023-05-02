import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    productsOfShipping : Iproduct[] | undefined = undefined;
    public payPalConfig?: IPayPalConfig;
    showCancel: boolean = false;
    showSuccess: boolean = false;
    showError: boolean = false;

    constructor(private router: Router, public cartService: CartService) { }


    ngOnInit(): void {
        this.initConfig();
        this.productsOfShipping = this.cartService.getProducts();

    }

    GoToCart()
    {
      this.router.navigate(['Cart'])
    }

    GoToCheckout()
  {
    this.router.navigate(['Checkout']);
  }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'USD',
            clientId:environment.clientId ,
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: '200',
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '200'
                                }
                            }
                        },
                        items: [
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
                actions.order.get().then((details : any) => {
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
