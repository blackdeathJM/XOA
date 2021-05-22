import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InfoGralComponent} from '@telemetria/instalaciones/info-gral/info-gral.component';
import {InstalacionComponent} from '@telemetria/instalaciones/instalacion/instalacion.component';
import {MotoresBombasComponent} from '@telemetria/instalaciones/motores-bombas/motores-bombas.component';
import {InfoTelemetriaComponent} from '@telemetria/instalaciones/info-telemetria/info-telemetria.component';
import {LecturasParametrosComponent} from '@telemetria/instalaciones/lecturas-parametros/lecturas-parametros.component';
import {LecturasMedicionesComponent} from '@telemetria/instalaciones/lecturas-mediciones/lecturas-mediciones.component';
import {CfeComponent} from '@telemetria/instalaciones/cfe/cfe.component';
import {ComparativasComponent} from '@telemetria/instalaciones/comparativas/comparativas.component';
import {TelemetriaGuard} from './guards/telemetria.guard';
import {InstalacionesComponent} from '@telemetria/instalaciones/instalaciones.component';
import {OrdenesTrabTeleComponent} from '@telemetria/ordenes-trab-tele/ordenes-trab-tele.component';

const telemetriaRouting: Routes =
    [
        {
            path: '',
            component: InstalacionesComponent,
            children:
                [
                    {
                        path: 'info-gral',
                        component: InfoGralComponent
                    },
                    {
                        path: 'motores-bombas',
                        canActivate: [TelemetriaGuard],
                        component: MotoresBombasComponent
                    },
                    {
                        path: 'info-ips',
                        canActivate: [TelemetriaGuard],
                        component: InfoTelemetriaComponent
                    },
                    {
                        path: 'lecturas-parametros',
                        canActivate: [TelemetriaGuard],
                        component: LecturasParametrosComponent
                    },
                    {
                        path: 'lecturas-mediciones',
                        canActivate: [TelemetriaGuard],
                        component: LecturasMedicionesComponent
                    },
                    {
                        path: 'cfe',
                        canActivate: [TelemetriaGuard],
                        component: CfeComponent
                    }
                ]
        },
        {
            path: 'instalaciones',
            canActivate: [TelemetriaGuard],
            component: InstalacionComponent
        },
        {
            path: 'comparativas',
            component: ComparativasComponent
        },
        {
            path: 'ordenes-tele',
            component: OrdenesTrabTeleComponent,
            canActivate: [TelemetriaGuard]
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(telemetriaRouting)
        ],
    exports: [RouterModule]
})
export class TelemetriaRouting
{
}
