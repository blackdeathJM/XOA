import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirComercialComponent} from './dir-comercial.component';
import {RouterModule} from '@angular/router';
import {DirComercialRouting} from './dir-comercial.routing';

@NgModule({
    declarations:
        [
            DirComercialComponent,
        ],
    imports:
        [
            CommonModule,
            RouterModule,
            DirComercialRouting
        ]
})
export class DirComercialModule
{
}
