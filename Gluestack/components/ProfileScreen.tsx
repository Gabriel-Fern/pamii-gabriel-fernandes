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
    Divider,
    Badge,
    BadgeText,
    Center,
    Avatar,
    AvatarFallbackText,
} from '@gluestack-ui/themed';

type Selecao = {
    jogoId: number;
    casa: string;
    fora: string;
    odd: number;
    selecao: 'casa' | 'empate' | 'fora';
    label: string;
};

type Aposta = {
    id: number;
    valor: number;
    ganho: number;
    status: 'pendente' | 'ganhou' | 'perdeu';
    selecao: Selecao;
};

type Props = {
    saldo: number;
    setSaldo: (v: number) => void;
    apostas: Aposta[];
};

function StatusBadge({ status }: { status: Aposta['status'] }) {
    const configs = {
        pendente: { bg: '#422006', text: '#fbbf24', label: '⏳ Pendente' },
        ganhou: { bg: '#052e16', text: '#4ade80', label: '✅ Ganhou' },
        perdeu: { bg: '#450a0a', text: '#f87171', label: '❌ Perdeu' },
    };
    const c = configs[status];
    return (
        <Badge bg={c.bg} rounded="$md" px="$2" py="$0.5">
            <BadgeText color={c.text} size="xs" fontWeight="$bold">{c.label}</BadgeText>
        </Badge>
    );
}

