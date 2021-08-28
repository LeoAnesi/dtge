import { Injectable } from '@nestjs/common';
import { trim } from 'lodash';
import { HelloAssoCustomField, HelloAssoQuestions } from '../helloAsso/helloAsso.membership.entity';
import { HelloAssoService } from '../helloAsso/helloAsso.service';
import { MemberDto } from './member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly helloAssoService: HelloAssoService) {}

  async getAll(): Promise<MemberDto[]> {
    const helloAssoMembers = await this.helloAssoService.getMembers();

    return helloAssoMembers.map((helloAssoMember) => ({
      id: helloAssoMember.id.toString(),
      ...helloAssoMember.user,
      phoneNumber: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.PHONE),
      email: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.EMAIL),
      association: this.getCustomFieldValue(
        helloAssoMember.customFields,
        HelloAssoQuestions.ASSOCIATION,
      ),
      lycee: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.LYCEE),
      universityName: this.getCustomFieldValue(
        helloAssoMember.customFields,
        HelloAssoQuestions.UNIVERSITY_NAME,
      ),
      classePrepa: this.getCustomFieldValue(
        helloAssoMember.customFields,
        HelloAssoQuestions.CLASSE_PREPA,
      ),
      activityField: this.getCustomFieldValue(
        helloAssoMember.customFields,
        HelloAssoQuestions.ACTIVITY_FIELD,
      ),
      cursus: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.CURSUS),
    }));
  }

  private getCustomFieldValue(
    customFields: HelloAssoCustomField[],
    field: HelloAssoQuestions,
  ): string {
    return trim(customFields.find((customField) => customField.name === field)?.answer as string);
  }
}
