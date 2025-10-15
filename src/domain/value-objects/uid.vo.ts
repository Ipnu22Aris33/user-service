import { BaseVO } from '@domain/base/base.vo';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

export class UidVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): UidVO {
    this.validate(value);
    return new UidVO(value);
  }

  static generate(): UidVO {
    return new UidVO(uuidV4());
  }

  static fromValue(value: string): UidVO {
    return new UidVO(value);
  }

  private static validate(value: string): void {
    if (!value) {
      throw new BadRequestException('UID tidak boleh kosong');
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new UnprocessableEntityException('Format UID tidak valid');
    }
  }
}
