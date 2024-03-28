import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'member/:id', component: MemberDetailsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
