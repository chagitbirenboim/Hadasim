import { Component } from '@angular/core';

import { User } from './_models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;

    constructor() {
    }

}