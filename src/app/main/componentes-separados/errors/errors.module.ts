import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Error404Component} from './404/error-404.component';
import {Error500Component} from './500/error-500.component';
import {FuseSharedModule} from '@plantilla/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {ErrorsRoutingModule} from './errors.routing';
import {MttoComponent} from './maintenance/mtto.component';
import {Error401Component} from './error401/error401.component';

@NgModule({
    declarations:
        [
            Error404Component,
            Error500Component,
            MttoComponent,
            Error401Component
        ],
    imports: [
        CommonModule,
        FuseSharedModule,
        MatIconModule,
        RouterModule,
        ErrorsRoutingModule
    ]
})
export class ErrorsModule
{
}
