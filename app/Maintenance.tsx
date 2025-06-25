    import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
type TableRow = {
  id: string;
  name: string;
  status: string;

};

const tableData = [
  { id: '101', name: 'temperature', status: 'Active' },
  { id: '102', name: 'lumiere', status: 'desactive' },
  { id: '103', name: 'pression', status: 'Active' },
  { id: '104', name: 'mouvement', status: 'Active' },
  { id: '105', name: 'lidar', status: 'Active'},
  
];

const Maintenance = () => {
const renderRow = ({ item, index }: { item: TableRow; index: number }) => (
  <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
    <Text style={styles.cell}>{item.id}</Text>
    <Text style={styles.cell}>{item.name}</Text>
    <Text style={styles.cell}>{item.status}</Text>

  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Capteur et etat de capteur</Text>

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>ID</Text>
        <Text style={[styles.cell, styles.headerText]}>capteur</Text>
        <Text style={[styles.cell, styles.headerText]}>Status</Text>
      </View>

      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eceffe',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3d2db7',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f0f2fc',
  },
  headerRow: {
    backgroundColor: '#4e2eb0',
    borderRadius: 8,
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Maintenance;