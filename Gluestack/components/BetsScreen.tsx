import React, { useState } from 'react';
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
} from '@gluestack-ui/themed';
import BetModal from './BetModal';

// ─── Tipos ───────────────────────────────────────────────
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
    setApostas: (fn: (prev: Aposta[]) => Aposta[]) => void;
};

// ─── Dados mockados ───────────────────────────────────────
const JOGOS_FUTEBOL = [
    { id: 1, casa: 'Flamengo', fora: 'Corinthians', oddCasa: 1.85, oddEmpate: 3.20, oddFora: 4.10, hora: '19:00', campeonato: 'Série A', aovivo: true, placarCasa: 1, placarFora: 0 },
    { id: 2, casa: 'Palmeiras', fora: 'São Paulo', oddCasa: 2.10, oddEmpate: 3.10, oddFora: 3.40, hora: '21:30', campeonato: 'Série A', aovivo: false, placarCasa: null, placarFora: null },
    { id: 3, casa: 'Grêmio', fora: 'Internacional', oddCasa: 2.45, oddEmpate: 3.00, oddFora: 3.00, hora: '16:00', campeonato: 'Série A', aovivo: false, placarCasa: null, placarFora: null },
    { id: 4, casa: 'Atlético-MG', fora: 'Cruzeiro', oddCasa: 1.65, oddEmpate: 3.50, oddFora: 5.20, hora: '20:00', campeonato: 'Série A', aovivo: true, placarCasa: 2, placarFora: 1 },
    { id: 5, casa: 'Santos', fora: 'Botafogo', oddCasa: 2.90, oddEmpate: 3.00, oddFora: 2.50, hora: '18:30', campeonato: 'Série A', aovivo: false, placarCasa: null, placarFora: null },
];

const JOGOS_BASQUETE = [
    { id: 10, casa: 'Lakers', fora: 'Celtics', oddCasa: 1.75, oddEmpate: null, oddFora: 2.10, hora: '22:00', campeonato: 'NBA', aovivo: true, placarCasa: 87, placarFora: 82 },
    { id: 11, casa: 'Warriors', fora: 'Nets', oddCasa: 1.55, oddEmpate: null, oddFora: 2.55, hora: '00:30', campeonato: 'NBA', aovivo: false, placarCasa: null, placarFora: null },
    { id: 12, casa: 'Heat', fora: 'Bulls', oddCasa: 2.20, oddEmpate: null, oddFora: 1.70, hora: '01:00', campeonato: 'NBA', aovivo: false, placarCasa: null, placarFora: null },
];

const JOGOS_TENIS = [
    { id: 20, casa: 'Alcaraz', fora: 'Djokovic', oddCasa: 2.05, oddEmpate: null, oddFora: 1.85, hora: '14:00', campeonato: 'Wimbledon', aovivo: false, placarCasa: null, placarFora: null },
    { id: 21, casa: 'Sinner', fora: 'Medvedev', oddCasa: 1.60, oddEmpate: null, oddFora: 2.45, hora: '16:30', campeonato: 'Wimbledon', aovivo: true, placarCasa: 2, placarFora: 1 },
];

const JOGOS_MMA = [
    { id: 30, casa: 'Poatan', fora: 'Pereira', oddCasa: 2.30, oddEmpate: null, oddFora: 1.65, hora: '23:00', campeonato: 'UFC 300', aovivo: false, placarCasa: null, placarFora: null },
];

const ESPORTES = [
    { key: 'futebol', label: '⚽ Futebol', jogos: JOGOS_FUTEBOL },
    { key: 'basquete', label: '🏀 Basquete', jogos: JOGOS_BASQUETE },
    { key: 'tenis', label: '🎾 Tênis', jogos: JOGOS_TENIS },
    { key: 'mma', label: '🥊 MMA', jogos: JOGOS_MMA },
];

// ─── Componente de odd clickável ──────────────────────────
function OddButton({
    label,
    value,
    selecionado,
    onPress,
    hasEmpate,
}: {
    label: string;
    value: number | null;
    selecionado: boolean;
    onPress: () => void;
    hasEmpate?: boolean;
}) {
    if (value === null) return null;
    return (
        <Button
            flex={1}
            bg={selecionado ? '#16a34a' : '#1f2937'}
            rounded="$lg"
            borderWidth={1}
            borderColor={selecionado ? '#16a34a' : '#374151'}
            onPress={onPress}
            h="$14"
        >
            <VStack alignItems="center" space="xs">
                <Text color={selecionado ? '#bbf7d0' : '#6b7280'} size="2xs">{label}</Text>
                <Text color={selecionado ? '#ffffff' : '#eab308'} fontWeight="$black" size="md">
                    {value.toFixed(2)}
                </Text>
            </VStack>
        </Button>
    );
}

