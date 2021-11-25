import { Component } from '@angular/core';
import { CreateReservation } from './models/CreateReservation';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './models/Reservation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rsvp-casus';
  reservation: CreateReservation;
  apiUrl = 'https://maxenthijsrsvpapi.azurewebsites.net/rsvp';
  reservations: Reservation[] = [];

  constructor(private httpClient: HttpClient) {
    this.reservation = {
      voornaam: '',
      achternaam: '',
      foto: undefined
    };

    this.getReservations();
  }

  async createReservation() {
    const res = await this.httpClient.post(this.apiUrl, this.reservation).toPromise();
  }

  async getReservations() {
    this.reservations = await this.httpClient.get<Reservation[]>(this.apiUrl).toPromise();
  }
}
