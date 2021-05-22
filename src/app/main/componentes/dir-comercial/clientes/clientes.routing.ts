import {RouterModule, Routes} from '@angular/router';
import {ClientesComponent} from './clientes.component';
import {NgModule} from '@angular/core';
import {PadronUsuarioComponent} from './padron-usuario/padron-usuario.component';

const clientesRouting: Routes =
    [
        {
            path: '',
            component: ClientesComponent,
            children:
                [
                    {
                        path: 'padron-usuarios',
                        component: PadronUsuarioComponent
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(clientesRouting)],
    exports: [RouterModule]
})
export class ClientesRouting
{
}
