import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home';
import { AddMemberComponent } from './add-member/add-member.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './_services/user.service';
import { MemberDetailsComponent } from './member-details/member-details.component';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddMemberComponent,
        AddMemberModalComponent,
        UserListComponent,
        MemberDetailsComponent
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }