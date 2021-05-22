import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestablecerPassComponent} from './restablecer-pass/restablecer-pass.component';
import {LoginComponent} from './login/login.component';

const seguridadRouting: Routes =
    [
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'restablecer-contrasena',
            component: RestablecerPassComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(seguridadRouting)],
    exports: [RouterModule]
})
export class SeguridadRouting
{
}
