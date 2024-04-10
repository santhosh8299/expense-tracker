import { Injectable } from '@angular/core';
import { monthNames } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  date = new Date();
  constructor() { 

  }
  getCurrentMonth(){
    return monthNames[this.date.getMonth()];
  }
  getMondays() {
    let d = this.date,
        month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push((new Date(d.getTime())).getDate());
        d.setDate(d.getDate() + 7);
    }

    return mondays;
}
}
