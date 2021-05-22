import {RouterModule, Routes} from '@angular/router';
import {CarteraVencidaComponent} from './cartera-vencida.component';
import {NgModule} from '@angular/core';

const carteraVencidaRouting: Routes =
    [
        {
            path: '',
            component: CarteraVencidaComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(carteraVencidaRouting)],
    exports: [RouterModule]
})
export class CarteraVencidaRouting
{
}
