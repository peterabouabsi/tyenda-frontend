//Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { SplashComponent } from './Pages/splash/splash.component';

//Services
import { ServiceWorkerModule } from '@angular/service-worker';
import { GlobalService } from './Shared/Services/Global/global.service';

//Page Modules
import { AuthenticationModule } from './Pages/authentication/Module/authentication.module';
import { ApplicationModule } from './Pages/application/Module/application.module';

//Interceptors
import { HTTPInterceptor } from './Shared/Http Interceptors/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    //Service workder registration
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000'}),

    //Page Modules
    AuthenticationModule,
    ApplicationModule
  ],
  providers: [
    //Services
    GlobalService,

    //Http interceptor
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
