import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Check if firebase app is already initialized
    if (admin.apps.length === 0) {
      const serviceAccountPath = path.resolve(
        process.cwd(),
        'firebase-service-account.json',
      );

      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountPath),
        });
        console.log('✅ Firebase Admin initialized');
      } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin:', error.message);
        // Don't throw error here to allow app to start even if firebase key is missing
      }
    }
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      throw new Error('Token không hợp lệ');
    }
  }
}
