import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const mainRouting: Routes =
    [
        {
            path: 'sistema-comercial',
            loadChildren: () => import('../app.module').then(app => app.AppModule),
        },
        {
            path: 'errores',
            loadChildren: () => import('./componentes-separados/errors/errors.module').then(error => error.ErrorsModule)
        },
        {
            path: 'seguridad',
            loadChildren: () => import('./componentes-separados/seguridad/seguridad.module').then(seg => seg.SeguridadModule)
        },
        {
            path: '',
            redirectTo: 'sistema-comercial/home', pathMatch: 'full'
        },
        {
            path: '**',
            redirectTo: 'errores/404'
        }
    ];

@NgModule({
    imports: [RouterModule.forRoot(mainRouting)],
    exports: [RouterModule]
})
export class MainRoutingModule
{
}
