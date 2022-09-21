import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  all(): Movie[] {
    return this.movies;
  }

  find(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  delete(id: string) {
    this.find(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  save(data) {
    this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
    return this.movies;
  }

  update(id: string, data) {
    const movie = this.find(id);
    this.delete(id);
    this.save(data);
  }
}
