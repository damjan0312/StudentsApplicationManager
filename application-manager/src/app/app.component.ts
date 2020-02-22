import { Component } from '@angular/core';
import { Application } from './model/Application.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application-manager';

  updateApp: Application;

  reciveApplicationForUpdate($event) {
    this.updateApp = $event;
  }
}
