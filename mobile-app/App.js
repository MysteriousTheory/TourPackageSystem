// mobile-app/App.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const PACKAGES = [
  {
    id: 1,
    title: "El Nido & Coron Island Sanctuary",
    province: "Palawan",
    price: 14800,
    duration: "4 Days / 3 Nights",
    rating: 4.96,
    reviews: 482,
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
    description: "Big & Small Lagoon crystal kayaking, Kayangan Lake, Twin Lagoon, and Nacpan Beach sunset.",
    hotels: [
      { name: "El Nido Cove Eco Lodge", price: 2800 },
      { name: "Seda Lio Luxury Beach Villa", price: 6500 },
      { name: "Cauayan Private Island Resort", price: 18500 }
    ]
  },
  {
    id: 2,
    title: "Boracay White Beach Escapade",
    province: "Aklan",
    price: 9800,
    duration: "3 Days / 2 Nights",
    rating: 4.91,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Powdery white sand walks, private sunset Paraw sailboat charter, and crystal kayak photos.",
    hotels: [
      { name: "Boracay Breeze Inn", price: 2200 },
      { name: "The Lind Deluxe Suite", price: 7800 },
      { name: "Shangri-La Cliffside Sanctuary", price: 22000 }
    ]
  },
  {
    id: 3,
    title: "Siargao Island Surf & Lagoons",
    province: "Surigao del Norte",
    price: 12500,
    duration: "4 Days / 3 Nights",
    rating: 4.94,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    description: "Cloud 9 surfing lessons, Sugba Lagoon cliff jump, and Magpupungko tidal natural infinity pools.",
    hotels: [
      { name: "Siargao Bamboo Hideaway", price: 2100 },
      { name: "Nay Palad Hideaway Retreat", price: 25000 }
    ]
  },
  {
    id: 4,
    title: "Bohol & Cebu Highlights",
    province: "Bohol & Cebu",
    price: 16500,
    duration: "5 Days / 4 Nights",
    rating: 4.89,
    reviews: 315,
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80",
    description: "1,776 Chocolate Hills, Loboc River Buffet Cruise, and Moalboal millions of sardines marine run.",
    hotels: [
      { name: "Bohol Beach Club Resort", price: 5500 }
    ]
  },
  {
    id: 5,
    title: "Batanes Rolling Hills Expedition",
    province: "Batanes",
    price: 19200,
    duration: "4 Days / 3 Nights",
    rating: 4.98,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Basco Lighthouse, Marlboro Rolling Hills, and century-old Ivatan stone castles.",
    hotels: [
      { name: "Fundacion Pacita Nature Lodge", price: 8500 }
    ]
  },
  {
    id: 6,
    title: "Sagada & Banaue Retreat",
    province: "Mountain Province",
    price: 8900,
    duration: "3 Days / 2 Nights",
    rating: 4.88,
    reviews: 195,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    description: "Sunrise sea of clouds at Kiltepan, UNESCO Banaue Rice Terraces, and Echo Valley coffins.",
    hotels: [
      { name: "Sagada Heritage Mountain Inn", price: 1900 }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'bookings'
  const [bookings, setBookings] = useState([
    {
      id: 1,
      booking_code: "BK-PH-9821",
      tourist_name: "Maria Santos",
      place: "El Nido & Coron, Palawan",
      nights_stayed: 4,
      tourist_quantity: 2,
      hotel_accommodation: "Seda Lio Luxury Beach Villa",
      total_amount_php: 55600,
      booking_date: "2026-11-15",
      status: "Confirmed"
    }
  ]);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [editingBookingId, setEditingBookingId] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [nights, setNights] = useState('3');
  const [quantity, setQuantity] = useState('2');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-11-20');

  const openBookModal = (pkg, existingBooking = null) => {
    if (existingBooking) {
      setEditingBookingId(existingBooking.id);
      setSelectedPkg(pkg || PACKAGES[0]);
      setName(existingBooking.tourist_name);
      setPhone(existingBooking.tourist_phone || '+63 917 000 0000');
      setPlace(existingBooking.place);
      setNights(String(existingBooking.nights_stayed));
      setQuantity(String(existingBooking.tourist_quantity));
      setBookingDate(existingBooking.booking_date);
      setSelectedHotel(pkg?.hotels?.[0] || { name: existingBooking.hotel_accommodation, price: 4000 });
    } else {
      setEditingBookingId(null);
      setSelectedPkg(pkg);
      setName('');
      setPhone('');
      setPlace(`${pkg.title} (${pkg.province})`);
      setNights('3');
      setQuantity('2');
      setBookingDate('2026-11-20');
      setSelectedHotel(pkg.hotels[0]);
    }
    setModalVisible(true);
  };

  const handleSaveBooking = () => {
    if (!name.trim() || !phone.trim() || !place.trim()) {
      Alert.alert('Required Fields', 'Please enter your name, phone, and place.');
      return;
    }

    const nStay = parseInt(nights) || 1;
    const qTourist = parseInt(quantity) || 1;
    const baseP = selectedPkg ? selectedPkg.price : 10000;
    const hotelP = selectedHotel ? selectedHotel.price : 0;
    const total = (baseP * qTourist) + (hotelP * nStay * Math.ceil(qTourist / 2));

    if (editingBookingId) {
      setBookings(bookings.map(b => b.id === editingBookingId ? {
        ...b,
        tourist_name: name,
        tourist_phone: phone,
        place: place,
        nights_stayed: nStay,
        tourist_quantity: qTourist,
        hotel_accommodation: selectedHotel?.name || 'Standard Resort',
        total_amount_php: total,
        booking_date: bookingDate
      } : b));
      Alert.alert('Updated', 'Booking details successfully modified!');
    } else {
      const newB = {
        id: Date.now(),
        booking_code: `BK-PH-${Math.floor(1000 + Math.random() * 9000)}`,
        tourist_name: name,
        tourist_phone: phone,
        place: place,
        nights_stayed: nStay,
        tourist_quantity: qTourist,
        hotel_accommodation: selectedHotel?.name || 'Standard Resort',
        total_amount_php: total,
        booking_date: bookingDate,
        status: 'Confirmed'
      };
      setBookings([newB, ...bookings]);
      Alert.alert('Success 🎉', `Tour package reserved for ${name}!`);
    }

    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this reservation?', [
      { text: 'No' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => {
        setBookings(bookings.filter(b => b.id !== id));
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>ISLAS<Text style={{ color: '#ff6b00' }}>PH</Text></Text>
          <Text style={styles.brandSubtitle}>PHILIPPINES TOUR SUITES</Text>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'packages' && styles.tabBtnActive]}
            onPress={() => setActiveTab('packages')}
          >
            <Text style={[styles.tabText, activeTab === 'packages' && styles.tabTextActive]}>Packages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'bookings' && styles.tabBtnActive]}
            onPress={() => setActiveTab('bookings')}
          >
            <Text style={[styles.tabText, activeTab === 'bookings' && styles.tabTextActive]}>
              Bookings ({bookings.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'packages' ? (
          <View>
            <Text style={styles.sectionHeading}>Curated Destinations</Text>
            {PACKAGES.map((pkg) => (
              <View key={pkg.id} style={styles.card}>
                <Image source={{ uri: pkg.image }} style={styles.cardImage} />
                <View style={styles.cardOverlay}>
                  <Text style={styles.provinceBadge}>📍 {pkg.province}</Text>
                  <Text style={styles.ratingBadge}>★ {pkg.rating}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{pkg.title}</Text>
                  <Text style={styles.cardDesc}>{pkg.description}</Text>
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.priceLabel}>BASE RATE</Text>
                      <Text style={styles.priceValue}>₱{pkg.price.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.bookBtn}
                      onPress={() => openBookModal(pkg)}
                    >
                      <Text style={styles.bookBtnText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionHeading}>Active Reservations</Text>
            {bookings.length === 0 ? (
              <Text style={{ color: '#64748b', textAlign: 'center', marginTop: 40 }}>
                No active bookings. Browse packages to make a reservation!
              </Text>
            ) : (
              bookings.map((b) => (
                <View key={b.id} style={styles.bookingCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={styles.bookingCode}>{b.booking_code}</Text>
                    <Text style={styles.statusBadge}>{b.status}</Text>
                  </View>
                  <Text style={styles.bookingPlace}>{b.place}</Text>
                  <Text style={styles.bookingTourist}>👤 {b.tourist_name}</Text>
                  <View style={styles.bookingDetailsRow}>
                    <Text style={styles.bookingDetail}>📅 {b.booking_date}</Text>
                    <Text style={styles.bookingDetail}>🌙 {b.nights_stayed} Nights</Text>
                    <Text style={styles.bookingDetail}>👥 {b.tourist_quantity} Guests</Text>
                  </View>
                  <Text style={styles.hotelText}>🏨 {b.hotel_accommodation}</Text>
                  <View style={styles.bookingCardFooter}>
                    <Text style={styles.bookingTotal}>₱{b.total_amount_php.toLocaleString()}</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => {
                          const p = PACKAGES.find(pkg => b.place.includes(pkg.province)) || PACKAGES[0];
                          openBookModal(p, b);
                        }}
                      >
                        <Text style={styles.editBtnText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDelete(b.id)}
                      >
                        <Text style={styles.deleteBtnText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Booking Form Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.modalTitle}>
                {editingBookingId ? 'Edit Tour Booking' : 'Tour Package Reservation'}
              </Text>
              <Text style={styles.modalSubtitle}>{selectedPkg?.title}</Text>

              <Text style={styles.inputLabel}>Tourist Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Maria Clara"
                placeholderTextColor="#64748b"
              />

              <Text style={styles.inputLabel}>Phone / WhatsApp *</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+63 917 123 4567"
                placeholderTextColor="#64748b"
                keyboardType="phone-pad"
              />

              <Text style={styles.inputLabel}>Destination Place</Text>
              <TextInput
                style={styles.input}
                value={place}
                onChangeText={setPlace}
                placeholderTextColor="#64748b"
              />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Nights Stayed</Text>
                  <TextInput
                    style={styles.input}
                    value={nights}
                    onChangeText={setNights}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Tourist Quantity</Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Hotel selector */}
              {selectedPkg?.hotels && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.inputLabel}>Select Hotel Accommodation</Text>
                  {selectedPkg.hotels.map((h, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.hotelOption,
                        selectedHotel?.name === h.name && styles.hotelOptionSelected
                      ]}
                      onPress={() => setSelectedHotel(h)}
                    >
                      <Text style={{ color: selectedHotel?.name === h.name ? '#ea580c' : '#0f172a', fontWeight: 'bold' }}>{h.name}</Text>
                      <Text style={{ color: selectedHotel?.name === h.name ? '#f59e0b' : '#64748b', fontSize: 12, fontWeight: '600' }}>+₱{h.price.toLocaleString()} / night</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Total Calculation Display */}
              <View style={styles.totalPreviewBox}>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>Calculated Total (PHP)</Text>
                <Text style={styles.modalTotal}>
                  ₱{(
                    ((selectedPkg?.price || 10000) * (parseInt(quantity) || 1)) +
                    ((selectedHotel?.price || 0) * (parseInt(nights) || 1) * Math.ceil((parseInt(quantity) || 1) / 2))
                  ).toLocaleString()}
                </Text>
              </View>

              {/* Modal Buttons */}
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 15 }}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#f1f5f9' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#ff6b00', flex: 1.5, shadowColor: '#ff6b00', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }]}
                  onPress={handleSaveBooking}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {editingBookingId ? 'Save Changes' : 'Confirm Booking'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: '#ffffff'
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a'
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#0284c7',
    letterSpacing: 1.5,
    fontWeight: '700'
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 3
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  tabBtnActive: {
    backgroundColor: '#ff6b00'
  },
  tabText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600'
  },
  tabTextActive: {
    color: '#ffffff'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  cardImage: {
    width: '100%',
    height: 180
  },
  cardOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  provinceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#0ea5e9',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden'
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden'
  },
  cardBody: {
    padding: 14
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 12
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: 10
  },
  priceLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600'
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '900',
    color: '#ff6b00'
  },
  bookBtn: {
    backgroundColor: '#ff6b00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  bookingCode: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0284c7'
  },
  statusBadge: {
    fontSize: 11,
    color: '#ea580c',
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: '800',
    overflow: 'hidden'
  },
  bookingPlace: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2
  },
  bookingTourist: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500'
  },
  bookingDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6
  },
  bookingDetail: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600'
  },
  hotelText: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 10,
    fontWeight: '600'
  },
  bookingCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: 8
  },
  bookingTotal: {
    fontSize: 17,
    fontWeight: '900',
    color: '#ff6b00'
  },
  editBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  editBtnText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600'
  },
  deleteBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6
  },
  deleteBtnText: {
    color: '#f87171',
    fontSize: 12,
    fontWeight: '600'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a'
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#0284c7',
    marginBottom: 14,
    fontWeight: '700'
  },
  inputLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    marginTop: 8,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0f172a',
    fontSize: 14
  },
  hotelOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#f8fafc'
  },
  hotelOptionSelected: {
    borderColor: '#ff6b00',
    backgroundColor: 'rgba(255, 107, 0, 0.05)'
  },
  totalPreviewBox: {
    marginTop: 14,
    padding: 12,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.2)',
    alignItems: 'center'
  },
  modalTotal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ea580c'
  },
  modalBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});
