export async function loginWithPassword(client, email, password) {
  const authData = await client
    .collection('users')
    .authWithPassword(email, password, { $autoCancel: false });

  return authData.record;
}

export async function signupUser(client, { email, name, password, passwordConfirm }) {
  await client.collection('users').create(
    {
      email,
      name,
      password,
      passwordConfirm,
      emailVisibility: true,
      role: 'user',
      is_admin: false,
    },
    { $autoCancel: false }
  );

  const authData = await client
    .collection('users')
    .authWithPassword(email, password, { $autoCancel: false });

  return authData.record;
}

export function logoutUser(client) {
  client.authStore.clear();
}
