import { Injectable } from '@angular/core';
import { monthNames } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { 

  }
  getCurrentMonth(){
    return monthNames[(new Date()).getMonth()];
  }
  getMondays() {
    let d = new Date(),
        month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return mondays;
}
}
