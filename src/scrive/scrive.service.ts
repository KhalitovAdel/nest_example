import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ScriveService {
  protected readonly storage = new Array(10).fill(null).map((el, index) => ({ id: index, name: `Doc-${index}` }));
  constructor(protected readonly http: HttpService) {}

  public async createDocument() {
    return this.http
      .get('https://www.scrive.com')
      .toPromise()
      .then(({ data }) => data as string);
  }

  public async fetchById(idz: number) {
    return this.storage.find(({ id }) => id === idz);
  }

  public async fetchAllDocuments() {
    return this.storage;
  }
}
