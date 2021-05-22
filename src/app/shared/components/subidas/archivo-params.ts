import {FileUploader} from 'ng2-file-upload';
import {environment} from '@env/environment';
import {v4 as uuidv4} from 'uuid';

export const cargaDeArchivo = (autoUpload: boolean, allowedFileType: string[] = ['pdf'], allowedMimeType: string[] = ['application/pdf']): FileUploader =>
    new FileUploader({
        url: environment.apiUrl + '/docs',
        method: 'POST',
        maxFileSize: 20 * 1024 * 1024,
        allowedFileType,
        allowedMimeType,
        autoUpload,
        removeAfterUpload: true
    });

export const antesDeSubirArchivo = (docRecibido: string, prefijo: string): string =>
{
    const ano = new Date().getFullYear();
    return prefijo + '-' + ano + uuidv4() + '.' + docRecibido.split('.').pop();
};
