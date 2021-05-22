import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import { NotasAlmacenComponent } from './componentes/notas-almacen/notas-almacen.component';
import { InventarioAlmacenComponent } from './componentes/inventario-almacen/inventario-almacen.component';
import { TablaInventarioComponent } from './componentes/inventario-almacen/tabla-inventario/tabla-inventario.component';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {WingetsModule} from '@shared/widgets/wingets.module';

@NgModule({
    declarations: [NotasAlmacenComponent, InventarioAlmacenComponent, TablaInventarioComponent],
    exports: [
        NotasAlmacenComponent
    ],
    imports:
        [
            CommonModule,
            SharedModule,
            NgxBootstrapModule,
            FlexModule,
            MaterialModule,
            PrimeNgModule,
            PlantillasModule,
            WingetsModule
        ]
})
export class AlmacenModule
{
}
