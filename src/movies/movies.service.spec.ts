import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it('should return an array', () => {
      const result = service.all();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('find', () => {
    it('should return a movie', () => {
      service.save({
        title: 'test movie',
        year: 2022,
        genres: ['test'],
      });
      const movie = service.find(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.find(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('delete', () => {
    it('delete a movie', () => {
      service.save({
        title: 'test movie',
        year: 2022,
        genres: ['test'],
      });
      const beforeDelete = service.all().length;

      service.delete(1);

      const afterDelete = service.all().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('Should return a 404', () => {
      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('save', () => {
    it('should save a movie', () => {
      const beforeSave = service.all().length;
      service.save({
        title: 'test movie',
        year: 2022,
        genres: ['test'],
      });

      const afterSave = service.all().length;
      expect(afterSave).toBeGreaterThan(beforeSave);
    });
  });
});
