import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@plantilla/services/config.service';
import {fuseAnimations} from '@plantilla/animations';
import {IDatosLogin} from '@modelosUsuarios/usuario.interface';
import {SesionState} from '@usuarios/state/sesion.state';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {SesionService} from '@usuarios/sesion.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class LoginComponent implements OnInit, OnDestroy
{
    cargando = false;
    loginForm: FormGroup;
    usuario: IDatosLogin = {
        usuario: '',
        contrasena: ''
    };
    subscription: Subscription;

    constructor(private _fuseConfigService: FuseConfigService, private _formBuilder: FormBuilder, private _router: Router,
                private _sesionState: SesionState, private _sesionService: SesionService)
    {
    }

    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            usuario: ['', Validators.required],
            contrasena: ['', Validators.required],
            recuerdame: [false]
        });
    }

    ingresar(): void
    {
        if (this.loginForm.invalid)
        {
            return;
        }
        this.cargando = true;
        this.subscription = this._sesionState.iniciarSesion(this.loginForm.get('usuario').value, this.loginForm.get('contrasena').value).subscribe(r =>
        {
            if (r.estatus)
            {
                localStorage.setItem('token', r.token);
                this._router.navigateByUrl('sistema-comercial/home').then(() =>
                {
                    this._sesionState.establecerEdoUsuario(this._sesionState.obtenerSesion());
                    this.cargando = false;
                });
            } else
            {
                this._router.navigateByUrl('seguridad/login').then(() => localStorage.removeItem('token'))
                    .then(() =>
                    {
                        toastSweet(TipoAlerta.error, r.mensaje, 5000);
                        this.cargando = false;
                    });
            }
        });
    }

    ngOnDestroy(): void
    {
        this.subscription.unsubscribe();
    }
}
