import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { EgresosService } from '../../../services/egresos.service';
import { IngresosService } from '../../../services/ingresos.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private conf: ConfiguracionService, 
  private ingresosProvider: IngresosService, private egresosProvider: EgresosService) { }

  private dataIngresos: Array<any> = [];
  private dataEgresos: Array<any> = [];
  public Ingresos: number = 0;
  public Egresos: number = 0;
  public montoDefault: number = 0;
  public metodoPago: number = -1;
  ngOnInit() {
    let key = localStorage.getItem('key');
    this.conf.myInfo(key).then(r => {
      if(r.data.cobro >= 0){
        this.conf.obtenerMonto(r.data._id_, r.data.cobro).then(t => {
          this.montoDefault = t.monto;
        });
        this.metodoPago = r.data.cobro;
      }
    });
    this.ingresosProvider.obtenerIngresos(key).then(r => {
      this.dataIngresos = this.getData(r.data);
      let aux = [];
      let de = this.dataEgresos;
      let di = this.dataIngresos;
      aux[1] = {
        data: de,
        label: "Egresos"
      };
      aux[0] = {
        data: di,
        label: "Ingresos"
      };
      this.lineChartData = aux;
      this.Ingresos = this.getIngresos(r.data);
    });
    this.egresosProvider.obtenerEgresos(key).then(r => {
      this.dataEgresos = this.getData(r.data);
      let aux = [];
      let de = this.dataEgresos;
      let di = this.dataIngresos;
      aux[1] = {
        data: de,
        label: "Egresos"
      };
      aux[0] = {
        data: di,
        label: "Ingresos"
      };
      this.lineChartData = aux;
      this.Egresos = this.getEgresos(r.data);
    });
  }
  getIngresos(ingresos: Array<any>): number{
    let n: number = 0;
    try{
      ingresos.forEach(el => {
        n += el.monto;
      });
    }catch(ex){
      n = 0;
    }
    return n;
  }
  getEgresos(egresos: Array<any>): number{
    let n: number = 0;
    try{
      egresos.forEach(el => {
        n += el.monto;
      });
    }catch(ex){
      n = 0;
    }
    return n;
  }
  getData(data: Array<any>): Array<number>{
    let nArr: Array<number> = [];
    let index:number = 0;
    try{
      data.forEach(el => {
        if(index < 10){
          nArr.push(el.monto);
          index++;
        }
        else return;
      });
    }catch(ex){
      nArr = [];
    }
    return nArr;
  }
  public lineChartData:Array<any> = [
    {data: [], label: 'Ingresos'},
    {data: [], label: 'Egresos'}
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  getGeneralColor(i: number, e: number, m?: number): string{
    m = m | 0;
    return (((i - e) + m) > 0) ? 'green' : '#d55';
  }
  estadoFinal(i: number, e: number, m: number): number{
    let n = (i - e) + m;
    if(n < 0) return -1;
    else if(n == 0) return 0;
    else return 1;
  }
}
