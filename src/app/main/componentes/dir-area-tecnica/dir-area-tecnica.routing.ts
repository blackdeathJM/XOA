import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OrdenesTrabajoComponent} from './ordenes-trabajo/ordenes-trabajo.component';


const dirAreaTecnicaRouting: Routes =
    [
        {
            path: 'Ordenes-trabajo',
            component: OrdenesTrabajoComponent,
            children:
                [
                    {
                        path: '',
                        loadChildren: () => import('./ordenes-trabajo/ordenes-trabajo.module').then(o => o.OrdenesTrabajoModule)
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(dirAreaTecnicaRouting)],
    exports: [RouterModule]
})
export class DirAreaTecnicaRouting
{
}
