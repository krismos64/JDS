import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('=== TEST LOGIN ===');
    console.log('Username reçu:', username);
    console.log('Password reçu:', password);
    
    // Test simple pour déboguer
    const isUsernameOk = username === 'admin';
    const isPasswordOk = password === 'jds2025';
    
    console.log('Username OK:', isUsernameOk);
    console.log('Password OK:', isPasswordOk);
    
    // Test avec bcrypt
    const testHash = '$2b$10$WIRPA4grfvh8y7s.yBAlBeSCiHdfu.tyHnxYlkzVfi3q1JSDJSxDK';
    const bcryptResult = bcrypt.compareSync(password, testHash);
    console.log('Bcrypt result:', bcryptResult);
    
    // Générer un nouveau hash pour test
    const newHash = bcrypt.hashSync('jds2025', 10);
    const newHashResult = bcrypt.compareSync(password, newHash);
    console.log('New hash:', newHash);
    console.log('New hash result:', newHashResult);

    if (isUsernameOk && isPasswordOk) {
      return NextResponse.json({ success: true, message: 'Test login OK' });
    }

    return NextResponse.json({ error: 'Test failed' }, { status: 401 });
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}