export default function ProfileScreen({ saldo, setSaldo, apostas }: Props) {
    const totalApostado = apostas.reduce((acc, a) => acc + a.valor, 0);
    const totalGanho = apostas.filter((a) => a.status === 'ganhou').reduce((acc, a) => acc + a.ganho, 0);
    const totalPerdido = apostas.filter((a) => a.status === 'perdeu').reduce((acc, a) => acc + a.valor, 0);
    const ganhouCount = apostas.filter((a) => a.status === 'ganhou').length;
    const finalizadas = apostas.filter((a) => a.status !== 'pendente').length;
    const taxaVitoria = finalizadas > 0 ? Math.round((ganhouCount / finalizadas) * 100) : 0;

    // Simular depósito
    const handleDepositar = () => {
        setSaldo(saldo + 200);
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#0a0f1e' }}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack space="md">
                {/* Card de perfil */}
                <Box bg="#111827" rounded="$2xl" p="$5" borderWidth={1} borderColor="#1e3a5f">
                    <HStack space="md" alignItems="center">
                        <Avatar size="xl" bg="#1e3a5f">
                            <AvatarFallbackText color="#60a5fa">JD</AvatarFallbackText>
                        </Avatar>
                        <VStack flex={1} space="xs">
                            <Heading color="#f1f5f9" size="lg">João Da Silva</Heading>
                            <Text color="#94a3b8" size="sm">@joaobet2024</Text>
                            <Badge bg="#1e3a5f" rounded="$md" px="$2" py="$0.5" alignSelf="flex-start">
                                <BadgeText color="#60a5fa" size="xs" fontWeight="$bold">⭐ VIP Ouro</BadgeText>
                            </Badge>
                        </VStack>
                    </HStack>
                </Box>

                {/* Card de saldo */}
                <Box bg="#052e16" rounded="$2xl" p="$5" borderWidth={1} borderColor="#166534">
                    <VStack space="sm">
                        <Text color="#86efac" size="xs" letterSpacing="$widest">💰 SALDO DISPONÍVEL</Text>
                        <Heading color="#4ade80" size="4xl" fontWeight="$black">
                            R$ {saldo.toFixed(2).replace('.', ',')}
                        </Heading>
                        <HStack space="sm" mt="$2">
                            <Button
                                flex={1}
                                bg="#16a34a"
                                rounded="$xl"
                                onPress={handleDepositar}
                            >
                                <ButtonText color="#ffffff" fontWeight="$black">+ Depositar R$ 200</ButtonText>
                            </Button>
                            <Button
                                flex={1}
                                bg="#1f2937"
                                rounded="$xl"
                                borderWidth={1}
                                borderColor="#374151"
                            >
                                <ButtonText color="#94a3b8" fontWeight="$bold">↑ Sacar</ButtonText>
                            </Button>
                        </HStack>
                    </VStack>
                </Box>

                {/* Estatísticas */}
                <Box bg="#111827" rounded="$2xl" p="$4" borderWidth={1} borderColor="#1f2937">
                    <Text color="#94a3b8" size="xs" letterSpacing="$widest" mb="$3">📊 ESTATÍSTICAS</Text>
                    <HStack space="sm">
                        <Box flex={1} bg="#1f2937" rounded="$xl" p="$3" alignItems="center">
                            <Text color="#eab308" fontWeight="$black" size="2xl">{apostas.length}</Text>
                            <Text color="#6b7280" size="xs" mt="$1">Apostas</Text>
                        </Box>
                        <Box flex={1} bg="#1f2937" rounded="$xl" p="$3" alignItems="center">
                            <Text color="#4ade80" fontWeight="$black" size="2xl">{taxaVitoria}%</Text>
                            <Text color="#6b7280" size="xs" mt="$1">Vitórias</Text>
                        </Box>
                        <Box flex={1} bg="#1f2937" rounded="$xl" p="$3" alignItems="center">
                            <Text color="#60a5fa" fontWeight="$black" size="2xl">
                                {totalApostado.toFixed(0)}
                            </Text>
                            <Text color="#6b7280" size="xs" mt="$1">Apostado</Text>
                        </Box>
                    </HStack>
                </Box>

                {/* Histórico de apostas */}
                <Box bg="#111827" rounded="$2xl" p="$4" borderWidth={1} borderColor="#1f2937">
                    <HStack justifyContent="space-between" alignItems="center" mb="$3">
                        <Text color="#94a3b8" size="xs" letterSpacing="$widest">🎫 HISTÓRICO DE APOSTAS</Text>
                        <Text color="#4b5563" size="xs">{apostas.length} aposta(s)</Text>
                    </HStack>

                    {apostas.length === 0 ? (
                        <Center py="$8">
                            <Text size="3xl" mb="$2">🎯</Text>
                            <Text color="#4b5563" size="sm" textAlign="center">
                                Nenhuma aposta realizada ainda.{'\n'}Vá para a aba Apostas!
                            </Text>
                        </Center>
                    ) : (
                        <VStack space="sm">
                            {apostas.map((aposta, idx) => (
                                <Box key={aposta.id}>
                                    {idx > 0 && <Divider bg="#1f2937" mb="$2" />}
                                    <HStack justifyContent="space-between" alignItems="flex-start">
                                        <VStack flex={1} space="xs" pr="$2">
                                            <Text color="#f1f5f9" size="sm" fontWeight="$bold">
                                                {aposta.selecao.casa} vs {aposta.selecao.fora}
                                            </Text>
                                            <Text color="#94a3b8" size="xs">
                                                {aposta.selecao.label}
                                            </Text>
                                            <HStack space="sm" alignItems="center">
                                                <Text color="#6b7280" size="xs">
                                                    Odd: {aposta.selecao.odd.toFixed(2)}
                                                </Text>
                                                <Text color="#6b7280" size="xs">•</Text>
                                                <Text color="#6b7280" size="xs">
                                                    R$ {aposta.valor.toFixed(2).replace('.', ',')}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                        <VStack alignItems="flex-end" space="xs">
                                            <StatusBadge status={aposta.status} />
                                            {aposta.status === 'ganhou' && (
                                                <Text color="#4ade80" fontWeight="$bold" size="sm">
                                                    +R$ {aposta.ganho.toFixed(2).replace('.', ',')}
                                                </Text>
                                            )}
                                            {aposta.status === 'pendente' && (
                                                <Text color="#fbbf24" size="xs">
                                                    Pot: R$ {aposta.ganho.toFixed(2).replace('.', ',')}
                                                </Text>
                                            )}
                                            {aposta.status === 'perdeu' && (
                                                <Text color="#f87171" size="xs">
                                                    -R$ {aposta.valor.toFixed(2).replace('.', ',')}
                                                </Text>
                                            )}
                                        </VStack>
                                    </HStack>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Box>

                {/* Bônus */}
                <Box bg="#1e1b4b" rounded="$2xl" p="$4" borderWidth={1} borderColor="#3730a3">
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack space="xs" flex={1}>
                            <Text color="#a5b4fc" size="xs" fontWeight="$bold">🎁 BÔNUS DISPONÍVEL</Text>
                            <Heading color="#ffffff" size="md">Freebet de R$ 50</Heading>
                            <Text color="#818cf8" size="xs">Válido por 7 dias</Text>
                        </VStack>
                        <Button bg="#4f46e5" rounded="$xl" px="$4">
                            <ButtonText color="#ffffff" fontWeight="$bold" size="sm">Usar</ButtonText>
                        </Button>
                    </HStack>
                </Box>

                {/* Rodapé */}
                <Center py="$2">
                    <Text color="#374151" size="xs">🔒 Jogo responsável · BetMaster ⚡</Text>
                    <Text color="#374151" size="2xs" mt="$1">+18 anos · Aposte com responsabilidade</Text>
                </Center>
            </VStack>
        </ScrollView>
    );
}
