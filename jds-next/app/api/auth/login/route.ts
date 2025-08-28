import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt:', { username, password: password ? '***' : 'missing' });

    if (!username || !password) {
      console.log('Missing credentials');
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    const isValid = await verifyCredentials(username, password);
    console.log('Credentials validation result:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    await setSession({ username, isAdmin: true });

    return NextResponse.json(
      { success: true, message: 'Connexion réussie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}