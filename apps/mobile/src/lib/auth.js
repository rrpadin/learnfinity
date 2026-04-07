import { pb } from './pocketbase';

export async function login(email, password) {
  const authData = await pb
    .collection('users')
    .authWithPassword(email, password, { $autoCancel: false });

  return authData.record;
}

export async function signup({ email, name, password, passwordConfirm }) {
  await pb.collection('users').create(
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

  const authData = await pb
    .collection('users')
    .authWithPassword(email, password, { $autoCancel: false });

  return authData.record;
}

export function logout() {
  pb.authStore.clear();
}
