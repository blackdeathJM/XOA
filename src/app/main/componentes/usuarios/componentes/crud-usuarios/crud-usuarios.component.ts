import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IResUsuario, IUsuario} from '@modelosUsuarios/usuario.interface';
import {IDepartamento} from '@global/models/departamento.model';
import {DepartamentoState} from '@global/state/departamento.state';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';
import {toastSweet} from "@shared/alerts/toasts";
import {TipoAlerta} from "@shared/alerts/values.config";

@Component({
    selector: 'app-crud-usuarios',
    templateUrl: './crud-usuarios.component.html',
    styleUrls: ['./crud-usuarios.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudUsuariosComponent implements OnInit
{
    guardando = false;
    departamentos: IDepartamento[];
    usuarioRegistro: IUsuario = {
        nombre: '',
        usuario: '',
        contrasena: '',
        role: [],
        departamentoID: '',
        img: 'perfil.png'
    };

    public formUsuarios = this._formBuilder.group(
        {
            departamento: ['', Validators.required],
            nombre: [null, Validators.required],
            usuario: [null, Validators.required],
            contrasena: [null, Validators.required],
            confContrasena: [null, Validators.required],
        }, {
            validators: this.sonIguales('contrasena', 'confContrasena')
        });

    constructor(public _dialogRef: MatDialog, private _formBuilder: FormBuilder, public _deptos: DepartamentoState,
                private _usuarioState: AdmonUsuariosState)
    {
    }

    ngOnInit(): void
    {
        this._deptos.listaDeptos().subscribe();
    }

    sonIguales(campo1: string, campo2: string): any
    {
        return (group: FormGroup) =>
        {
            const pass = group.controls[campo1].value;
            const confPass = group.controls[campo2].value;

            if (pass === confPass)
            {
                return null;
            }
            return {sonIguales: true};
        };
    }

    registrarUsuario(): any
    {
        this.guardando = true;
        this.usuarioRegistro.nombre = this.formUsuarios.value.nombre;
        this.usuarioRegistro.usuario = this.formUsuarios.value.usuario.replace(/ /g, '');
        this.usuarioRegistro.contrasena = this.formUsuarios.value.contrasena;
        this.usuarioRegistro.departamentoID = this.formUsuarios.value.departamento;
        this.usuarioRegistro.role = [];

        this._usuarioState.regUsuario(this.usuarioRegistro).subscribe((res: IResUsuario) =>
        {
            this.guardando = false;
            if (res.documento)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Usuario creado con exito', 5000);
                this.cerrarModal();
            } else
            {
                toastSweet(TipoAlerta.error, res.mensaje, 5000);
                this.cerrarModal();
            }
        }, e => toastSweet(TipoAlerta.error, e, 5000));
    }

    public mensajeError = (control: string, error: string) =>
        this.formUsuarios.controls[control].hasError(error);

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
