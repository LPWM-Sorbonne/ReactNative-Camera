//Import des elements essentiels
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import * as SystemeFichier from 'expo-file-system';

export default function CameraScreen() {
    // State permettant de gerer la permission d'acceder a la camera, l'orientation et le flash
    const [permission, setPermission] = useState(null);
    const [orientation, setOrientation] = useState('back');
    const [flash, setFlash] = useState('off');
    // Reference de la camera pour pouvoir l'utiliser dans les fonctions
    const cameraRef = useRef(null);
    // Hook permettant de savoir si le screen est visible ou non car sinon la camera ne s'affiche pas quand on navigue entre les screens
    const estVisible  = useIsFocused();

    useEffect(() => {
        // Fonction qui permet de demander la permission d'accder a la caméra
        const demanderPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        };
        demanderPermission();
    }, []);

    // Fonction qui permet de capturer une photo et de l'enregistrer dans le dossier 'photos' de l'application
    const capturerPhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            const dossierPhoto = SystemeFichier.documentDirectory + 'photos/';
            const infoDossier = await SystemeFichier.getInfoAsync(dossierPhoto);

            // On verfie si le dossier existe pour accueilir les photos sinon on le cree
            if (!infoDossier.exists) {
                console.log("Le dossier n'existe pas, création...");
                await SystemeFichier.makeDirectoryAsync(dossierPhoto, { intermediates: true });
            }

            // On cree le nom de la photo avec la date et l'heure actuelle (l'utilisation de new Date().getTime() permet d'avoir un nom unique pour chaque photo)
            const CheminPhoto = dossierPhoto + 'photo_' + new Date().getTime() + '.jpg';
            await SystemeFichier.moveAsync({ from: photo.uri, to: CheminPhoto  });

            // On affiche un message de confirmation dans la console
            console.log("Photo enregistrée :", CheminPhoto);
        }
    };

    // Fonction permettant de choisir entre le flash on ou off pour l'utilisation on utilise une variable d'état pour savoir si le flash est on ou off
    const ChoixFlash = () => {
        setFlash(flash === 'off' ? 'on' : 'off');
    };

    // Fonction pour inverser l'orientation de la caméra
    const inverserCamera = () => {
        let nouvelleOrientation = 'front';
        // Si l'orientation actuelle est front, on la change en back et inversement
        if (orientation === 'front') {
            nouvelleOrientation = 'back';
        }
        setOrientation(nouvelleOrientation);
    };

    // Condition pour afficher le message de demande de permission ou le refus de permission
    if (permission === null) return <Text>Demande de permission...</Text>;
    if (permission === false) return <Text>Permission refusée</Text>;

    return (
        <View style={styles.container}>
            {/* Permet d'affocjer la la vue camera uniquement si le screen est visible */}
            {estVisible  && (<CameraView style={styles.camera} facing={orientation} enableTorch={flash === 'on'} ref={cameraRef} />)}

            <View style={styles.bottomBar}>

                {/* Bouton pour inverser la caméra */}
                <TouchableOpacity onPress={inverserCamera}>
                    <Image source={require('../assets/swap.png')} style={styles.icon} />
                </TouchableOpacity>

                {/* Bouton pour capturer la photo */}
                <TouchableOpacity onPress={capturerPhoto}>
                    <View style={styles.captureButtonOuter}>
                        <Image source={require('../assets/empty.png')} style={styles.captureButtonInner} />
                    </View>
                </TouchableOpacity>

                {/* Bouton pour on/off le flash */}
                <TouchableOpacity onPress={ChoixFlash}>
                    <Image
                        // On utilise une condition ternaire pour changer l'image du flash en fonction de l'état du flash
                        source={ flash === 'off' ? require('../assets/torche_off.png') : require('../assets/torche_on.png') }
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

//Styles pour le composant CameraScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    camera: {
        flex: 1,
        width: '100%',
    },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 30,
        paddingBottom: 95,
        paddingTop: 15,
    },

    icon: {
        width: 40,
        height: 40,
        tintColor: '#fff',
    },

    captureButtonOuter: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
});
