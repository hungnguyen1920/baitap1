import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type CreateEmployeeScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEmployee'>;

export default function CreateEmployeeScreen({ route }: CreateEmployeeScreenProps) { 
    const { username } = route.params;
    return;
}