'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { emailTokens } from '@/server/schema';
import { users } from '@/server/schema';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });

    return verificationToken;
  } catch (error) {
    return { error: null };
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.token, email));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
};

export const newVerification = async (token: string) => {
  const existingToken = await generateEmailVerificationToken(token);
  if (!existingToken) return { error: 'Token not found' };

  const hasExpired = new Date(existingToken[0].expires) < new Date();
  if (hasExpired) return { error: 'Token has expired' };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken[0].email),
  });
  if (!existingUser) return { error: 'Email does not exist' };
  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken[0].email,
  });

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken[0].id));
  return { success: 'Email verified' };
};
