import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from "./modelo/acoes";
import { AcoesService } from "./acoes.service";
import { merge, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, tap,distinctUntilChanged } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
//Aplicou o debounce para ter um intervalo na digitação.
export class AcoesComponent {
  acoesInput = new FormControl();
  todaAcoes$ = this.acoesService.getAcoes().pipe(tap(()=>{console.log('Fluxo Inicial')}));
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(debounceTime(ESPERA_DIGITACAO),tap(()=>{console.log('Fluxo do filtro')}),tap(console.log),filter((valorDigitado)=>valorDigitado.length >= 3 || !valorDigitado.length),
  distinctUntilChanged(),switchMap((valoDigitado)=>this.acoesService.getAcoes(valoDigitado)));
  //acoes$ = this.acoesService.getAcoes();
  //O switcMap espera uma função, onde ele envia para essa função, o valor que está vindo do pipe,ele espera um outro observable, uma troca de cano.
  acoes$ = merge(this.todaAcoes$,this.filtroPeloInput$);


  // acoes:Acoes;
  //private subscription:Subscription;


  constructor(private acoesService: AcoesService) { }
  /*
    ngOnInit() {
    this.subscription = this.acoesService.getAcoes().subscribe((acoes =>{
      /* this.acoes = retornoApi.payload
      this.acoes = acoes;
     }))
    }
  ngOnDestroy(){
    //Serve para finalizar uma inscrição para sua aplicação não ter erro de memoria
  this.subscription.unsubscribe();
  }*/
}
