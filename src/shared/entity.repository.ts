import { DataSource, EntityTarget, Repository } from 'typeorm';

// typeorm made it more complicated to create a custom repository?
// https://stackoverflow.com/a/75329451

export class GenericRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async someCommonMethod() {
    return {};
  }
}