// ─── Componente de card de jogo ───────────────────────────
function JogoCard({
    jogo,
    selecaoAtiva,
    onSelecionar,
    hasEmpate,
}: {
    jogo: any;
    selecaoAtiva: Selecao | null;
    onSelecionar: (s: Selecao) => void;
    hasEmpate: boolean;
}) {
    const sel = (tipo: 'casa' | 'empate' | 'fora', odd: number, labelStr: string) => {
        onSelecionar({
            jogoId: jogo.id,
            casa: jogo.casa,
            fora: jogo.fora,
            odd,
            selecao: tipo,
            label: labelStr,
        });
    };

    const isSel = (tipo: 'casa' | 'empate' | 'fora') =>
        selecaoAtiva?.jogoId === jogo.id && selecaoAtiva?.selecao === tipo;

    return (
        <Box
            bg="#111827"
            rounded="$2xl"
            p="$4"
            borderWidth={1}
            borderColor={selecaoAtiva?.jogoId === jogo.id ? '#1e3a5f' : '#1f2937'}
            mb="$3"
        >
            <VStack space="sm">
                {/* Header do card */}
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="#4b5563" size="xs">{jogo.campeonato}</Text>
                    <HStack space="sm" alignItems="center">
                        {jogo.aovivo && (
                            <Badge bg="#7f1d1d" rounded="$md" px="$2" py="$0.5">
                                <BadgeText color="#fca5a5" size="2xs" fontWeight="$black">🔴 AO VIVO</BadgeText>
                            </Badge>
                        )}
                        {!jogo.aovivo && (
                            <Text color="#4b5563" size="xs">🕐 {jogo.hora}</Text>
                        )}
                    </HStack>
                </HStack>

                {/* Times */}
                <HStack justifyContent="space-between" alignItems="center">
                    <VStack flex={2} space="xs">
                        <Text color="#f1f5f9" fontWeight="$bold" size="sm">{jogo.casa}</Text>
                        <Text color="#94a3b8" size="sm">{jogo.fora}</Text>
                    </VStack>
                    {jogo.aovivo && jogo.placarCasa !== null && (
                        <Box bg="#1f2937" rounded="$lg" px="$3" py="$1">
                            <Text color="#eab308" fontWeight="$black" size="lg">
                                {jogo.placarCasa} - {jogo.placarFora}
                            </Text>
                        </Box>
                    )}
                </HStack>

                <Divider bg="#1f2937" />

                {/* Odds */}
                <HStack space="sm">
                    <OddButton
                        label={jogo.casa.split(' ')[0].toUpperCase()}
                        value={jogo.oddCasa}
                        selecionado={isSel('casa')}
                        onPress={() => sel('casa', jogo.oddCasa, `${jogo.casa} Vence`)}
                        hasEmpate={hasEmpate}
                    />
                    {hasEmpate && jogo.oddEmpate && (
                        <OddButton
                            label="EMPATE"
                            value={jogo.oddEmpate}
                            selecionado={isSel('empate')}
                            onPress={() => sel('empate', jogo.oddEmpate, 'Empate')}
                            hasEmpate={hasEmpate}
                        />
                    )}
                    <OddButton
                        label={jogo.fora.split(' ')[0].toUpperCase()}
                        value={jogo.oddFora}
                        selecionado={isSel('fora')}
                        onPress={() => sel('fora', jogo.oddFora, `${jogo.fora} Vence`)}
                        hasEmpate={hasEmpate}
                    />
                </HStack>
            </VStack>
        </Box>
    );
}

