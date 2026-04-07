export async function getDashboardData(client, userId) {
  const user = await client.collection('users').getOne(userId, { $autoCancel: false });
  const currentDay = user.current_day || 1;

  if (!user.current_program_id) {
    return {
      user,
      currentProgram: null,
      nextMission: null,
      missionStatus: 'pending',
    };
  }

  const currentProgram = await client
    .collection('programs')
    .getOne(user.current_program_id, { $autoCancel: false });

  const missions = await client.collection('missions').getFullList({
    filter: `program_id = "${user.current_program_id}" && day_number = ${currentDay}`,
    sort: 'order',
    $autoCancel: false,
  });

  const nextMission = missions[0] || null;
  let missionStatus = 'pending';

  if (nextMission) {
    const missionEntries = await client.collection('user_missions').getFullList({
      filter: `user_id = "${userId}" && mission_id = "${nextMission.id}"`,
      $autoCancel: false,
    });

    missionStatus = missionEntries[0]?.status || 'pending';
  }

  return {
    user,
    currentProgram,
    nextMission,
    missionStatus,
  };
}

export async function getPrograms(client) {
  return client.collection('programs').getFullList({
    sort: '-created',
    $autoCancel: false,
  });
}

export async function getProgress(client, userId) {
  const userMissions = await client.collection('user_missions').getFullList({
    filter: `user_id = "${userId}"`,
    sort: '-updated',
    $autoCancel: false,
  });

  const completedCount = userMissions.filter(
    (mission) => mission.status === 'completed'
  ).length;

  return {
    completedCount,
    activeCount: userMissions.length - completedCount,
    recent: userMissions.slice(0, 10),
  };
}
