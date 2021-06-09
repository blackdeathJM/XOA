import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelecDeptoDropComponent} from '@shared/ctrls/selec-depto-drop/selec-depto-drop.component';
import {FechaComponent} from '@shared/ctrls/fecha/fecha.component';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RegModalesComponent } from './reg-modales/reg-modales.component';

@NgModule({
    declarations: [SelecDeptoDropComponent, FechaComponent, RegModalesComponent],
    imports:
        [
            CommonModule,
            MaterialModule,
            FlexLayoutModule
        ],
    exports:
        [
            SelecDeptoDropComponent, FechaComponent, RegModalesComponent
        ]
})
export class CtrlsModule
{
}
