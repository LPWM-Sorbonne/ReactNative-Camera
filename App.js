import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet } from 'react-native';

// Importation des composants CameraScreen et GallerieScreen
import CameraScreen from './components/CameraScreen';
import GallerieScreen from './components/GallerieScreen';

export default function App() {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            {/* On utilise le createBottomTabNavigator pour creer la navigation entre les deux screens */}
            <Tab.Navigator
                initialRouteName="Camera"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#0e0e0e',
                    },
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 20,
                        height: 60,
                        marginLeft: 20,
                        marginRight: 20,
                        borderRadius: 15,
                        backgroundColor: '#0e0e0e',
                        borderColor: '#0e0e0e',
                        elevation: 0,
                        paddingHorizontal: 10,
                    }
                }}
            >
            {/* On ajoute le composant CameraScreen à la navigation */}
            <Tab.Screen name="Camera" component={CameraScreen} options={{
                title: '', tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('./assets/camera.png')}
                            style={[styles.iconImage, { tintColor: focused ? '#1db954' : '#fff' }]}
                        />
                    </View>
                ),
            }}
            />

            {/* On ajoute le composant GallerieScreen à la navigation */}
            <Tab.Screen name="Gallerie" component={GallerieScreen} options={{
                title: '', tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('./assets/gallery.png')}
                            style={[styles.iconImage, { tintColor: focused ? '#1db954' : '#fff' }]}
                        />
                    </View>
                ),
            }}
            />
        </Tab.Navigator>
        </NavigationContainer >
    );
}

// Styles pour le composant App
const styles = StyleSheet.create({
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    iconImage: {
      top: 10,
      width: 30,
      height: 30,
    }
  });