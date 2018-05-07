import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { HttpModule, Http } from '@angular/http';
import { SimpleComponent } from './modals/simple/simple.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { MeComponent } from './me/me.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';
import { RegistrarComponent } from './registrar/registrar.component';
import { HomeComponent } from './me/components/home/home.component';
import { IngresosComponent } from './me/components/ingresos/ingresos.component';
import { EgresosComponent } from './me/components/egresos/egresos.component';
import { ConfiguracionComponent } from './me/components/configuracion/configuracion.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuardService ] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuardService], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ingresos', component: IngresosComponent },
    { path: 'egresos', component: EgresosComponent },
    { path: 'configuracion', component: ConfiguracionComponent }
  ] },
  { path: 'registrar', component: RegistrarComponent, canActivate: [LoginGuardService]  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SimpleComponent,
    ConfirmComponent,
    MeComponent,
    RegistrarComponent,
    HomeComponent,
    IngresosComponent,
    EgresosComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    LayoutModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  entryComponents:[
    SimpleComponent,
    ConfirmComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }