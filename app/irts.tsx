import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUMMARY = {
  subject: 'Програмчлалын хэл C++',
  percent: 85,
  attended: 26,
  missed: 4,
  last: '2024-04-17',
};

const LESSONS = [
  {
    id: '1',
    subject: 'Програмчлалын хэл C++',
    time: '09:00 - 10:30',
    room: '301 тоот',
    percent: 85,
    percentColor: '#FFD600',
    last: '2024-04-17',
    canRegister: true,
  },
  {
    id: '2',
    subject: 'Өгөгдлийн сан',
    time: '11:00 - 12:30',
    room: '405 тоот',
    percent: 92,
    percentColor: '#00B894',
    last: '2024-04-17',
    canRegister: true,
  },
  {
    id: '3',
    subject: 'Веб програмчлал',
    time: '13:00 - 14:30',
    room: '302 тоот',
    percent: 78,
    percentColor: '#FF6B81',
    last: '2024-04-16',
    canRegister: true,
  },
];

export default function IrtsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [error, setError] = useState('');
  const [registeredLessons, setRegisteredLessons] = useState<string[]>([]);
  const navigation = useNavigation();

  const openModal = (lesson: any) => {
    setSelectedLesson(lesson);
    setModalVisible(true);
    setCode('');
    setError('');
  }; 
  const closeModal = () => {
    setModalVisible(false);
    setCode('');
    setError('');
  };
  const handleConfirm = () => {
    if (code.length !== 4 || !/^[0-9]{4}$/.test(code)) {
      setError('4 оронтой код оруулна уу!');
      return;
    }
    // Add lesson to registered lessons
    if (selectedLesson) {
      setRegisteredLessons(prev => [...prev, selectedLesson.id]);
    }
    // Simulate success
    setModalVisible(false);
    setTimeout(() => alert('Ирц амжилттай бүртгэгдлээ!'), 300);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuBtn}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ирц</Text>
        <View style={styles.menuBtn} />
      </View>
      
      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{SUMMARY.subject} - Ирцийн тойм</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryPercent}>{SUMMARY.percent}%</Text>
            <Text style={styles.summaryLabel}>Ирц</Text>
          </View>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryValue}>{SUMMARY.attended}</Text>
            <Text style={styles.summaryLabel}>Ирсэн</Text>
          </View>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryValue}>{SUMMARY.missed}</Text>
            <Text style={styles.summaryLabel}>Тасалсан</Text>
          </View>
        </View>
        <Text style={styles.summaryFooter}>Сүүлд ирсэн: {SUMMARY.last}</Text>
      </View>
      {/* Today's Lessons */}
      <Text style={styles.sectionTitle}>Өнөөдрийн хичээлүүд</Text>
      <FlatList
        data={LESSONS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <LessonCard 
            lesson={item} 
            onRegister={() => openModal(item)} 
            isRegistered={registeredLessons.includes(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.centeredOverlay}>
          <View style={styles.centeredModalBox}>
            <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
              <Ionicons name="close" size={28} color="#222" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ирц бүртгэл</Text>
            <Text style={styles.modalDesc}>Багшийн дэлгэцэн дээрх 4 оронтой кодыг оруулна уу.</Text>
            <Text style={styles.inputLabel}>Баталгаажуулах код</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={4}
              placeholder="____"
              placeholderTextColor="#bbb"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.modalBtnRow}>
              <Pressable style={styles.cancelBtn} onPress={closeModal}>
                <Text style={styles.cancelBtnText}>Буцах</Text>
              </Pressable>
              <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
                <Text style={styles.confirmBtnText}>Баталгаажуулах</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function LessonCard({ lesson, onRegister, isRegistered }: { lesson: any, onRegister: () => void, isRegistered: boolean }) {
  return (
    <View style={styles.lessonCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Text style={styles.lessonSubject}>{lesson.subject}</Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.lessonPercent, { color: lesson.percentColor }]}>{lesson.percent}%</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        <Ionicons name="time-outline" size={16} color="#888" style={{ marginRight: 4 }} />
        <Text style={styles.lessonInfo}>{lesson.time}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Ionicons name="location-outline" size={16} color="#888" style={{ marginRight: 4 }} />
        <Text style={styles.lessonInfo}>{lesson.room}</Text>
      </View>
      <View style={styles.lessonDivider} />
      <Text style={styles.lessonFooter}>Сүүлд бүртгүүлсэн: {lesson.last}</Text>
      {lesson.canRegister && !isRegistered && (
        <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
          <Text style={styles.registerBtnText}>Ирц бүртгүүлэх</Text>
        </TouchableOpacity>
      )}
      {isRegistered && (
        <View style={[styles.registerBtn, styles.registeredBtn]}>
          <Text style={styles.registeredBtnText}>Бүртгүүлсэн</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    backgroundColor: '#FF6B81',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
  },
  menuBtn: { 
    padding: 4,
    width: 40,
    alignItems: 'center',
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    margin: 16,
    marginBottom: 12,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryCol: {
    alignItems: 'center',
    flex: 1,
  },
  summaryPercent: {
    color: '#FF6B81',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summaryValue: {
    color: '#FF6B81',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 15,
  },
  summaryFooter: {
    color: '#888',
    fontSize: 14,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 22,
    marginBottom: 8,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  lessonSubject: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  lessonPercent: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  lessonInfo: {
    fontSize: 15,
    color: '#888',
  },
  lessonDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  lessonFooter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  registerBtn: {
    backgroundColor: '#FF6B81',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredModalBox: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  modalClose: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
    color: '#222',
  },
  modalDesc: {
    color: '#888',
    fontSize: 15,
    marginBottom: 18,
    textAlign: 'center',
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: '#222',
    letterSpacing: 8,
  },
  errorText: {
    color: '#FF6B81',
    fontSize: 14,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  modalBtnRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#2979FF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registeredBtn: {
    backgroundColor: '#E0E0E0',
  },
  registeredBtnText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 