import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/data/course';
import { environment } from 'src/app/models/shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/Courses`);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/Courses/${id}`);
  }

  insert(data: Course): Observable<Course> {
    console.log(data);
    return this.http.post<Course>(`${this.apiUrl}/Courses`, data);
  }

  update(data: Course): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Courses/${data.id}`, data);
  }

  delete(data: Course): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Courses/${data.id}`);
  }

}
