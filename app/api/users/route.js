import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./app/data/users.json');

export async function GET() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  const data = await request.json();
  let users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  users.push(data);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return new Response(null, { status: 200 });
}
