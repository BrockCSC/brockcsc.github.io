import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const stripe = require('stripe')(
  'sk_test_51Py13yHoNB5knWYTcXWR3c9WyB0QlAhOd9JAqTLoq2F278CGfSy5eB4MsUxMxABzmf4U65K4EeIi8HHmu63aZuif00zX7xzwJ4'
);

@Component({
  selector: 'csc-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkout_session_id: string;
  item_name: string;

  email: string;
  name: string;
  phone: string;
  student_id: string;
  color: string;
  size: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  async getSession() {
    const session = await stripe.checkout.sessions.retrieve(
      this.checkout_session_id
    );

    console.log(session);

    this.email = session.customer_details.email;
    this.name = session.customer_details.name;
    this.phone = session.customer_details.phone;
    this.student_id = session.custom_fields[0].numeric.value;
    this.color =
      session.custom_fields[1].dropdown.value.charAt(0).toUpperCase() +
      session.custom_fields[1].dropdown.value.slice(1);
    this.size = session.custom_fields[2].dropdown.value.toUpperCase();

    this.saveDataToGoogle();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.checkout_session_id = params['checkoutId'];
      this.item_name = params['item'];

      this.getSession();

      if (this.item_name == '2024 Hoodie') {
        console.log('update image');
        const image: HTMLImageElement = document.getElementById(
          'checkout-image'
        ) as HTMLImageElement;
        image.src = 'app/../assets/merch/2024-checkout.png';
      }
    });
  }

  goToMerch() {
    window.location.href = '/merch';
  }

  saveDataToGoogle() {
    this.http
      .post(
        `https://docs.google.com/forms/d/e/1FAIpQLSf1FRKOFBc9LD-jx3Io8qskUks6nloPgT3EugiYbVQazHwy4w/formResponse?usp=pp_url&entry.1391238242=${this.student_id}&entry.1187682993=${this.email}&entry.616117323=${this.name}&entry.1041164580=${this.phone}&entry.1770527721=${this.color}&entry.1869920237=${this.size}&entry.2111802762=${this.checkout_session_id}`,
        null
      )
      .subscribe();
  }
}
