import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule, NoopNgxsExecutionStrategy} from '@ngxs/store';
import {environment} from '@env/environment';
import {NgxsDataPluginModule} from '@ngxs-labs/data';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_EXTENSION} from '@ngxs-labs/data/storage';
import {DepartamentoState} from '@global/state/departamento.state';
import {DocsState} from '../main/componentes/direccion/documentos/state/docs.state';
import {SesionState} from '@usuarios/state/sesion.state';
import {DocsUsuarioState} from '@usuarios/state/docs-usuario.state';
import {NotificarState} from '@global/state/notificar.state';
import {ClientesState} from '@dir-comercial/clientes.state';
import {ClienteState} from '@dir-comercial/cliente.state';

@NgModule({
    imports:
        [
            CommonModule,
            NgxsModule.forRoot([SesionState, DepartamentoState, DocsState, DocsUsuarioState, NotificarState, ClientesState, ClienteState],
                {developmentMode: !environment.production, executionStrategy: NoopNgxsExecutionStrategy}),
            NgxsLoggerPluginModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot(),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_EXTENSION, NGXS_DATA_STORAGE_CONTAINER]),
        ]
})
export class NgxsModuleGlobal
{
}
