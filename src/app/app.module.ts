import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ListActorsComponent } from './list-actors/list-actors.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import {RouterModule, Routes} from '@angular/router';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { ActorToMovieComponent } from './actor-to-movie/actor-to-movie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const week10Routes:Routes=[
  {path: '', redirectTo:'/listactors',pathMatch:'full'},
  {path:'addmovie',component:AddMovieComponent},
  {path:'deletemovie',component:DeleteMovieComponent},
  {path:'listactors',component:ListActorsComponent},
  {path:'listmovies',component:ListMoviesComponent},
  {path:'actor2movie', component:ActorToMovieComponent},
  {path:'**', component:PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ListActorsComponent,
    AddMovieComponent,
    ListMoviesComponent,
    DeleteMovieComponent,
    ActorToMovieComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(week10Routes, {useHash:true}),
    HttpClientModule,
    FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
