# Bảo Mật Hệ Thống (Security)

Tài liệu về các biện pháp bảo mật được áp dụng trong hệ thống Fashion AI E-commerce.

---

## Mục Lục

1. [Tổng Quan Bảo Mật](#1-tổng-quan-bảo-mật)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [API Security](#3-api-security)
4. [Data Protection](#4-data-protection)
5. [Payment Security](#5-payment-security)
6. [Infrastructure Security](#6-infrastructure-security)
7. [Security Checklist](#7-security-checklist)

---

## 1. Tổng Quan Bảo Mật

### 1.1. Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │             EDGE SECURITY                        │   │
│  │  WAF │ DDoS Protection │ SSL/TLS │ CDN          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │           APPLICATION SECURITY                   │   │
│  │  Rate Limiting │ Input Validation │ CORS        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │            AUTH & ACCESS CONTROL                 │   │
│  │  JWT │ RBAC │ Session Management                │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              DATA SECURITY                       │   │
│  │  Encryption │ Hashing │ Sanitization            │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │           INFRASTRUCTURE SECURITY                │   │
│  │  Firewall │ VPN │ Secrets Management            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 1.2. Security Principles

| Nguyên tắc       | Mô tả                       |
| ---------------- | --------------------------- |
| Defense in Depth | Nhiều lớp bảo vệ            |
| Least Privilege  | Quyền tối thiểu cần thiết   |
| Fail Secure      | Từ chối mặc định khi có lỗi |
| Zero Trust       | Không tin tưởng mặc định    |

---

## 2. Authentication & Authorization

### 2.1. JWT Authentication

```typescript
// Token Structure
interface JWTPayload {
  sub: string;      // User ID
  email: string;
  role: 'USER' | 'ADMIN';
  iat: number;      // Issued at
  exp: number;      // Expiration
}

// Token Configuration
{
  accessToken: {
    secret: process.env.JWT_SECRET,
    expiresIn: '15m'  // Short-lived
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d'   // Long-lived, stored in DB
  }
}
```

### 2.2. Token Flow

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant Redis

    Client->>Backend: Login (email, password)
    Backend->>Backend: Verify credentials
    Backend->>Backend: Generate Access Token (15m)
    Backend->>Redis: Store Refresh Token (7d)
    Backend-->>Client: { accessToken, refreshToken }

    Note over Client: Access Token expires

    Client->>Backend: Refresh (refreshToken)
    Backend->>Redis: Validate refresh token
    Backend->>Backend: Generate new tokens
    Backend->>Redis: Rotate refresh token
    Backend-->>Client: { newAccessToken, newRefreshToken }
```

### 2.3. Password Security

```typescript
// Password Hashing (bcrypt)
const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Password Requirements
const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};
```

### 2.4. Role-Based Access Control (RBAC)

```typescript
// Roles
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Permissions Matrix
const PERMISSIONS = {
  "GET /products": [Role.USER, Role.ADMIN],
  "POST /products": [Role.ADMIN],
  "DELETE /products/:id": [Role.ADMIN],
  "GET /orders": [Role.USER, Role.ADMIN],
  "PATCH /orders/:id/status": [Role.ADMIN],
  "GET /users": [Role.ADMIN],
};

// Guard Implementation
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      "roles",
      context.getHandler(),
    );
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

---

## 3. API Security

### 3.1. Rate Limiting

```typescript
// Global Rate Limit
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,        // 60 seconds window
      limit: 100,     // 100 requests per window
    }),
  ],
})

// Endpoint-specific limits
const RATE_LIMITS = {
  'auth/*': { ttl: 60, limit: 10 },      // 10 req/min for auth
  'ai/*': { ttl: 60, limit: 5 },         // 5 req/min for AI
  'payments/*': { ttl: 60, limit: 20 },  // 20 req/min for payments
};
```

### 3.2. Input Validation

```typescript
// DTOs with class-validator
class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  password: string;

  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-ZÀ-ỹ\s]+$/) // Vietnamese names
  firstName: string;

  @IsOptional()
  @Matches(/^0[0-9]{9}$/) // Vietnamese phone
  phone?: string;
}

// Sanitization
import * as sanitizeHtml from "sanitize-html";

function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
```

### 3.3. CORS Configuration

```typescript
// main.ts
app.enableCors({
  origin: process.env.CORS_ORIGINS.split(","),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
});
```

### 3.4. Security Headers

```typescript
// Helmet middleware
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://storage.example.com"],
        scriptSrc: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);
```

### 3.5. SQL Injection Prevention

```typescript
// ✅ Prisma ORM (parameterized queries)
const user = await prisma.user.findFirst({
  where: { email: userInput }, // Automatically escaped
});

// ❌ Raw queries (avoid if possible)
// If needed, use parameterized:
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${userInput}
`;
```

---

## 4. Data Protection

### 4.1. Encryption at Rest

```typescript
// Sensitive data encryption
import * as crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
```

### 4.2. Data Masking

```typescript
// Mask sensitive data in responses
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}***@${domain}`;
}

function maskPhone(phone: string): string {
  return `${phone.slice(0, 4)}****${phone.slice(-2)}`;
}

function maskCardNumber(card: string): string {
  return `****${card.slice(-4)}`;
}
```

### 4.3. Audit Logging

```typescript
// Audit log for sensitive operations
interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Log sensitive operations
async function logAudit(log: AuditLog) {
  await prisma.auditLog.create({ data: log });
}
```

---

## 5. Payment Security

### 5.1. Webhook Signature Verification

```typescript
// MoMo Signature Verification
function verifyMoMoSignature(data: MoMoCallback): boolean {
  const rawSignature = [
    `accessKey=${process.env.MOMO_ACCESS_KEY}`,
    `amount=${data.amount}`,
    `extraData=${data.extraData}`,
    `message=${data.message}`,
    `orderId=${data.orderId}`,
    `orderInfo=${data.orderInfo}`,
    `orderType=${data.orderType}`,
    `partnerCode=${data.partnerCode}`,
    `payType=${data.payType}`,
    `requestId=${data.requestId}`,
    `responseTime=${data.responseTime}`,
    `resultCode=${data.resultCode}`,
    `transId=${data.transId}`,
  ].join("&");

  const expectedSignature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY)
    .update(rawSignature)
    .digest("hex");

  return expectedSignature === data.signature;
}

// ZaloPay MAC Verification
function verifyZaloPayMAC(data: ZaloPayCallback): boolean {
  const dataStr = `${data.appid}|${data.apptransid}|${data.pmcid}|${data.bankcode}|${data.amount}|${data.discountamount}|${data.status}`;

  const expectedMAC = crypto
    .createHmac("sha256", process.env.ZALOPAY_KEY2)
    .update(dataStr)
    .digest("hex");

  return expectedMAC === data.mac;
}
```

### 5.2. Idempotency

```typescript
// Prevent duplicate payment processing
@Injectable()
export class PaymentService {
  async processWebhook(transactionId: string, data: any) {
    // Check if already processed
    const existing = await this.prisma.payment.findFirst({
      where: { transactionId },
    });

    if (existing?.status === "COMPLETED") {
      return { status: "already_processed" };
    }

    // Process with transaction lock
    return this.prisma.$transaction(async (tx) => {
      // Double-check within transaction
      const payment = await tx.payment.findFirst({
        where: { transactionId },
      });

      if (payment?.status === "COMPLETED") {
        return { status: "already_processed" };
      }

      // Process payment
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: "COMPLETED" },
      });

      // Update order
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: "CONFIRMED" },
      });

      return { status: "success" };
    });
  }
}
```

### 5.3. IP Whitelist

```typescript
// Webhook IP whitelist middleware
const PAYMENT_WEBHOOK_IPS = {
  momo: ["118.69.212.158", "118.69.212.159"],
  zalopay: ["113.160.92.202", "113.160.92.203"],
};

function webhookIpWhitelist(provider: "momo" | "zalopay") {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const allowedIps = PAYMENT_WEBHOOK_IPS[provider];

    if (!allowedIps.includes(clientIp)) {
      return res.status(403).json({ error: "IP not allowed" });
    }

    next();
  };
}
```

---

## 6. Infrastructure Security

### 6.1. Environment Variables

```typescript
// Never commit secrets to git
// Use .env files with .gitignore

// Validate required env vars on startup
function validateEnv() {
  const required = [
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "ENCRYPTION_KEY",
    "MOMO_SECRET_KEY",
    "ZALOPAY_KEY2",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }
}
```

### 6.2. Docker Security

```dockerfile
# Dockerfile best practices

# Use specific version, not 'latest'
FROM node:18-alpine

# Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Don't expose sensitive files
COPY --chown=appuser:appgroup . .

# Use multi-stage builds
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/main.js"]
```

### 6.3. Database Security

```sql
-- Create dedicated user with limited permissions
CREATE USER app_user WITH PASSWORD 'secure_password';

-- Grant only necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
REVOKE DROP, TRUNCATE ON ALL TABLES IN SCHEMA public FROM app_user;

-- Use SSL connections
-- postgresql://user:pass@host:5432/db?sslmode=require
```

### 6.4. Secrets Management

```yaml
# Use Docker secrets or external secret managers
# docker-compose.yml
services:
  backend:
    secrets:
      - db_password
      - jwt_secret

secrets:
  db_password:
    external: true
  jwt_secret:
    external: true
```

---

## 7. Security Checklist

### Pre-deployment

- [ ] All secrets stored securely (not in code)
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security headers configured (Helmet)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] Authentication flow tested
- [ ] Authorization (RBAC) tested
- [ ] Payment webhook signatures verified
- [ ] Audit logging enabled
- [ ] Error messages don't leak sensitive info

### Regular Audits

- [ ] Dependency vulnerabilities (npm audit, pip audit)
- [ ] Access logs review
- [ ] Failed login attempts monitoring
- [ ] Database access review
- [ ] API key rotation
- [ ] SSL certificate expiry check
- [ ] Penetration testing (annual)

### Incident Response

- [ ] Contact list for security incidents
- [ ] Procedure for revoking compromised tokens
- [ ] Database backup and restore tested
- [ ] Incident logging and documentation process
