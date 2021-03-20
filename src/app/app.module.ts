import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { BagsComponent } from './pages/bags/bags.component';
import { TShirtComponent } from './pages/t-shirt/t-shirt.component';
import { ShortsShirtsComponent } from './pages/shorts-shirts/shorts-shirts.component';
import { OuterwearComponent } from './pages/outerwear/outerwear.component';
import { WovenShirtsComponent } from './pages/woven-shirts/woven-shirts.component';
import { FleeceComponent } from './pages/fleece/fleece.component';
import { TechnologyComponent } from './pages/technology/technology.component';
import { DrinkwareComponent } from './pages/drinkware/drinkware.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    MasterPageComponent,
    ContactPageComponent,
    BagsComponent,
    TShirtComponent,
    ShortsShirtsComponent,
    OuterwearComponent,
    WovenShirtsComponent,
    FleeceComponent,
    TechnologyComponent,
    DrinkwareComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
