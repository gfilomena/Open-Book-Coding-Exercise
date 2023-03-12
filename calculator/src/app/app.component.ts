import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';


  public expression: string = '';
  expressionUpdate = new Subject<string>();
  message = '';

  constructor() {
    // Debounce on the input.
    this.expressionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        this.message = value;
      });
  }
}

