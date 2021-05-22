import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegLecturaComponent} from './reg-lectura/reg-lectura.component';
import {LecturasParametrosComponent} from './lecturas-parametros.component';
import {GraficarParametrosComponent} from './graficar-parametros/graficar-parametros.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations:
        [
            RegLecturaComponent,
            LecturasParametrosComponent,
            GraficarParametrosComponent
        ],
    imports:
        [
            CommonModule,
            PlantillasModule,
            FlexLayoutModule,
            MaterialModule,
            WingetsModule,
            ReactiveFormsModule
        ]
})
export class LecturasParametrosModule
{
}
