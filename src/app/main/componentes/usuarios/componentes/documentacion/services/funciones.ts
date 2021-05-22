import {IDepartamento} from '@global/models/departamento.model';

export const selecCentroGestor = async (idDeptoUsuario: string, deptos: IDepartamento[]): Promise<string> =>
{
    const centroGestor: IDepartamento[] = await deptos.filter(v => v._id === idDeptoUsuario);
    return centroGestor[0].centroGestor;
};
