import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContratosComponent} from './contratos.component';
import {ContratosRouting} from './contratos.routing';
import {InfoContratosComponent} from './info-contratos/info-contratos.component';
import {RegContratosComponent} from './reg-contratos/reg-contratos.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SubidasModule} from '@shared/components/subidas/subidas.module';
import {RegClienteComponent} from '@dir-comercial/reg-cliente/reg-cliente.component';


@NgModule({
    declarations:
        [
            ContratosComponent,
            InfoContratosComponent,
            RegContratosComponent,
            RegClienteComponent
        ],
    imports:
        [
            CommonModule,
            ContratosRouting,
            PlantillasModule,
            MaterialModule,
            PrimeNgModule,
            FlexLayoutModule,
            WingetsModule,
            ReactiveFormsModule,
            SubidasModule
        ]
})
export class ContratosModule
{
}
