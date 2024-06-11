import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Course } from 'src/app/models/data/course';
import { CourseService } from 'src/app/services/data/course.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDailogComponent } from '../../common/confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent {
  course: Course[] = [];
  columns: string[] = ['title', 'description', 'dueDate', 'status', 'actions'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>(this.course);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private notifyService:NotifyService
  ) {}

  confirmDelete(data:Course){
    //console.log(data);
    this.matDialog.open(ConfirmDailogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.courseService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Customer removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.id != data.id);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.courseService.get().subscribe({
      next: r => {
        this.course = r;
        this.dataSource = new MatTableDataSource<Course>(this.course);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: err=>{
        this.notifyService.message("Failed to load course", "DISMISS");
        throwError(()=>err)
      }
    });
  }
  
}
