//Import des elements essentiels
import { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SystemeFichier from 'expo-file-system';

export default function GallerieScreen() {
    // State permettant de gerer la galerie
    const [galerie, setGalerie] = useState([]);

    //  Fonction permettant de charger la galerie
    const chargerGalerie = async () => {
        try {
            const dossierPhoto = SystemeFichier.documentDirectory + 'photos/';
            const infoDossier = await SystemeFichier.getInfoAsync(dossierPhoto);

            // On verfie si le dossier existe pour accueilir les photos sinon on le cree
            if (!infoDossier.exists) {
                console.log("Le dossier n'existe pas, création...");
                await SystemeFichier.makeDirectoryAsync(dossierPhoto, { intermediates: true });
                setGalerie([]);
                return;
            }

            // On recupere les fichiers du dossier et on les met dans un tableau 
            const fichiers = await SystemeFichier.readDirectoryAsync(dossierPhoto);
            const uris = fichiers.map((file) => dossierPhoto + file);
            setGalerie(uris);
        } catch (error) {
            console.log('Erreur galerie :', error);
        }
    };

    // Fonction permettant de supprimer une photo de la galerie en utilisant la fonction deleteAsync pour supprimer le fichier
    const supprimerPhoto = async (uri) => {
        try {
            await SystemeFichier.deleteAsync(uri);
            // On met a jour le tableau pour ne pas afficher la photo
            setGalerie(galerie.filter((img) => img !== uri));
        } catch (error) {
            console.log("Erreur suppression :", error);
        }
    };
    // Use effect pour charger la galerie 
    useEffect(() => {
        chargerGalerie();
    }, []);

    return (
        <View style={styles.container}>
             {/* Affichage d'un message si aucune photo n'est presente */}
            {galerie.length === 0 ? (
                <Text style={styles.noPhotos}>Aucune photo enregistrée</Text>
            ) : (
                // Affichage de la galerie avec une FlatList pour afficher les photos
                <FlatList columnWrapperStyle={{ justifyContent: 'center' }}
                    data={galerie}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item }} style={styles.image} />
                            <TouchableOpacity onPress={() => supprimerPhoto(item)}>
                                <Text style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.8)', paddingHorizontal: 13, paddingVertical: 7, marginTop: 3, borderRadius: 15, fontSize: 14 }}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
             {/* Barre avec le bouton de rafraîchissement */}
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={chargerGalerie}>
                    <View style={styles.Button}>
                        <Image source={require('../assets/reload.png')} style={styles.ImageButton} />
                        <Text style={{ color: '#fff', fontSize: 16 }}>Rafraîchir la galerie</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Styles pour le composant GallerieScreen
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        paddingTop: 10, 
        alignContent: 'center', 
        justifyContent: 'space-between' 
    },

    imageContainer: { 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },

    image: { 
        width: 100, 
        height: 100 
    },

    ImageButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: '#fff',
    },

    Button: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
        padding: 10,
        gap: 5,
        flexDirection: 'row',
        height: 50,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 30,
        paddingBottom: 95,
        paddingTop: 15,
    },

    noPhotos: { 
        textAlign: 'center', 
        marginTop: 40, 
        fontSize: 16, 
        color: '#999' 
    },
});
