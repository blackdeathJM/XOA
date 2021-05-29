import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FuseSharedModule} from '@plantilla/shared.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {FuseSidebarModule} from '@plantilla/components';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import { PotalContenedorComponent } from './potal-contenedor/potal-contenedor.component';
import {PortalModule} from '@angular/cdk/portal';


@NgModule({
    declarations:
        [
    PotalContenedorComponent
  ],
    imports:
        [
            CommonModule,
            MaterialModule,
            FuseSharedModule,
            NgxBootstrapModule,
            FuseSidebarModule,
            PrimeNgModule,
            PortalModule,
        ],
    exports:
        [
            PotalContenedorComponent
        ],
})
export class SharedModule
{
}
