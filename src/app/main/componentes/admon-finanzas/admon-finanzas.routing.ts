import {RouterModule, Routes} from '@angular/router';
import {AdmonFinanzasComponent} from './admon-finanzas.component';
import {NgModule} from '@angular/core';
import {NotasAlmacenComponent} from './almacen/componentes/notas-almacen/notas-almacen.component';
import {InventarioAlmacenComponent} from './almacen/componentes/inventario-almacen/inventario-almacen.component';

import {DocsUsuarioActivoComponent} from './contabilidad/ctrl-patrimonial/docs-usuario-activo/docs-usuario-activo.component';
import {CtrlPatrimonialComponent} from './contabilidad/ctrl-patrimonial/ctrl-patrimonial.component';

const admonFinanzasRouting: Routes =
    [
        {
            path: '',
            component: AdmonFinanzasComponent,
            children:
                [
                    {
                        path: 'contabilidad/ctrl-patrimonial/activos',
                        component: CtrlPatrimonialComponent,
                        loadChildren: () => import('./contabilidad/ctrl-patrimonial/ctrl-patrimonial.module').then(m => m.CtrlPatrimonialModule)
                    },
                    {
                        path: 'contabilidad/ctrl-patrimonial/docs-usuario-activo',
                        component: DocsUsuarioActivoComponent
                    },
                    {
                        path: 'notas',
                        component: NotasAlmacenComponent
                    },
                    {
                        path: 'inventario',
                        component: InventarioAlmacenComponent
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(admonFinanzasRouting)],
    exports: [RouterModule]
})

export class AdmonFinanzasRouting
{

}
