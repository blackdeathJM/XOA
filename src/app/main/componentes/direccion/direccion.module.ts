import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {DireccionRouting} from './direccion.routing';
import {ArchivoUrlModule} from '../../pipes/archivo-url.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AdministracionDocModule} from './documentos/administracion-doc.module';
import {DireccionComponent} from './direccion.component';
import {TelemetriaModule} from './telemetria/telemetria.module';


@NgModule({
    declarations:
        [
            DireccionComponent
        ],
    imports:
        [
            CommonModule,
            RouterModule,
            TelemetriaModule,
            NgxBootstrapModule,
            MaterialModule,
            FlexModule,
            ArchivoUrlModule,
            AdministracionDocModule,
            ReactiveFormsModule,
            DireccionRouting
        ]
})
export class DireccionModule
{
}
