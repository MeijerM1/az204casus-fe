import { Component } from '@angular/core';
import { CreateReservation } from './models/CreateReservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  onSelectFile(fileInput: any) {
    this.reservation.foto = <File>fileInput.target.files[0];

    console.log(this.reservation.foto);
  }

  async createReservation() {
    if (!this.reservation.foto) {
      return;
    }

    const formData = new FormData();
    formData.append('voornaam', this.reservation.voornaam);
    formData.append('achternaam', this.reservation.achternaam);
    formData.append('foto', this.reservation.foto, this.reservation.foto.name);

    const res = await this.httpClient.post(this.apiUrl, formData).toPromise();

    this.getReservations();
  }

  async getReservations() {
    this.reservations = await this.httpClient.get<Reservation[]>(this.apiUrl).toPromise();
  }
}
