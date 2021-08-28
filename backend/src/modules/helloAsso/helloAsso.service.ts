import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { HelloAssoMembershipEntity } from './helloAsso.membership.entity';

const MEMBERS_CACHE_KEY = 'members';
@Injectable()
export class HelloAssoService {
  accessToken: string | null = null;
  accessTokenExpirationDate: Date | null = null;
  refreshToken: string | null = null;

  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
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
    const members = await this.cacheManager.get<HelloAssoMembershipEntity[]>(MEMBERS_CACHE_KEY);
    if (members !== undefined) {
      return members;
    }

    const { accessToken } = await this.connectToHelloAsso();

    const { data } = await lastValueFrom(
      this.httpService.get<HelloAssoMembershipEntity[]>(
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
    this.cacheManager.set(MEMBERS_CACHE_KEY, data, 3600);

    return data;
  }
}
