import React, { useState } from 'react';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Heading,
    Text,
    Button,
    ButtonText,
    VStack,
    HStack,
    Divider,
    Input,
    InputField,
    Box,
    Badge,
    BadgeText,
} from '@gluestack-ui/themed';

type Jogo = {
    id: number;
    casa: string;
    fora: string;
    odd: number;
    selecao: 'casa' | 'empate' | 'fora';
    label: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    jogo: Jogo | null;
    saldo: number;
    onConfirmar: (valor: number) => void;
};

export default function BetModal({ isOpen, onClose, jogo, saldo, onConfirmar }: Props) {
    const [valor, setValor] = useState('');

    if (!jogo) return null;

    const valorNum = parseFloat(valor.replace(',', '.')) || 0;
    const ganho = (valorNum * jogo.odd).toFixed(2);
    const lucro = (valorNum * jogo.odd - valorNum).toFixed(2);
    const saldoSuficiente = valorNum > 0 && valorNum <= saldo;

    const handleConfirmar = () => {
        if (saldoSuficiente) {
            onConfirmar(valorNum);
            setValor('');
            onClose();
        }
    };

    const handleClose = () => {
        setValor('');
        onClose();
    };

    const apostaRapida = (pct: number) => {
        const v = (saldo * pct).toFixed(2);
        setValor(v);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
            <ModalBackdrop />
            <ModalContent bg="#111827" borderWidth={1} borderColor="#1e3a5f" rounded="$2xl">
                <ModalHeader borderBottomWidth={1} borderColor="#1f2937" pb="$3">
                    <VStack space="xs" flex={1}>
                        <Text color="#94a3b8" size="xs" letterSpacing="$widest">
                            🎰 CONFIRMAR APOSTA
                        </Text>
                        <Heading color="#f1f5f9" size="md">
                            {jogo.casa} vs {jogo.fora}
                        </Heading>
                    </VStack>
                </ModalHeader>

                <ModalBody py="$4">
                    <VStack space="md">
                        {/* Seleção */}
                        <Box bg="#1f2937" rounded="$xl" p="$3">
                            <HStack justifyContent="space-between" alignItems="center">
                                <VStack space="xs">
                                    <Text color="#94a3b8" size="xs">Sua seleção</Text>
                                    <Text color="#f1f5f9" fontWeight="$bold" size="sm">
                                        {jogo.label}
                                    </Text>
                                </VStack>
                                <Badge bg="#422006" rounded="$lg" px="$3" py="$1">
                                    <BadgeText color="#eab308" fontWeight="$black" size="lg">
                                        {jogo.odd.toFixed(2)}
                                    </BadgeText>
                                </Badge>
                            </HStack>
                        </Box>

                        {/* Saldo disponível */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="#94a3b8" size="sm">Saldo disponível</Text>
                            <Text color="#16a34a" fontWeight="$bold" size="sm">
                                R$ {saldo.toFixed(2).replace('.', ',')}
                            </Text>
                        </HStack>

                        {/* Input de valor */}
                        <VStack space="xs">
                            <Text color="#94a3b8" size="sm">Valor da aposta (R$)</Text>
                            <Box
                                borderWidth={1}
                                borderColor={!valor ? '#1e3a5f' : saldoSuficiente ? '#16a34a' : '#dc2626'}
                                rounded="$xl"
                                overflow="hidden"
                            >
                                <Input bg="#1f2937" borderWidth={0} size="xl">
                                    <InputField
                                        color="#f1f5f9"
                                        keyboardType="decimal-pad"
                                        placeholder="0,00"
                                        placeholderTextColor="#4b5563"
                                        value={valor}
                                        onChangeText={setValor}
                                        fontSize={20}
                                        fontWeight="700"
                                    />
                                </Input>
                            </Box>
                            {valor !== '' && !saldoSuficiente && valorNum > 0 && (
                                <Text color="#dc2626" size="xs">⚠ Saldo insuficiente</Text>
                            )}
                        </VStack>

                        {/* Apostas rápidas */}
                        <HStack space="sm">
                            {[0.1, 0.25, 0.5, 1].map((pct) => (
                                <Button
                                    key={pct}
                                    flex={1}
                                    size="sm"
                                    bg="#1f2937"
                                    rounded="$lg"
                                    borderWidth={1}
                                    borderColor="#374151"
                                    onPress={() => apostaRapida(pct)}
                                >
                                    <ButtonText color="#94a3b8" size="xs" fontWeight="$bold">
                                        {pct === 1 ? 'MAX' : `${pct * 100}%`}
                                    </ButtonText>
                                </Button>
                            ))}
                        </HStack>

                        <Divider bg="#1f2937" />

                        {/* Ganho potencial */}
                        <Box bg="#052e16" rounded="$xl" p="$3" borderWidth={1} borderColor="#166534">
                            <HStack justifyContent="space-between" alignItems="center">
                                <VStack space="xs">
                                    <Text color="#86efac" size="xs">Ganho potencial</Text>
                                    <Text color="#4ade80" fontWeight="$black" size="2xl">
                                        R$ {ganho.replace('.', ',')}
                                    </Text>
                                </VStack>
                                <VStack space="xs" alignItems="flex-end">
                                    <Text color="#86efac" size="xs">Lucro líquido</Text>
                                    <Text color="#86efac" fontWeight="$bold" size="md">
                                        +R$ {lucro.replace('.', ',')}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter borderTopWidth={1} borderColor="#1f2937" pt="$3">
                    <HStack space="sm" flex={1}>
                        <Button
                            flex={1}
                            bg="#1f2937"
                            rounded="$xl"
                            borderWidth={1}
                            borderColor="#374151"
                            onPress={handleClose}
                        >
                            <ButtonText color="#94a3b8" fontWeight="$bold">Cancelar</ButtonText>
                        </Button>
                        <Button
                            flex={2}
                            bg={saldoSuficiente ? '#16a34a' : '#374151'}
                            rounded="$xl"
                            onPress={handleConfirmar}
                            disabled={!saldoSuficiente}
                        >
                            <ButtonText
                                color={saldoSuficiente ? '#ffffff' : '#6b7280'}
                                fontWeight="$black"
                            >
                                {saldoSuficiente ? '✅ Apostar Agora' : 'Insira um valor'}
                            </ButtonText>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
