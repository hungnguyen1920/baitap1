import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import employeeServices from '../services/EmployeeServices';
import { useEffect, useState } from 'react';
import { Employee } from '../types/Employee';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

type EmployeesScreenProps = NativeStackScreenProps<RootStackParamList, 'Employees'>;


export default function EmployeesScreen({ route, navigation }: EmployeesScreenProps) {
  const { username } = route.params;
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { 
        async function fetchEmployees(): Promise<void> {
            setLoading(true);
            try {
                const data = await employeeServices.getEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch employees');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.employeeCard}
            onPress={() => navigation.navigate('EmployeeDetail', {employeeId: item.id })}
          >
            <Text style={styles.courseCode}>Họ và tên: {item.employee_name}</Text>
            {/* <Text style={styles.courseName}>{item.employee_name}</Text> */}
            <View style={styles.employeeInfo}>
              <Text style={styles.infoText}>Tuổi: {item.employee_age}</Text>
              <Text style={styles.infoText}>Lương: {item.employee_salary}</Text>
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
  employeeCard: {
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
  employeeInfo: {
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});