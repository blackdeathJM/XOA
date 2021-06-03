import {Injectable} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {findIndex, indexOf, mean, toArray} from 'lodash-es';
import {Chart} from 'chart.js';
import {Role} from '@modelosUsuarios/usuario.interface';
import {environment} from '@env/environment';
import {IDatasets} from '@funcionesRaiz/graficas';
import {DataStateContext} from '@ngxs-labs/data/typings';
import {IOpcionesCarga} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';

@Injectable({
    providedIn: 'root'
})
export class GralesServices
{
    constructor(private _router: Router)
    {
    }

    static obtenerPromedios(formGroup: FormGroup): number
    {
        return mean(toArray(formGroup.value).map((v) => Number(v)));
    }

    static convertirMes(mes: number): string
    {
        switch (mes)
        {
            case 1:
                return 'Ene';
            case 2:
                return 'Feb';
            case 3:
                return 'Mar';
            case 4:
                return 'Abr';
            case 5:
                return 'May';
            case 6:
                return 'Jun';
            case 7:
                return 'Jul';
            case 8:
                return 'Ago';
            case 9:
                return 'Sep';
            case 10:
                return 'Oct';
            case 11:
                return 'Nov';
            case 12:
                return 'Dic';
        }
    }

    static graficar(ctx: string, labels: string[], datasets: IDatasets[], min?: number, max?: number): Chart
    {
        return new Chart(ctx,
            {
                type: 'bar',
                data: {

                    labels,
                    datasets
                },
                options: {
                    responsive: true,
                    plugins:
                        {
                            legend: {position: 'top'}
                        },
                    scales:
                        {
                            x: {
                                grid: {display: true}
                            },
                            y:
                                {
                                    beginAtZero: true,
                                    min,
                                    max,
                                    grid:
                                        {
                                            display: true,
                                            borderWidth: 1,
                                        }
                                }
                        }
                }
            });
    }

    static datasets(data: number[], label: string, borderWidth: number = 1, borderColor: string = '#009292', hoverBackgroundColor: string = '#009292'): IDatasets[]
    {
        return [
            {
                data,
                label,
                borderWidth,
                backgroundColor: GralesServices.colAleatorio(),
                borderColor,
                hoverBackgroundColor,
            }
        ];
    }

    static colAleatorio(): string
    {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
        // const o = Math.round;
        // const r = Math.random;
        // const s = 255;
        // return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }

    static obtenerDoc(nombreDoc: string, prefijo: string): string
    {
        return `${environment.apiUrl}/${prefijo}?archivoUrl=${nombreDoc}`;
    }

    static nvoEdo(idDoc: string, ctx: DataStateContext<any>): any
    {
        return ctx.getState().filter(id => id._id !== idDoc);
    }

    static nvoEdoReemplazando(ctx: DataStateContext<any>): any
    {
        const indice = findIndex(ctx.getState(), (i: any) => i._id === '');
        console.log('indice', indice);
    }

    static opcCargaImg(prefijo: string): IOpcionesCarga
    {
        return {
            allowedFileType: ['image'],
            allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
            reemplazar: false,
            autoCargar: true,
            multiple: true,
            prefijo,
            esIconButton: false,
            claseColorBtn: 'amber',
            icono: 'publish',
            textoBoton: 'Cargar imagenes',
        };
    }

    compararRoles(rolUsuario: Role[], rol: Role): boolean
    {
        let tienePermiso = false;

        if (rolUsuario.includes(rol))
        {
            tienePermiso = true;
        } else
        {
            let timerInterval;
            Swal.fire({
                title: 'No tienes permiso para acceder a este apartado!',
                html: '<b>Redirigiendo</b>.',
                timer: 2000,
                timerProgressBar: true,
                onBeforeOpen: () =>
                {
                    Swal.showLoading();
                    timerInterval = setInterval(() =>
                    {
                        const content = Swal.getContent();
                        if (content)
                        {
                            const b = content.querySelector('b');
                            if (b)
                            {
                                b.textContent = Swal.getTimerLeft();
                            }
                        }
                    }, 100);
                },
                onClose: () =>
                {
                    clearInterval(timerInterval);
                }
            }).then((result) =>
            {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer)
                {
                    this._router.navigate(['/sistema-comercial/home']).then(() =>
                    {
                        tienePermiso = false;
                    });
                }
            });
        }
        return tienePermiso;
    }
}
