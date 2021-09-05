import { Injectable } from '@nestjs/common';
import { groupBy, trim } from 'lodash';
import {
  HelloAssoCustomField,
  HelloAssoMembershipEntity,
  HelloAssoQuestions,
} from '../helloAsso/helloAsso.membership.entity';
import { HelloAssoService } from '../helloAsso/helloAsso.service';
import { MemberDto, MembershipType } from './dtos/member.dto';
import { StatsDto } from './dtos/stats';

@Injectable()
export class MembersService {
  constructor(private readonly helloAssoService: HelloAssoService) {}

  async getStats(): Promise<StatsDto> {
    const helloAssoMembers = await this.helloAssoService.getMembers();
    const associations = await this.helloAssoService.getAssociations();

    const { [MembershipType.MEMBERSHIP]: members, [MembershipType.DONATION]: donations } = groupBy(
      helloAssoMembers,
      (helloAssoMember) =>
        helloAssoMember.name.includes('Dons') ? MembershipType.DONATION : MembershipType.MEMBERSHIP,
    );

    const membersByYearAndMonth = groupBy(members, (member) => {
      const membershipYearAndMonth = new Date(member.order.date).toISOString().slice(0, 7);

      return membershipYearAndMonth;
    });
    const donationsByYearAndMonth = groupBy(donations, (donation) => {
      const membershipYearAndMonth = new Date(donation.order.date).toISOString().slice(0, 7);

      return membershipYearAndMonth;
    });

    return Object.entries(membersByYearAndMonth).reduce(
      (stats, [yearAndMonth, membersForAMonth]) => {
        const donationsForAMonth: HelloAssoMembershipEntity[] | undefined =
          donationsByYearAndMonth[yearAndMonth] ?? [];

        return {
          ...stats,
          [yearAndMonth]: associations.map((association) => {
            const donationsForAMonthForAnAssociation = donationsForAMonth.filter(
              (donation) =>
                this.getCustomFieldValue(donation.customFields, HelloAssoQuestions.ASSOCIATION)
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') === association,
            );

            const membersForAMonthForAnAssociation = membersForAMonth.filter(
              (member) =>
                this.getCustomFieldValue(member.customFields, HelloAssoQuestions.ASSOCIATION)
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') === association,
            );

            const donationsAmount = donationsForAMonthForAnAssociation.reduce(
              (amount, donation) => amount + parseFloat((donation.amount / 100).toFixed(2)),
              0,
            );
            const membershipsAmount = membersForAMonthForAnAssociation.reduce(
              (amount, membership) => amount + parseFloat((membership.amount / 100).toFixed(2)),
              0,
            );

            return {
              association,
              membershipsNumber: membersForAMonthForAnAssociation.length,
              membershipsAmount,
              donationsNumber: donationsForAMonthForAnAssociation.length,
              donationsAmount,
              total: membershipsAmount + donationsAmount,
            };
          }),
        };
      },
      {},
    );
  }

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
