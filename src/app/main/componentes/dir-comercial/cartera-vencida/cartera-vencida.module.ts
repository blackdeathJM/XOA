import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarteraVencidaComponent} from './cartera-vencida.component';
import {CarteraVencidaRouting} from './cartera-vencida.routing';


@NgModule({
    declarations:
        [
            CarteraVencidaComponent
        ],
    imports:
        [
            CommonModule,
            CarteraVencidaRouting
        ]
})
export class CarteraVencidaModule
{
}
