import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdenesTrabajoComponent} from './ordenes-trabajo.component';
import {OrdenesTrabajoRouting} from './ordenes-trabajo.routing';
import {RouterModule} from '@angular/router';
import {OrdenesTrabajoAdminComponent} from './ordenes-trabajo-admin/ordenes-trabajo-admin.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ComponentesCompartidosModule} from '@shared/components/componentes-compartidos.module';
import {RegOrdenTrabTeleComponent} from './ordenes-trabajo-admin/registros/reg-orden-trab-tele/reg-orden-trab-tele.component';
import {DetalleOrdenAreaTecnicaComponent} from './ordenes-trabajo-admin/detalles-ordenes-trab/detalle-orden-area-tecnica/detalle-orden-area-tecnica.component';
import {EjecutarOrdenesComponent} from './ordenes-trabajo-admin/ejecutar-ordenes/ejecutar-ordenes.component';
import {SharedModule} from '@shared/shared.module';
import {CtrlsModule} from '@shared/ctrls/ctrls.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {OrdenesTrabajoState} from './state/ordenes-trabajo.state';
import {OrdenesTrabClieComponent} from './ordenes-trabajo-admin/ordenes-trab-clie/ordenes-trab-clie.component';
import {TelemetriaState} from '@telemetria/telemetriaState';
import { DetallOrdenOtrosComponent } from './ordenes-trabajo-admin/detalles-ordenes-trab/detall-orden-otros/detall-orden-otros.component';
import { RegOrdenAreaTComponent } from './ordenes-trabajo-admin/registros/reg-orden-area-t/reg-orden-area-t.component';
import {DetallesGralesComponent} from './ordenes-trabajo-admin/registros/detalles-grales/detalles-grales.component';
import { DetallesOrdenGralComponent } from './ordenes-trabajo-admin/detalles-ordenes-trab/detalles-orden-gral/detalles-orden-gral.component';
import { DetallesOrdenTelemetriaComponent } from './ordenes-trabajo-admin/detalles-ordenes-trab/detalles-orden-telemetria/detalles-orden-telemetria.component';

@NgModule({
    declarations:
        [
            OrdenesTrabajoComponent,
            OrdenesTrabajoAdminComponent,
            RegOrdenTrabTeleComponent,
            DetalleOrdenAreaTecnicaComponent,
            EjecutarOrdenesComponent,
            OrdenesTrabClieComponent,
            DetallOrdenOtrosComponent,
            RegOrdenAreaTComponent,
            DetallesGralesComponent,
            DetallesOrdenGralComponent,
            DetallesOrdenTelemetriaComponent,
        ],
    exports:
        [
            OrdenesTrabClieComponent
        ],
    imports:
        [
            CommonModule,
            OrdenesTrabajoRouting,
            RouterModule,
            PlantillasModule,
            PrimeNgModule,
            MaterialModule,
            WingetsModule,
            FlexLayoutModule,
            ComponentesCompartidosModule,
            SharedModule,
            CtrlsModule,
            ReactiveFormsModule,
            NgxsModule.forFeature([OrdenesTrabajoState, TelemetriaState])
        ]
})
export class OrdenesTrabajoModule
{
}
