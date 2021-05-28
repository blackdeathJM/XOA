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
import {ConsultaContratosComponent} from './info-contratos/consulta-contratos/consulta-contratos.component';
import {SolicitudServAguaComponent} from './solicitud-serv-agua/solicitud-serv-agua.component';
import {RegSolicitudServComponent} from './reg-solicitud-serv/reg-solicitud-serv.component';
import {NgxsModule} from '@ngxs/store';
import { DetallesSolicitudServComponent } from './info-contratos/detalles-solicitud-serv/detalles-solicitud-serv.component';


@NgModule({
    declarations:
        [
            ContratosComponent,
            InfoContratosComponent,
            RegContratosComponent,
            RegClienteComponent,
            ConsultaContratosComponent,
            SolicitudServAguaComponent,
            RegSolicitudServComponent,
            DetallesSolicitudServComponent
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
