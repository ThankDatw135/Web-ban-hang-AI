import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMeasurementsDto {
  @ApiPropertyOptional({ example: 170, description: 'Chiều cao (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  height?: number;

  @ApiPropertyOptional({ example: 65, description: 'Cân nặng (kg)' })
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(200)
  weight?: number;

  @ApiPropertyOptional({ example: 95, description: 'Vòng ngực (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(150)
  chest?: number;

  @ApiPropertyOptional({ example: 80, description: 'Vòng eo (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(150)
  waist?: number;

  @ApiPropertyOptional({ example: 95, description: 'Vòng hông (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(150)
  hips?: number;
}
