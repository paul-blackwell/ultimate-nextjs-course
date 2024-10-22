'use server';

import { actionClient } from '@/lib/safe-action';
import { LoginSchema } from '@/types/login-schema';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    // Check if user is in db
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email === email) {
      return { error: 'User not found' };
    }

    if (existingUser?.emailVerified) {
    }

    return { success: email };
  });
