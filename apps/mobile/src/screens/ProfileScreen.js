import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../config/theme';

export default function ProfileScreen() {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Account details and session controls for the mobile learner app.</Text>
      </View>

      <Card>
        <Text style={styles.name}>{currentUser?.name || 'Learner'}</Text>
        <Text style={styles.detail}>{currentUser?.email}</Text>
        <Text style={styles.detail}>Role: {isAdmin ? 'Admin' : 'Learner'}</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Release note</Text>
        <Text style={styles.body}>
          This first mobile pass is intentionally learner-focused. Admin content management remains better suited to the existing web workspace.
        </Text>
      </Card>

      <Button title="Sign out" onPress={logout} variant="secondary" />
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
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  detail: {
    fontSize: 15,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
});
