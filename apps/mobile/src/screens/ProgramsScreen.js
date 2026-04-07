import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { getPrograms } from '../lib/learner';
import { colors } from '../config/theme';

export default function ProgramsScreen() {
  const [programs, setPrograms] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const records = await getPrograms();
        setPrograms(records);
      } catch (_error) {
        setPrograms([]);
      }
    }

    load();
  }, []);

  const filtered = programs.filter((program) => {
    const text = `${program.title} ${program.description || ''}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Programs</Text>
        <Text style={styles.subtitle}>Browse the same learning catalog your web app already serves.</Text>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search programs"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
      />

      {filtered.length ? (
        filtered.map((program) => (
          <Card key={program.id}>
            <Text style={styles.programTitle}>{program.title}</Text>
            <Text style={styles.meta}>
              {program.category || 'General'} · {program.duration_days || '?'} days
            </Text>
            <Text style={styles.description}>
              {program.description || 'Description coming soon.'}
            </Text>
          </Card>
        ))
      ) : (
        <EmptyState
          title="No matching programs"
          description="Try another search term or add mobile enrollment flows next."
        />
      )}
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
  search: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 16,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
});
