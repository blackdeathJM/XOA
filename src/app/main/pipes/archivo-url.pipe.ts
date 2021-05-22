import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '@env/environment';

@Pipe({
    name: 'archivoUrl'
})

export class ArchivoUrlPipe implements PipeTransform
{
    transform(nombreArchivo: string, tipoArchivo: string): string
    {
        // el tipo de imagen se refiere que que tipo de documento traera si es un
        if (nombreArchivo)
        {
            return `${environment.apiUrl}/${tipoArchivo}?archivoUrl=${nombreArchivo}`;
        } else
        {
            return '../../../../assets/images/avatars/default.jpg';
        }
    }
}
