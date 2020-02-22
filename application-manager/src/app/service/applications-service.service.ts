import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Application } from '../model/Application.model'
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ApplicationsService {
    //test data
    application_data: Application[] = [{
        id: 1,
        name: "Derk Byllam",
        email: "dbyllam0@1688.com",
        age: 23,
        phone_number: "324644",
        preffered_way_of_communication: "Phone",
        english_level: "Advanced",
        available_to_start: new Date("5/30/2019"),
        skills_courses: "European Union Politics",
        personal_pres: "nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse",
        study_from_home: "Yes"
    }, {
        id: 2,
        name: "Ethe Wyman",
        email: "ewyman1@forbes.com",
        age: 20,
        phone_number: "324645",
        preffered_way_of_communication: "Phone",
        english_level: "Advanced",
        available_to_start: new Date("4/1/2020"),
        skills_courses: "GGY Axis",
        personal_pres: "rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa",
        study_from_home: "Yes"
    }, {
        id: 3,
        name: "Ogden Buckle",
        email: "obuckle2@cdbaby.com",
        age: 24,
        phone_number: "324646",
        preffered_way_of_communication: "Email",
        english_level: "Beginner",
        available_to_start: new Date("2/3/2019"),
        skills_courses: "SNF",
        personal_pres: "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et",
        study_from_home: "No"
    }, {
        id: 4,
        name: "Rey Killigrew",
        email: "rkilligrew3@drupal.org",
        age: 16,
        phone_number: "324647",
        preffered_way_of_communication: "Phone",
        english_level: "Intermediate",
        available_to_start: new Date("8/3/2019"),
        skills_courses: "Executive Administrative Assistance",
        personal_pres: "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus",
        study_from_home: "Yes"
    }, {
        id: 5,
        name: "Nadya Whimper",
        email: "nwhimper4@privacy.gov.au",
        age: 21,
        phone_number: "324648",
        preffered_way_of_communication: "Phone",
        english_level: "Beginner",
        available_to_start: new Date("7/25/2019"),
        skills_courses: "QSIG",
        personal_pres: "faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi",
        study_from_home: "No"
    }];

    //simulating http
    http = {
        get: (url) => of(this.application_data)
    }
    public applications$ = new BehaviorSubject(this.application_data);

    constructor() {

    }


    getApplications(): Observable<Application[]> {
        return this.http.get('').pipe(
            map(item => item),
            tap(data => {
                console.log(data)
                this.applications$.next(data)
            })
        );
    }

    addApplication(newApplication: Application): void {

        this.applications$.pipe(
            take(1)
        ).subscribe((current: Application[]) => {
            current.push(newApplication);
            this.applications$.next(current);
        })

    }

    deleteApplication(id: number): void {
        this.applications$.pipe(
            take(1)
        ).subscribe((current: Application[]) => {
            let index = current.findIndex(item => item.id == id);
            current.splice(index, 1);
            this.applications$.next(current);
        })
    }

    updateApplication(app: Application): void {
        console.log("POSLATA APP: ", app)
        this.applications$.pipe(
            take(1)
        ).subscribe((current: Application[]) => {
            let index = current.findIndex(item => item.email === app.email);
            console.log("INDEX", index)
            current[index] = {
                id: app.id,
                name: app.name,
                email: app.email,
                age: app.age,
                phone_number: app.phone_number,
                preffered_way_of_communication: app.preffered_way_of_communication,
                english_level: app.english_level,
                available_to_start: app.available_to_start,
                skills_courses: app.skills_courses,
                personal_pres: app.personal_pres,
                study_from_home: app.study_from_home,
            };
            this.applications$.next(current);
            console.log(current);
        })
    }



}