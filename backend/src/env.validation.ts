import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  SECRET_KEY!: string;

  @IsString()
  TYPEORM_URL!: string;

  @IsString()
  TYPEORM_ENTITIES!: string;

  @IsString()
  TYPEORM_MIGRATIONS!: string;

  @IsString()
  TYPEORM_MIGRATIONS_DIR!: string;

  // We must keep all booleans as strings as long as this issue is not resolved: https://github.com/typestack/class-transformer/issues/550
  @IsString()
  TYPEORM_SYNCHRONIZE!: string;

  @IsString()
  ALLOWED_HOST!: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
