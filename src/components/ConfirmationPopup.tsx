import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ConfirmationPopupProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemName: string;
  itemCondid: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ visible, onConfirm, onCancel, itemName, itemCondid }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
          <Icon name="delete" size={50} color="#FF6680" />
          </View>
          <Text style={styles.modalText}>Deseja excluir a conta</Text>
          <Text style={styles.modalText2}>{itemCondid} - {itemName}?</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button title="Sim" onPress={onConfirm} color="#FF6680" />
            </View>
            <View style={styles.button}>
              <Button title="Não" onPress={onCancel} color="#FF6680" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#6C6C80'
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#6C6C80'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
});

export default ConfirmationPopup;
