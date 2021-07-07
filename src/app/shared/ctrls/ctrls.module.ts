import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelecDeptoDropComponent} from '@shared/ctrls/selec-depto-drop/selec-depto-drop.component';
import {FechaComponent} from '@shared/ctrls/fecha/fecha.component';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RegModalesComponent } from './reg-modales/reg-modales.component';
import { AccionPortalComponent } from './accion-portal/accion-portal.component';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
    declarations: [SelecDeptoDropComponent, FechaComponent, RegModalesComponent, AccionPortalComponent],
    imports:
        [
            CommonModule,
            MaterialModule,
            FlexLayoutModule,
            PortalModule
        ],
    exports:
        [
            SelecDeptoDropComponent, FechaComponent, RegModalesComponent, AccionPortalComponent
        ]
})
export class CtrlsModule
{
}
