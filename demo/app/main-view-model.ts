import { Observable, EventData } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { WaveRefresh } from "nativescript-wave-refresh";

export class HelloWorldModel extends Observable {
  public users: any;
  private _isRefreshing: boolean;

  get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  set isRefreshing(value: boolean) {
    if (this._isRefreshing !== value) {
      this._isRefreshing = value;
      this.notifyPropertyChange("isRefreshing", value)
    }
  }


  constructor(waveRefresh: WaveRefresh) {
    super();
    this.isRefreshing = waveRefresh.refreshing;

    let usersArray = [
      { name: 'Rudolph' },
      { name: 'Comet' },
      { name: 'Cupid' },
      { name: 'Dancer' },
      { name: 'Comet' },
      { name: 'Prancer' },
      { name: 'Donner' },
      { name: 'Dasher' },
      { name: 'Vixen' },
      { name: 'Rudolph' },
      { name: 'Comet' },
      { name: 'Cupid' },
      { name: 'Dancer' },
      { name: 'Comet' },
      { name: 'Prancer' },
      { name: 'Donner' },
      { name: 'Dasher' },
      { name: 'Vixen' }
    ];

    this.users = new ObservableArray(usersArray);

    this.addEventListener(Observable.propertyChangeEvent, this.refreshChangeHandler, this);

  }

  private refreshChangeHandler(changeObj: any) {
    console.log(changeObj);
  }

  public stopRefresh(args: any) {
    let waveRefresh: WaveRefresh = args.object;
    setTimeout(function () {
      waveRefresh.refreshing = false;
    }, 1800);
  }



}