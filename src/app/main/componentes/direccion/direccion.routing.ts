import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DireccionComponent} from './direccion.component';
import {AdminGuard} from '@funcionesRaiz/admin.guard';
import {TelemetriaComponent} from './telemetria/telemetria.component';

const direccionRouting: Routes =
    [
        {
            path: 'direccion',
            component: DireccionComponent,
            children:
                [
                    {
                        path: 'documentos',
                        canActivate: [AdminGuard],
                        loadChildren: () => import('./direccion.module').then(p => p.DireccionModule)
                    }
                ]
        },
        {
            path: 'telemetria',
            component: TelemetriaComponent,
            children:
                [
                    {
                        path: '',
                        loadChildren: () => import('./telemetria/telemetria.module').then(t => t.TelemetriaModule)
                    }
                ]
        }
    ];

@NgModule(
    {
        imports: [RouterModule.forChild(direccionRouting)]
    })
export class DireccionRouting
{
}
