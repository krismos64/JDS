import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'jds-admin-secret-key-change-in-production'
);

export interface UserToken {
  username: string;
  isAdmin: boolean;
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Identifiants admin
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'jds2025';
  
  // Trim des espaces pour éviter les erreurs
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  
  console.log('Tentative de connexion:', { username: trimmedUsername });
  
  // Vérification simple pour le développement
  // En production, utiliser un hash bcrypt approprié
  if (trimmedUsername === ADMIN_USERNAME && trimmedPassword === ADMIN_PASSWORD) {
    console.log('Connexion réussie');
    return true;
  }
  
  // Alternative avec bcrypt (pour plus tard)
  // const ADMIN_PASSWORD_HASH = '$2a$10$Fx83HkNqPIQUYG1hCTmai.s1arml35ds4GDztLUmFyBq4zjFqcOFC';
  // if (username === ADMIN_USERNAME) {
  //   try {
  //     const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  //     return isValid;
  //   } catch (error) {
  //     console.error('Erreur bcrypt:', error);
  //     return false;
  //   }
  // }
  
  console.log('Identifiants invalides');
  return false;
}

export async function createToken(user: UserToken): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
  
  return token;
}

export async function verifyToken(token: string): Promise<UserToken | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as UserToken;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<UserToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token.value);
}

export async function setSession(user: UserToken): Promise<void> {
  const token = await createToken(user);
  const cookieStore = await cookies();
  
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 heures
    path: '/'
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}