import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import employeeServices from '../services/EmployeeServices';
import { Employee } from '../types/Employee';

type CreateEmployeeScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEmployee'>;

export default function CreateEmployeeScreen({ navigation }: CreateEmployeeScreenProps) {
  const [formData, setFormData] = useState({
    employee_name: '',
    employee_age: '',
    employee_salary: '',
    profile_image: ''
  });

  async function pickImage(): Promise<void> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Cần quyền truy cập', 'Ứng dụng cần quyền truy cập thư viện ảnh');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        profile_image: result.assets[0].uri
      }));
    }
  };

  async function handleCreate(): Promise<void> {
    if (!formData.employee_name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên nhân viên');
      return;
    }

    if (!formData.employee_age) {
      Alert.alert('Lỗi', 'Vui lòng nhập tuổi');
      return;
    }

    if (!formData.employee_salary) {
      Alert.alert('Lỗi', 'Vui lòng nhập lương');
      return;
    }

    if (!formData.profile_image) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh đại diện');
      return;
    }

    try {
      const newEmployee = {
        ...formData,
        employee_name: formData.employee_name.trim(),
        employee_age: parseInt(formData.employee_age),
        employee_salary: parseInt(formData.employee_salary),
      };
      
      const createdEmployee = await employeeServices.createEmployee(newEmployee as Employee);
      Alert.alert('Thành công', 'Đã thêm nhân viên mới', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('EmployeeDetail', { 
              employeeId: createdEmployee.id 
            });
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo nhân viên mới');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.imageContainer} 
            onPress={pickImage}
          >
            {formData.profile_image ? (
              <Image
                source={{ uri: formData.profile_image }}
                style={styles.image}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.uploadText}>Tải ảnh lên</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Tên:</Text>
            <TextInput
              style={styles.input}
              value={formData.employee_name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, employee_name: text }))}
              placeholder="Nhập tên nhân viên"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Tuổi:</Text>
            <TextInput
              style={styles.input}
              value={formData.employee_age}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '');
                if (parseInt(numericValue) <= 100) {
                  setFormData(prev => ({ 
                    ...prev, 
                    employee_age: numericValue 
                  }));
                }
              }}
              keyboardType="numeric"
              placeholder="Nhập tuổi"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Lương:</Text>
            <TextInput
              style={styles.input}
              value={formData.employee_salary}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setFormData(prev => ({ 
                  ...prev, 
                  employee_salary: numericValue 
                }));
              }}
              keyboardType="numeric"
              placeholder="Nhập lương"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={handleCreate}
          >
            <Text style={styles.buttonText}>Tạo mới</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Hủy</Text>
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
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
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#4CD964',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8E8E93',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#8E8E93',
  },
});