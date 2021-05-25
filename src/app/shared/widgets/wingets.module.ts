import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeTablaComponent} from '@shared/widgets/tablas/prime-tabla/prime-tabla.component';
import {NgTableComponent} from '@shared/widgets/tablas/ng-table/ng-table.component';
import {TablaComponent} from '@shared/widgets/skeleton/tabla/tabla.component';
import {SeleccionarUsuarioComponent} from '@shared/widgets/seleccionar-usuario/seleccionar-usuario.component';
import {SeleccionarTipoDocComponent} from '@shared/widgets/presidencia/seleccionar-tipo-doc/seleccionar-tipo-doc.component';
import {BuscarPorFechasComponent} from '@shared/widgets/buscar-por-fechas/buscar-por-fechas.component';
import {TPrimeAccDeshabPipe} from '@shared/widgets/tablas/prime-tabla/pipes/t-prime-acc-deshab.pipe';
import {TPrimeAccVisiblePipe} from '@shared/widgets/tablas/prime-tabla/pipes/t-prime-acc-visible.pipe';
import {TNgTablaDeshPipe} from '@shared/widgets/tablas/ng-table/pipes/t-ng-tabla-desh.pipe';
import {TNgTablaVisPipe} from '@shared/widgets/tablas/ng-table/pipes/t-ng-tabla-vis.pipe';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MiPipePipe} from './tablas/prime-tabla/pipes/mi-pipe.pipe';
import {BuscarClienteAutocompleteComponent} from './buscar-cliente-autocomplete/buscar-cliente-autocomplete.component';
import {SubidasModule} from '@shared/components/subidas/subidas.module';
import {NgxsModule} from '@ngxs/store';
import {ClientesState} from '@dir-comercial/clientes.state';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';
import { PopoverBuscarClienteTablaComponent } from './popover-buscar-cliente-tabla/popover-buscar-cliente-tabla.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';


@NgModule({
    declarations:
        [
            PrimeTablaComponent,
            NgTableComponent,
            TablaComponent,
            SeleccionarUsuarioComponent,
            SeleccionarTipoDocComponent,
            BuscarPorFechasComponent,
            TPrimeAccDeshabPipe,
            TPrimeAccVisiblePipe,
            TNgTablaDeshPipe,
            TNgTablaVisPipe,
            MiPipePipe,
            BuscarClienteAutocompleteComponent,
            PopoverBuscarClienteTablaComponent,
        ],
    exports:
        [
            PrimeTablaComponent,
            NgTableComponent,
            TablaComponent,
            SeleccionarUsuarioComponent,
            SeleccionarTipoDocComponent,
            BuscarPorFechasComponent,
            TPrimeAccDeshabPipe,
            TPrimeAccVisiblePipe,
            TNgTablaDeshPipe,
            TNgTablaVisPipe,
            BuscarClienteAutocompleteComponent,
            PopoverBuscarClienteTablaComponent,
        ],
    imports: [
        CommonModule,
        PrimeNgModule,
        FlexLayoutModule,
        MaterialModule,
        FileUploadModule,
        NgxBootstrapModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([ClientesState, AdmonUsuariosState]),
        SubidasModule,
        PlantillasModule
    ]
})
export class WingetsModule
{
}
