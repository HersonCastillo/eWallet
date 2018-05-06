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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuardService ] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuardService] },
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
    RegistrarComponent
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
  ],
  entryComponents:[
    SimpleComponent,
    ConfirmComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }