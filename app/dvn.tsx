import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Animated, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const GPA = 3.33;
const INITIAL_SUBJECTS = [
  {
    id: '1',
    name: 'Веб програмчлал',
    teacher: 'Д.Батбаяр',
    color: '#FF6B81',
    letter: 'B',
    grades: [
      { label: 'Даалгавар', value: 85 },
      { label: 'Дунд шалгалт', value: 90 },
      { label: 'Улирлын шалгалт', value: 88 },
      { label: 'Лаборатори', value: 92, labs: [
        { name: 'Lab 1', score: 100, isCounted: true },
        { name: 'Lab 2', score: 90, isCounted: true },
        { name: 'Lab 3', score: 80, isCounted: true },
        { name: 'Lab 4', score: 95, isCounted: true },
        { name: 'Lab 5', score: 85, isCounted: true },
        { name: 'Lab 6', score: 95, isCounted: true },
        { name: 'Lab 7', score: 0, isCounted: false },
        { name: 'Lab 8', score: 0, isCounted: false },
      ] },
    ],
  },
  {
    id: '2',
    name: 'Өгөгдлийн сан',
    teacher: 'Б.Золбоо',
    color: '#4B7BEC',
    letter: 'A',
    grades: [
      { label: 'Даалгавар', value: 92 },
      { label: 'Дунд шалгалт', value: 88 },
      { label: 'Улирлын шалгалт', value: 95 },
      { label: 'Лаборатори', value: 90, labs: [
        { name: 'Lab 1', score: 100, isCounted: true },
        { name: 'Lab 2', score: 95, isCounted: true },
        { name: 'Lab 3', score: 90, isCounted: true },
        { name: 'Lab 4', score: 80, isCounted: true },
        { name: 'Lab 5', score: 85, isCounted: true },
        { name: 'Lab 6', score: 90, isCounted: true },
        { name: 'Lab 7', score: 0, isCounted: false },
        { name: 'Lab 8', score: 0, isCounted: false },
      ] },
    ],
  },
  {
    id: '3',
    name: 'Програмчлалын хэл',
    teacher: 'Д.Ганзориг',
    color: '#20BF6B',
    letter: 'B',
    grades: [
      { label: 'Даалгавар', value: 78 },
      { label: 'Дунд шалгалт', value: 85 },
      { label: 'Улирлын шалгалт', value: 82 },
      { label: 'Лаборатори', value: 87, labs: [
        { name: 'Lab 1', score: 100, isCounted: true },
        { name: 'Lab 2', score: 90, isCounted: true },
        { name: 'Lab 3', score: 80, isCounted: true },
        { name: 'Lab 4', score: 85, isCounted: true },
        { name: 'Lab 5', score: 70, isCounted: true },
        { name: 'Lab 6', score: 0, isCounted: false },
        { name: 'Lab 7', score: 0, isCounted: false },
        { name: 'Lab 8', score: 0, isCounted: false },
      ] },
    ],
  },
  {
    id: '4',
    name: 'Математик',
    teacher: 'С.Эрдэнэ',
    color: '#FFD600',
    letter: 'A',
    grades: [
      { label: 'Даалгавар', value: 95 },
      { label: 'Дунд шалгалт', value: 90 },
      { label: 'Улирлын шалгалт', value: 97 },
      { label: 'Лаборатори', value: 100, labs: [
        { name: 'Lab 1', score: 100, isCounted: true },
        { name: 'Lab 2', score: 100, isCounted: true },
        { name: 'Lab 3', score: 100, isCounted: true },
        { name: 'Lab 4', score: 100, isCounted: true },
      ] },
    ],
  },
  {
    id: '5',
    name: 'Физик',
    teacher: 'Б.Цогт',
    color: '#8854D0',
    letter: 'C',
    grades: [
      { label: 'Даалгавар', value: 70 },
      { label: 'Дунд шалгалт', value: 65 },
      { label: 'Улирлын шалгалт', value: 75 },
      { label: 'Лаборатори', value: 80, labs: [
        { name: 'Lab 1', score: 80, isCounted: true },
        { name: 'Lab 2', score: 80, isCounted: true },
        { name: 'Lab 3', score: 80, isCounted: true },
      ] },
    ],
  },
  {
    id: '6',
    name: 'Англи хэл',
    teacher: 'Ж.Сараа',
    color: '#00B894',
    letter: 'B',
    grades: [
      { label: 'Даалгавар', value: 88 },
      { label: 'Дунд шалгалт', value: 90 },
      { label: 'Улирлын шалгалт', value: 85 },
      { label: 'Лаборатори', value: 0, labs: [] },
    ],
  },
];

function getRandomColor() {
  const colors = ['#FF6B81', '#4B7BEC', '#20BF6B', '#FFD600', '#8854D0'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function DvnScreen() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', teacher: '', letter: 'A', color: getRandomColor() });
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const navigation = useNavigation();

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  const filtered = subjects.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase())) &&
    (gradeFilter ? s.letter === gradeFilter : true)
  );

  const openModal = (subject: any) => {
    setSelected(subject);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelected(null);
  };

  const handleAddSubject = () => {
    if (!newSubject.name.trim() || !newSubject.teacher.trim()) return;
    setSubjects(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: newSubject.name,
        teacher: newSubject.teacher,
        color: newSubject.color,
        letter: newSubject.letter,
        grades: [
          { label: 'Даалгавар', value: 0 },
          { label: 'Дунд шалгалт', value: 0 },
          { label: 'Улирлын шалгалт', value: 0 },
          { label: 'Лаборатори', value: 0, labs: [] },
        ],
      },
    ]);
    setAddModal(false);
    setNewSubject({ name: '', teacher: '', letter: 'A', color: getRandomColor() });
  };

  const renderRightActions = (progress: any, dragX: any, onDelete: () => void) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={onDelete}
      >
        <Animated.View style={[styles.deleteActionContent, { transform: [{ scale }] }]}>
          <Ionicons name="trash" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>Дүн</Text>
        <View style={styles.menuBtn} />
      </View>
      {/* Search Row */}
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
      {/* Filter row */}
      <View style={styles.filterRow}>
        {['A', 'B', 'C'].map(l => (
          <TouchableOpacity
            key={l}
            style={[styles.filterBtn, gradeFilter === l && styles.filterBtnActive]}
            onPress={() => setGradeFilter(gradeFilter === l ? '' : l)}
          >
            <Text style={[styles.filterBtnText, gradeFilter === l && styles.filterBtnTextActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.pageTitle}>Дүнгүүд</Text>
            <View style={styles.gpaBox}>
              <Text style={styles.gpaLabel}>Голч дүн</Text>
              <Text style={styles.gpaValue}>{GPA.toFixed(2)}</Text>
            </View>
          </>
        }
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progress, dragX) => 
              renderRightActions(progress, dragX, () => handleDeleteSubject(item.id))
            }
          >
            <GradeCard 
              subject={item} 
              onPress={() => openModal(item)} 
            />
          </Swipeable>
        )}
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
              <Text style={styles.modalTitle}>{selected?.name}</Text>
              <Text style={styles.teacher}>{selected?.teacher}</Text>
              {selected?.grades?.map((g: any, i: number) => (
                <View key={i} style={{ width: '100%', marginBottom: 10 }}>
                  <View style={styles.gradeRow}>
                    <Text style={styles.gradeLabel}>{g.label}</Text>
                    <Text style={[styles.gradeValue, { color: selected?.color }]}>{g.value}%</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBar, { width: `${g.value}%`, backgroundColor: selected?.color }]} />
                  </View>
                  {g.label === 'Лаборатори' && g.labs && (
                    <View style={{ marginTop: 6 }}>
                      {g.labs.map((lab: any, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                          <Text style={{ width: 60, color: '#888', fontSize: 13 }}>{lab.name}</Text>
                          <Text style={{ width: 40, color: lab.isCounted ? selected?.color : '#bbb', fontWeight: 'bold', fontSize: 13 }}>{lab.score}</Text>
                          <Text style={{ color: lab.isCounted ? '#20BF6B' : '#bbb', fontSize: 13, marginLeft: 4 }}>
                            {lab.isCounted ? 'Тооцсон' : 'Тооцоогүй'}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* Add Subject Modal */}
      <Modal visible={addModal} animationType="fade" transparent onRequestClose={() => setAddModal(false)}>
        <View style={styles.centeredOverlay}>
          <View style={styles.centeredModalBox}>
            <Text style={styles.modalTitle}>Шинэ хичээл нэмэх</Text>
            <TextInput
              style={styles.input}
              placeholder="Хичээлийн нэр"
              value={newSubject.name}
              onChangeText={t => setNewSubject(s => ({ ...s, name: t }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Багшийн нэр"
              value={newSubject.teacher}
              onChangeText={t => setNewSubject(s => ({ ...s, teacher: t }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Үсгэн үнэлгээ (A, B, C...)"
              value={newSubject.letter}
              onChangeText={t => setNewSubject(s => ({ ...s, letter: t }))}
              maxLength={2}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Pressable style={styles.closeBtn} onPress={() => setAddModal(false)}>
                <Text style={styles.closeBtnText}>Болих</Text>
              </Pressable>
              <Pressable style={[styles.closeBtn, { backgroundColor: '#20BF6B', marginLeft: 8 }]} onPress={handleAddSubject}>
                <Text style={[styles.closeBtnText, { color: '#fff' }]}>Нэмэх</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function GradeCard({ subject, onPress }: { subject: any, onPress: () => void }) {
  // Calculate total grade as average of all grade values
  const total = Math.round(
    subject.grades.reduce((sum: number, g: any) => sum + g.value, 0) / subject.grades.length
  );
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subject}>{subject.name}</Text>
          <Text style={styles.teacher}>{subject.teacher}</Text>
        </View>
        <View style={[styles.letterCircle, { backgroundColor: subject.color + '22' }]}> 
          <Text style={[styles.letter, { color: subject.color }]}>{subject.letter}</Text>
        </View>
      </View>
      {subject.grades.map((g: any, i: number) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>
              {g.label}
              {g.label === 'Лаборатори' && g.labs ? ` (${g.labs.filter((l:any)=>l.isCounted).length}/${g.labs.length})` : ''}
            </Text>
            <Text style={[styles.gradeValue, { color: subject.color }]}>{g.value}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${g.value}%`, backgroundColor: subject.color }]} />
          </View>
          {g.label === 'Лаборатори' && g.labs && (
            <View style={{ marginTop: 6 }}>
              {g.labs.map((lab: any, idx: number) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Text style={{ width: 60, color: '#888', fontSize: 13 }}>{lab.name}</Text>
                  <Text style={{ width: 40, color: lab.isCounted ? subject.color : '#bbb', fontWeight: 'bold', fontSize: 13 }}>{lab.score}</Text>
                  <Text style={{ color: lab.isCounted ? '#20BF6B' : '#bbb', fontSize: 13, marginLeft: 4 }}>
                    {lab.isCounted ? 'Тооцсон' : 'Тооцоогүй'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Нийт дүн</Text>
        <Text style={[styles.totalValue, { color: subject.color }]}>{total}%</Text>
      </View>
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
    borderRadius: 22,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 22,
    paddingHorizontal: 0,
    paddingVertical: 14,
    fontSize: 17,
    color: '#222',
    borderWidth: 0,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: '#FF6B81',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    marginLeft: 2,
  },
  gpaBox: {
    backgroundColor: '#FF6B81',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    paddingVertical: 28,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginHorizontal: 4,
  },
  gpaLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  gpaValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: '#FF6B81AA',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 22,
    marginBottom: 22,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginHorizontal: 2,
  },
  subject: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  teacher: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
  },
  letterCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  letter: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  gradeLabel: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  gradeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 13,
    backgroundColor: '#F8D7DF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: 13,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  totalLabel: {
    fontSize: 16,
    color: '#FF6B81',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
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
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    color: '#222',
  },
  closeBtn: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 4,
  },
  closeBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 8,
    gap: 8,
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: '#eee',
    shadowColor: '#FF6B81',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  filterBtnActive: {
    backgroundColor: '#FF6B81',
    borderColor: '#FF6B81',
    shadowOpacity: 0.18,
    elevation: 2,
  },
  filterBtnText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  filterBtnTextActive: {
    color: '#fff',
    textShadowColor: '#FF6B81AA',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  deleteAction: {
    backgroundColor: '#FF6B81',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 28,
    marginRight: 20,
  },
  deleteActionContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 