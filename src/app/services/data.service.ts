
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any = [];
  private dataSub = new BehaviorSubject<any>(this.data)
  public share = this.dataSub.asObservable();

  constructor() {


  }
  getLatestValue(data: any) {
    this.dataSub.next(data);

  }
  deleteItem(id: number) {
    const index = this.data.filter((e: any) => e.id !== id)
    const x = this.data.splice(index, 1);
  }

}
