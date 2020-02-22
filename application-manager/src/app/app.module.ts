import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadApplicationsComponent } from './components/read-applications/read-applications.component';
import { CreateApplicationComponent } from './components/create-application/create-application.component';
import { ApplicationsService } from './service/applications-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadApplicationsComponent,
    CreateApplicationComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ApplicationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
