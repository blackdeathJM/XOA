import {AfterContentInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';

import {navigation} from 'app/navigation/navigation';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {SesionState} from '@usuarios/state/sesion.state';
import {IUsuario} from '@modelosUsuarios/usuario.interface';
import {NotificarState} from '@global/state/notificar.state';
import {INotificacion} from '@global/models/notificacion.interface';
import {DocsState} from '../../../main/componentes/direccion/documentos/state/docs.state';
import {DocsUsuarioState} from '@usuarios/state/docs-usuario.state';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {UsuarioSubscriptionService} from '@usuarios/usuario-subscription.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, AfterContentInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    sesionUsuario: IUsuario = {role: [], _id: '', contrasena: '', departamento: undefined, departamentoID: '', img: '', nombre: '', usuario: ''};


    notificacion: INotificacion[] = [];
    subscripcion: Subscription = new Subscription();
    userStatusOptions: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(private _fuseConfigService: FuseConfigService, private _fuseSidebarService: FuseSidebarService, public _sesionState: SesionState,
                public _notificacionState: NotificarState, private _docsState: DocsState, private _docUsuarioState: DocsUsuarioState,
                private _usuarioSubscripcion: UsuarioSubscriptionService)
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];
        this.navigation = navigation;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) =>
            {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        this.subscripcion.add(this._sesionState.state$.subscribe(r =>
        {
            if (r)
            {
                this.sesionUsuario = r;
            }
        }));
    }

    ngAfterContentInit(): void
    {
        // this.subscripcion.add(this._notificacionState.listarNotificaciones().subscribe());
        // this._docsState.subDocs().subscribe();
        // this._docUsuarioState.subDocsUsuario().subscribe();
         // this._notificacionState.subNot();

        this._usuarioSubscripcion.cambiarRoleUsuario(this._sesionState.snapshot.usuario).subscribe((res) =>
        {
            localStorage.removeItem('token');
            setTimeout(() =>
            {
                localStorage.setItem('token', res.token);
                this._sesionState.obtenerSesion();
                toastSweet(TipoAlerta.info, 'Se ha cambiado tus privilegios', 2000);
            }, 200);
        });
    }

    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    search(value): void
    {
        console.log(value);
    }

    logout(): void
    {
        this._sesionState.cerrarSesion();
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next('');
        this._unsubscribeAll.complete();
        this.subscripcion.unsubscribe();
    }
}
