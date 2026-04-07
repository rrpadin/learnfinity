import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import StatPill from '../components/StatPill';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { getProgress } from '../lib/learner';
import { colors } from '../config/theme';

export default function ProgressScreen() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await getProgress(currentUser.id);
        setProgress(result);
      } catch (_error) {
        setProgress(null);
      }
    }

    load();
  }, [currentUser.id]);

  if (!progress) {
    return (
      <Screen>
        <EmptyState
          title="No progress yet"
          description="Once this learner completes missions, recent activity will show up here."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>A lightweight mobile snapshot of learning momentum.</Text>
      </View>

      <View style={styles.stats}>
        <StatPill label="Completed" value={progress.completedCount} />
        <StatPill label="Active" value={progress.activeCount} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        {progress.recent.length ? (
          progress.recent.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.rowTitle}>{item.mission_id}</Text>
              <Text style={styles.rowMeta}>{item.status}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No mission activity yet.</Text>
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 4,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  rowMeta: {
    fontSize: 14,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
  },
});
