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
import {DetallesSolicitudServComponent} from './info-contratos/detalles-solicitud-serv/detalles-solicitud-serv.component';
import {DetalleContratoComponent} from './info-contratos/detalle-contrato/detalle-contrato.component';
import {DetalleReferenciaComponent} from './info-contratos/detalle-referencia/detalle-referencia.component';
import {TarjetaSolicitudServComponent} from './info-contratos/tarjeta-solicitud-serv/tarjeta-solicitud-serv.component';
import {TarjetaContratosComponent} from './info-contratos/tarjeta-contratos/tarjeta-contratos.component';
import {PortalModule} from '@angular/cdk/portal';
import {NgxsModule} from '@ngxs/store';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {SharedModule} from '@shared/shared.module';


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
            DetallesSolicitudServComponent,
            DetalleContratoComponent,
            DetalleReferenciaComponent,
            TarjetaSolicitudServComponent,
            TarjetaContratosComponent
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
            SubidasModule,
            NgxsModule.forFeature([SolicitudesState]),
            PortalModule,
            SharedModule
        ]
})
export class ContratosModule
{
}
