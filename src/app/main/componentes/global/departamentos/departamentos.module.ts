import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudDepartamentoComponent} from './crud-departamento/crud-departamento.component';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseProgressBarModule} from '@plantilla/components';
import {DepartamentosComponent} from './departamentos.component';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {FlexModule} from '@angular/flex-layout';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';

@NgModule({
    declarations:
        [
            DepartamentosComponent,
            CrudDepartamentoComponent
        ],
    imports:
        [
            CommonModule,
            MaterialModule,
            FormsModule,
            ReactiveFormsModule,
            FuseProgressBarModule,
            NgxBootstrapModule,
            FlexModule,
            PrimeNgModule,
            PlantillasModule,
        ]
})
export class DepartamentosModule
{
}
