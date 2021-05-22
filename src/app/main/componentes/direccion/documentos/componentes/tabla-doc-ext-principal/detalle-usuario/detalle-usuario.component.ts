import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ProcesosDoc} from '@Config/enums';
import {IUsuarioDestinoDocExt} from '../../../models/docExt.interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DocsState} from '../../../state/docs.state';

@Component({
    selector: 'app-detalle-usuario',
    templateUrl: './detalle-usuario.component.html',
    styleUrls: ['./detalle-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleUsuarioComponent
{
    @Input() idDocumento: string;
    @Input() usuarioDestino: IUsuarioDestinoDocExt;

    proceso = ProcesosDoc;
    procesoAprobado = '';
    public formObservaciones: FormGroup = new FormGroup({
        observacion: new FormControl(null, Validators.required)
    });
    caAprobar = false;
    caRechazar = false;


    constructor(public _docsState: DocsState)
    {
    }

    rechazarObservaciones(usuarioDestino: IUsuarioDestinoDocExt): void
    {
        if (usuarioDestino.subproceso !== ProcesosDoc.enviado)
        {
            toastSweet(TipoAlerta.alerta, `No puedes rechazar el documento porque actualmente se encuentra como: ${usuarioDestino.subproceso}`, 5000);
            return;
        }
        if (!usuarioDestino.docUrl)
        {
            toastSweet(TipoAlerta.alerta, 'No existe un documento al que quieras enviar observaciones', 5000);
        } else
        {
            this.caRechazar = true;
            this._docsState.aprobarRechazarDoc(this.idDocumento, this.usuarioDestino.usuario, ProcesosDoc.rechazado,
                this.formObservaciones.get('observacion').value).subscribe(() =>
            {
                this.caRechazar = false;
                toastSweet(TipoAlerta.satisfactorio, 'El documento se ha rechazado con exito y enviado las observaciones', 5000);
            });
        }
    }

    aprobarDocumento(): void
    {
        const procesosEvitarSolicitud = [ProcesosDoc.aprobado, ProcesosDoc.entregado, ProcesosDoc.terminado, ProcesosDoc.acuse];
        if (procesosEvitarSolicitud.includes(this.usuarioDestino.subproceso) || this.procesoAprobado === ProcesosDoc.aprobado)
        {
            toastSweet(TipoAlerta.info, 'El documento ya ha sido aprobado', 5000);
        } else
        {
            this.caAprobar = true;
            this._docsState.aprobarRechazarDoc(this.idDocumento, this.usuarioDestino.usuario, ProcesosDoc.aprobado, 'Documento aprobado')
                .subscribe(() =>
                {
                    this.caAprobar = false;
                    toastSweet(TipoAlerta.satisfactorio, 'El documento ha sido aprobado con exito', 5000);
                });
        }
    }

    desactivarNotificacionUsuario(): void
    {
        this._docsState.desactivarNot(this.idDocumento, this.usuarioDestino.usuario).subscribe();
    }

    eliminarU(): void
    {
        this._docsState.quitarUsuario(this.idDocumento, this.usuarioDestino.usuario).subscribe((res) =>
        {
            console.log('respuesta', res);
        });
    }
}
