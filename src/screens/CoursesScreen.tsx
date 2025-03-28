import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { courses } from '../types/Course';
import { RootStackParamList } from '../../App';

type CoursesScreenProps = NativeStackScreenProps<RootStackParamList, 'Courses'>;

export default function CoursesScreen({ route, navigation }: CoursesScreenProps) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
          >
            <Text style={styles.courseCode}>{item.id}</Text>
            <Text style={styles.courseName}>{item.name}</Text>
            <View style={styles.courseInfo}>
              <Text style={styles.infoText}>Giảng viên: {item.lecturer}</Text>
              <Text style={styles.infoText}>Phòng học: {item.room}</Text>
              <Text style={styles.infoText}>Tiết: {item.period}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    marginBottom: 12,
  },
  courseInfo: {
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});