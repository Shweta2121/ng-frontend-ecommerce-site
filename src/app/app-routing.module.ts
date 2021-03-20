import { MasterPageComponent } from './pages/master-page/master-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { BagsComponent } from './pages/bags/bags.component';
import { TShirtComponent } from './pages/t-shirt/t-shirt.component';
import { ShortsShirtsComponent } from './pages/shorts-shirts/shorts-shirts.component';
import { OuterwearComponent } from './pages/outerwear/outerwear.component';
import { WovenShirtsComponent } from './pages/woven-shirts/woven-shirts.component';
import { FleeceComponent } from './pages/fleece/fleece.component';
import { TechnologyComponent } from './pages/technology/technology.component';
import { DrinkwareComponent } from './pages/drinkware/drinkware.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'bags',
        component: BagsComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactPageComponent,
      },
      {
        path: 'apparel',
        children: [
          {
            path: 'tshirt',
            component: TShirtComponent,
          },
          {
            path: 'sports-shirts',
            component: ShortsShirtsComponent,
          },
          {
            path: 'outwear',
            component: OuterwearComponent,
          },
          {
            path: 'wooven-shirts',
            component: WovenShirtsComponent,
          },
          {
            path: 'fleece',
            component: FleeceComponent,
          },
        ],
      },
      {
        path: 'promotional',
        children: [
          {
            path: 'technology',
            component: TechnologyComponent,
          },
          {
            path: 'drinkware',
            component: DrinkwareComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
