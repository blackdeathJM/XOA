import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientesComponent} from './clientes.component';
import {ClientesRouting} from './clientes.routing';
import {PadronUsuarioComponent} from './padron-usuario/padron-usuario.component';
import {BarraLateralComponent} from './barra-lateral/barra-lateral.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FuseSidebarModule} from '@plantilla/components';
import {FuseSharedModule} from '@plantilla/shared.module';
import {WingetsModule} from '@shared/widgets/wingets.module';


@NgModule({
    declarations:
        [
            ClientesComponent,
            PadronUsuarioComponent,
            BarraLateralComponent
        ],
    imports:
        [
            CommonModule,
            ClientesRouting,
            FlexLayoutModule,
            MaterialModule,
            FuseSidebarModule,
            FuseSharedModule,
            WingetsModule
        ]
})
export class ClientesModule
{
}
