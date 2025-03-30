import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import employeeServices from '../services/EmployeeServices';
import { useCallback, useState } from 'react';
import { Employee } from '../types/Employee';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type EmployeesScreenProps = NativeStackScreenProps<RootStackParamList, 'Employees'>;

export default function EmployeesScreen({ route, navigation }: EmployeesScreenProps) {
  const { username } = route.params;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

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

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateEmployee', { username })}
      >
        <Text style={styles.addButtonText}>+ Thêm nhân viên</Text>
      </TouchableOpacity>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.employeeCard}
            onPress={() => navigation.navigate('EmployeeDetail', {employeeId: item.id })}
          >
            <Text style={styles.employeeCode}>Mã nhân viên: {item.id}</Text>
            <Text style={styles.employeeCode}>Họ và tên: {item.employee_name}</Text>
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
  employeeCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  employeeInfo: {
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CD964',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    marginBottom: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});