import {NgModule} from '@angular/core';
import {ContratosComponent} from './contratos.component';
import {ContratosRouting} from './contratos.routing';
import {InfoContratosComponent} from './info-contratos/info-contratos.component';
import {RegContratosComponent} from './reg-contratos/reg-contratos.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {SubidasModule} from '@shared/components/subidas/subidas.module';
import {RegClienteComponent} from '@dir-comercial/reg-cliente/reg-cliente.component';
import {ConsultaContratosComponent} from './info-contratos/consulta-contratos/consulta-contratos.component';
import {RegSolicitudServComponent} from './reg-solicitud-serv/reg-solicitud-serv.component';
import {DetallesSolicitudServComponent} from './detalles/detalles-solicitud-serv/detalles-solicitud-serv.component';
import {DetalleReferenciaComponent} from './detalles/detalle-referencia/detalle-referencia.component';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {SharedModule} from '@shared/shared.module';
import {InfoSolicitudServComponent} from './info-solicitud-serv/info-solicitud-serv.component';
import {ActualizarSolicitudServComponent} from './reg-solicitud-serv/actualizar-solicitud-serv/actualizar-solicitud-serv.component';
import {CtrlsModule} from '@shared/ctrls/ctrls.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxsModule} from '@ngxs/store';
import {PortalModule} from '@angular/cdk/portal';
import {DetalleFacturacionComponent} from './detalles/detalle-facturacion/detalle-facturacion.component';
import {DetalleContratoComponent} from './detalles/detalle-contrato/detalle-contrato.component';


@NgModule({
    declarations:
        [
            ContratosComponent,
            InfoContratosComponent,
            RegContratosComponent,
            RegClienteComponent,
            ConsultaContratosComponent,
            RegSolicitudServComponent,
            DetallesSolicitudServComponent,
            DetalleReferenciaComponent,
            InfoSolicitudServComponent,
            ActualizarSolicitudServComponent,
            DetalleFacturacionComponent,
            DetalleContratoComponent,
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
            SharedModule,
            CtrlsModule
        ]
})
export class ContratosModule
{
}
