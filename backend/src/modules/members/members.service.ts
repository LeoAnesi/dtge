import { Injectable } from '@nestjs/common';
import { trim } from 'lodash';
import {
  HelloAssoCustomField,
  HelloAssoMembershipEntity,
  HelloAssoQuestions,
} from '../helloAsso/helloAsso.membership.entity';
import { HelloAssoService } from '../helloAsso/helloAsso.service';
import { MemberDto, MembershipType } from './member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly helloAssoService: HelloAssoService) {}

  async getAll(association?: string): Promise<MemberDto[]> {
    const helloAssoMembers = await this.helloAssoService.getMembers();

    const members = this.convertMemberToFrontendFormat(helloAssoMembers);

    if (association !== undefined) {
      return members.filter((member) => member.association === association);
    }

    return members;
  }

  private convertMemberToFrontendFormat(
    helloAssoMembers: HelloAssoMembershipEntity[],
  ): MemberDto[] {
    return helloAssoMembers.map((helloAssoMember) => ({
      id: helloAssoMember.id.toString(),
      membershipDate: new Date(helloAssoMember.order.date).toISOString().slice(0, 10),
      ...helloAssoMember.user,
      amount: (helloAssoMember.amount / 100).toFixed(2),
      type: helloAssoMember.name.includes('Dons')
        ? MembershipType.DONATION
        : MembershipType.MEMBERSHIP,
      phoneNumber: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.PHONE),
      email: this.getCustomFieldValue(helloAssoMember.customFields, HelloAssoQuestions.EMAIL),
      association: this.getCustomFieldValue(
        helloAssoMember.customFields,
        HelloAssoQuestions.ASSOCIATION,
      )
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
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
    fieldQuestions: string[],
  ): string {
    return trim(
      customFields.find((customField) => fieldQuestions.includes(customField.name))
        ?.answer as string,
    );
  }
}
