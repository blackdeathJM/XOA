import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministracionDocComponent} from './componentes/administracion-doc/administracion-doc.component';
import {CrudDocExtComponent} from './componentes/crud-doc-ext/crud-doc-ext.component';
import {TablaDocExtPrincipalComponent} from './componentes/tabla-doc-ext-principal/tabla-doc-ext-principal.component';
import {DetalleUsuarioComponent} from './componentes/tabla-doc-ext-principal/detalle-usuario/detalle-usuario.component';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {DocumentacionModule} from '@usuarios/componentes/documentacion/documentacion.module';
import {ArchivoUrlModule} from '../../../pipes/archivo-url.module';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ReactiveFormsModule} from '@angular/forms';
import {BusquedaDocsAdmonComponent} from './componentes/busqueda-docs-admon/busqueda-docs-admon.component';
import {DocumentosRouting} from './documentos.routing';
import {DocumentosAdmonComponent} from './documentos-admon.component';
import {RouterModule} from '@angular/router';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {FileUploadModule} from 'ng2-file-upload';
import {ReemplazarDocsComponent} from './componentes/reemplazar-docs/reemplazar-docs.component';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';


@NgModule({
    declarations:
        [
            AdministracionDocComponent,
            CrudDocExtComponent,
            TablaDocExtPrincipalComponent,
            DetalleUsuarioComponent,
            BusquedaDocsAdmonComponent,
            DocumentosAdmonComponent,
            ReemplazarDocsComponent
        ],
    imports:
        [
            CommonModule,
            ReactiveFormsModule,
            NgxBootstrapModule,
            MaterialModule,
            FlexModule,
            DocumentacionModule,
            ArchivoUrlModule,
            RxReactiveFormsModule,
            DocumentosRouting,
            PrimeNgModule,
            RouterModule,
            FileUploadModule,
            WingetsModule,
            PlantillasModule
        ]
})
export class AdministracionDocModule
{
}
