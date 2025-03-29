import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import CreateEmployeeScreen from './src/screens/CreateEmployeeScreen';

export type RootStackParamList = {
  Login: undefined;
  Welcome: { username: string };
  Employees: { username: string };
  EmployeeDetail: { employeeId: number };
  CreateEmployee: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen 
          name="Employees" 
          component={EmployeesScreen} 
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetailScreen}
          options={{ headerLeft: () => null }}
        />
        {/* <Stack.Screen
          name="CreateEmployee"
          component={CreateEmployeeScreen}
          options={{ headerLeft: () => null }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
