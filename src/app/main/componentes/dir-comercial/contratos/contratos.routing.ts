import {RouterModule, Routes} from '@angular/router';
import {ContratosComponent} from './contratos.component';

import {NgModule} from '@angular/core';
import {InfoContratosComponent} from './info-contratos/info-contratos.component';

const contratosRouting: Routes =
    [
        {
            path: '',
            component: ContratosComponent,
            children:
                [
                    {
                        path: 'info-contratos',
                        component: InfoContratosComponent
                    }
                ]
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(contratosRouting)
        ],
    exports: [RouterModule]
})

export class ContratosRouting
{
}
