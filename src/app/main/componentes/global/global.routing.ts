import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GlobalComponent} from './global.component';
import {DepartamentosComponent} from '@global/departamentos.component';
import {OrdenesTrabajoComponent} from '../dir-area-tecnica/ordenes-trabajo/ordenes-trabajo.component';

const globalRouting: Routes =
    [
        {
            path: 'deptos',
            component: GlobalComponent,
            children:
                [
                    {
                        path: 'departamentos',
                        component: DepartamentosComponent,
                    }
                ]
        },
        {
            path: 'ordenes-trabajo',
            component: OrdenesTrabajoComponent,
            children:
                [
                    {
                        path: '',
                        loadChildren: () => import('../dir-area-tecnica/ordenes-trabajo/ordenes-trabajo.module').then(o => o.OrdenesTrabajoModule)
                    }
                ]
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(globalRouting)
        ],
    exports:
        [
            RouterModule
        ]
})
export class GlobalRouting
{
}
