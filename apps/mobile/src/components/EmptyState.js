import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { colors } from '../config/theme';

export default function EmptyState({ title, description }) {
  return (
    <Card>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
});
