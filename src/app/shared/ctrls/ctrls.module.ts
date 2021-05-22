import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelecDeptoDropComponent} from '@shared/ctrls/selec-depto-drop/selec-depto-drop.component';
import {FechaComponent} from '@shared/ctrls/fecha/fecha.component';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [SelecDeptoDropComponent, FechaComponent],
    imports:
        [
            CommonModule,
            MaterialModule,
            FlexLayoutModule
        ],
    exports:
        [
            SelecDeptoDropComponent, FechaComponent
        ]
})
export class CtrlsModule
{
}
