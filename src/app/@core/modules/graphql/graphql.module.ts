import {WebSocketLink} from '@apollo/client/link/ws';
import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {onError} from '@apollo/client/link/error';
import {getMainDefinition} from '@apollo/client/utilities';
import {environment} from '@env/environment';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

const uri = environment.apiGraphql;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any>
{
    const wsClient = new WebSocketLink({
        uri: environment.wsGraphql,
        options: {
            reconnect: true,
        },
    });
    const errorLink = onError(({graphQLErrors, networkError}) =>
    {
        if (graphQLErrors)
        {
           toastSweet(TipoAlerta.error, 'Ocurrio un error al tratar de conectar con la api', 5000);
        }

        if (networkError)
        {
            toastSweet(TipoAlerta.error, `Error en la red, verifica que tengas conexion de red recarga la pagina y 
            vuelve a intentarlo.`, 5000);
        }
    });
    const http = ApolloLink.from([errorLink, httpLink.create({uri})]);
    const link = split(
        ({query}) =>
        {
            const {kind, operation}: any = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsClient,
        http
    );
    return {
        link,
        cache: new InMemoryCache(),
    };
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule
{
}
