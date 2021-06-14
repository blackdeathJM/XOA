import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@ui-externos/material/material.module';
import {UsuariosRouting} from './usuarios.routing';
import {CrudUsuariosComponent} from './componentes/crud-usuarios/crud-usuarios.component';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfilComponent} from './componentes/perfil/perfil.component';
import {ArchivoUrlModule} from '../../pipes/archivo-url.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {DocumentacionModule} from '@usuarios/componentes/documentacion/documentacion.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {AdmonUsuarioComponent} from './admon-usuario.component';
import {UsuarioConfigComponent} from './componentes/usuario-config.component';
import {NgxsModule} from '@ngxs/store';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';
import {SubidasModule} from '@shared/components/subidas/subidas.module';
import {CtrlsModule} from '@shared/ctrls/ctrls.module';

@NgModule({
    declarations:
        [
            CrudUsuariosComponent,
            PerfilComponent,
            AdmonUsuarioComponent,
            UsuarioConfigComponent,
        ],
    imports:
        [
            CommonModule,
            FormsModule,
            MaterialModule,
            UsuariosRouting,
            FlexModule,
            ReactiveFormsModule,
            DocumentacionModule,
            ArchivoUrlModule,
            NgxBootstrapModule,
            PrimeNgModule,
            PlantillasModule,
            NgxsModule.forFeature([AdmonUsuariosState]),
            SubidasModule,
            CtrlsModule
        ]
})
export class UsuariosModule
{
}
