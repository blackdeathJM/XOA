import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelemetriaComponent} from './telemetria.component';
import {RouterModule} from '@angular/router';
import {InfoGralComponent} from '@telemetria/instalaciones/info-gral/info-gral.component';
import {TelemetriaRouting} from './telemetria.routing';
import {MaterialModule} from '@ui-externos/material/material.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {ListarInstalacionesComponent} from '@telemetria/instalaciones/listar-instalaciones/listar-instalaciones.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegInstalacionComponent} from '@telemetria/instalaciones/instalacion/reg-instalacion/reg-instalacion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MotoresBombasComponent} from '@telemetria/instalaciones/motores-bombas/motores-bombas.component';
import {RegMotorComponent} from '@telemetria/instalaciones/motores-bombas/reg-motor/reg-motor.component';
import {RegBombaComponent} from '@telemetria/instalaciones/motores-bombas/reg-bomba/reg-bomba.component';
import {InstalacionComponent} from '@telemetria/instalaciones/instalacion/instalacion.component';
import {EquipoActivoPipe} from './pipes/equipo-activo.pipe';
import {InfoTelemetriaComponent} from '@telemetria/instalaciones/info-telemetria/info-telemetria.component';
import {RegDirIpComponent} from '@telemetria/instalaciones/info-telemetria/reg-dir-ip/reg-dir-ip.component';
import {InfoIpsComponent} from '@telemetria/instalaciones/info-telemetria/info-ips/info-ips.component';
import {ButtonModule} from 'primeng/button';
import {BajaEquipoComponent} from '@telemetria/instalaciones/motores-bombas/baja-equipo/baja-equipo.component';
import {FileUploadModule} from 'ng2-file-upload';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {SubidasModule} from '@shared/components/subidas/subidas.module';
import {InfoMotorComponent} from '@telemetria/instalaciones/motores-bombas/info-motor/info-motor.component';
import {InfoBombaComponent} from '@telemetria/instalaciones/motores-bombas/info-bomba/info-bomba.component';
import {LightboxModule} from 'ngx-lightbox';
import {ConvertirLigthboxAlbumPipe} from './pipes/convertir-ligthbox-album.pipe';
import {LecturasParametrosModule} from '@telemetria/instalaciones/lecturas-parametros/lecturas-parametros.module';
import {LecturasMedicionesModule} from '@telemetria/instalaciones/lecturas-mediciones/lecturas-mediciones.module';
import {CfeModule} from '@telemetria/instalaciones/cfe/cfe.module';
import {ComparativasModule} from '@telemetria/instalaciones/comparativas/comparativas.module';
import {ComponentesCompartidosModule} from '@shared/components/componentes-compartidos.module';
import {InstalacionesComponent} from '@telemetria/instalaciones/instalaciones.component';
import {NgxsModule} from '@ngxs/store';
import {TelemetriaState} from '@telemetria/telemetriaState';
import { OrdenesTrabTeleComponent } from '@telemetria/ordenes-trab-tele/ordenes-trab-tele.component';
import { OrdenesTrabajoState } from '../../dir-area-tecnica/ordenes-trabajo/state/ordenes-trabajo.state';
import { OrdenesTrabajoModule } from '../../dir-area-tecnica/ordenes-trabajo/ordenes-trabajo.module';


@NgModule({
    declarations:
        [
            TelemetriaComponent,
            InfoGralComponent,
            InfoTelemetriaComponent,
            ListarInstalacionesComponent,
            RegInstalacionComponent,
            MotoresBombasComponent,
            RegMotorComponent,
            RegBombaComponent,
            InstalacionComponent,
            EquipoActivoPipe,
            RegDirIpComponent,
            InfoIpsComponent,
            BajaEquipoComponent,
            InfoMotorComponent,
            InfoBombaComponent,
            ConvertirLigthboxAlbumPipe,
            InstalacionesComponent,
            OrdenesTrabTeleComponent,
        ],
    imports:
        [
            CommonModule,
            RouterModule,
            NgxsModule.forFeature([TelemetriaState, OrdenesTrabajoState]),
            TelemetriaRouting,
            MaterialModule,
            PrimeNgModule,
            FlexLayoutModule,
            ReactiveFormsModule,
            ButtonModule,
            FileUploadModule,
            PlantillasModule,
            WingetsModule,
            LightboxModule,
            SubidasModule,
            LecturasParametrosModule,
            LecturasMedicionesModule,
            CfeModule,
            ComparativasModule,
            ComponentesCompartidosModule,
            OrdenesTrabajoModule
        ]
})
export class TelemetriaModule
{
}
