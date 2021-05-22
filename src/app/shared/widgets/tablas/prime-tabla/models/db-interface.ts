import { DocumentNode } from 'graphql';

export interface IBdTablaPrime
{
    pluck: string[];
    consulta: DocumentNode;
    variables: object;
    contexto: object;
}
