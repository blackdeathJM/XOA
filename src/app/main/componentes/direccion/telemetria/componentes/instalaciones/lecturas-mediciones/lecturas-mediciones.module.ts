import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LecturasMedicionesComponent} from './lecturas-mediciones.component';
import {RegMedicionComponent} from './reg-medicion/reg-medicion.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {GraficaLectMedicionComponent} from './grafica-lect-medicion/grafica-lect-medicion.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {TablaLectMedComponent} from './tabla-lect-med/tabla-lect-med.component';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {CtrlsModule} from '@shared/ctrls/ctrls.module';


@NgModule({
    declarations: [LecturasMedicionesComponent, RegMedicionComponent, GraficaLectMedicionComponent, TablaLectMedComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        PlantillasModule,
        WingetsModule,
        CtrlsModule
    ]
})
export class LecturasMedicionesModule
{
}
