import React from 'react';
import { ScrollView } from 'react-native';
import {
    Box,
    Text,
    Heading,
    Button,
    ButtonText,
    VStack,
    HStack,
    Badge,
    BadgeText,
    Center,
    Divider,
} from '@gluestack-ui/themed';

// Partidas em destaque para a Home
const DESTAQUES = [
    {
        id: 1,
        casa: 'Flamengo',
        fora: 'Corinthians',
        oddCasa: 1.85,
        oddFora: 4.10,
        campeonato: '⚽ Série A',
        aovivo: true,
        placar: '1 - 0',
    },
    {
        id: 2,
        casa: 'Lakers',
        fora: 'Celtics',
        oddCasa: 1.75,
        oddFora: 2.10,
        campeonato: '🏀 NBA',
        aovivo: true,
        placar: '87 - 82',
    },
    {
        id: 3,
        casa: 'Palmeiras',
        fora: 'São Paulo',
        oddCasa: 2.10,
        oddFora: 3.40,
        campeonato: '⚽ Série A',
        aovivo: false,
        placar: null,
        hora: '21:30',
    },
    {
        id: 4,
        casa: 'Alcaraz',
        fora: 'Djokovic',
        oddCasa: 2.05,
        oddFora: 1.85,
        campeonato: '🎾 Wimbledon',
        aovivo: false,
        placar: null,
        hora: '14:00',
    },
];

const NOTICIAS = [
    { emoji: '🔥', titulo: 'Flamengo de volta à liderança após vitória dramática', tempo: '15min' },
    { emoji: '💰', titulo: 'Odd especial: Corinthians 6.50 no próximo clássico', tempo: '1h' },
    { emoji: '⚡', titulo: 'Reforço confirmado no Palmeiras antes do derby', tempo: '2h' },
    { emoji: '🏆', titulo: 'Atlético-MG ultrapassa Flamengo em pontos', tempo: '3h' },
];

type Props = {
    saldo: number;
    onNavigateToApostas: () => void;
};

function CardDestaque({ jogo, onPress }: { jogo: any; onPress: () => void }) {
    return (
        <Box
            bg="#111827"
            rounded="$2xl"
            p="$4"
            mr="$3"
            w={260}
            borderWidth={1}
            borderColor={jogo.aovivo ? '#166534' : '#1f2937'}
        >
            <VStack space="sm">
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="#4b5563" size="xs">{jogo.campeonato}</Text>
                    {jogo.aovivo ? (
                        <Badge bg="#7f1d1d" rounded="$md" px="$2" py="$0.5">
                            <BadgeText color="#fca5a5" size="2xs" fontWeight="$black">🔴 AO VIVO</BadgeText>
                        </Badge>
                    ) : (
                        <Text color="#4b5563" size="xs">🕐 {jogo.hora}</Text>
                    )}
                </HStack>

                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="#f1f5f9" fontWeight="$bold" size="sm" flex={1}>{jogo.casa}</Text>
                    {jogo.aovivo && jogo.placar ? (
                        <Box bg="#1f2937" rounded="$lg" px="$2" py="$0.5" mx="$2">
                            <Text color="#eab308" fontWeight="$black" size="md">{jogo.placar}</Text>
                        </Box>
                    ) : (
                        <Text color="#4b5563" size="xs" mx="$2">VS</Text>
                    )}
                    <Text color="#94a3b8" size="sm" flex={1} textAlign="right">{jogo.fora}</Text>
                </HStack>

                <Divider bg="#1f2937" />

                <HStack space="sm">
                    <Box flex={1} bg="#1f2937" rounded="$lg" p="$2" alignItems="center">
                        <Text color="#6b7280" size="2xs">1</Text>
                        <Text color="#eab308" fontWeight="$black" size="sm">{jogo.oddCasa.toFixed(2)}</Text>
                    </Box>
                    <Box flex={1} bg="#1f2937" rounded="$lg" p="$2" alignItems="center">
                        <Text color="#6b7280" size="2xs">2</Text>
                        <Text color="#eab308" fontWeight="$black" size="sm">{jogo.oddFora.toFixed(2)}</Text>
                    </Box>
                </HStack>

                <Button
                    bg="#16a34a"
                    rounded="$xl"
                    h="$9"
                    onPress={onPress}
                >
                    <ButtonText color="#ffffff" fontWeight="$bold" size="sm">Apostar Agora</ButtonText>
                </Button>
            </VStack>
        </Box>
    );
}

