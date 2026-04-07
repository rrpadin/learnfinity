import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../config/theme';

export default function LoginScreen() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password || (mode === 'signup' && !name)) {
      Alert.alert('Missing information', 'Please fill in the required fields.');
      return;
    }

    try {
      setLoading(true);

      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup({
          email,
          name,
          password,
          passwordConfirm: password,
        });
      }
    } catch (error) {
      Alert.alert('Unable to continue', error?.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Learnfinity mobile</Text>
        <Text style={styles.title}>Bring daily AI learning into the flow of work.</Text>
        <Text style={styles.subtitle}>
          This mobile app is set up for learner access first, using the same PocketBase backend as the web app.
        </Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{mode === 'login' ? 'Sign in' : 'Create account'}</Text>

        {mode === 'signup' ? (
          <TextField
            label="Full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        ) : null}

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title={mode === 'login' ? 'Sign in' : 'Create account'}
          onPress={handleSubmit}
          loading={loading}
        />

        <Button
          title={mode === 'login' ? 'Need an account?' : 'Already have an account?'}
          onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
          variant="secondary"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingBottom: 32,
    gap: 24,
  },
  hero: {
    gap: 10,
  },
  kicker: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    gap: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
});
