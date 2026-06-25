import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, HStack, VStack, Center } from '@gluestack-ui/themed';

type Tab = 'home' | 'apostas' | 'perfil';

type Props = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    apostasCount: number;
};

const TABS: { key: Tab; emoji: string; label: string }[] = [
    { key: 'home', emoji: '🏠', label: 'Home' },
    { key: 'apostas', emoji: '⚽', label: 'Apostas' },
    { key: 'perfil', emoji: '👤', label: 'Perfil' },
];

export default function Footer({ activeTab, setActiveTab, apostasCount }: Props) {
    return (
        <Box
            bg="#0d1526"
            borderTopWidth={1}
            borderColor="#1e3a5f"
            pb="$2"
        >
            <HStack>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    const showBadge = tab.key === 'perfil' && apostasCount > 0;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={{ flex: 1 }}
                            onPress={() => setActiveTab(tab.key)}
                            activeOpacity={0.7}
                        >
                            <Center py="$3" position="relative">
                                <Box position="relative">
                                    <Text size="2xl">{tab.emoji}</Text>
                                    {showBadge && (
                                        <Box
                                            position="absolute"
                                            top={-4}
                                            right={-6}
                                            bg="#dc2626"
                                            rounded="$full"
                                            w="$4"
                                            h="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Text color="#ffffff" size="2xs" fontWeight="$black">
                                                {apostasCount > 9 ? '9+' : apostasCount}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                                <Text
                                    color={isActive ? '#16a34a' : '#4b5563'}
                                    size="xs"
                                    fontWeight={isActive ? '$bold' : '$normal'}
                                    mt="$0.5"
                                >
                                    {tab.label}
                                </Text>
                                {isActive && (
                                    <Box
                                        position="absolute"
                                        bottom="$0"
                                        w="$8"
                                        h="$0.5"
                                        bg="#16a34a"
                                        rounded="$full"
                                    />
                                )}
                            </Center>
                        </TouchableOpacity>
                    );
                })}
            </HStack>
        </Box>
    );
}