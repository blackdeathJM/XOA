import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {antesDeSubirArchivo, cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {IOpcionesCarga} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';

@Component({
    selector: 'app-ng2-file-upload',
    templateUrl: './ng2-file-upload.component.html',
    styleUrls: ['./ng2-file-upload.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Ng2FileUploadComponent implements OnInit, AfterContentInit
{
    @Input() set opcionesCarga(v: IOpcionesCarga)
    {
        this._opcionesCarga = v;
    }

    @Input() set subirArchivo(subir: boolean)
    {
        if (subir)
        {
            this.cargaDeArchivos(false);
        }
    }

    @Input() set ocultarBtn(valor: boolean)
    {
        this._ocultarBtn = valor;
    }

    @Output() emitirListaArchivos: EventEmitter<string[]> = new EventEmitter();

    lista: string[] = [];
    cargarArchivo: FileUploader;
    progreso: number;
    cargandoArch = false;
    _ocultarBtn: boolean;
    _opcionesCarga: IOpcionesCarga;

    ngOnInit(): void
    {
        this.cargarArchivo = cargaDeArchivo(this._opcionesCarga.autoCargar, this._opcionesCarga.allowedFileType, this._opcionesCarga.allowedMimeType);
    }

    ngAfterContentInit(): void
    {
        if (this._opcionesCarga.autoCargar)
        {
            this.cargaDeArchivos(true);
        }
    }

    private cargaDeArchivos(cargaAutomatica: boolean): void
    {
        this.cargarArchivo.onBeforeUploadItem = antesDeSubir =>
        {
            this.cargandoArch = true;
            if (this._opcionesCarga.reemplazar)
            {
                antesDeSubir.file.name = this._opcionesCarga.nombreReemplazar;
            } else
            {
                antesDeSubir.file.name = antesDeSubirArchivo(antesDeSubir.file.name, this._opcionesCarga.prefijo);
            }
        };

        if (!cargaAutomatica)
        {
            this.cargarArchivo.uploadAll();
        }

        this.cargarArchivo.onCompleteItem = arcSubCorr =>
        {
            if (arcSubCorr.isSuccess)
            {
                if (arcSubCorr.isUploaded)
                {
                    this.lista.push(arcSubCorr.file.name);
                } else
                {
                    toastSweet(TipoAlerta.alerta, 'Hubo un error al tratar de subir el archivo, verifica tu conexion', 5000);
                }
            }
        };

        this.cargarArchivo.onErrorItem = () =>
        {
            toastSweet(TipoAlerta.alerta, `Ocurrio un error al tratar de subir el documento,
            verifica que sea el tipo de archivo admitido o que tu conexion a la red este correcta`, 1000);
        };

        this.cargarArchivo.onProgressAll = (totalProgreso: any) =>
        {
            this.progreso = totalProgreso;
        };

        this.cargarArchivo.onCompleteAll = () =>
        {
            this.emitirListaArchivos.emit(this.lista);
            this.cargandoArch = false;
            this.lista = [];
        };
    }
}
