import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirComercialComponent} from './dir-comercial.component';
import {RouterModule} from '@angular/router';
import {DirComercialRouting} from './dir-comercial.routing';
import { MedRefPipe } from './pipes/med-ref.pipe';

@NgModule({
    declarations:
        [
            DirComercialComponent,
            MedRefPipe,
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
