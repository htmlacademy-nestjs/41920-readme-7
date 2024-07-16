import { Entity } from '@project/shared/core';
import { StorableEntity } from '@project/shared/core';
import { Tag } from '@project/types';

export class TagEntity extends Entity implements StorableEntity<Tag> {
  public title: string = '';

  constructor(data: Tag) {
    super();
    if (!data.title) {
      throw new Error('No tag title');
    }

    this.populate(data);
  }

  public populate(data: Tag) {
    this.id = data.id ?? '';
    this.title = data.title;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
