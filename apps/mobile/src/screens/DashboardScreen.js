import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import StatPill from '../components/StatPill';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../lib/learner';
import { colors } from '../config/theme';

export default function DashboardScreen() {
  const { currentUser } = useAuth();
  const [state, setState] = useState({
    loading: true,
    refreshing: false,
    data: null,
  });

  const load = useCallback(async (refreshing = false) => {
    if (!currentUser?.id) {
      return;
    }

    setState((previous) => ({
      ...previous,
      loading: previous.data ? previous.loading : !refreshing,
      refreshing,
    }));

    try {
      const data = await getDashboardData(currentUser.id);
      setState({
        loading: false,
        refreshing: false,
        data,
      });
    } catch (_error) {
      setState((previous) => ({
        loading: false,
        refreshing: false,
        data: previous.data,
      }));
    }
  }, [currentUser?.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!state.data && state.loading) {
    return (
      <Screen scroll={false} contentStyle={styles.centered}>
        <Text style={styles.muted}>Loading your dashboard...</Text>
      </Screen>
    );
  }

  const data = state.data;

  return (
    <Screen
      contentStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={state.refreshing}
          onRefresh={() => load(true)}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}
        </Text>
        <Text style={styles.subtitle}>Your next AI learning step is ready.</Text>
      </View>

      {data?.currentProgram ? (
        <>
          <Card style={styles.heroCard}>
            <Text style={styles.eyebrow}>Current program</Text>
            <Text style={styles.programTitle}>{data.currentProgram.title}</Text>
            <Text style={styles.programDescription}>
              {data.currentProgram.description || 'Continue the program from where you left off.'}
            </Text>
            <View style={styles.pillRow}>
              <StatPill label="Day" value={data.user.current_day || 1} />
              <StatPill label="Streak" value={data.user.streak_count || 0} />
              <StatPill label="Status" value={data.missionStatus} />
            </View>
          </Card>

          {data.nextMission ? (
            <Card>
              <Text style={styles.sectionTitle}>Up next</Text>
              <Text style={styles.missionTitle}>{data.nextMission.title}</Text>
              <Text style={styles.missionDescription}>
                {data.nextMission.description || 'Open the web workspace to complete the full mission experience.'}
              </Text>
              <Button title="Continue on web for now" variant="secondary" onPress={() => {}} />
            </Card>
          ) : null}
        </>
      ) : (
        <EmptyState
          title="No active program"
          description="Your learner app is connected, but this account is not enrolled in a program yet."
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  muted: {
    color: colors.textMuted,
    fontSize: 16,
  },
  header: {
    gap: 6,
  },
  greeting: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
  },
  heroCard: {
    backgroundColor: '#F0F5FF',
    borderColor: '#CFE0FF',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  programTitle: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  programDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 6,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  missionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  missionDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
