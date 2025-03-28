import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { courses } from '../types/Course';
import { RootStackParamList } from '../../App';

type CourseDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

export default function CourseDetailScreen({ route }: CourseDetailScreenProps) {
  const { courseId } = route.params;
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy thông tin khóa học</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.courseCode}>{course.id}</Text>
        <Text style={styles.courseName}>{course.name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giảng viên</Text>
            <Text style={styles.sectionContent}>{course.lecturer}</Text>
              <Text style={styles.sectionContent}>Phòng học: {course.room}</Text>
              <Text style={styles.sectionContent}>Tiết: {course.period}</Text>
              <Text style={styles.sectionContent}>Sĩ số: {course.memberCount}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});