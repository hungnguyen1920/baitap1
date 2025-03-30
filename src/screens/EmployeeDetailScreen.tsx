import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Employee } from '../types/Employee';
import employeeServices from '../services/EmployeeServices';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

type EmployeeDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'EmployeeDetail'>;

export default function EmployeeDetailScreen({ route, navigation }: EmployeeDetailScreenProps) {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const hasChanges = useMemo(() => {
    if (!employee || !formData) return false;
    return (
      employee.employee_name !== formData.employee_name ||
      employee.employee_age !== formData.employee_age ||
      employee.employee_salary !== formData.employee_salary
    );
  }, [employee, formData]);

  async function fetchEmployee(): Promise<void> {
    try {
      setLoading(true);
      const data = await employeeServices.getEmployeeById(employeeId);
      setEmployee(data);
    } catch (error) {
      setError('Không thể tải thông tin nhân viên');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  async function handleSave(): Promise<void> {
    if (!formData || !hasChanges) return;

    try {
      setLoading(true);
      await employeeServices.updateEmployee(formData);
      setEmployee(formData);
      setIsEditing(false);
      Alert.alert("Thành công", "Đã cập nhật thông tin nhân viên");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin nhân viên");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete(): Promise<void> {
    try {
      await employeeServices.deleteEmployee(employeeId);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error); 
    } finally {
      setLoading(false);
    }
  };

  function handleCancel(): void {
    setIsEditing(false);
    if (employee) {
      setFormData(employee);
    }
  };

  // Xử lý back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (hasChanges) {
          Alert.alert(
            "Xác nhận",
            "Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn thoát không?",
            [
              {
                text: "Tiếp tục chỉnh sửa",
                style: "cancel",
                onPress: () => null
              },
              {
                text: "Thoát",
                style: "destructive",
                onPress: () => {
                  setIsEditing(false);
                  navigation.goBack();
                }
              }
            ]
          );
          return true; // Prevents default back button behavior
        }
        return false; // Allows default back button behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [hasChanges, navigation])
  );

  // Xử lý navigation back
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (hasChanges) {
              Alert.alert(
                "Xác nhận",
                "Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn thoát không?",
                [
                  {
                    text: "Tiếp tục chỉnh sửa",
                    style: "cancel",
                    onPress: () => null
                  },
                  {
                    text: "Thoát",
                    style: "destructive",
                    onPress: () => {
                      setIsEditing(false);
                      navigation.goBack();
                    }
                  }
                ]
              );
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={{ color: '#007AFF', marginLeft: 10 }}>Quay lại</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, hasChanges]);

  function renderContent(): React.JSX.Element | null {
    if (!employee || !formData) return null;

    return (
      <>
        <View style={styles.header}>
          <Image
            source={{ uri: employee.profile_image }}
            style={styles.image}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.employeeId}>ID: {employee.id}</Text>
            <TextInput
              style={[
                styles.input,
                !isEditing && styles.inputDisabled
              ]}
              value={formData.employee_name}
              onChangeText={(text) => setFormData({ ...formData, employee_name: text })}
              placeholder="Tên nhân viên"
              editable={isEditing}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Tuổi:</Text>
            <TextInput
              style={[
                styles.input,
                !isEditing && styles.inputDisabled
              ]}
              value={formData.employee_age.toString()}
              onChangeText={(text) => setFormData({ ...formData, employee_age: parseInt(text) || 0 })}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Lương:</Text>
            <TextInput
              style={[
                styles.input,
                !isEditing && styles.inputDisabled
              ]}
              value={formData.employee_salary.toString()}
              onChangeText={(text) => setFormData({ ...formData, employee_salary: parseInt(text) || 0 })}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity 
                style={[
                  styles.button, 
                  styles.saveButton,
                  !hasChanges && styles.buttonDisabled
                ]} 
                onPress={handleSave}
                disabled={!hasChanges}
              >
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.button, 
                  styles.cancelButton
                ]} 
                onPress={() => {
                  if (hasChanges) {
                    Alert.alert(
                      "Xác nhận",
                      "Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn hủy không?",
                      [
                        {
                          text: "Tiếp tục chỉnh sửa",
                          style: "cancel"
                        },
                        {
                          text: "Hủy thay đổi",
                          onPress: () => {
                            handleCancel();
                          }
                        }
                      ]
                    );
                  } else {
                    handleCancel();
                  }
                }}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Hủy</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]} 
                onPress={() => {
                  handleEdit();
                  setFormData(employee);
                }}
              >
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.deleteButton]} 
                onPress={() => {
                  Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa nhân viên này không?", [
                    {
                      text: "Hủy",
                      style: "cancel"
                    },
                    { text: "Xóa", onPress: () => handleDelete() }
                  ]);
                }}
              >
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Xóa</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !employee) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || 'Không tìm thấy nhân viên'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  employeeId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  employeeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginVertical: 4,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
    color: '#666',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  inputLabel: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CD964',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8E8E93',
  },
  cancelButtonText: {
    color: '#8E8E93',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#4CD964',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  deleteButtonText: {
    color: '#fff',
  },
});
