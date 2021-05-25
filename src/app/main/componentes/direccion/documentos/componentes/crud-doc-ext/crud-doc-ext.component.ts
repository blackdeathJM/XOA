import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {Prefijos, ProcesosDoc} from '@Config/enums';
import moment from 'moment';
import {differenceBy} from 'lodash-es';
import {TipoAlerta} from '@shared/alerts/values.config';
import {toastSweet} from '@shared/alerts/toasts';
import {antesDeSubirArchivo, cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {SesionState} from '@usuarios/state/sesion.state';
import {NotificarState} from '@global/state/notificar.state';
import {DocsState} from '../../state/docs.state';
import {IDocExt, IUsuarioDestinoDocExt} from '../../models/docExt.interface';

@Component({
    selector: 'app-crud-doc-ext',
    templateUrl: './crud-doc-ext.component.html',
    styleUrls: ['./crud-doc-ext.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudDocExtComponent implements OnInit
{
    cargaDeArchivo = cargaDeArchivo(false);

    guardando: boolean;

    usuariosEmitidos: string[] = [];

    regDocExtModelo: IDocExt = {
        esInterno: false,
        tipoDoc: '',
        notificarAdministrador: false,
        acuseUrl: null,
        asunto: '',
        comentario: '',
        dependencia: '',
        docRespUrl: null,
        docUrl: '',
        fechaLimiteEntrega: '',
        fechaRecepcion: '',
        fechaTerminado: '',
        folio: null,
        identificadorDoc: '',
        noSeguimiento: 0,
        proceso: ProcesosDoc.pendiente,
        usuarioFolio: '',
        enviadoPor: '',
        ano: null,
        ref: false,
        usuarioDestino: [undefined],
    };

    usuariosAsignados: IUsuarioDestinoDocExt[] = [];

    formDocExterno = this._formBuilder.group({
        identificadorDoc: ['', Validators.required],
        asunto: ['', Validators.required],
        comentario: [''],
        dependencia: ['', Validators.required],
        fechaRecepcion: ['', Validators.required],
        tipoDoc: [null, Validators.required],
        fechaLimiteEntrega: ['', Validators.required],
    });

    constructor(private _dialogRef: MatDialogRef<CrudDocExtComponent>, private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
                private _docsState: DocsState, private _sesionState: SesionState, private _notState: NotificarState)
    {
    }

    ngOnInit(): void
    {
        if (this.data.editar)
        {
            this.formDocExterno.patchValue(this.data.documento);
            this.usuariosAsignados = this.data.documento.usuarioDestino;
        }
    }

    regDocExt(): void
    {
        this.regDocExtModelo.fechaRecepcion = moment(this.formDocExterno.value.fechaRecepcion).toISOString();
        this.regDocExtModelo.fechaLimiteEntrega = moment(this.formDocExterno.value.fechaLimiteEntrega).toISOString();
        this.regDocExtModelo.identificadorDoc = this.formDocExterno.value.identificadorDoc;
        this.regDocExtModelo.asunto = this.formDocExterno.value.asunto;
        this.regDocExtModelo.comentario = this.formDocExterno.value.comentario;
        this.regDocExtModelo.dependencia = this.formDocExterno.value.dependencia;
        this.regDocExtModelo.tipoDoc = this.formDocExterno.value.tipoDoc;
        this.regDocExtModelo.enviadoPor = this._sesionState.snapshot.usuario;
        this.regDocExtModelo.usuarioDestino = differenceBy(this.asignarUsuarios(), this.usuariosAsignados, (u) => u.usuario);

        this.guardando = true;
        if (this.data.editar)
        {
            this.cargaDeArchivo.clearQueue();
            this.regDocExtModelo._id = this.data.documento._id;
            this._docsState.actInfoDoc(this.regDocExtModelo).subscribe(() =>
            {
                this.guardando = false;
                this.cerrarModal();
            });
        } else
        {
            this.cargaDeArchivo.onBeforeUploadItem = (antesSubir) =>
            {
                antesSubir.file.name = antesDeSubirArchivo(antesSubir.file.name, Prefijos.docExternos);
                this.regDocExtModelo.docUrl = antesSubir.file.name;
            };

            this.cargaDeArchivo.uploadAll();

            if (this.cargaDeArchivo.isUploading)
            {
                this.cargaDeArchivo.onCompleteItem = (elemCompleto) =>
                {
                    if (elemCompleto.isSuccess)
                    {
                        this._docsState.agregarDocExt(this.regDocExtModelo, this.usuariosEmitidos).subscribe((doc) =>
                        {
                            this.guardando = false;
                            toastSweet(TipoAlerta.satisfactorio, doc.mensaje, 5000);
                            this.cerrarModal();
                        });
                    } else
                    {
                        toastSweet(TipoAlerta.error, 'Error al tratar de subir el documento intenta mas tarde', 5000);
                        this.guardando = false;
                        this.cerrarModal();
                    }
                };
            } else
            {
                this.guardando = false;
                toastSweet(TipoAlerta.alerta, 'No has seleccionado un archivo', 3000);
            }
        }
    }

    asignarUsuarios(): IUsuarioDestinoDocExt[]
    {
        const usua = [];
        this.usuariosEmitidos.forEach((usuario) =>
        {
            usua.push({
                subproceso: ProcesosDoc.pendiente,
                usuario,
                autorizado: false,
                docUrl: null,
                fechaEnvio: '',
                notificarRespDelUsuario: false,
                notificarUsuario: false,
                observaciones: '',
            });
        });
        return usua;
    }

    cerrarModal(): void
    {
        this._dialogRef.close();
    }

    usuariosRecibidos(evento: string[]): void
    {
        this.usuariosEmitidos = evento;
    }
}
