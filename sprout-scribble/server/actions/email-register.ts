'use server';
import { RegisterSchema } from '@/types/register-schema';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcrypt';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';

const action = createSafeActionClient();

export const emailRegister = action
  .schema(RegisterSchema)
  .action(async ({ parsedInput }) => {
    const { email, name, password } = parsedInput;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    /*
     * Check if the email is in the database then say it's in use,
     * if it is not register the user but also send verification email
     */
    if (existingUser) {
      // if(!existingUser.emailVerified) {
      //   const verificationToken =
      // }
      return { error: 'Email is already in use' };
    }

    return { success: 'Account was registered' };
  });
