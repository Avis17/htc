import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private _toggleClicked = new BehaviorSubject<any>(false);

  getToggleClicked()
  {
    return this._toggleClicked
  }

  setToggleClicked(value:boolean)
  {
    console.log(this._toggleClicked)
    return this._toggleClicked.next(value)
  }

  isAdminCheck()
  {
    let userDetails = JSON.parse(sessionStorage.getItem('user') || '');
    if(userDetails)
    {
      return userDetails.isAdmin ? userDetails.isAdmin : undefined
    }
    return undefined
  }
}
