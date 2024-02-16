import { DataSource, EntityTarget, Repository } from 'typeorm';

// typeorm made it more complicated to create a custom entity repository?
// @EntityRepository(Task) can't do this now
// https://stackoverflow.com/a/75329451 this works fine

export class EntityRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async someCommonMethod() {
    return {};
  }
}