// ─── Componente principal ─────────────────────────────────
export default function BetsScreen({ saldo, setSaldo, apostas, setApostas }: Props) {
    const [esporteAtivo, setEsporteAtivo] = useState('futebol');
    const [selecoes, setSelecoes] = useState<Selecao[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [jogoModal, setJogoModal] = useState<any>(null);

    const esporteAtual = ESPORTES.find((e) => e.key === esporteAtivo)!;
    const hasEmpate = esporteAtivo === 'futebol';

    const getSelecaoJogo = (jogoId: number) =>
        selecoes.find((s) => s.jogoId === jogoId) || null;

    const handleSelecionar = (s: Selecao) => {
        setSelecoes((prev) => {
            const existing = prev.find((x) => x.jogoId === s.jogoId);
            if (existing?.selecao === s.selecao) {
                // desselecionar
                return prev.filter((x) => x.jogoId !== s.jogoId);
            }
            const sem = prev.filter((x) => x.jogoId !== s.jogoId);
            return [...sem, s];
        });
    };

    const abrirModal = (jogo: Selecao) => {
        setJogoModal(jogo);
        setModalAberto(true);
    };

    const handleConfirmarAposta = (valor: number) => {
        if (!jogoModal) return;
        const ganho = parseFloat((valor * jogoModal.odd).toFixed(2));
        const novaAposta: Aposta = {
            id: Date.now(),
            valor,
            ganho,
            status: 'pendente',
            selecao: jogoModal,
        };
        setApostas((prev) => [novaAposta, ...prev]);
        setSaldo(saldo - valor);
        // Remover seleção do bilhete
        setSelecoes((prev) => prev.filter((s) => s.jogoId !== jogoModal.jogoId));
    };

    const totalOdd = selecoes.reduce((acc, s) => acc * s.odd, 1);

    return (
        <Box flex={1} bg="#0a0f1e">
            {/* Tabs de esportes */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space="sm" px="$4" py="$3">
                    {ESPORTES.map((e) => (
                        <Button
                            key={e.key}
                            bg={esporteAtivo === e.key ? '#16a34a' : '#111827'}
                            rounded="$full"
                            borderWidth={1}
                            borderColor={esporteAtivo === e.key ? '#16a34a' : '#374151'}
                            onPress={() => setEsporteAtivo(e.key)}
                            px="$4"
                            h="$9"
                        >
                            <ButtonText
                                color={esporteAtivo === e.key ? '#ffffff' : '#94a3b8'}
                                fontWeight={esporteAtivo === e.key ? '$bold' : '$normal'}
                                size="sm"
                            >
                                {e.label}
                            </ButtonText>
                        </Button>
                    ))}
                </HStack>
            </ScrollView>

            {/* Lista de jogos */}
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: selecoes.length > 0 ? 120 : 16 }}
                showsVerticalScrollIndicator={false}
            >
                <Text color="#4b5563" size="xs" letterSpacing="$widest" mb="$3">
                    {esporteAtual.jogos.length} PARTIDAS DISPONÍVEIS
                </Text>
                {esporteAtual.jogos.map((jogo) => (
                    <JogoCard
                        key={jogo.id}
                        jogo={jogo}
                        selecaoAtiva={getSelecaoJogo(jogo.id)}
                        onSelecionar={handleSelecionar}
                        hasEmpate={hasEmpate}
                    />
                ))}
            </ScrollView>

            {/* Bilhete de Apostas (rodapé flutuante) */}
            {selecoes.length > 0 && (
                <Box
                    position="absolute"
                    bottom="$0"
                    left="$0"
                    right="$0"
                    bg="#111827"
                    p="$4"
                    borderTopWidth={1}
                    borderColor="#16a34a"
                >
                    <HStack justifyContent="space-between" alignItems="center" mb="$2">
                        <VStack>
                            <Text color="#94a3b8" size="xs">
                                🎫 {selecoes.length} seleção(ões)
                            </Text>
                            <Text color="#eab308" fontWeight="$black" size="md">
                                Odd total: {totalOdd.toFixed(2)}
                            </Text>
                        </VStack>
                        <Button
                            size="sm"
                            bg="transparent"
                            onPress={() => setSelecoes([])}
                        >
                            <ButtonText color="#6b7280" size="xs">✕ Limpar</ButtonText>
                        </Button>
                    </HStack>

                    {/* Lista de seleções no bilhete */}
                    {selecoes.map((s) => (
                        <HStack
                            key={s.jogoId}
                            justifyContent="space-between"
                            alignItems="center"
                            mb="$1"
                        >
                            <Text color="#cbd5e1" size="xs" flex={1}>{s.label}</Text>
                            <HStack space="sm" alignItems="center">
                                <Text color="#eab308" fontWeight="$bold" size="xs">
                                    {s.odd.toFixed(2)}
                                </Text>
                                <Button
                                    size="xs"
                                    bg="transparent"
                                    onPress={() => abrirModal(s)}
                                    px="$2"
                                >
                                    <ButtonText color="#16a34a" fontWeight="$bold" size="xs">
                                        APOSTAR
                                    </ButtonText>
                                </Button>
                            </HStack>
                        </HStack>
                    ))}
                </Box>
            )}

            {/* Modal de aposta */}
            {jogoModal && (
                <BetModal
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    jogo={jogoModal}
                    saldo={saldo}
                    onConfirmar={handleConfirmarAposta}
                />
            )}
        </Box>
    );
}
