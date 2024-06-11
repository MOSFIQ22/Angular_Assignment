import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/data/course'; // Ensure Course model is correctly defined
import { CourseService } from 'src/app/services/data/course.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  course:Course = {title:undefined, description:undefined, dueDate:undefined,status:undefined};
  courseForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl(new Date(), [Validators.required]),
    status: new FormControl(false, [Validators.required])
  });

  constructor(
    private courseService: CourseService,
    private notifyService: NotifyService          
  ) { }
  
  save(): void {
    if (this.courseForm.invalid) return;
    this.course = this.courseForm.value as Course;
    console.log(this.course);
    this.courseService.insert(this.course).subscribe({
      next: r => {
        this.notifyService.message('Data saved', 'DISMISS');
        this.course = { title:undefined, description:undefined, dueDate:undefined,status:undefined};
        this.courseForm.reset(this.course);
      },
      error: err => {
        this.notifyService.message('Failed to save data', 'DISMISS');
        console.error(err);
      }
    });
  }

  ngOnInit(): void {}

}
