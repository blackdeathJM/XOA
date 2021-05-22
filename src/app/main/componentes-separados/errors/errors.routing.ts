import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Error404Component} from './404/error-404.component';
import {Error500Component} from './500/error-500.component';
import {MttoComponent} from './maintenance/mtto.component';

const errorsRouting: Routes =
    [
        {
            path: 'mantenimiento',
            component: MttoComponent
        },
        {
            path: '500',
            component: Error500Component
        },
        {
            path: '404',
            component: Error404Component,
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(errorsRouting)],
    exports: [RouterModule]
})
export class ErrorsRoutingModule
{
}
