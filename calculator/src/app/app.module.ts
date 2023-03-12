import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RandomService } from './services/random.service';

@NgModule({
  declarations: [AppComponent, CalculatorComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [RandomService],
  bootstrap: [AppComponent],
})
export class AppModule {}
