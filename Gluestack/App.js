import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GluestackUIProvider, Box } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import BetsScreen from './components/BetsScreen';
import ProfileScreen from './components/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [saldo, setSaldo] = useState(1250.00);
  const [apostas, setApostas] = useState([]);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            saldo={saldo}
            onNavigateToApostas={() => setActiveTab('apostas')}
          />
        );
      case 'apostas':
        return (
          <BetsScreen
            saldo={saldo}
            setSaldo={setSaldo}
            apostas={apostas}
            setApostas={setApostas}
          />
        );
      case 'perfil':
        return (
          <ProfileScreen
            saldo={saldo}
            setSaldo={setSaldo}
            apostas={apostas}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0d1526' }}>
        <StatusBar barStyle="light-content" backgroundColor="#0d1526" />
        <Box flex={1} bg="#0a0f1e">
          <Header
            saldo={saldo}
            activeTab={activeTab}
            apostasCount={apostas.length}
          />
          <Box flex={1}>
            {renderScreen()}
          </Box>
          <Footer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            apostasCount={apostas.length}
          />
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
