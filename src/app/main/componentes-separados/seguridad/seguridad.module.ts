import {NgModule} from '@angular/core';
import {SeguridadRouting} from './seguridad.routing';
import {FuseSharedModule} from '@plantilla/shared.module';
import {RestablecerPassComponent} from './restablecer-pass/restablecer-pass.component';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '@ui-externos/material/material.module';


@NgModule({
    declarations:
        [
            RestablecerPassComponent,
            LoginComponent
        ],
    imports: [
        FuseSharedModule,
        SeguridadRouting,
        MaterialModule
    ],
    exports: []
})
export class SeguridadModule
{
}
