import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../config/theme';

export default function StatPill({ label, value }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minWidth: 96,
    borderRadius: 16,
    padding: 14,
    backgroundColor: colors.surfaceMuted,
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
