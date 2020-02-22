import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationsService } from 'src/app/service/applications-service.service';
import { Application } from 'src/app/model/Application.model';
import { ValidationService } from 'src/app/service/validation-service.service';

@Component({
  selector: 'create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  applicationForm: FormGroup;
  userMessage: string;

  cancelUpdate: boolean = false;
  initialized: boolean = false;


  @Input() updateApplication: Application;
  id: number;

  constructor(private builder: FormBuilder, private service: ApplicationsService) {
    this.applicationForm = this.builder.group({
      name: ['', Validators.required],
      email: [null, [Validators.required, ValidationService.emailValidator]],
      age: ['', Validators.required],
      phone_number: ['', Validators.required],
      phone_or_email: ['', Validators.required],
      english_level: ['', Validators.required],
      available_to_start: ['', Validators.required],
      skills_courses: ['', [Validators.required]],
      personal_pres: ['', [Validators.required, Validators.minLength(10)]],
      study_from_home: [0, Validators.required],
    })

  }

  ngOnInit() {
    this.initialized = true;
  }

  ngOnChanges() {
    if (this.initialized != false) {
      this.cancelUpdate = true;
      console.log(this.updateApplication.available_to_start);

      this.applicationForm.setValue({
        name: this.updateApplication.name,
        email: this.updateApplication.email,
        age: this.updateApplication.age,
        phone_number: this.updateApplication.phone_number,
        phone_or_email: this.updateApplication.preffered_way_of_communication,
        english_level: this.updateApplication.english_level,
        available_to_start: new Date(this.updateApplication.available_to_start).toISOString().substring(0, 10),
        skills_courses: this.updateApplication.skills_courses,
        personal_pres: this.updateApplication.personal_pres,
        study_from_home: this.updateApplication.study_from_home,
      })
    }
  }

  createApplication() {
    var newApplication: Application = {
      id: 6,
      name: this.applicationForm.get('name').value,
      email: this.applicationForm.get('email').value,
      age: this.applicationForm.get('age').value,
      phone_number: this.applicationForm.get('phone_number').value,
      preffered_way_of_communication: this.applicationForm.get('phone_or_email').value,
      english_level: this.applicationForm.get('english_level').value,
      available_to_start: this.applicationForm.get('available_to_start').value,
      skills_courses: this.applicationForm.get('skills_courses').value,
      personal_pres: this.applicationForm.get('personal_pres').value,
      study_from_home: this.applicationForm.get('study_from_home').value ? 'Yes' : 'No'
    }


    if (this.applicationForm.dirty && this.applicationForm.valid && this.cancelUpdate == false) {
      console.log(this.applicationForm.get('available_to_start').value);

      this.service.getApplications().subscribe(
        res => this.service.addApplication(newApplication)
      )
      console.log("ADD")
    } else if (this.cancelUpdate == true) {

      this.service.getApplications().subscribe(
        res => this.service.updateApplication(newApplication))
      console.log("UPDATE");
    }

  }


  resetForm() {
    this.cancelUpdate = false;
    this.applicationForm.reset();
  }

}
