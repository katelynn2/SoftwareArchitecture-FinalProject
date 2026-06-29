import { PrismaClient } from '@prisma/client';

export class DatabaseConnection {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient();
      console.log("new Prisma Client connection successfully created");
    }
    return DatabaseConnection.instance;
  }
}

export const prisma = DatabaseConnection.getInstance();