export default function HomeScreen({ saldo, onNavigateToApostas }: Props) {
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#0a0f1e' }}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Banner de bônus */}
            <Box mx="$4" mt="$4" bg="#1e1b4b" rounded="$2xl" p="$5" borderWidth={1} borderColor="#3730a3">
                <HStack justifyContent="space-between" alignItems="center">
                    <VStack space="xs" flex={1} pr="$3">
                        <Badge bg="#3730a3" rounded="$md" px="$2" py="$0.5" alignSelf="flex-start">
                            <BadgeText color="#a5b4fc" size="2xs" fontWeight="$black">🎁 BÔNUS EXCLUSIVO</BadgeText>
                        </Badge>
                        <Heading color="#ffffff" size="lg" fontWeight="$black">
                            1º Depósito{'\n'}+100% até R$ 500
                        </Heading>
                        <Text color="#818cf8" size="xs">
                            Use o código: <Text color="#a5b4fc" fontWeight="$bold">BET100</Text>
                        </Text>
                    </VStack>
                    <Center
                        w="$16"
                        h="$16"
                        bg="#4f46e5"
                        rounded="$2xl"
                    >
                        <Text size="3xl">💎</Text>
                    </Center>
                </HStack>
                <Button mt="$3" bg="#4f46e5" rounded="$xl" onPress={onNavigateToApostas}>
                    <ButtonText color="#ffffff" fontWeight="$black">Resgatar Bônus</ButtonText>
                </Button>
            </Box>

            {/* Ao vivo agora */}
            <Box mt="$5">
                <HStack justifyContent="space-between" alignItems="center" px="$4" mb="$3">
                    <HStack space="sm" alignItems="center">
                        <Box w="$2" h="$2" bg="#dc2626" rounded="$full" />
                        <Text color="#f1f5f9" fontWeight="$bold" size="md">Ao Vivo Agora</Text>
                    </HStack>
                    <Button
                        size="sm"
                        bg="transparent"
                        onPress={onNavigateToApostas}
                    >
                        <ButtonText color="#16a34a" size="xs" fontWeight="$bold">Ver tudo →</ButtonText>
                    </Button>
                </HStack>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack px="$4" pb="$2">
                        {DESTAQUES.map((jogo) => (
                            <CardDestaque
                                key={jogo.id}
                                jogo={jogo}
                                onPress={onNavigateToApostas}
                            />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>

            {/* Odds do dia */}
            <Box mx="$4" mt="$5">
                <Text color="#94a3b8" size="xs" letterSpacing="$widest" mb="$3">
                    ⚡ ODDS ESPECIAIS DO DIA
                </Text>
                <HStack space="sm" flexWrap="wrap">
                    {[
                        { time: 'Flamengo', odd: 1.85, esporte: '⚽' },
                        { time: 'Lakers', odd: 1.75, esporte: '🏀' },
                        { time: 'Alcaraz', odd: 2.05, esporte: '🎾' },
                        { time: 'Poatan', odd: 2.30, esporte: '🥊' },
                    ].map((item) => (
                        <Button
                            key={item.time}
                            bg="#111827"
                            rounded="$xl"
                            borderWidth={1}
                            borderColor="#1f2937"
                            onPress={onNavigateToApostas}
                            mb="$2"
                            px="$3"
                            h="$12"
                        >
                            <HStack space="xs" alignItems="center">
                                <Text size="md">{item.esporte}</Text>
                                <VStack>
                                    <Text color="#94a3b8" size="2xs">{item.time}</Text>
                                    <Text color="#eab308" fontWeight="$black" size="sm">
                                        {item.odd.toFixed(2)}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Button>
                    ))}
                </HStack>
            </Box>

            {/* Últimas notícias */}
            <Box mx="$4" mt="$5">
                <Text color="#94a3b8" size="xs" letterSpacing="$widest" mb="$3">
                    📰 ÚLTIMAS NOTÍCIAS
                </Text>
                <Box bg="#111827" rounded="$2xl" borderWidth={1} borderColor="#1f2937" overflow="hidden">
                    {NOTICIAS.map((n, idx) => (
                        <Box key={idx}>
                            {idx > 0 && <Divider bg="#1f2937" />}
                            <HStack space="sm" alignItems="center" p="$3">
                                <Text size="lg">{n.emoji}</Text>
                                <Text color="#cbd5e1" size="sm" flex={1}>{n.titulo}</Text>
                                <Text color="#4b5563" size="xs">{n.tempo}</Text>
                            </HStack>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Promoções rápidas */}
            <Box mx="$4" mt="$5">
                <Text color="#94a3b8" size="xs" letterSpacing="$widest" mb="$3">
                    🎯 PROMOÇÕES
                </Text>
                <HStack space="sm">
                    <Box
                        flex={1}
                        bg="#7c2d12"
                        rounded="$2xl"
                        p="$4"
                        borderWidth={1}
                        borderColor="#c2410c"
                    >
                        <Text size="2xl" mb="$1">🏆</Text>
                        <Text color="#fed7aa" fontWeight="$bold" size="sm">Multi Aposta</Text>
                        <Text color="#fb923c" size="xs" mt="$1">Bônus de até 50% em múltiplas</Text>
                    </Box>
                    <Box
                        flex={1}
                        bg="#14532d"
                        rounded="$2xl"
                        p="$4"
                        borderWidth={1}
                        borderColor="#15803d"
                    >
                        <Text size="2xl" mb="$1">💸</Text>
                        <Text color="#bbf7d0" fontWeight="$bold" size="sm">Cashback</Text>
                        <Text color="#86efac" size="xs" mt="$1">5% de volta em todas as perdas</Text>
                    </Box>
                </HStack>
            </Box>

            {/* Aviso de jogo responsável */}
            <Center mt="$6" px="$4">
                <Text color="#374151" size="xs" textAlign="center">
                    ⚠️ Aposte com responsabilidade · +18 anos · BetMaster não é responsável por perdas financeiras
                </Text>
            </Center>
        </ScrollView>
    );
}
