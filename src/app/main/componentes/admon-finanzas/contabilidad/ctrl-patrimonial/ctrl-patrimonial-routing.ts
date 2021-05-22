import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PCtrlPatrimonialVehiculosComponent} from './activos/p-ctrl-patrimonial-vehiculos/p-ctrl-patrimonial-vehiculos.component';
import {PCtrlPatrimonialCompTecnoComponent} from './activos/p-ctrl-patrimonial-comp-tecno/p-ctrl-patrimonial-comp-tecno.component';

const ctrlPatrimonialRouting: Routes =
    [
        {
            path: 'ctrl-patrimonial-vehicular',
            component: PCtrlPatrimonialVehiculosComponent
        },
        {
            path: 'ctrl-patrimonial-computo-tecnologia',
            component: PCtrlPatrimonialCompTecnoComponent
        }
    ];

@NgModule({
    imports:
        [RouterModule.forChild(ctrlPatrimonialRouting)],
    exports:
        [RouterModule]
})
export class CtrlPatrimonialRouting
{
}
