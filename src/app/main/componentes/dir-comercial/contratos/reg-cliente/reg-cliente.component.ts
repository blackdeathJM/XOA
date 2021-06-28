import {ChangeDetectionStrategy, Component, Inject, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ICliente, IClienteMod, IResCliente} from '@dir-comercial/cliente.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {SesionState} from '@usuarios/state/sesion.state';
import {tap} from 'rxjs/operators';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {Subscription} from 'rxjs';
import {ClientesState} from '@dir-comercial/clientes.state';

@Component({
    selector: 'app-reg-cliente',
    templateUrl: './reg-cliente.component.html',
    styleUrls: ['./reg-cliente.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegClienteComponent implements OnDestroy
{
    estaCargando = false;
    modeloCliente: ICliente;
    sub: Subscription = new Subscription();
    formCliente: FormGroup = this._formBuilder.group({
        nombreCompleto: ['', RxwebValidators.required({message: 'Nombre requerido'})],
        telefonos: this._formBuilder.array([], Validators.required)
    });

    nvoTelefono: FormControl = this._formBuilder.control('');

    get telArr(): FormArray
    {
        return this.formCliente.get('telefonos') as FormArray;
    }

    constructor(private _formBuilder: FormBuilder, public _clienteState: ClientesState, @Inject(MAT_DIALOG_DATA) public data: IClienteMod, private _sesionState: SesionState,
                private _dialogRef: MatDialog)
    {
    }

    agregarTel(): void
    {
        if (this.nvoTelefono.invalid)
        {
            return;
        }

        this.telArr.push(this._formBuilder.control(this.nvoTelefono.value));
        this.nvoTelefono.reset();
    }

    borrarTel(i: number): void
    {
        this.telArr.removeAt(i);
    }

    regCliente(): void
    {
        this.estaCargando = true;
        this.modeloCliente = this.formCliente.value;

        if (this.data.esRegistro)
        {
            this.sub.add(this._clienteState.regCliente(this.modeloCliente).pipe(tap((res: IResCliente) =>
            {
                if (res.documento)
                {
                    if (res.mensaje.includes('Documento encontrado'))
                    {
                        toastSweet(TipoAlerta.alerta, 'El documento ya existe, no se puede volver a registrar', 5000);
                        this.estaCargando = false;
                    } else
                    {
                        toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                        this.estaCargando = false;
                        this.cerrarModal();
                    }
                } else
                {
                    toastSweet(TipoAlerta.error, res.mensaje, 5000);
                    this.estaCargando = false;
                    this.cerrarModal();
                }
            })).subscribe());
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
