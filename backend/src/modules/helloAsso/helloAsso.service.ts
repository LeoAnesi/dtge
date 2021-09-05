import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { trim } from 'lodash';
import { HelloAssoMembershipEntity, HelloAssoQuestions } from './helloAsso.membership.entity';

const MEMBERS_CACHE_KEY = 'members';
const ASSOCIATIONS_CACHE_KEY = 'associations';
@Injectable()
export class HelloAssoService {
  accessToken: string | null = null;
  accessTokenExpirationDate: Date | null = null;
  refreshToken: string | null = null;

  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private async connectToHelloAsso(): Promise<{
    accessToken: string;
    accessTokenExpirationDate: Date;
    refreshToken: string;
  }> {
    const params = new URLSearchParams();
    params.append('client_id', process.env.HELLO_ASSO_CLIENT_ID as string);
    params.append('client_secret', process.env.HELLO_ASSO_CLIENT_SECRET as string);
    params.append('grant_type', 'client_credentials');
    const {
      data: { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken },
    } = await lastValueFrom(
      this.httpService.post<{
        access_token: string;
        expires_in: number;
        refresh_token: string;
      }>('oauth2/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );
    const accessTokenExpirationDate = new Date();
    accessTokenExpirationDate.setSeconds(accessTokenExpirationDate.getSeconds() + expiresIn);

    return {
      accessToken,
      accessTokenExpirationDate,
      refreshToken,
    };
  }

  async getMembers(): Promise<HelloAssoMembershipEntity[]> {
    const members = await this.cacheManager.get<string>(MEMBERS_CACHE_KEY);
    if (members !== undefined) {
      return JSON.parse(members);
    }

    const { accessToken } = await this.connectToHelloAsso();

    const {
      data: { data },
    } = await lastValueFrom(
      this.httpService.get<{ data: HelloAssoMembershipEntity[] }>(
        'v5/organizations/des-territoires-aux-grandes-ecoles/items',
        {
          params: {
            'tierTypes[]': 'Membership',
            itemStates: 'Processed',
            withDetails: true,
            retrieveAll: true,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    await this.cacheManager.set(MEMBERS_CACHE_KEY, JSON.stringify(data), { ttl: 3600 });

    return data;
  }

  async getAssociations(): Promise<string[]> {
    const cachedAssociations = await this.cacheManager.get<string>(ASSOCIATIONS_CACHE_KEY);
    if (cachedAssociations !== undefined) {
      return JSON.parse(cachedAssociations);
    }

    const members = await this.getMembers();

    const associationsSet = new Set<string>();

    members.forEach((member) => {
      const memberAssociation = trim(
        member.customFields.find((customField) =>
          HelloAssoQuestions.ASSOCIATION.includes(customField.name),
        )?.answer,
      )
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (memberAssociation !== '') {
        associationsSet.add(memberAssociation);
      }
    });

    const associations = Array.from(associationsSet);
    await this.cacheManager.set(ASSOCIATIONS_CACHE_KEY, JSON.stringify(associations), {
      ttl: 86400,
    });

    return associations;
  }
}
