    import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
type TableRow = {
  id: string;
  name: string;
  status: string;
  score: number;
  registered: string;
};

const tableData = [
  { id: '101', name: 'Ava Miller', status: 'Active', score: 89, registered: '2025-06-10' },
  { id: '102', name: 'Liam Carter', status: 'Pending', score: 74, registered: '2025-06-12' },
  { id: '103', name: 'Zoe Bennett', status: 'Inactive', score: 58, registered: '2025-06-15' },
  { id: '104', name: 'Noah Brooks', status: 'Active', score: 92, registered: '2025-06-18' },
  { id: '105', name: 'Mia Sanders', status: 'Banned', score: 45, registered: '2025-06-19' },
  { id: '106', name: 'Leo Ramirez', status: 'Active', score: 81, registered: '2025-06-20' },
];

const DataTableScreen = () => {
const renderRow = ({ item, index }: { item: TableRow; index: number }) => (
  <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
    <Text style={styles.cell}>{item.id}</Text>
    <Text style={styles.cell}>{item.name}</Text>
    <Text style={styles.cell}>{item.status}</Text>
    <Text style={styles.cell}>{item.score}</Text>
    <Text style={styles.cell}>{item.registered}</Text>
  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 User Registration Overview</Text>

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>ID</Text>
        <Text style={[styles.cell, styles.headerText]}>Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Status</Text>
        <Text style={[styles.cell, styles.headerText]}>Score</Text>
        <Text style={[styles.cell, styles.headerText]}>Registered</Text>
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

export default DataTableScreen;