import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContabilidadComponent} from './contabilidad.component';
import {CtrlPatrimonialModule} from './ctrl-patrimonial/ctrl-patrimonial.module';


@NgModule({
    declarations: [ContabilidadComponent],
    imports: [
        CommonModule,
        CtrlPatrimonialModule
    ]
})
export class ContabilidadModule
{
}
