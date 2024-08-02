import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./app/data/users.json');

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

export async function GET() {
  const users = readUsersFromFile();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  const newUser = await request.json();
  const users = readUsersFromFile();

  users.push(newUser);

  writeUsersToFile(users);

  return new Response(null, { status: 200 });
}

export async function PUT(request) {
  const { email, work, action } = await request.json();
  const users = readUsersFromFile();

  const updatedUsers = users.map(user => {
    if (user.email === email) {
      if (action === 'allocate') {
        user.work = work;
      } else if (action === 'deallocate') {
        user.work = null;
      }
    }
    return user;
  });

  writeUsersToFile(updatedUsers);

  return new Response(null, { status: 200 });
}
