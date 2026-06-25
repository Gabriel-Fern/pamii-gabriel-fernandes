import React from 'react';
import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
    Badge,
    BadgeText,
    Center,
} from '@gluestack-ui/themed';

type Props = {
    saldo: number;
    activeTab: string;
    apostasCount: number;
};

export default function Header({ saldo, activeTab, apostasCount }: Props) {
    const titulos: Record<string, { titulo: string; sub: string }> = {
        home: { titulo: 'BetMaster ⚡', sub: 'Bem-vindo de volta, João!' },
        apostas: { titulo: '🎰 Apostas', sub: 'Escolha seu jogo e aposte' },
        perfil: { titulo: '👤 Meu Perfil', sub: 'Gerencie sua conta' },
    };

    const info = titulos[activeTab] || titulos.home;

    return (
        <Box
            bg="#0d1526"
            px="$4"
            pt="$3"
            pb="$3"
            borderBottomWidth={1}
            borderColor="#1e3a5f"
        >
            <HStack justifyContent="space-between" alignItems="center">
                {/* Logo e título */}
                <VStack space="xs" flex={1}>
                    <Heading color="#f1f5f9" size="lg" fontWeight="$black">
                        {info.titulo}
                    </Heading>
                    <Text color="#64748b" size="xs">
                        {info.sub}
                    </Text>
                </VStack>

                {/* Saldo e notificações */}
                <HStack space="sm" alignItems="center">
                    {/* Notificações */}
                    <Box position="relative">
                        <Box
                            bg="#1f2937"
                            rounded="$full"
                            w="$9"
                            h="$9"
                            justifyContent="center"
                            alignItems="center"
                            borderWidth={1}
                            borderColor="#374151"
                        >
                            <Text size="md">🔔</Text>
                        </Box>
                        {apostasCount > 0 && (
                            <Box
                                position="absolute"
                                top={-2}
                                right={-2}
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

                    {/* Saldo */}
                    <Box
                        bg="#052e16"
                        rounded="$xl"
                        px="$3"
                        py="$2"
                        borderWidth={1}
                        borderColor="#166534"
                    >
                        <Text color="#86efac" size="2xs" letterSpacing="$wide">SALDO</Text>
                        <Text color="#4ade80" fontWeight="$black" size="sm">
                            R$ {saldo.toFixed(2).replace('.', ',')}
                        </Text>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    );
}