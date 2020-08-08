import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TodoListComponent} from './shared/components/todo-list/todo-list.component';
import {MainComponent} from './pages/main/main.component';
import {MatButtonModule} from "@angular/material/button";
import {CreateToDoListDialogComponent} from './shared/components/create-todo-list-dialog/create-todo-list-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {EditDialogComponent} from './shared/components/edit-dialog/edit-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import { AcknowledgementDialogComponent } from './shared/components/acknowledgement-dialog/acknowledgement-dialog.component';
import { TaskComponent } from './shared/components/task/task.component';
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    MainComponent,
    CreateToDoListDialogComponent,
    EditDialogComponent,
    AcknowledgementDialogComponent,
    TaskComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
