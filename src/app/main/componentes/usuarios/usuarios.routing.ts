import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PerfilComponent} from './componentes/perfil/perfil.component';
import {DocumentosUsuarioComponent} from '@usuarios/componentes/documentacion/documentos-usuario.component';
import {AdminGuard} from '@funcionesRaiz/admin.guard';
import {AdmonUsuarioComponent} from '@usuarios/admon-usuario.component';
import {UsuarioConfigComponent} from '@usuarios/componentes/usuario-config.component';

const usuariosRouting: Routes =
    [
        {
            path: '',
            component: AdmonUsuarioComponent,
            resolve: [],
            children:
                [
                    {
                        path: 'config',
                        component: UsuarioConfigComponent,
                        canActivate: [AdminGuard]
                    },
                    {
                        path: 'perfil',
                        component: PerfilComponent
                    }
                ]
        },
        {
            path: 'docs-usuario',
            component: DocumentosUsuarioComponent,
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(usuariosRouting)
        ],
    exports:
        [
            RouterModule
        ]
})
export class UsuariosRouting
{
}
