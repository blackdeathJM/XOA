import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CtrlPatrimonialComponent} from './ctrl-patrimonial.component';
import {SharedModule} from '@shared/shared.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {PCtrlPatrimonialVehiculosComponent} from './activos/p-ctrl-patrimonial-vehiculos/p-ctrl-patrimonial-vehiculos.component';
import {PCtrlPatrimonialCompTecnoComponent} from './activos/p-ctrl-patrimonial-comp-tecno/p-ctrl-patrimonial-comp-tecno.component';
import {DocsUsuarioActivoComponent} from './docs-usuario-activo/docs-usuario-activo.component';
import {CtrlPatrimonialRouting} from './ctrl-patrimonial-routing';
import { CodicionesComponent } from './activos/codiciones/codiciones.component';
import { FirmasComponent } from './activos/firmas/firmas.component';
import { BusquedaCtrlPatrimonialComponent } from './activos/busqueda-ctrl-patrimonial/busqueda-ctrl-patrimonial.component';
import { RegCtrlTecEquipoComponent } from './activos/p-ctrl-patrimonial-comp-tecno/reg-ctrl-tec-equipo/reg-ctrl-tec-equipo.component';
import { RegCtrlVehiculosComponent } from './activos/p-ctrl-patrimonial-vehiculos/reg-ctrl-vehiculos/reg-ctrl-vehiculos.component';
import { PActivosCtrlPatrimonialComponent } from './activos/p-activos-ctrl-patrimonial/p-activos-ctrl-patrimonial.component';
import { RevisionComponent } from './activos/revision/revision.component';
import { ActivosGralCtrlPatrimonialComponent } from './activos/p-activos-ctrl-patrimonial/activos-gral-ctrl-patrimonial/activos-gral-ctrl-patrimonial.component';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {WingetsModule} from '@shared/widgets/wingets.module';


@NgModule({
    declarations:
        [
            CtrlPatrimonialComponent,
            PCtrlPatrimonialVehiculosComponent,
            PCtrlPatrimonialCompTecnoComponent,
            DocsUsuarioActivoComponent,
            CodicionesComponent,
            FirmasComponent,
            BusquedaCtrlPatrimonialComponent,
            RegCtrlTecEquipoComponent,
            RegCtrlVehiculosComponent,
            PActivosCtrlPatrimonialComponent,
            RevisionComponent,
            ActivosGralCtrlPatrimonialComponent
        ],
    imports: [
        CommonModule,
        SharedModule,
        NgxBootstrapModule,
        FlexModule,
        MaterialModule,
        CtrlPatrimonialRouting,
        PrimeNgModule,
        PlantillasModule,
        WingetsModule
    ]
})
export class CtrlPatrimonialModule
{
}
