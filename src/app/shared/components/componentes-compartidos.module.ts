import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GaleriaComponent} from '@shared/components/galeria/galeria.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UrlImagenPipe} from './galeria/url-imagen.pipe';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import { DetallesClientesComponent } from './clientes/detalles-clientes/detalles-clientes.component';
import { DetalleContratoComponent } from './clientes/detalle-contrato/detalle-contrato.component';


@NgModule({
    declarations:
        [
            GaleriaComponent,
            UrlImagenPipe,
            DetallesClientesComponent,
            DetalleContratoComponent,
        ],
    exports:
        [
            GaleriaComponent
        ],
    imports:
        [
            CommonModule,
            FlexLayoutModule,
            PrimeNgModule
        ]
})
export class ComponentesCompartidosModule
{
}
