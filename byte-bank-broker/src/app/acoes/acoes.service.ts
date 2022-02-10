import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';
@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }
  getAcoes(valor?:string) {
    //se tiver valor ele vai pegar o httparams e add, se não ele vai ficar indefinido.
    const params = valor ? new HttpParams().append('valor',valor): undefined;
    /*tap só esta ai para fzer o debug, estamos passando um map para pegar as informações do payload, que são as ações,pluck recebe uma string*/
    return this.httpClient.get<AcoesAPI>("http://localhost:3000/acoes",{params}).pipe(tap((valor) => console.log(valor)), pluck('payload'), map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))));
  }
  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
