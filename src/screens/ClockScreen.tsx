import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Welcome: { username: string };
  Clock: undefined;
};

type ClockScreenProps = NativeStackScreenProps<RootStackParamList, 'Clock'>;

type LapItem = {
  id: string;
  time: number;
};

export default function ClockScreen({ route }: ClockScreenProps) {
    const [laps, setLaps] = useState<LapItem[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timer | null>(null);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const btnStart = () => {
        if (!isRunning) {
            // Start timer
            setStartTime(Date.now() - elapsedTime);
            timerRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 100);
            setIsRunning(true);
        } else {
            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current as NodeJS.Timeout);
            }
            setIsRunning(false);
        }
    };

    const btnLap = () => {
        if (isRunning) {
            const newLap: LapItem = {
                id: Date.now().toString(),
                time: elapsedTime
            };
            setLaps(prevLaps => [newLap, ...prevLaps]);
        }
    };

    const renderLapItem = ({ item, index }: { item: LapItem; index: number }) => (
        <View style={styles.lapRow}>
            <Text style={styles.lapText}>Lap {laps.length - index}</Text>
            <Text style={styles.lapTime}>{formatTime(item.time)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} 
                    onPress={btnStart}
                >
                    <Text style={styles.buttonText}>
                        {isRunning ? 'Stop' : 'Start'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.lapButton]} 
                    onPress={btnLap}
                    disabled={!isRunning}
                >
                    <Text style={styles.buttonText}>Lap</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.lapButton]} 
                    onPress={btnReset}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={laps}
                renderItem={renderLapItem}
                keyExtractor={item => item.id}
                style={styles.lapList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    timerContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#4CAF50',
    },
    stopButton: {
        backgroundColor: '#f44336',
    },
    lapButton: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lapList: {
        flex: 1,
    },
    lapRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 10,
    },
    lapText: {
        fontSize: 16,
        color: '#444',
    },
    lapTime: {
        fontSize: 16,
        fontFamily: 'monospace',
        color: '#222',
    },
}); 