'use server';

import { actionClient } from '@/lib/safe-action';
import { LoginSchema } from '@/types/login-schema';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import { generateEmailVerificationToken } from '@/server/actions/tokens';
import { sendVerificationEmail } from '@/server/actions/email';
import { signIn } from '@/server/auth';
import { AuthError } from 'next-auth';

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      // Check if user is in db
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: 'User not found' };
      }

      // If user is not verified, send verification email
      if (existingUser?.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser?.email
        );
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return { error: 'Confirmation email sent' };
      }

      // TODO: 2FT Auth

      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      });

      console.log(email, password, code);
      return { success: email };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Email or Password Incorrect' };
          case 'AccessDenied':
            return { error: error.message };
          case 'OAuthSignInError':
            return { error: error.message };
          default:
            return { error: 'Something went wrong' };
        }
      }
    }

    // Check if user is in db
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: 'User not found' };
    }

    // If uses is not verified, send verification email
    if (existingUser?.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(
        existingUser?.email
      );
      await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );
      return { error: 'Confirmation email sent' };
    }

    // TODO: 2FT Auth

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });

    console.log(email, password, code);
    return { success: email };
  });
