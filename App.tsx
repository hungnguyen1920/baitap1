import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ToDoListScreen from './src/screens/ToDoListScreen';
import CreateToDoScreen from './src/screens/CreateToDoScreen';
import ToDoDetailScreen from './src/screens/ToDoDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  Welcome: { username: string };
  ForgotPassword: { username: string };
  ToDoList: { username: string };
  CreateToDo: { username: string };
  ToDoDetail: { username: string, toDoId: string };
}

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
          name="ForgotPassword" 
          component={ForgotPasswordScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen 
          name="ToDoList" 
          component={ToDoListScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen 
          name="CreateToDo" 
          component={CreateToDoScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen 
          name="ToDoDetail" 
          component={ToDoDetailScreen}
          options={{ headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
