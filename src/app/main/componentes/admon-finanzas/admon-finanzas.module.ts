import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmonFinanzasComponent} from './admon-finanzas.component';
import {AdmonFinanzasRouting} from './admon-finanzas.routing';
import {SharedModule} from '@shared/shared.module';
import {AlmacenModule} from './almacen/almacen.module';
import {ContabilidadModule} from './contabilidad/contabilidad.module';


@NgModule({
    declarations: [AdmonFinanzasComponent],
    imports:
        [
            CommonModule,
            ContabilidadModule,
            AdmonFinanzasRouting,
            SharedModule,
            AlmacenModule
        ]
})
export class AdmonFinanzasModule
{
}
