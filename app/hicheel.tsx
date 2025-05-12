import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUBJECTS = [
  {
    id: '1',
    name: 'Веб програмчлал',
    teacher: 'Д.Батбаяр',
    credit: 3,
    desc: 'Веб хөгжүүлэлтийн үндсэн ойлголт, React, HTML, CSS.',
    color: '#FF6B81',
    goal: 'Веб хөгжүүлэлтийн суурь мэдлэг олгох.',
    requirement: 'Програмчлалын анхан шатны мэдлэгтэй байх.',
    material: 'React, HTML, CSS, JavaScript ном, онлайн эх сурвалж.',
  },
  {
    id: '2',
    name: 'Өгөгдлийн сан',
    teacher: 'Б.Золбоо',
    credit: 3,
    desc: 'Өгөгдлийн сангийн бүтэц, SQL, ERD.',
    color: '#4B7BEC',
    goal: 'Өгөгдлийн сангийн зохион байгуулалт, SQL асуулга бичих чадвар эзэмшүүлэх.',
    requirement: 'Математик, логик сэтгэлгээтэй байх.',
    material: 'SQL ном, ERD tool, онлайн эх сурвалж.',
  },
  {
    id: '3',
    name: 'Програмчлалын хэл',
    teacher: 'Д.Ганзориг',
    credit: 4,
    desc: 'C++, Python, алгоритм, код бичих чадвар.',
    color: '#20BF6B',
    goal: 'Алгоритм, код бичих чадвар хөгжүүлэх.',
    requirement: 'Математик, логик сэтгэлгээтэй байх.',
    material: 'C++, Python ном, онлайн курс.',
  },
  {
    id: '4',
    name: 'Математик',
    teacher: 'С.Эрдэнэ',
    credit: 2,
    desc: 'Математикийн үндсэн ойлголт, функц, интеграл.',
    color: '#FFD600',
    goal: 'Математикийн суурь мэдлэг олгох.',
    requirement: 'Суурь математик мэдлэгтэй байх.',
    material: 'Математик ном, дасгал ажлууд.',
  },
  {
    id: '5',
    name: 'Физик',
    teacher: 'Б.Цогт',
    credit: 2,
    desc: 'Механик, цахилгаан, долгион.',
    color: '#8854D0',
    goal: 'Физикийн үндсэн ойлголт, бодлого бодох чадвар.',
    requirement: 'Математик, логик сэтгэлгээтэй байх.',
    material: 'Физик ном, лабораторийн ажил.',
  },
  {
    id: '6',
    name: 'Англи хэл',
    teacher: 'Ж.Сараа',
    credit: 2,
    desc: 'Англи хэлний яриа, бичгийн чадвар.',
    color: '#00B894',
    goal: 'Англи хэлний яриа, бичгийн чадвар сайжруулах.',
    requirement: 'Суурь англи хэлний мэдлэгтэй байх.',
    material: 'Англи хэлний ном, онлайн курс.',
  },
];

export default function HicheelScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const filtered = SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase())
  );
  const openModal = (subject: any) => {
    setSelected(subject);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelected(null);
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
        <Text style={styles.headerTitle}>Хичээл</Text>
        <View style={styles.menuBtn} />
      </View>
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Хичээл, багш хайх..."
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 24 }}
        renderItem={({ item }) => <SubjectCard subject={item} onPress={() => openModal(item)} />}
        showsVerticalScrollIndicator={false}
      />
      {/* Details Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={closeModal}>
        <View style={styles.centeredOverlay}>
          <View style={styles.centeredModalBox}>
            <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
              <Text style={{ fontSize: 24, color: '#222' }}>×</Text>
            </TouchableOpacity>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
              <Text style={[styles.modalTitle, { color: selected?.color }]}>{selected?.name}</Text>
              <Text style={styles.modalTeacher}>{selected?.teacher}</Text>
              <Text style={styles.modalCredit}>Кредит: {selected?.credit}</Text>
              <Text style={styles.modalDesc}>{selected?.desc}</Text>
              <Text style={styles.modalSection}>Зорилго</Text>
              <Text style={styles.modalText}>{selected?.goal}</Text>
              <Text style={styles.modalSection}>Шаардлага</Text>
              <Text style={styles.modalText}>{selected?.requirement}</Text>
              <Text style={styles.modalSection}>Материал</Text>
              <Text style={styles.modalText}>{selected?.material}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SubjectCard({ subject, onPress }: { subject: any, onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: subject.color }]} onPress={onPress} activeOpacity={0.85}> 
      <Text style={[styles.name, { color: subject.color }]}>{subject.name}</Text>
      <Text style={styles.teacher}>{subject.teacher}</Text>
      <View style={styles.row}>
        <Text style={styles.credit}>Кредит: {subject.credit}</Text>
      </View>
      <Text style={styles.desc}>{subject.desc}</Text>
    </TouchableOpacity>
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
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 18,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
    borderWidth: 0,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderLeftWidth: 6,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  teacher: {
    fontSize: 15,
    color: '#888',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  credit: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
    marginRight: 12,
  },
  desc: {
    fontSize: 15,
    color: '#888',
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
    marginBottom: 8,
    color: '#222',
  },
  modalTeacher: {
    fontSize: 16,
    color: '#888',
    marginBottom: 2,
  },
  modalCredit: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSection: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginTop: 8,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
}); 