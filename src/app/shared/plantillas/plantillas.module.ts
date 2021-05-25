import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardBootstrapComponent} from '@shared/plantillas/card-bootstrap/card-bootstrap.component';
import {CompletaNavegacionIzTabComponent} from '@shared/plantillas/completa-navegacion-iz-tab/completa-navegacion-iz-tab.component';
import {PaginaComponent} from '@shared/plantillas/pagina/pagina.component';
import {PaginaTabComponent} from '@shared/plantillas/pagina-tab/pagina-tab.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FuseSidebarModule} from '@plantilla/components';
import { ImpresionComponent } from './impresion/impresion.component';
import { ImpresionPieComponent } from './impresion/impresion-pie/impresion-pie.component';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';


@NgModule({
    declarations:
        [
            CardBootstrapComponent,
            CompletaNavegacionIzTabComponent,
            PaginaComponent,
            PaginaTabComponent,
            ImpresionComponent,
            ImpresionPieComponent
        ],
    exports:
        [
            CardBootstrapComponent,
            CompletaNavegacionIzTabComponent,
            PaginaComponent,
            PaginaTabComponent,
            ImpresionComponent,
            ImpresionPieComponent
        ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FuseSidebarModule,
        PrimeNgModule,
    ]
})
export class PlantillasModule
{
}
