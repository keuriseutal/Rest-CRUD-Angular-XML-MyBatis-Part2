import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Student } from "../models/student.model";
import { Account } from "../models/account.model";

const STUDENTS_API: string = "http://localhost:8080/school/students/";
const STUDENT_API: string = "http://localhost:8080/school/student/";
const LOGIN_API: string = "http://localhost:8080/school/login";
const LOGOUT_API: string = "http://localhost:8080/school/logout";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class StudentService {
  constructor(private http: HttpClient) {}

  login(payload: Account): Observable<Account> {
    return this.http
      .post<Account>(LOGIN_API, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  logout() {
    return this.http
      .get(LOGOUT_API)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getAccounts(): Observable<Account[]>{
    return this.http
      .get<Account[]>(STUDENTS_API)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(STUDENTS_API)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getStudentById(id: number): Observable<Student> {
    return this.http
      .get<Student>(`${STUDENT_API}/${id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getStudentsBySearchValue(value: string): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${STUDENT_API}/search/${value}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  addStudent(payload: Student): Observable<Student> {
    console.log("creating... " + payload.fname);

    return this.http
      .post<Student>(STUDENT_API, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateStudent(payload: Student): Observable<Student> {
    console.log("updating... " + payload.fname);

    return this.http
      .put<Student>(`${STUDENT_API}/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  deleteStudent(payload: Student): Observable<Student> {
    console.log("deleting... " + payload.fname);

    return this.http
      .delete<Student>(`${STUDENT_API}/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  deleteAll(payload: Student[]): Observable<Student[]> {
    console.log("clearing everything... ");

    return this.http
      .delete<Student[]>(STUDENT_API)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
