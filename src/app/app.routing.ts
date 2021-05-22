import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './main/home/home.component';


const appRouting: Routes =
    [
        {
            path: '',
            component: AppComponent,
            data: {titulo: 'Pagina principal', icono: 'home'},
            children:
                [
                    {
                        path: 'home',
                        component: HomeComponent,
                        data: {titulo: 'Inicio', icono: 'home'}
                    },
                    {
                        path: 'presidencia',
                        loadChildren: () => import('./main/componentes/direccion/direccion.module').then(d => d.DireccionModule)
                    },
                    {
                        path: 'global',
                        loadChildren: () => import('./main/componentes/global/global.module').then(d => d.GlobalModule)
                    },
                    {
                        path: 'usuarios',
                        loadChildren: () => import('./main/componentes/usuarios/usuarios.module').then(u => u.UsuariosModule)
                    },
                    {
                        path: 'admon-finanzas',
                        loadChildren: () => import('./main/componentes/admon-finanzas/admon-finanzas.module').then(a => a.AdmonFinanzasModule)
                    },
                    {
                        path: 'dir-comercial',
                        loadChildren: () => import('./main/componentes/dir-comercial/dir-comercial.module').then(d => d.DirComercialModule)
                    },
                    {
                        path: 'dir-area-tecnica',
                        loadChildren: () => import('./main/componentes/dir-area-tecnica/dir-area-tecnica.module').then(d => d.DirAreaTecnicaModule)
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(appRouting)],
    exports: [RouterModule]
})
export class AppRouting
{
}
