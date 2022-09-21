import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  index() {
    return 'This will return all movies';
  }

  @Get('/:id')
  show(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Patch('/:id')
  update(@Param('id') movieId: string) {
    return `This will update a movie with the id: ${movieId}`;
  }

  @Delete('/:id')
  destroy(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }
}
