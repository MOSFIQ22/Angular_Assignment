import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule} from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotifyService } from './services/shared/notify.service';
import { ConfirmDailogComponent } from './components/common/confirm-dailog/confirm-dailog.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseViewComponent,
    CourseCreateComponent,
    CourseEditComponent,
    NavBarComponent,
    HomeComponent,
    ConfirmDailogComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    MatImportModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [NotifyService,ConfirmDailogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
