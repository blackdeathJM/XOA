import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {SharedModule} from '@shared/shared.module';

import {MaterialModule} from '@ui-externos/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchivoUrlModule} from '../../../../pipes/archivo-url.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {RegistroFolioComponent} from './registro-folio/registro-folio.component';
import {DocsExtRecibidosListaComponent} from './docs-ext-recibidos-lista/docs-ext-recibidos-lista.component';
import {DocumentosUsuarioComponent} from './documentos-usuario.component';
import {BusquedaDocsUsuarioComponent} from './busqueda-docs-usuario/busqueda-docs-usuario.component';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxsModule} from '@ngxs/store';
import {DocsUsuarioFolioState} from '@usuarios/state/docs-folios.state';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {WingetsModule} from '@shared/widgets/wingets.module';

@NgModule({
    declarations:
        [
            DocumentosUsuarioComponent,
            DocsExtRecibidosListaComponent,
            RegistroFolioComponent,
            BusquedaDocsUsuarioComponent,
        ],
    imports:
        [
            CommonModule,
            FlexLayoutModule,
            FormsModule,
            FlexModule,
            SharedModule,
            ReactiveFormsModule,
            ArchivoUrlModule,
            MaterialModule,
            NgxBootstrapModule,
            FileUploadModule,
            NgxsModule.forFeature([DocsUsuarioFolioState]),
            PrimeNgModule,
            PlantillasModule,
            WingetsModule,
        ]
})
export class DocumentacionModule
{
}
