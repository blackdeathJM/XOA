import {RouterModule, Routes} from '@angular/router';
import {DirComercialComponent} from './dir-comercial.component';
import {NgModule} from '@angular/core';

const dirComercialRouting: Routes =
    [
        {
            path: '',
            component: DirComercialComponent,
            children:
                [
                    {
                        path: 'clientes',
                        loadChildren: () => import('./clientes/clientes.module').then(c => c.ClientesModule)
                    },
                    {
                        path: 'contratos',
                        loadChildren: () => import('./contratos/contratos.module').then(c => c.ContratosModule)
                    }
                ]
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(dirComercialRouting)
        ],
    exports: [RouterModule]
})

export class DirComercialRouting
{

}
