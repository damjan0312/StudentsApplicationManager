import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApplicationsService } from 'src/app/service/applications-service.service';
import { Application } from 'src/app/model/Application.model';

@Component({
  selector: 'read-applications',
  templateUrl: './read-applications.component.html',
  styleUrls: ['./read-applications.component.css']
})
export class ReadApplicationsComponent implements OnInit {


  table_columns: string[] = ['Name', 'Email', 'Age', 'Phone Number',
    'Preferred Way of Communication',
    'English Level', 'Available to Start',
    'Technical Skills and Courses',
    'Short Personal Presentation',
    'Study from home', 'Delete', 'Update'];

  application_data: Application[];

  @Output() applicationForUpdate = new EventEmitter<Application>(); // send this to parent 

  constructor(private service: ApplicationsService) { }

  ngOnInit() {

    this.service.getApplications().subscribe(res => {
      this.application_data = res as Application[];
    });

  }

  deleteApplication(id: number) {
    this.service.deleteApplication(id);
  }
  updateApplication(application: Application) {
    this.applicationForUpdate.emit(application);
  }

}
