import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { courses } from '../types/Course';

type RootStackParamList = {
  Login: undefined;
  Welcome: { username: string };
  Courses: { username: string };
};

type CoursesScreenProps = NativeStackScreenProps<RootStackParamList, 'Courses'>;

export default function CoursesScreen({ route }: CoursesScreenProps) {
  const { username } = route.params;

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.title}>{item.id} {item.name}</Text>
          <Text style={styles.message}>Giảng viên: {item.lecturer}</Text>
          <Text style={styles.message}>Phòng học: {item.room}</Text>
          <Text style={styles.message}>Tiết: {item.period}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    color: '#666',
  },
}); 