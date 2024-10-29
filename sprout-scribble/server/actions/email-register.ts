'use server';
import { RegisterSchema } from '@/types/register-schema';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcrypt';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import { generateEmailVerificationToken } from '@/server/actions/tokens';

const action = createSafeActionClient();

export const emailRegister = action
  .schema(RegisterSchema)
  .action(async ({ parsedInput }) => {
    const { email, name, password } = parsedInput;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Check for existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser?.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        // TODO: Send email with verification token
        // await sendVerificationEmail
        return { success: 'Email confirmation resent' };
      }
      return { error: 'Email is already in use' };
    }

    // Logic for when the user is not registered
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword.toString(),
    });

    const verificationToken = await generateEmailVerificationToken(email);

    // TODO: Send email with verification token
    // await sendVerificationEmail

    return { success: 'Confirmation email sent' };
  });
