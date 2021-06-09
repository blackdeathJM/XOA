import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {IDocExt} from '../../../../direccion/documentos/models/docExt.interface';
import {ProcesosDoc} from '@Config/enums';
import {DocsUsuarioFolioState} from '@usuarios/state/docs-folios.state';
import {SesionState} from '@usuarios/state/sesion.state';
import moment from 'moment';
import {TIPOS_DOC} from '@usuarios/componentes/documentacion/models/tiposDoc.interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {DepartamentoState} from '@global/state/departamento.state';
import {selecCentroGestor} from '@usuarios/componentes/documentacion/services/funciones';
import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-registro-folio',
    templateUrl: './registro-folio.component.html',
    styleUrls: ['./registro-folio.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroFolioComponent implements OnDestroy
{
    estaCargando = false;
    subscripciones: Subscription = new Subscription();
    tiposDoc: string[] = Object.values(TIPOS_DOC);
    modeloDocs: IDocExt =
        {
            dependencia: '',
            esInterno: true,
            fechaLimiteEntrega: '',
            folio: null,
            fechaRecepcion: '',
            identificadorDoc: '',
            noSeguimiento: 0,
            notificarAdministrador: false,
            proceso: ProcesosDoc.pendiente,
            tipoDoc: '',
            usuarioDestino: [],
            usuarioFolio: '',
            ano: null,
            ref: false,
            enviadoPor: null
        };

    formFolios = this._formBuilder.group({
        dependencia: [null, Validators.required],
        asunto: [null, Validators.required],
        comentario: [null],
        tipoDoc: [null, Validators.required],
        refDoc: [null, RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})]
    });

    constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialog, private _docsFoliosState: DocsUsuarioFolioState,
                private _sesionState: SesionState, private _deptosState: DepartamentoState)
    {
    }

    registrarFolios(): void
    {
        this.subscripciones.add(this._deptosState.listaDeptos().subscribe(async (deptos) =>
        {
            this.estaCargando = true;
            this.modeloDocs.dependencia = this.formFolios.get('dependencia').value;
            this.modeloDocs.asunto = this.formFolios.get('asunto').value;
            this.modeloDocs.comentario = this.formFolios.get('comentario').value;
            this.modeloDocs.tipoDoc = this.formFolios.get('tipoDoc').value;
            this.modeloDocs.folio = await selecCentroGestor(this._sesionState.snapshot.departamentoID, deptos.documentos);
            this.modeloDocs.docUrl = null;
            this.modeloDocs.esInterno = true;
            this.modeloDocs.docRespUrl = null;
            this.modeloDocs.proceso = ProcesosDoc.pendiente;
            this.modeloDocs.fechaRecepcion = moment().toISOString();
            this.modeloDocs.identificadorDoc = 'Interno';
            this.modeloDocs.usuarioFolio = this._sesionState.snapshot.usuario;

            this.subscripciones.add(this._docsFoliosState.regFolio(this.modeloDocs, parseInt(this.formFolios.get('refDoc').value, 10))
                .subscribe(res =>
                {
                    this.estaCargando = false;
                    if (res.estatus)
                    {
                        toastSweet(TipoAlerta.satisfactorio, `Tu folio se ha generado correctamente, puedes consultarlo
        en la session de consultas en la opcion de PENDIENTES, tu folio es: ${res.documento.folio}`, 5000);
                        this.cerrarModal();
                    } else
                    {
                        toastSweet(TipoAlerta.error, `No se pudo generar tu folio porque: ${res.mensaje}`, 5000);
                        this.cerrarModal();
                    }
                }));
        }));
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
