import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '@ui-externos/material/material.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {FuseSharedModule} from '@plantilla/shared.module';
import {SharedModule} from '@shared/shared.module';
import {GlobalRouting} from './global.routing';
import {GlobalComponent} from './global.component';
import {DepartamentosModule} from '@global/departamentos.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OrdenesTrabajoModule} from '@glogal/../dir-area-tecnica/ordenes-trabajo/ordenes-trabajo.module';


@NgModule({
    declarations:
        [GlobalComponent],
    imports:
        [
            CommonModule,
            FuseSharedModule,
            FormsModule,
            ReactiveFormsModule,
            OverlayModule,
            SharedModule,
            MaterialModule,
            FlexLayoutModule,
            DepartamentosModule,
            OrdenesTrabajoModule,
            GlobalRouting
        ],
    exports:
        [],
    providers:
        []
})
export class GlobalModule
{
}
